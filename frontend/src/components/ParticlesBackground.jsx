import Particles from "@tsparticles/react";
const ParticlesBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "#020617",
          },
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 50,
          },

          color: {
            value: "#06b6d4",
          },

          links: {
            enable: true,
            color: "#06b6d4",
            distance: 150,
            opacity: 0.3,
          },

          move: {
            enable: true,
            speed: 2,
          },

          opacity: {
            value: 0.5,
          },

          size: {
            value: 3,
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticlesBackground;