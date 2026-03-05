/**
 * Animation Components Exports
 * Central export file for all animation components
 */

// Animation Components
export { AnimatedContainer } from "./AnimatedContainer";
export { StaggerContainer, StaggerItem } from "./StaggerContainer";
export { PageTransition } from "./PageTransition";

// Parallax Components
export {
  ParallaxScroll,
  ParallaxLayer,
  ParallaxHero,
  ParallaxSection,
} from "./ParallaxScroll";

// Morphing Components
export {
  MorphingIllustration,
  MorphingIcon,
  MorphingLogo,
  createMorphingShapes,
} from "./MorphingIllustration";

// Particle Components
export {
  ParticleBackground,
  FloatingDots,
  NetworkBackground,
} from "./ParticleBackground";

// Type exports
export type { ParallaxLayerProps, ParallaxScrollProps } from "./ParallaxScroll";
export type {
  MorphingShape,
  MorphingIllustrationProps,
} from "./MorphingIllustration";
export type { Particle, ParticleBackgroundProps } from "./ParticleBackground";
