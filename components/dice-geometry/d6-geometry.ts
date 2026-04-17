import type { DiceFace, DiceGeometry } from "./types";

const CUBE_SIZE = 100;
const HALF_SIZE = CUBE_SIZE / 2;

const faces: DiceFace[] = [
  { value: 4, transform: `translateZ(${HALF_SIZE}px)` },
  { value: 3, transform: `translateZ(-${HALF_SIZE}px) rotateY(180deg)` },
  { value: 5, transform: `translateY(-${HALF_SIZE}px) rotateX(90deg)` },
  { value: 2, transform: `translateY(${HALF_SIZE}px) rotateX(-90deg)` },
  { value: 1, transform: `translateX(-${HALF_SIZE}px) rotateY(-90deg)` },
  { value: 6, transform: `translateX(${HALF_SIZE}px) rotateY(90deg)` },
];

const resultRotations = {
  1: { rotateX: 0, rotateY: 90, rotateZ: 0 },
  2: { rotateX: 90, rotateY: 0, rotateZ: 0 },
  3: { rotateX: 180, rotateY: 0, rotateZ: 180 },
  4: { rotateX: 0, rotateY: 0, rotateZ: 0 },
  5: { rotateX: 270, rotateY: 0, rotateZ: 0 },
  6: { rotateX: 0, rotateY: 270, rotateZ: 0 },
};

export const d6Geometry: DiceGeometry = {
  width: CUBE_SIZE,
  height: CUBE_SIZE,
  faces,
  resultRotations,
  wrapperRotation: { rotateX: 30, rotateY: 0, rotateZ: -45 },
};
