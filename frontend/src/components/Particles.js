import React from 'react';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    // Carrega os plugins de partículas
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: '#1e3a8a' }, // Fundo azul
        },
        particles: {
          number: { value: 100 },
          color: { value: '#ffffff' }, // Partículas brancas
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            outModes: { default: 'out' },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' }, // Reação ao hover
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
