"use client";
import { useEffect, useRef } from "react";

export default function MarineCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let sizeMultiplier = 1;

    // Mouse coordinates (normalized and real)
    const mouse = { x: null, y: null, targetX: null, targetY: null, isMoving: false };
    let mouseTimeout;

    // Setup Canvas Sizing (Supporting Retina / High DPI screens)
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Responsive scale multiplier for ship, plane, radar, waves
      if (width <= 480) {
        sizeMultiplier = 0.5; // 50% size on mobile (320px, 375px, 425px)
      } else if (width <= 768) {
        sizeMultiplier = 0.75; // 75% size on tablet
      } else {
        sizeMultiplier = 1.0; // full size on desktop
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse move listeners
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;

      // Smooth tracking towards target
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 2000);
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
      mouse.isMoving = false;
    };

    // Ripple click effect
    const ripples = [];
    const handleMouseClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 250,
        speed: 4,
        opacity: 0.8,
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollRatio = Math.min(scrollY / (window.innerHeight * 0.85), 1);
      canvas.style.filter = `blur(${scrollRatio * 16}px)`;
      canvas.style.opacity = `${1 - scrollRatio * 0.55}`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("scroll", handleScroll);
    handleScroll();


    // Galaxy stars — subtle, slowly moving/drifting, twinkling, blending with light mode background
    const STAR_COUNT = 35;
    const stars = [];
    const starColors = [
      "rgba(14, 165, 233, ",  // Sky blue
      "rgba(6, 182, 212, ",   // Cyan
      "rgba(99, 102, 241, ",  // Indigo
      "rgba(245, 158, 11, "   // Soft Amber/Gold
    ];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8, // cover upper 80%
        vx: (Math.random() - 0.5) * 0.22, // slow drift
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 2.5 + 1.5,     // size 1.5px to 4.0px (clearly visible but elegant)
        colorBase: starColors[Math.floor(Math.random() * starColors.length)],
        baseOpacity: Math.random() * 0.35 + 0.35, // opacity 0.35 to 0.70 for high visibility in light mode
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
        twinkleAmp: Math.random() * 0.15 + 0.05,
        type: Math.random() > 0.72 ? "cross" : "dot" // some dots, some twinkling crosses
      });
    }

    // Sine Waves representation (Ocean swell)
    const waveCount = 3;
    const waves = [];
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: height * (0.6 + i * 0.12),
        amplitude: 22 - i * 5,
        frequency: 0.0015 + i * 0.0008,
        speed: 0.03 - i * 0.008,
        phase: Math.random() * Math.PI,
        color: i === 0 
          ? "rgba(14, 165, 233, 0.09)" 
          : i === 1 
            ? "rgba(6, 182, 212, 0.06)" 
            : "rgba(37, 99, 235, 0.04)"
      });
    }

    // Load Premium SVG Images for Pro Look
    const shipImage = new Image();
    const shipSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 70" width="180" height="70">
  <path d="M 20 52 L 145 52 L 165 30 L 160 26 C 158 24, 155 24, 153 26 L 145 26 L 145 32 L 28 32 L 28 26 L 22 26 Z" fill="#1e293b"/>
  <path d="M 22 49 L 158 49" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 26 32 L 42 32 L 42 16 L 39 16 L 39 8 L 30 8 L 30 16 L 26 16 Z" fill="#f8fafc"/>
  <rect x="32" y="11" width="5" height="3" rx="0.5" fill="#38bdf8"/>
  <rect x="32" y="19" width="4" height="4" rx="0.5" fill="#0f172a"/>
  <rect x="21" y="6" width="5" height="10" fill="#334155"/>
  <rect x="21" y="6" width="5" height="3" fill="#ef4444"/>
  <rect x="47" y="18" width="14" height="14" rx="1" fill="#ef4444"/>
  <rect x="63" y="18" width="14" height="14" rx="1" fill="#0ea5e9"/>
  <rect x="79" y="18" width="14" height="14" rx="1" fill="#10b981"/>
  <rect x="95" y="18" width="14" height="14" rx="1" fill="#f59e0b"/>
  <rect x="111" y="18" width="14" height="14" rx="1" fill="#6366f1"/>
  <rect x="127" y="18" width="14" height="14" rx="1" fill="#0ea5e9"/>
  <rect x="54" y="6" width="14" height="12" rx="1" fill="#f59e0b"/>
  <rect x="70" y="6" width="14" height="12" rx="1" fill="#6366f1"/>
  <rect x="86" y="6" width="14" height="12" rx="1" fill="#ef4444"/>
  <rect x="102" y="6" width="14" height="12" rx="1" fill="#10b981"/>
  <rect x="118" y="6" width="14" height="12" rx="1" fill="#0ea5e9"/>
