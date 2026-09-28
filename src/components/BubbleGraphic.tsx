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
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    // ─── NEW PALETTE (Teal, Ivory, Gold) ───
    vec3 cBase = vec3(0.086, 0.247, 0.286); // #163f49 (deep-teal)
    vec3 cMid = vec3(0.325, 0.718, 0.682);  // #53b7ae (aqua)
    vec3 cGlow = vec3(0.843, 0.702, 0.424); // #d7b36c (warm gold)
    vec3 cHighlight = vec3(0.984, 0.969, 0.929); // #fbf7ed (soft ivory)

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = dot(viewDirection, normalize(vNormal));
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    
    // Smooth transition across the surface
    vec3 color = mix(cBase, cMid, vUv.x * 1.5);
    
    // Inner bubble transparency / golden iridescent edge
    float edgeGlow = pow(fresnel, 2.8);
    color = mix(color, cGlow, edgeGlow * 0.85);
    
    // Add subtle bright highlight at the very extreme edges
    float extremeEdge = pow(fresnel, 4.5);
    color = mix(color, cHighlight, extremeEdge);

    // Keep center highly transparent, edges more opaque
    float alpha = mix(0.15, 0.75, fresnel) * uOpacity;

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
    
    // Targets
    let targetScaleX = 1.0;
    let targetScaleY = 1.0;
    let targetScaleZ = 1.0;
    let targetDistort = 0.08;
    let targetSpeed = 0.1;
    let targetStripe = 0.0;
    let targetOpacitySplit = 0.0;
    
    let tX1 = 0, tY1 = 0;
    let tX2 = 0, tY2 = 0;
    let tX3 = 0, tY3 = 0;

    if (scene === 1) {
      // Scene 1: Oculto/Neutro (hero agora tem background estático opaco)
      targetScaleX = 3.5; targetScaleY = 3.5; targetScaleZ = 3.5;
      tX1 = 0; tY1 = 0;
      targetDistort = 0.08; targetSpeed = 0.1;
    } else if (scene === 2) {
      // Scene 2: Flutua para canto inferior esquerdo
      targetScaleX = 3.0; targetScaleY = 3.0; targetScaleZ = 3.0;
      tX1 = -1.8; tY1 = -1.0;
      targetDistort = 0.1; targetSpeed = 0.1;
    } else if (scene === 3) {
      // Scene 3: Flutua para canto superior direito
      targetScaleX = 3.0; targetScaleY = 3.0; targetScaleZ = 3.0;
      tX1 = 1.8; tY1 = 1.0;
      targetDistort = 0.1;
    } else if (scene === 4) {
      // Scene 4: Neutro oculto (coberto pela Trajetória)
      targetScaleX = 1.0; targetScaleY = 1.0; targetScaleZ = 1.0;
      tX1 = 0; tY1 = 0;
    } else {
      // Scene 5: Divide em 3 moleculas (Síntese)
      targetScaleX = 2.0; targetScaleY = 2.0; targetScaleZ = 2.0;
      targetOpacitySplit = 1.0;
      
      let splitDist = 2.8 + Math.sin(t * 0.5) * 0.5; 
      tX1 = 0; tY1 = splitDist;
      tX2 = -splitDist * 0.866; tY2 = -splitDist * 0.5;
      tX3 = splitDist * 0.866;  tY3 = -splitDist * 0.5;
    }

    // Apply uniforms to Main Mesh
    material1.uniforms.uTime.value = t;
    material1.uniforms.uDistortAmount.value = THREE.MathUtils.lerp(material1.uniforms.uDistortAmount.value, targetDistort, 0.05);
    material1.uniforms.uDistortSpeed.value = THREE.MathUtils.lerp(material1.uniforms.uDistortSpeed.value, targetSpeed, 0.05);
    material1.uniforms.uStripeIntensity.value = THREE.MathUtils.lerp(material1.uniforms.uStripeIntensity.value, targetStripe, 0.05);
    
    // Pulse logic
    let pulse = Math.sin(t * 1.5) * 0.05;
    
    mesh1Ref.current!.scale.x = THREE.MathUtils.lerp(mesh1Ref.current!.scale.x, targetScaleX + pulse, 0.05);
    mesh1Ref.current!.scale.y = THREE.MathUtils.lerp(mesh1Ref.current!.scale.y, targetScaleY + pulse, 0.05);
    mesh1Ref.current!.scale.z = THREE.MathUtils.lerp(mesh1Ref.current!.scale.z, targetScaleZ + pulse, 0.05);
    
    mesh1Ref.current!.position.x = THREE.MathUtils.lerp(mesh1Ref.current!.position.x, tX1, 0.03);
    mesh1Ref.current!.position.y = THREE.MathUtils.lerp(mesh1Ref.current!.position.y, tY1, 0.03);

    // Apply to Split Meshes
    [material2, material3].forEach(mat => {
      mat.uniforms.uTime.value = t;
      mat.uniforms.uDistortAmount.value = material1.uniforms.uDistortAmount.value;
      mat.uniforms.uDistortSpeed.value = material1.uniforms.uDistortSpeed.value;
      mat.uniforms.uStripeIntensity.value = material1.uniforms.uStripeIntensity.value;
      mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, targetOpacitySplit, 0.05);
    });

    mesh2Ref.current!.scale.copy(mesh1Ref.current!.scale);
    mesh3Ref.current!.scale.copy(mesh1Ref.current!.scale);

    mesh2Ref.current!.position.x = THREE.MathUtils.lerp(mesh2Ref.current!.position.x, tX2, 0.03);
    mesh2Ref.current!.position.y = THREE.MathUtils.lerp(mesh2Ref.current!.position.y, tY2, 0.03);
    
    mesh3Ref.current!.position.x = THREE.MathUtils.lerp(mesh3Ref.current!.position.x, tX3, 0.03);
    mesh3Ref.current!.position.y = THREE.MathUtils.lerp(mesh3Ref.current!.position.y, tY3, 0.03);
  });

  return (
    <group position={[0, 0, -2]}>
      <mesh ref={mesh1Ref} geometry={geometry} material={material1} />
      <mesh ref={mesh2Ref} geometry={geometry} material={material2} />
      <mesh ref={mesh3Ref} geometry={geometry} material={material3} />
    </group>
  );
};
