// TypeScript doesn't natively understand non-code imports (like images)
// It's necessary to declare the module for images
// The following allows TypeScript to properly handle image imports

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';