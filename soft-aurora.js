(() => {
  "use strict";

  const SETTINGS = Object.freeze({
    speed: 1.2,
    scale: 1.2,
    brightness: 1.2,
    color1: "#9700ff",
    color2: "#5200ff",
    noiseFrequency: 4,
    noiseAmplitude: 1.5,
    bandHeight: 0.5,
    bandAnchorSelector: ".hero h1",
    bandSpread: 0.9,
    octaveDecay: 0.15,
    layerOffset: 0,
    colorSpeed: 1.1,
    enableMouseInteraction: true,
    mouseInfluence: 0.1
  });

  const VERTEX_SHADER = `
    attribute vec2 position;

    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const FRAGMENT_SHADER = `
    precision highp float;

    uniform float uTime;
    uniform vec3 uResolution;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uBrightness;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uNoiseFreq;
    uniform float uNoiseAmp;
    uniform float uBandHeight;
    uniform float uBandSpread;
    uniform float uOctaveDecay;
    uniform float uLayerOffset;
    uniform float uColorSpeed;
    uniform vec2 uMouse;
    uniform float uMouseInfluence;
    uniform bool uEnableMouse;

    #define TAU 6.28318

    vec3 gradientHash(vec3 p) {
      p = vec3(
        dot(p, vec3(127.1, 311.7, 234.6)),
        dot(p, vec3(269.5, 183.3, 198.3)),
        dot(p, vec3(169.5, 283.3, 156.9))
      );
      vec3 h = fract(sin(p) * 43758.5453123);
      float phi = acos(2.0 * h.x - 1.0);
      float theta = TAU * h.y;
      return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
    }

    float quinticSmooth(float t) {
      float t2 = t * t;
      float t3 = t * t2;
      return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;
    }

    vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(TAU * (c * t + d));
    }

    float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
      float x = px * frequency;
      float y = py * frequency;

      float fx = floor(x);
      float fy = floor(y);
      float fz = floor(pz);
      float cx = ceil(x);
      float cy = ceil(y);
      float cz = ceil(pz);

      vec3 g000 = gradientHash(vec3(fx, fy, fz));
      vec3 g100 = gradientHash(vec3(cx, fy, fz));
      vec3 g010 = gradientHash(vec3(fx, cy, fz));
      vec3 g110 = gradientHash(vec3(cx, cy, fz));
      vec3 g001 = gradientHash(vec3(fx, fy, cz));
      vec3 g101 = gradientHash(vec3(cx, fy, cz));
      vec3 g011 = gradientHash(vec3(fx, cy, cz));
      vec3 g111 = gradientHash(vec3(cx, cy, cz));

      float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
      float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
      float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
      float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
      float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
      float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));
      float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
      float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));

      float sx = quinticSmooth(x - fx);
      float sy = quinticSmooth(y - fy);
      float sz = quinticSmooth(pz - fz);

      float lx00 = mix(d000, d100, sx);
      float lx10 = mix(d010, d110, sx);
      float lx01 = mix(d001, d101, sx);
      float lx11 = mix(d011, d111, sx);
      float ly0 = mix(lx00, lx10, sy);
      float ly1 = mix(lx01, lx11, sy);

      return amplitude * mix(ly0, ly1, sz);
    }

    float auroraGlow(float t, vec2 shift) {
      vec2 uv = gl_FragCoord.xy / uResolution.y;
      uv += shift;

      float noiseVal = 0.0;
      float freq = uNoiseFreq;
      float amp = uNoiseAmp;
      vec2 samplePos = uv * uScale;

      for (float i = 0.0; i < 3.0; i += 1.0) {
        noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);
        amp *= uOctaveDecay;
        freq *= 2.0;
      }

      float yBand = uv.y * 10.0 - uBandHeight * 10.0;
      return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      float t = uSpeed * 0.4 * uTime;

      vec2 shift = vec2(0.0);
      if (uEnableMouse) {
        shift = (uMouse - 0.5) * uMouseInfluence;
      }

      vec3 col = vec3(0.0);
      col += 0.99 * auroraGlow(t, shift)
        * cosineGradient(
          uv.x + uTime * uSpeed * 0.2 * uColorSpeed,
          vec3(0.5),
          vec3(0.5),
          vec3(1.0),
          vec3(0.3, 0.20, 0.20)
        )
        * uColor1;
      col += 0.99 * auroraGlow(t + uLayerOffset, shift)
        * cosineGradient(
          uv.x + uTime * uSpeed * 0.1 * uColorSpeed,
          vec3(0.5),
          vec3(0.5),
          vec3(2.0, 1.0, 0.0),
          vec3(0.5, 0.20, 0.25)
        )
        * uColor2;

      col *= uBrightness;
      float alpha = clamp(length(col), 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  function hexToVec3(hex) {
    const normalized = hex.replace("#", "");
    return [
      Number.parseInt(normalized.slice(0, 2), 16) / 255,
      Number.parseInt(normalized.slice(2, 4), 16) / 255,
      Number.parseInt(normalized.slice(4, 6), 16) / 255
    ];
  }

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || "Unknown shader compile error";
      gl.deleteShader(shader);
      throw new Error(message);
    }

    return shader;
  }

  function createProgram(gl) {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || "Unknown shader link error";
      gl.deleteProgram(program);
      throw new Error(message);
    }

    return program;
  }

  function initialize() {
    const container = document.getElementById("softAurora");
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance"
    });

    if (!gl) {
      container.classList.add("is-fallback");
      return;
    }

    let program;
    try {
      program = createProgram(gl);
    } catch (error) {
      console.warn("Soft Aurora initialization failed:", error);
      container.classList.add("is-fallback");
      canvas.remove();
      return;
    }

    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 0);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {};
    [
      "uTime",
      "uResolution",
      "uSpeed",
      "uScale",
      "uBrightness",
      "uColor1",
      "uColor2",
      "uNoiseFreq",
      "uNoiseAmp",
      "uBandHeight",
      "uBandSpread",
      "uOctaveDecay",
      "uLayerOffset",
      "uColorSpeed",
      "uMouse",
      "uMouseInfluence",
      "uEnableMouse"
    ].forEach((name) => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });

    gl.uniform1f(uniforms.uSpeed, SETTINGS.speed);
    gl.uniform1f(uniforms.uScale, SETTINGS.scale);
    gl.uniform1f(uniforms.uBrightness, SETTINGS.brightness);
    gl.uniform3fv(uniforms.uColor1, hexToVec3(SETTINGS.color1));
    gl.uniform3fv(uniforms.uColor2, hexToVec3(SETTINGS.color2));
    gl.uniform1f(uniforms.uNoiseFreq, SETTINGS.noiseFrequency);
    gl.uniform1f(uniforms.uNoiseAmp, SETTINGS.noiseAmplitude);
    gl.uniform1f(uniforms.uBandSpread, SETTINGS.bandSpread);
    gl.uniform1f(uniforms.uOctaveDecay, SETTINGS.octaveDecay);
    gl.uniform1f(uniforms.uLayerOffset, SETTINGS.layerOffset);
    gl.uniform1f(uniforms.uColorSpeed, SETTINGS.colorSpeed);
    gl.uniform1f(uniforms.uMouseInfluence, SETTINGS.mouseInfluence);
    gl.uniform1i(uniforms.uEnableMouse, SETTINGS.enableMouseInteraction ? 1 : 0);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    const startedAt = performance.now();
    let animationFrameId = 0;

    function syncBandPosition() {
      const anchor = document.querySelector(SETTINGS.bandAnchorSelector);
      const containerRect = container.getBoundingClientRect();
      let bandHeight = SETTINGS.bandHeight;

      if (anchor && containerRect.height > 0) {
        const anchorRect = anchor.getBoundingClientRect();
        const anchorCenterFromTop =
          (anchorRect.top + anchorRect.bottom) * 0.5 - containerRect.top;
        bandHeight = 1 - anchorCenterFromTop / containerRect.height;
      }

      bandHeight = Math.min(0.95, Math.max(0.05, bandHeight));
      gl.uniform1f(uniforms.uBandHeight, bandHeight);
      container.dataset.bandHeight = bandHeight.toFixed(3);
    }

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.round(container.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(container.clientHeight * pixelRatio));
      const sizeChanged = canvas.width !== width || canvas.height !== height;

      if (sizeChanged) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform3f(uniforms.uResolution, width, height, width / height);
        syncBandPosition();
      }
    }

    function handlePointerMove(event) {
      targetMouse[0] = event.clientX / Math.max(window.innerWidth, 1);
      targetMouse[1] = 1 - event.clientY / Math.max(window.innerHeight, 1);
    }

    function handlePointerLeave() {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    }

    function render(now) {
      resize();
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);

      gl.uniform1f(uniforms.uTime, (now - startedAt) * 0.001);
      gl.uniform2f(uniforms.uMouse, currentMouse[0], currentMouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", syncBandPosition, { passive: true });
    if (SETTINGS.enableMouseInteraction && !reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    }

    resize();
    document.fonts?.ready.then(syncBandPosition);
    animationFrameId = window.requestAnimationFrame(render);

    window.addEventListener("pagehide", () => {
      window.cancelAnimationFrame(animationFrameId);
    }, { once: true });
  }

  window.AssetFlowSoftAuroraSettings = SETTINGS;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
