import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../store';

const vertexShader = `
  uniform float uTime;
  uniform float uDistortAmount;
  uniform float uDistortSpeed;
  uniform float uStripeIntensity;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  
  // Simplex 3D Noise 
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0; 
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    vec3 rawNormal = normal;

    // Organic modulations (wobble)
    float noise = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * uDistortSpeed));
    
    // Fluted Glass (Canelado) effect
    if (uStripeIntensity > 0.0) {
      float stripes = sin(pos.x * 40.0) * 0.05 * uStripeIntensity;
      pos += rawNormal * stripes;
      rawNormal.x += cos(pos.x * 40.0) * 0.5 * uStripeIntensity;
      rawNormal = normalize(rawNormal);
    }

    pos += rawNormal * noise * uDistortAmount;
    vNormal = rawNormal;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uColorT; // 0=vermelho, 0.5=azul, 1.0=verde-paleta

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  vec3 lerpColor(vec3 a, vec3 b, float t) {
    return a + (b - a) * clamp(t, 0.0, 1.0);
  }

  void main() {
    // ─── Paleta de Luz & Marca ───
    vec3 siteGold  = vec3(0.843, 0.702, 0.424); // #d7b36c
    vec3 siteIvory = vec3(0.984, 0.969, 0.929); // #fbf7ed
    vec3 siteAqua  = vec3(0.325, 0.718, 0.682); // #53b7ae
    vec3 siteTeal  = vec3(0.086, 0.247, 0.286); // #163f49

    // ─── FASE 1: Vermelho/Laranja/Magenta (Corpo Temido - Motion Graphic) ───
    vec3 redCore   = vec3(0.95, 0.22, 0.18); // vermelho vivo quente
    vec3 redShadow = vec3(0.48, 0.07, 0.45); // magenta profundo na sombra
    vec3 redLight  = vec3(1.0, 0.58, 0.22);  // âmbar/laranja luminoso

    // ─── FASE 2: Azul/Índigo/Ciano (Corpo Regulado) ───
    vec3 blueCore   = vec3(0.12, 0.42, 0.92); // azul elétrico
    vec3 blueShadow = vec3(0.24, 0.08, 0.55); // violeta/índigo
    vec3 blueLight  = vec3(0.25, 0.82, 0.98); // ciano radiante

    // ─── FASE 3: Verde/Aqua/Dourado (Corpo Habitado) ───
    vec3 greenCore   = siteAqua;
    vec3 greenShadow = siteTeal;
    vec3 greenLight  = siteGold;

    // Interpolação cromática conforme uColorT (0 → 0.5 → 1.0)
    vec3 cCore, cShadow, cLight;
    if (uColorT < 0.5) {
      float t = uColorT * 2.0;
      cCore   = lerpColor(redCore, blueCore, t);
      cShadow = lerpColor(redShadow, blueShadow, t);
      cLight  = lerpColor(redLight, blueLight, t);
    } else {
      float t = (uColorT - 0.5) * 2.0;
      cCore   = lerpColor(blueCore, greenCore, t);
      cShadow = lerpColor(blueShadow, greenShadow, t);
      cLight  = lerpColor(blueLight, greenLight, t);
    }

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = dot(viewDirection, normalize(vNormal));
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);

    // Efeito esférico 3D com iluminação assimétrica (Motion Graphic)
    float lightFactor = dot(normalize(vNormal), normalize(vec3(-0.6, 0.7, 0.8)));
    lightFactor = lightFactor * 0.5 + 0.5;

    // Mistura de cor base: sombra profunda até núcleo iluminado
    vec3 color = lerpColor(cShadow, cCore, lightFactor);
    color = lerpColor(color, cLight, pow(lightFactor, 2.5) * 0.7);

    // Glow e fresnel volumétrico
    float rim = pow(fresnel, 2.8);
    color = lerpColor(color, cLight * 1.15, rim * 0.65);

    // Destaque perolado na borda extrema
    float edge = pow(fresnel, 4.5);
    color = lerpColor(color, siteIvory, edge * 0.85);

    // Opacidade: presença delicada e translúcida
    float alpha = mix(0.30, 0.70, fresnel) * uOpacity;

    gl_FragColor = vec4(color, alpha);
  }
`;

