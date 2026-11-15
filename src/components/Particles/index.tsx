'use client';

import { memo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

const loadParticlePlugins = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

const PARTICLE_OPTIONS: ISourceOptions = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 30,
  particles: {
    number: {
      value: 3,
      density: {
        enable: true,
        width: 1200,
        height: 1000,
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
      speed: 0.8,
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
  detectRetina: false,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};

const ParticleBackground: React.FC = memo(() => (
  <ParticlesProvider init={loadParticlePlugins}>
    <Particles
      id="tsparticles"
      options={PARTICLE_OPTIONS}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  </ParticlesProvider>
));

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
