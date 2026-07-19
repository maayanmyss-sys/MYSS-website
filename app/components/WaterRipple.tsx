"use client";

import { useEffect, useRef, useState } from "react";

const SENTENCE = "Your visuals are the clearest reflection of your brand.";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const VERT = `#version 300 es
in vec2 p; out vec2 v_uv;
void main(){ v_uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0., 1.); }`;

/* Wave-equation step over an RG float field: R = height, G = velocity.
   A gaussian "drop" is injected wherever the pointer moved this frame. */
const SIM = `#version 300 es
precision highp float;
in vec2 v_uv; out vec4 O;
uniform sampler2D u_prev;
uniform vec2 u_texel;
uniform vec2 u_drop;      // uv of injection, x < 0 disables
uniform float u_dropRadius;
uniform float u_dropStrength;
void main(){
  vec4 c = texture(u_prev, v_uv);
  float l = texture(u_prev, v_uv - vec2(u_texel.x, 0.)).r;
  float r = texture(u_prev, v_uv + vec2(u_texel.x, 0.)).r;
  float d = texture(u_prev, v_uv - vec2(0., u_texel.y)).r;
  float u = texture(u_prev, v_uv + vec2(0., u_texel.y)).r;

  float lap = (l + r + u + d) * 0.25 - c.r;
  float vel = (c.g + lap * 1.9) * 0.986;
  float h = (c.r + vel) * 0.994;

  if (u_drop.x >= 0.) {
    float g = exp(-dot(v_uv - u_drop, v_uv - u_drop) / (u_dropRadius * u_dropRadius));
    h += u_dropStrength * g;
  }

  /* soft absorbing borders so waves don't slosh off the frame edges */
  float edge = smoothstep(0., 0.02, v_uv.x) * smoothstep(1., 0.98, v_uv.x)
             * smoothstep(0., 0.03, v_uv.y) * smoothstep(1., 0.97, v_uv.y);
  h *= mix(0.94, 1.0, edge);

  O = vec4(h, vel, 0., 1.);
}`;

/* Composite: refract the film and the type through the height field,
   add a directional glint on the wave crests. */
const DRAW = `#version 300 es
precision highp float;
in vec2 v_uv; out vec4 O;
uniform sampler2D u_video;
uniform sampler2D u_text;
uniform sampler2D u_sim;
uniform vec2 u_res;
uniform vec2 u_videoSize;
uniform vec2 u_texel;
void main(){
  float hl = texture(u_sim, v_uv - vec2(u_texel.x, 0.)).r;
  float hr = texture(u_sim, v_uv + vec2(u_texel.x, 0.)).r;
  float hd = texture(u_sim, v_uv - vec2(0., u_texel.y)).r;
  float hu = texture(u_sim, v_uv + vec2(0., u_texel.y)).r;
  vec2 n = vec2(hr - hl, hu - hd);

  /* cover-fit the film to the canvas */
  float ca = u_res.x / u_res.y;
  float va = u_videoSize.x / u_videoSize.y;
  vec2 uv = v_uv;
  if (ca > va) { float s = va / ca; uv.y = uv.y * s + (1. - s) * 0.5; }
  else         { float s = ca / va; uv.x = uv.x * s + (1. - s) * 0.5; }

  vec2 flip = vec2(uv.x, 1. - uv.y);
  vec3 film = texture(u_video, flip + n * 0.55).rgb;

  /* faint chromatic split on strong ripples keeps it liquid, not rubbery */
  float mag = length(n);
  if (mag > 0.0015) {
    film.r = texture(u_video, flip + n * 0.62).r;
    film.b = texture(u_video, flip + n * 0.48).b;
  }

  /* crest glint */
  vec3 nrm = normalize(vec3(-n * 6.0, 1.0));
  float spec = pow(clamp(dot(nrm, normalize(vec3(0.25, 0.45, 0.85))), 0., 1.), 60.0);
  film += spec * mag * 46.0;

  /* the sentence refracts a touch harder than the water so it visibly bends */
  vec2 tuv = vec2(v_uv.x, 1. - v_uv.y) + n * 0.9;
  vec4 type = texture(u_text, tuv);
  vec3 ink = vec3(0.102, 0.102, 0.094);
  O = vec4(mix(film, ink, type.a * 0.92), 1.0);
}`;

/* ------------------------------------------------------------------ */

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}
function program(gl: WebGL2RenderingContext, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(p) ?? "link");
  return p;
}

