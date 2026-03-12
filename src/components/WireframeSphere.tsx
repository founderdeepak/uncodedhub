import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WireframeSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4.0; // Moved slightly closer since we only have the inner sphere

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // 2. THE GEOMETRY: Overall size increased by 30% (Radius from 1.0 to 1.3)
    const innerGeo = new THREE.SphereGeometry(1.3, isMobile ? 6 : 10, isMobile ? 4 : 6);

    // 3. The Gradient Shader for Lines
    const lineMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color("#2196f3") }, // Blue
            color2: { value: new THREE.Color("#b145e9") }  // Purple
        },
        vertexShader: `
            varying vec3 vPos;
            void main() {
                vPos = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vPos;
            void main() {
                // Gradient scaled to match the new 1.3 radius
                float mixValue = (vPos.y + 1.3) / 2.6; 
                gl_FragColor = vec4(mix(color1, color2, mixValue), 0.85); 
            }
        `,
        wireframe: true,
        transparent: true
    });

    // 4. The Mathematical Shader for Perfect Circular Nodes
    const pointMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color("#2196f3") },
            color2: { value: new THREE.Color("#b145e9") }
        },
        vertexShader: `
            varying vec3 vPos;
            void main() {
                vPos = position;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                // Node size reduced by ~45% (from 25.0 to 13.75)
                gl_PointSize = 13.75 * (5.0 / -mvPosition.z); 
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vPos;
            void main() {
                // Draw a perfect circle mathematically
                vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                if (dot(cxy, cxy) > 1.0) discard;
                
                float mixValue = (vPos.y + 1.3) / 2.6;
                gl_FragColor = vec4(mix(color1, color2, mixValue), 1.0);
            }
        `,
        transparent: true
    });

    // 5. Build the Sphere (Lines + Circles)
    const innerSphere = new THREE.Mesh(innerGeo, lineMaterial);
    const innerPoints = new THREE.Points(innerGeo, pointMaterial);
    logoGroup.add(innerSphere);
    logoGroup.add(innerPoints);

    // 6. The Central Core (Glowing Cyan)
    // Scaled up slightly to 0.3 to match the 30% larger outer structure
    const coreGeo = new THREE.SphereGeometry(0.3, 16, 16); 
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    logoGroup.add(core);

    // 7. Tilt the globe slightly 
    logoGroup.rotation.z = 0.2;
    logoGroup.rotation.x = 0.3;

    // 8. Animation Loop
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    });
    observer.observe(container);

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        if (isVisible) {
            // Rotate the network
            logoGroup.rotation.y += 0.003;
            logoGroup.rotation.x += 0.001; 
            renderer.render(scene, camera);
        }
    }

    animate();

    // 9. Handle Responsive Resizing
    const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (container && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
        innerGeo.dispose();
        coreGeo.dispose();
        lineMaterial.dispose();
        pointMaterial.dispose();
        coreMat.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 pointer-events-none"
      style={{ filter: 'drop-shadow(0 0 30px rgba(176, 38, 255, 0.15))' }}
    />
  );
}