export const BubbleGraphic: React.FC = () => {
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const mesh3Ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 128), []);

  const createMaterial = () => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uDistortAmount: { value: 0.08 },
      uDistortSpeed: { value: 0.1 },
      uStripeIntensity: { value: 0.0 },
      uOpacity: { value: 1.0 },
      uColorT: { value: 1.0 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const material1 = useMemo(createMaterial, []);
  const material2 = useMemo(createMaterial, []);
  const material3 = useMemo(createMaterial, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scene = scrollState.currentScene;
    const p4 = Math.max(0, Math.min(1, scrollState.scene4Progress)); // 0→1

    // ── Defaults ──
    let targetScaleX = 0.01, targetScaleY = 0.01, targetScaleZ = 0.01;
    let targetDistort = 0.08, targetSpeed = 0.1, targetStripe = 0.0;
    let targetOpacity1 = 1.0;
    let targetOpacitySplit = 0.0;
    let targetColorT = 1.0;
    let tX1 = 0, tY1 = 0;
    let tX2 = 0, tY2 = 0;
    let tX3 = 0, tY3 = 0;

    const isTrajetoria = scene === 4 || (p4 > 0.005 && p4 < 0.995);

    if (isTrajetoria) {
      // ── Scene 4 (Trajetória): ÚNICO local onde a bubble aparece ──
      tX1 = 0;
      tY1 = 0;

      // Tamanho: presente e visível desde o 1º card (2.2) até o último (3.0), pulsando suavemente
      const baseScale = 2.2 + p4 * 0.8;
      const pulse = Math.sin(t * 2.0) * 0.1;
      targetScaleX = targetScaleY = targetScaleZ = baseScale + pulse;

      targetDistort = 0.08 + p4 * 0.05;
      targetSpeed = 0.1;

      // Opacidade 50%
      targetOpacity1 = 0.50;
      // Começa 0.0 (Vermelho no Corpo Temido) e evolui até 1.0 (Verde/Azul no Corpo Habitado)
      targetColorT = p4;
    } else if (scene === 3) {
      // Método: invisível, pré-carrega posição central e cor vermelha para entrar no Corpo Temido
      tX1 = 0;
      tY1 = 0;
      targetScaleX = targetScaleY = targetScaleZ = 2.2;
      targetOpacity1 = 0.0;
      targetColorT = 0.0; // VERMELHO
    } else if (scene >= 5) {
      // Síntese / Contato: invisível, pré-carrega cor verde (1.0) para entrar no Corpo Habitado ao voltar no modo reverso
      tX1 = 0;
      tY1 = 0;
      targetScaleX = targetScaleY = targetScaleZ = 3.0;
      targetOpacity1 = 0.0;
      targetColorT = 1.0; // VERDE
    } else {
      // Início / Promessa: totalmente invisível
      tX1 = 0;
      tY1 = 0;
      targetScaleX = targetScaleY = targetScaleZ = 0.001;
      targetOpacity1 = 0.0;
      targetOpacitySplit = 0.0;
      targetColorT = 0.0;
    }

    // Garante vermelho imediato no primeiro card ao descer e verde imediato no último card ao subir
    if (isTrajetoria && p4 < 0.03 && material1.uniforms.uColorT.value > 0.05 && scene === 4) {
      material1.uniforms.uColorT.value = 0.0;
    } else if (isTrajetoria && p4 > 0.97 && material1.uniforms.uColorT.value < 0.95) {
      material1.uniforms.uColorT.value = 1.0;
    } else {
      material1.uniforms.uColorT.value = THREE.MathUtils.lerp(
        material1.uniforms.uColorT.value,
        targetColorT,
        0.08
      );
    }

    // ── Aplica uniforms ──
    material1.uniforms.uTime.value = t;
    material1.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      material1.uniforms.uOpacity.value,
      targetOpacity1,
      0.08
    );
    material1.uniforms.uDistortAmount.value = THREE.MathUtils.lerp(material1.uniforms.uDistortAmount.value, targetDistort, 0.05);
    material1.uniforms.uDistortSpeed.value  = THREE.MathUtils.lerp(material1.uniforms.uDistortSpeed.value,  targetSpeed,   0.05);
    material1.uniforms.uStripeIntensity.value = THREE.MathUtils.lerp(material1.uniforms.uStripeIntensity.value, targetStripe, 0.05);

    mesh1Ref.current!.scale.x = THREE.MathUtils.lerp(mesh1Ref.current!.scale.x, targetScaleX, 0.04);
    mesh1Ref.current!.scale.y = THREE.MathUtils.lerp(mesh1Ref.current!.scale.y, targetScaleY, 0.04);
    mesh1Ref.current!.scale.z = THREE.MathUtils.lerp(mesh1Ref.current!.scale.z, targetScaleZ, 0.04);
    mesh1Ref.current!.position.x = THREE.MathUtils.lerp(mesh1Ref.current!.position.x, tX1, 0.035);
    mesh1Ref.current!.position.y = THREE.MathUtils.lerp(mesh1Ref.current!.position.y, tY1, 0.035);

    // Oculta completamente moléculas secundárias (nunca são usadas)
    [material2, material3].forEach(mat => {
      mat.uniforms.uOpacity.value = 0.0;
    });
    if (mesh2Ref.current) mesh2Ref.current.visible = false;
    if (mesh3Ref.current) mesh3Ref.current.visible = false;
  });

  return (
    <group position={[0, 0, -2]}>
      <mesh ref={mesh1Ref} geometry={geometry} material={material1} />
    </group>
  );
};
