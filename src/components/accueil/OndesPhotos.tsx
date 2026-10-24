import { useEffect } from "react";
import { abonner, mouvementReduit } from "./effets";
import { ecouterVitesse } from "./vitesse";

/*
  Les photos marquées data-onde passent en WebGL : un petit canevas posé sur
  chacune la redessine avec un shader.
  - Pendant le défilement, la photo se courbe comme une voile (d'autant plus
    qu'on va vite), ondule légèrement et ses couleurs se décalent un instant.
  - Au survol (au toucher sur téléphone), des ondes partent du doigt ou de la
    souris, comme une goutte sur l'eau.
  - En entrant dans l'écran, elle se découvre de bas en haut derrière un bord
    qui ondule ; elle zoome et glisse dans son cadre comme les autres photos.

  Un canevas par photo plutôt qu'un seul sur tout l'écran : il défile avec la page,
  donc la photo ne « flotte » jamais au doigt sur téléphone. La boucle ne tourne
  que pendant un mouvement (défilement, survol, apparition) et s'arrête ensuite.
  Sans WebGL, ou si le visiteur réduit les animations, rien ne change : la photo
  d'origine reste affichée.
*/

const MARGE_X = 0.04;
const MARGE_Y = 0.14;
const GRILLE = 24;
/** Contextes WebGL actifs au plus : les navigateurs en limitent le nombre (16 sur Chrome, moins sur certains iPhone). */
const MAX_PHOTOS = 10;

const SOMMETS = `
attribute vec2 aUv;
uniform mediump float uVitesse;
varying mediump vec2 vUv;
const float MX = ${MARGE_X.toFixed(3)};
const float MY = ${MARGE_Y.toFixed(3)};
void main() {
  vUv = aUv;
  vec2 p = vec2(MX + aUv.x * (1.0 - 2.0 * MX), MY + aUv.y * (1.0 - 2.0 * MY));
  // La photo se courbe comme une voile avec la vitesse du défilement.
  p.y += sin(aUv.x * 3.14159265) * uVitesse * 0.075;
  gl_Position = vec4(p.x * 2.0 - 1.0, 1.0 - p.y * 2.0, 0.0, 1.0);
}`;

const PIXELS = `
precision mediump float;
uniform sampler2D uTexture;
uniform vec2 uCouverture;
uniform vec2 uTaille;
uniform float uRayon;
uniform float uZoom;
uniform float uDecalage;
uniform vec2 uSouris;
uniform float uSurvol;
uniform float uTemps;
uniform float uVitesse;
uniform float uOuverture;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 rapport = vec2(uTaille.x / uTaille.y, 1.0);

  // Ondes autour du doigt ou de la souris.
  vec2 versSouris = (uv - uSouris) * rapport;
  float d = length(versSouris);
  float onde = sin(d * 34.0 - uTemps * 5.5) * exp(-d * 4.5) * 0.014 * uSurvol;
  uv += (d > 0.0001 ? versSouris / d : vec2(0.0)) * onde / rapport;

  // Ondulation pendant le défilement.
  float elan = abs(uVitesse);
  uv.x += sin(uv.y * 11.0 + uTemps * 2.2) * 0.007 * elan;

  vec2 t = (uv - 0.5) * uCouverture / uZoom + 0.5;
  t.y += uDecalage;
  float decal = uVitesse * 0.007;
  vec3 c = vec3(
    texture2D(uTexture, t + vec2(0.0, decal)).r,
    texture2D(uTexture, t).g,
    texture2D(uTexture, t - vec2(0.0, decal)).b
  );

  // Coins arrondis, comme le cadre d'origine.
  vec2 p = (vUv - 0.5) * uTaille;
  vec2 q = abs(p) - (uTaille * 0.5 - uRayon);
  float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRayon;
  float coins = 1.0 - smoothstep(-0.75, 0.75, dist);

  // Découverte de bas en haut, derrière un bord qui ondule.
  float bord = 1.06 - uOuverture * 1.16 + sin(vUv.x * 8.0 + uTemps * 1.6) * 0.035 * (1.0 - uOuverture);
  float rideau = smoothstep(bord - 0.015, bord + 0.015, vUv.y);

  float a = coins * rideau;
  gl_FragColor = vec4(c * a, a);
}`;

type Photo = {
  img: HTMLImageElement;
  cadre: HTMLElement;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  u: Record<string, WebGLUniformLocation | null>;
  nbIndices: number;
  texture: WebGLTexture | null;
  rapportImage: number;
  pret: boolean;
  rayon: number;
  souris: [number, number];
  survol: number;
  survolCible: number;
  nettoyer: () => void;
};

