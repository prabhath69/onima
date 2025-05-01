
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
      
      // Scale
      scaleArray[i / 3] = Math.random();
      
      // Color - gradient between electric blue and neon purple
      const gradientPosition = Math.random();
      colorArray[i] = 0 / 255 + (198 / 255 - 0 / 255) * gradientPosition; // R: 0 to 198
      colorArray[i + 1] = 198 / 255 + (114 / 255 - 198 / 255) * gradientPosition; // G: 198 to 114
      colorArray[i + 2] = 255 / 255 + (255 / 255 - 255 / 255) * gradientPosition; // B: 255 (constant)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add central sphere
    const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0062ff, 
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      emissive: 0x0072ff,
      emissiveIntensity: 0.5,
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);
    
    // Add point lights for dynamic lighting effect
    const purpleLight = new THREE.PointLight(0x7F00FF, 10, 7);
    purpleLight.position.set(-3, 2, 3);
    scene.add(purpleLight);
    
    const blueLight = new THREE.PointLight(0x00c6ff, 10, 7);
    blueLight.position.set(3, -2, 3);
    scene.add(blueLight);
    
    // Animation loop
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Parallax effect variables
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });
    
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0003;
      
      // Rotate sphere
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      
      // Interactive movement based on mouse position
      particlesMesh.rotation.y += mouseX * 0.0005;
      particlesMesh.rotation.x += mouseY * 0.0005;
      
      sphere.rotation.y += mouseX * 0.001;
      sphere.rotation.x += mouseY * 0.001;
      
      // Scroll-based parallax
      particlesMesh.position.y = scrollY * 0.0005;
      sphere.position.y = scrollY * 0.0005;
      
      // Animate lights
      purpleLight.position.x = Math.sin(elapsedTime * 0.5) * 3;
      purpleLight.position.z = Math.cos(elapsedTime * 0.5) * 3;
      blueLight.position.x = Math.sin(elapsedTime * 0.5 + Math.PI) * 3;
      blueLight.position.z = Math.cos(elapsedTime * 0.5 + Math.PI) * 3;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', () => {});
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default ThreeScene;
