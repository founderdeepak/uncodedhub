import{r as x,j as C}from"./vendor-react-B-IxsZ_t.js";import{S as G,P as W,W as R,G as V,a as P,b as g,C as r,M,c as j,d as _}from"./vendor-three--SGITyK0.js";function I(){const a=x.useRef(null);return x.useEffect(()=>{if(!a.current)return;const e=a.current,n=window.innerWidth<768,c=new G,t=new W(45,e.clientWidth/e.clientHeight,.1,1e3);t.position.z=4;const o=new R({antialias:!n,alpha:!0});o.setSize(e.clientWidth,e.clientHeight),o.setPixelRatio(n?1:Math.min(window.devicePixelRatio,2)),e.appendChild(o.domElement);const i=new V;c.add(i);const s=new P(1.3,n?6:10,n?4:6),l=new g({uniforms:{color1:{value:new r("#2196f3")},color2:{value:new r("#b145e9")}},vertexShader:`
            varying vec3 vPos;
            void main() {
                vPos = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,fragmentShader:`
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vPos;
            void main() {
                // Gradient scaled to match the new 1.3 radius
                float mixValue = (vPos.y + 1.3) / 2.6; 
                gl_FragColor = vec4(mix(color1, color2, mixValue), 0.85); 
            }
        `,wireframe:!0,transparent:!0}),d=new g({uniforms:{color1:{value:new r("#2196f3")},color2:{value:new r("#b145e9")}},vertexShader:`
            varying vec3 vPos;
            void main() {
                vPos = position;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                // Node size reduced by ~45% (from 25.0 to 13.75)
                gl_PointSize = 13.75 * (5.0 / -mvPosition.z); 
                gl_Position = projectionMatrix * mvPosition;
            }
        `,fragmentShader:`
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
        `,transparent:!0}),y=new M(s,l),S=new j(s,d);i.add(y),i.add(S);const m=new P(.3,16,16),v=new _({color:58879}),b=new M(m,v);i.add(b),i.rotation.z=.2,i.rotation.x=.3;let u,p=!0;const f=new IntersectionObserver(z=>{z.forEach(E=>{p=E.isIntersecting})});f.observe(e);function w(){u=requestAnimationFrame(w),p&&(i.rotation.y+=.003,i.rotation.x+=.001,o.render(c,t))}w();const h=()=>{e&&(t.aspect=e.clientWidth/e.clientHeight,t.updateProjectionMatrix(),o.setSize(e.clientWidth,e.clientHeight))};return window.addEventListener("resize",h),()=>{f.disconnect(),window.removeEventListener("resize",h),cancelAnimationFrame(u),e&&e.contains(o.domElement)&&e.removeChild(o.domElement),s.dispose(),m.dispose(),l.dispose(),d.dispose(),v.dispose(),o.dispose()}},[]),C.jsx("div",{ref:a,className:"w-full h-full absolute inset-0 pointer-events-none",style:{filter:"drop-shadow(0 0 30px rgba(176, 38, 255, 0.15))"}})}export{I as default};