const UNIFORMES = ["uVitesse", "uTexture", "uCouverture", "uTaille", "uRayon", "uZoom", "uDecalage", "uSouris", "uSurvol", "uTemps", "uOuverture"];

function compiler(gl: WebGLRenderingContext) {
  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = shader(gl.VERTEX_SHADER, SOMMETS);
  const fs = shader(gl.FRAGMENT_SHADER, PIXELS);
  if (!vs || !fs) return null;
  const programme = gl.createProgram()!;
  gl.attachShader(programme, vs);
  gl.attachShader(programme, fs);
  gl.linkProgram(programme);
  return gl.getProgramParameter(programme, gl.LINK_STATUS) ? programme : null;
}

/** Une grille de GRILLE × GRILLE carrés : assez de sommets pour que la photo se courbe sans angles. */
function grille(gl: WebGLRenderingContext, programme: WebGLProgram) {
  const sommets: number[] = [];
  for (let y = 0; y <= GRILLE; y++) for (let x = 0; x <= GRILLE; x++) sommets.push(x / GRILLE, y / GRILLE);
  const indices: number[] = [];
  for (let y = 0; y < GRILLE; y++)
    for (let x = 0; x < GRILLE; x++) {
      const i = y * (GRILLE + 1) + x;
      indices.push(i, i + 1, i + GRILLE + 1, i + 1, i + GRILLE + 2, i + GRILLE + 1);
    }
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sommets), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(programme, "aUv");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  return indices.length;
}

