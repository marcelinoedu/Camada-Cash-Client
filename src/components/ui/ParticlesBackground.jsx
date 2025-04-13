import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // Slim é mais leve e não precisa de checkVersion
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "#ffffff" },
        particles: {
          number: { value: 120, density: { enable: true, area: 800 } },
          color: { value: "#2D61F0" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 2, random: true },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "bounce" },
          },
          links: {
            enable: true,
            distance: 100,
            color: "#2D61F0",
            opacity: 0.1,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "repulse" },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.5 } },
            repulse: { distance: 150 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
