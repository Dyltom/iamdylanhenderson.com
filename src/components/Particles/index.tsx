'use client';

import { memo, useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine, ISourceOptions } from 'tsparticles-engine';

const ParticleBackground: React.FC = memo(() => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1, // Put particles behind everything
    },
    fpsLimit: 30, // Reduced from 60 for better performance
    particles: {
      number: {
        value: 3, // Reduced from 5
        density: {
          enable: true,
          area: 1200, // Limit particle density
        },
      },
      color: {
        value: '#32CD32',
      },
      links: {
        enable: true,
        color: '#32CD32',
        distance: 150,
        opacity: 0.5,
      },
      move: {
        enable: true,
        speed: 0.8, // Reduced from 1.5
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
      size: {
        value: 3,
      },
      opacity: {
        value: 0.5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false, // Disabled for performance
        },
        onClick: {
          enable: false, // Disabled for performance
        },
        resize: true,
      },
    },
    detectRetina: false, // Disable retina detection for performance
    pauseOnBlur: true, // Pause when tab is not active
    pauseOnOutsideViewport: true, // Pause when not visible
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