</svg>
    `;
    shipImage.src = "data:image/svg+xml;utf8," + encodeURIComponent(shipSvg);

    const planeImage = new Image();
    const planeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 45" width="120" height="45">
  <path d="M 20 22 C 20 22, 28 12, 45 12 L 95 12 C 102 12, 108 15, 114 21 C 117 24, 117 26, 114 27 L 35 27 C 28 27, 23 25, 20 22 Z" fill="#ffffff"/>
  <path d="M 103 14 C 105 14, 107 16, 109 20 L 102 20 Z" fill="#0f172a"/>
  <path d="M 28 13 L 16 1 C 15 0, 13 0, 12 1 L 12 14 Z" fill="#e2e8f0"/>
  <path d="M 16 1 C 14 1, 12 2, 12 4 L 12 14 Z" fill="#38bdf8"/>
  <path d="M 52 24 L 38 41 C 37 42, 35 42, 34 40 L 34 37 L 46 24 Z" fill="#cbd5e1"/>
  <rect x="42" y="27" width="14" height="5" rx="2.5" fill="#475569"/>
  <circle cx="56" cy="29.5" r="2" fill="#f59e0b"/>
  <path d="M 58 12 L 48 2 C 47 1, 45 1, 44 3 L 44 5 L 52 12 Z" fill="#94a3b8"/>
</svg>
    `;
    planeImage.src = "data:image/svg+xml;utf8," + encodeURIComponent(planeSvg);

    let shipLoaded = false;
    shipImage.onload = () => { shipLoaded = true; };
    let planeLoaded = false;
    planeImage.onload = () => { planeLoaded = true; };

    // Ship & Plane state
    let shipX = width * 0.15;
    let planeX = -150;
    let planeY = height * 0.25;

    const drawShip = (ctx, cx, cy, angle) => {
      ctx.save();
      ctx.translate(cx, cy - 10 * sizeMultiplier); // Sit on wave
      ctx.rotate(angle);

      if (shipLoaded) {
        // Draw the premium cargo ship image centered
        ctx.drawImage(shipImage, -65 * sizeMultiplier, -25 * sizeMultiplier, 130 * sizeMultiplier, 50 * sizeMultiplier);
      } else {
        // Fallback
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(-35 * sizeMultiplier, -5 * sizeMultiplier, 70 * sizeMultiplier, 10 * sizeMultiplier);
      }

      // 4. White foam / Wake at stern
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.beginPath();
      ctx.arc(-68 * sizeMultiplier, 12 * sizeMultiplier, (4 + Math.sin(tick * 0.15) * 2) * sizeMultiplier, 0, Math.PI * 2);
      ctx.arc(-74 * sizeMultiplier, 14 * sizeMultiplier, (2.5 + Math.cos(tick * 0.15) * 1.5) * sizeMultiplier, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawPlane = (ctx, cx, cy) => {
      ctx.save();

      // Premium subtle blue contrail/jet-stream trail (starts behind the plane's tail on the left)
      const contrailGrad = ctx.createLinearGradient(cx - 40 * sizeMultiplier, cy, cx - 180 * sizeMultiplier, cy);
      contrailGrad.addColorStop(0, "rgba(56, 189, 248, 0.22)");
      contrailGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.strokeStyle = contrailGrad;
      ctx.lineWidth = 1.6 * sizeMultiplier;
      ctx.beginPath();
      ctx.moveTo(cx - 38 * sizeMultiplier, cy);
      ctx.lineTo(cx - 178 * sizeMultiplier, cy);
      ctx.stroke();

      if (planeLoaded) {
        ctx.translate(cx, cy);
        // Facing right naturally (original SVG design points right)
        ctx.drawImage(planeImage, -40 * sizeMultiplier, -15 * sizeMultiplier, 80 * sizeMultiplier, 30 * sizeMultiplier);
      } else {
        // Fallback
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5 * sizeMultiplier, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };



    // Radar scanner setup
    const radar = {
      cx: width * 0.85,
      cy: height * 0.2,
      maxRadius: 280,
      angle: 0,
      rotationSpeed: 0.0035,
    };

    let tick = 0;

    // Main animation loop
    const animate = () => {
      tick += 1;
      
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate interpolation
      if (mouse.targetX !== null) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // 1. Draw Radar HUD Scan lines
      radar.cx = width * 0.85; // Recalculate if resized
      radar.cy = height * 0.22;
      radar.angle += radar.rotationSpeed;

      // Draw radar background circles
      ctx.strokeStyle = "rgba(14, 165, 233, 0.05)";
      ctx.lineWidth = 1;
      const currentMaxRadius = radar.maxRadius * sizeMultiplier;
      for (let r = 80 * sizeMultiplier; r <= currentMaxRadius; r += 100 * sizeMultiplier) {
        ctx.beginPath();
        ctx.arc(radar.cx, radar.cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw radar crosshairs
      ctx.beginPath();
      ctx.moveTo(radar.cx - currentMaxRadius, radar.cy);
      ctx.lineTo(radar.cx + currentMaxRadius, radar.cy);
      ctx.moveTo(radar.cx, radar.cy - currentMaxRadius);
      ctx.lineTo(radar.cx, radar.cy + currentMaxRadius);
      ctx.stroke();

      // Radar Sweep Cone
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(radar.cx, radar.cy);
      ctx.arc(
        radar.cx,
        radar.cy,
        currentMaxRadius,
        radar.angle - 0.25,
        radar.angle,
        false
      );
      ctx.closePath();
      
      // Sweep gradient
      const sweepGrad = ctx.createRadialGradient(
        radar.cx, radar.cy, 10 * sizeMultiplier,
        radar.cx, radar.cy, currentMaxRadius
      );
      sweepGrad.addColorStop(0, "rgba(14, 165, 233, 0.15)");
      sweepGrad.addColorStop(0.3, "rgba(14, 165, 233, 0.04)");
      sweepGrad.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // 2. Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity -= 0.012;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(14, 165, 233, ${r.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Draw Ocean Waves
      waves.forEach((wave, waveIdx) => {
        ctx.beginPath();
        wave.phase += wave.speed;
        
        const step = 20; 
        const waveYCenter = height * (0.6 + waveIdx * 0.12);
        const waveAmp = (22 - waveIdx * 5) * sizeMultiplier;

        for (let x = 0; x <= width + step; x += step) {
          let waveY = waveYCenter + Math.sin(x * wave.frequency + wave.phase) * waveAmp;
          
          if (mouse.x !== null) {
            const dx = x - mouse.x;
            const dy = waveY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150 * sizeMultiplier) {
              const pushForce = (1 - dist / (150 * sizeMultiplier)) * 35 * sizeMultiplier;
              waveY += (mouse.y > waveY ? -pushForce : pushForce) * 0.7;
            }
          }

          ripples.forEach(rip => {
            const dx = x - rip.x;
            const dist = Math.abs(dx);
            if (dist < rip.radius + 30 * sizeMultiplier && dist > rip.radius - 30 * sizeMultiplier) {
              const ripForce = (1 - Math.abs(dist - rip.radius) / (30 * sizeMultiplier)) * rip.opacity * 15 * sizeMultiplier;
              waveY += Math.sin(dist * 0.1) * ripForce;
            }
          });

          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        if (waveIdx === 0) {
          const shipYCenter = height * 0.6;
          const shipAmp = 22 * sizeMultiplier;
          const shipY = shipYCenter + Math.sin(shipX * wave.frequency + wave.phase) * shipAmp;
          const nextY = shipYCenter + Math.sin((shipX + 15 * sizeMultiplier) * wave.frequency + wave.phase) * shipAmp;
          const shipAngle = Math.atan2(nextY - shipY, 15 * sizeMultiplier);
          drawShip(ctx, shipX, shipY, shipAngle);
        }
      });

      // 4. Draw galaxy stars
      stars.forEach(star => {
        // Slow random movement/drift
        star.x += star.vx;
        star.y += star.vy;

        // Warp bounds
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height * 0.8;
        if (star.y > height * 0.8) star.y = -10;

        star.phase += star.speed;
        const opacity = star.baseOpacity + Math.sin(star.phase) * star.twinkleAmp;
        const clampedOpacity = Math.max(0.15, Math.min(opacity, 0.85));

        ctx.save();

        if (star.type === "cross") {
          // Draw a soft cross/sparkle shape
          ctx.strokeStyle = star.colorBase + clampedOpacity + ")";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(star.x - star.r * 2.2, star.y);
          ctx.lineTo(star.x + star.r * 2.2, star.y);
          ctx.moveTo(star.x, star.y - star.r * 2.2);
          ctx.lineTo(star.x, star.y + star.r * 2.2);
          ctx.stroke();

          // Delicate center core
          ctx.fillStyle = star.colorBase + (clampedOpacity * 1.2) + ")";
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft radial glow circle
          const glowGrad = ctx.createRadialGradient(
            star.x, star.y, star.r * 0.1,
            star.x, star.y, star.r * 2.0
          );
          glowGrad.addColorStop(0, star.colorBase + clampedOpacity + ")");
          glowGrad.addColorStop(0.3, star.colorBase + (clampedOpacity * 0.45) + ")");
          glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
          
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Update ship coordinate
      shipX += 0.25;
      if (shipX > width + 120) {
        shipX = -120;
      }

      // Update plane coordinate (moves slowly from left to right)
      planeX += 0.65;
      if (planeX > width + 150) {
        planeX = -150;
        planeY = height * (0.18 + Math.random() * 0.14);
      }

      // Draw premium plane on the sky
      drawPlane(ctx, planeX, planeY);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
        mixBlendMode: "normal",
      }}
    />
  );
}