export default function OndesPhotos() {
  useEffect(() => {
    if (mouvementReduit()) return;
    const photos: Photo[] = [];
    let image = 0;
    let vitesse = 0;
    let dernierMouvement = 0;
    const debut = performance.now();

    const dessiner = (ph: Photo, r: DOMRect, temps: number, h: number) => {
      const { gl, u, canvas, cadre } = ph;
      const largeur = cadre.offsetWidth;
      const hauteur = cadre.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const lc = Math.round(largeur * (1 + 2 * MARGE_X) * dpr);
      const hc = Math.round(hauteur * (1 + 2 * MARGE_Y) * dpr);
      if (canvas.width !== lc || canvas.height !== hc) {
        canvas.width = lc;
        canvas.height = hc;
      }
      gl.viewport(0, 0, lc, hc);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Même mouvement que les autres photos du site : zoom arrière et glissement dans le cadre.
      const p = Math.max(0, Math.min(1, (h - r.top) / (h + r.height)));
      const zoom = 1.12 + 0.16 * (1 - Math.min(1, p * 1.8));
      const ouvert = Math.max(0, Math.min(1, (h - r.top) / (h * 0.45)));
      const rapportCadre = largeur / hauteur;
      const couverture = ph.rapportImage > rapportCadre ? [rapportCadre / ph.rapportImage, 1] : [1, ph.rapportImage / rapportCadre];

      ph.survol += (ph.survolCible - ph.survol) * 0.07;
      gl.uniform1f(u.uVitesse, vitesse);
      gl.uniform2f(u.uCouverture, couverture[0], couverture[1]);
      gl.uniform2f(u.uTaille, largeur, hauteur);
      gl.uniform1f(u.uRayon, ph.rayon);
      gl.uniform1f(u.uZoom, zoom);
      gl.uniform1f(u.uDecalage, -(p - 0.5) * 0.08);
      gl.uniform2f(u.uSouris, ph.souris[0], ph.souris[1]);
      gl.uniform1f(u.uSurvol, ph.survol);
      gl.uniform1f(u.uTemps, temps);
      gl.uniform1f(u.uOuverture, 1 - Math.pow(1 - ouvert, 2.2));
      gl.drawElements(gl.TRIANGLES, ph.nbIndices, gl.UNSIGNED_SHORT, 0);
      return ouvert < 1;
    };

    const boucle = (maintenant: number) => {
      const h = window.innerHeight;
      const temps = (maintenant - debut) / 1000;
      let encore = vitesse !== 0 || maintenant - dernierMouvement < 160;
      for (const ph of photos) {
        if (!ph.pret) continue;
        const r = ph.cadre.getBoundingClientRect();
        // Seules les photos à l'écran (ou presque) sont redessinées.
        if (r.bottom < -h * 0.15 || r.top > h * 1.15) continue;
        const enApparition = dessiner(ph, r, temps, h);
        if (ph.survol > 0.002 || ph.survolCible > 0 || enApparition) encore = true;
        if (!ph.cadre.classList.contains("est-onde")) ph.cadre.classList.add("est-onde");
      }
      image = encore ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => {
      dernierMouvement = performance.now();
      if (!image) image = requestAnimationFrame(boucle);
    };

    const preparer = (img: HTMLImageElement): Photo | null => {
      const cadre = img.parentElement;
      if (!cadre) return null;
      const canvas = document.createElement("canvas");
      canvas.className = "chv-onde";
      canvas.setAttribute("aria-hidden", "true");
      const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
      if (!gl) return null;
      const programme = compiler(gl);
      if (!programme) return null;
      gl.useProgram(programme);
      const nbIndices = grille(gl, programme);
      const u: Photo["u"] = {};
      for (const nom of UNIFORMES) u[nom] = gl.getUniformLocation(programme, nom);
      gl.uniform1i(u.uTexture, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      cadre.appendChild(canvas);

      const ph: Photo = {
        img,
        cadre,
        canvas,
        gl,
        u,
        nbIndices,
        texture: null,
        rapportImage: 1,
        pret: false,
        rayon: parseFloat(getComputedStyle(cadre).borderTopLeftRadius) || 0,
        souris: [0.5, 0.5],
        survol: 0,
        survolCible: 0,
        nettoyer: () => {},
      };

      // Le survol se lit sur la carte entière (le lien), les ondes partent du pointeur.
      const cible = (cadre.closest("a") as HTMLElement | null) ?? cadre;
      const placer = (e: PointerEvent) => {
        const r = cadre.getBoundingClientRect();
        ph.souris = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
      };
      const entrer = (e: PointerEvent) => {
        placer(e);
        ph.survolCible = e.pointerType === "mouse" ? 1 : 0;
        if (e.pointerType !== "mouse") ph.survol = 1; // au toucher : une onde qui s'éteint seule
        relancer();
      };
      const bouger = (e: PointerEvent) => {
        placer(e);
        relancer();
      };
      const sortir = () => {
        ph.survolCible = 0;
        relancer();
      };
      cible.addEventListener("pointerenter", entrer);
      cible.addEventListener("pointerdown", entrer);
      cible.addEventListener("pointermove", bouger);
      cible.addEventListener("pointerleave", sortir);
      const perdu = (e: Event) => {
        e.preventDefault();
        ph.pret = false;
        cadre.classList.remove("est-onde");
      };
      canvas.addEventListener("webglcontextlost", perdu);
      ph.nettoyer = () => {
        cible.removeEventListener("pointerenter", entrer);
        cible.removeEventListener("pointerdown", entrer);
        cible.removeEventListener("pointermove", bouger);
        cible.removeEventListener("pointerleave", sortir);
        canvas.removeEventListener("webglcontextlost", perdu);
        cadre.classList.remove("est-onde");
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.remove();
      };

      const source = new Image();
      source.decoding = "async";
      source.src = img.currentSrc || img.src;
      source
        .decode()
        .then(() => {
          const texture = gl.createTexture();
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
          ph.texture = texture;
          ph.rapportImage = source.naturalWidth / source.naturalHeight;
          ph.pret = true;
          relancer();
        })
        .catch(() => ph.nettoyer());
      return ph;
    };

    // Chaque photo n'est préparée (contexte WebGL, texture) qu'à l'approche de l'écran,
    // et libérée quand elle s'en éloigne : la photo d'origine reprend alors sa place.
    let enAttente = [...document.querySelectorAll<HTMLImageElement>("img[data-onde]")];
    const arreterApproche = abonner(() => {
      const h = window.innerHeight;
      for (let i = photos.length - 1; i >= 0; i--) {
        const r = photos[i].cadre.getBoundingClientRect();
        if (r.top > h * 2.6 || r.bottom < -h * 1.6) {
          photos[i].nettoyer();
          enAttente.push(photos[i].img);
          photos.splice(i, 1);
        }
      }
      if (!enAttente.length) return;
      enAttente = enAttente.filter((img) => {
        const r = (img.parentElement ?? img).getBoundingClientRect();
        if (r.top > h * 1.6 || r.bottom < -h * 0.6) return true;
        if (photos.length < MAX_PHOTOS) {
          const ph = preparer(img);
          if (ph) photos.push(ph);
        }
        return false;
      });
    });

    const arreterVitesse = ecouterVitesse((v) => {
      vitesse = v;
      relancer();
    });
    window.addEventListener("scroll", relancer, { passive: true });
    window.addEventListener("resize", relancer);

    return () => {
      arreterApproche();
      arreterVitesse();
      window.removeEventListener("scroll", relancer);
      window.removeEventListener("resize", relancer);
      if (image) cancelAnimationFrame(image);
      photos.forEach((ph) => ph.nettoyer());
    };
  }, []);

  return null;
}