/**
 * Interactive reflection pool.
 *
 * The film, the sentence and the cursor share one WebGL surface: a wave
 * simulation runs in a ping-pong float FBO, and the composite pass refracts
 * both the video texture and the canvas-rendered type through the height
 * field, so moving the mouse sends real, propagating ripples through water
 * and words alike. The sentence itself is revealed word by word as the
 * section scrolls.
 */
export default function WaterRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTextRef = useRef<HTMLParagraphElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!container || !canvas || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl2", { antialias: false });
    const floatOk = gl && gl.getExtension("EXT_color_buffer_float");
    if (!gl || !floatOk || reduced) {
      setFallback(true);
      return;
    }

    /* ---------- programs & quad ---------- */
    const simProg = program(gl, SIM);
    const drawProg = program(gl, DRAW);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    for (const p of [simProg, drawProg]) {
      const loc = gl.getAttribLocation(p, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    }

    /* ---------- sim ping-pong targets ---------- */
    const SW = 384, SH = 216;
    const mkSim = () => {
      const t = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, SW, SH, 0, gl.RG, gl.HALF_FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const f = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return { t, f };
    };
    let simA = mkSim();
    let simB = mkSim();

    /* ---------- video + text textures ---------- */
    const mkTex = () => {
      const t = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const videoTex = mkTex();
    gl.bindTexture(gl.TEXTURE_2D, videoTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([200, 205, 210, 255, 200, 205, 210, 255, 200, 205, 210, 255, 200, 205, 210, 255]));
    const textTex = mkTex();

    /* ---------- type layer (offscreen 2d canvas) ---------- */
    const textCanvas = document.createElement("canvas");
    const tctx = textCanvas.getContext("2d")!;
    const words = SENTENCE.split(" ");
    let revealDrawn = -1;
    let fontsReady = false;
    document.fonts.load('italic 300 80px "Cormorant Garamond"').then(() => {
      void document.fonts.ready.then(() => {
        fontsReady = true;
        revealDrawn = -1; // force redraw
      });
    });

    const drawText = (reveal: number) => {
      const W = textCanvas.width, H = textCanvas.height;
      tctx.clearRect(0, 0, W, H);
      const size = Math.min(W * 0.072, H * 0.15);
      tctx.font = `italic 300 ${size}px "Cormorant Garamond", serif`;
      tctx.textBaseline = "alphabetic";

      /* wrap into lines no wider than 76% of the surface */
      const maxW = W * 0.76;
      const lines: string[][] = [[]];
      for (const w of words) {
        const cur = lines[lines.length - 1];
        if (cur.length && tctx.measureText([...cur, w].join(" ")).width > maxW)
          lines.push([w]);
        else cur.push(w);
      }

      const lineH = size * 1.24;
      const blockH = lines.length * lineH;
      let y = (H - blockH) / 2 + size * 0.9;
      let wi = 0;
      const n = words.length;
      for (const line of lines) {
        const lineW = tctx.measureText(line.join(" ")).width;
        let x = (W - lineW) / 2;
        const spaceW = tctx.measureText(" ").width;
        for (const w of line) {
          /* each word fades in across its own slice of the reveal window */
          const start = (wi / n) * 0.82;
          const a = clamp01((reveal - start) / 0.2);
          if (a > 0) {
            tctx.globalAlpha = a;
            tctx.fillStyle = "#101010";
            tctx.fillText(w, x, y + (1 - a) * size * 0.18);
          }
          x += tctx.measureText(w).width + spaceW;
          wi++;
        }
        y += lineH;
      }
      tctx.globalAlpha = 1;
    };

    /* ---------- sizing ---------- */
    let cw = 0, ch = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      cw = Math.round(rect.width * dpr);
      ch = Math.round(rect.height * dpr);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
        textCanvas.width = cw;
        textCanvas.height = ch;
        revealDrawn = -1;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---------- pointer → drops ---------- */
    let drop = { x: -1, y: -1, r: 0.028, s: 0 };
    let lastPX = 0, lastPY = 0, lastPT = 0;
    const inject = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1 - (clientY - rect.top) / rect.height;
      const now = performance.now();
      const dt = Math.max(now - lastPT, 8);
      const dx = clientX - lastPX, dy = clientY - lastPY;
      const speed = Math.hypot(dx, dy) / dt; // px per ms
      lastPX = clientX; lastPY = clientY; lastPT = now;
      const s = Math.min(speed * 0.55, 0.9);
      if (s < 0.01) return;
      drop = { x, y, r: 0.022 + Math.min(speed * 0.01, 0.02), s: s * 0.24 };
    };
    const onMove = (e: PointerEvent) => inject(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) inject(t.clientX, t.clientY);
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: true });

    /* ---------- scroll reveal ---------- */
    let reveal = 0;
    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = clamp01(-container.getBoundingClientRect().top / scrollable);
      reveal = clamp01((p - 0.1) / 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- visibility gate ---------- */
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0 },
    );
    io.observe(container);

    /* ---------- ambient drops keep the pool alive ---------- */
    let nextAmbient = performance.now() + 1800;

    /* ---------- uniforms ---------- */
    gl.useProgram(simProg);
    const sPrev = gl.getUniformLocation(simProg, "u_prev");
    const sTexel = gl.getUniformLocation(simProg, "u_texel");
    const sDrop = gl.getUniformLocation(simProg, "u_drop");
    const sDropR = gl.getUniformLocation(simProg, "u_dropRadius");
    const sDropS = gl.getUniformLocation(simProg, "u_dropStrength");
    gl.useProgram(drawProg);
    const dVideo = gl.getUniformLocation(drawProg, "u_video");
    const dText = gl.getUniformLocation(drawProg, "u_text");
    const dSim = gl.getUniformLocation(drawProg, "u_sim");
    const dRes = gl.getUniformLocation(drawProg, "u_res");
    const dVSize = gl.getUniformLocation(drawProg, "u_videoSize");
    const dTexel = gl.getUniformLocation(drawProg, "u_texel");

    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;

      const now = performance.now();
      if (now > nextAmbient) {
        nextAmbient = now + 2200 + Math.random() * 2600;
        if (drop.s === 0)
          drop = { x: 0.15 + Math.random() * 0.7, y: 0.2 + Math.random() * 0.6, r: 0.05, s: 0.045 };
      }

      /* refresh dynamic textures */
      if (video.readyState >= 2) {
        gl.bindTexture(gl.TEXTURE_2D, videoTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      }
      if (fontsReady && Math.abs(reveal - revealDrawn) > 0.004) {
        drawText(reveal);
        revealDrawn = reveal;
        gl.bindTexture(gl.TEXTURE_2D, textTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
      }

      /* two sim steps per frame = faster wave propagation */
      gl.useProgram(simProg);
      gl.viewport(0, 0, SW, SH);
      gl.uniform2f(sTexel, 1 / SW, 1 / SH);
      for (let i = 0; i < 2; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, simB.f);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, simA.t);
        gl.uniform1i(sPrev, 0);
        if (i === 0 && drop.s > 0) {
          gl.uniform2f(sDrop, drop.x, drop.y);
          gl.uniform1f(sDropR, drop.r);
          gl.uniform1f(sDropS, drop.s);
          drop = { ...drop, s: 0, x: -1 };
        } else {
          gl.uniform2f(sDrop, -1, -1);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        [simA, simB] = [simB, simA];
      }

      /* composite */
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, cw, ch);
      gl.useProgram(drawProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, videoTex);
      gl.uniform1i(dVideo, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textTex);
      gl.uniform1i(dText, 1);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, simA.t);
      gl.uniform1i(dSim, 2);
      gl.uniform2f(dRes, cw, ch);
      gl.uniform2f(dVSize, video.videoWidth || 16, video.videoHeight || 9);
      gl.uniform2f(dTexel, 1 / SW, 1 / SH);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  /* CSS-only reveal driver for the fallback rendering */
  useEffect(() => {
    if (!fallback) return;
    const container = containerRef.current;
    const p = fallbackTextRef.current;
    if (!container || !p) return;
    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const prog = clamp01(-container.getBoundingClientRect().top / scrollable);
      p.style.opacity = String(clamp01((prog - 0.1) / 0.5));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fallback]);

  return (
    <section
      ref={containerRef}
      aria-label="Your visuals are the clearest reflection of your brand."
      className="relative h-[240vh] bg-mist"
      data-water-mode={fallback ? "fallback" : "gl"}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          poster="/water-poster.jpg"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          crossOrigin="anonymous"
          className={`h-full w-full object-cover ${fallback ? "" : "invisible"}`}
        >
          <source src="/water.webm" type="video/webm" />
          <source src="/water.mp4" type="video/mp4" />
        </video>
        {fallback ? (
          <p
            ref={fallbackTextRef}
            className="absolute inset-0 flex items-center justify-center px-[12%] text-center font-display text-4xl font-light italic text-ink opacity-0 transition-opacity duration-700 md:text-6xl"
          >
            {SENTENCE}
          </p>
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />
        )}
        <p className="label absolute bottom-8 left-1/2 -translate-x-1/2 mix-blend-multiply">
          Move through the water
        </p>
      </div>
    </section>
  );
}
