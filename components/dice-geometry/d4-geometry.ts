import type { DiceFace, DiceGeometry } from "./types";

const BASE_WIDTH = 150;
const BASE_HEIGHT = 129.88;
const TRIANGLE_CLIP = "polygon(50% 0%, 0% 100%, 100% 100%)";

const faces: DiceFace[] = [
  {
    value: 1,
    transform: "translateY(42.05px) translateZ(25px) rotateX(-70.529deg)",
    clipPath: TRIANGLE_CLIP,
  },
  {
    value: 2,
    transform:
      "translateY(10px) translateX(-18.75px) translateZ(25px) rotateZ(120deg) rotateX(-70.529deg)",
    clipPath: TRIANGLE_CLIP,
  },
  {
    value: 3,
    transform:
      "translateY(10px) translateX(18.75px) translateZ(25px) rotateZ(240deg) rotateX(-70.529deg)",
    clipPath: TRIANGLE_CLIP,
  },
  {
    value: 4,
    transform: "translateZ(-35px) translateY(-1px) rotateY(180deg)",
    clipPath: TRIANGLE_CLIP,
  },
];

const resultRotations = {
  1: { rotateX: 90, rotateY: 0, rotateZ: 0 },
  2: { rotateX: 90, rotateY: 0, rotateZ: 240 },
  3: { rotateX: 90, rotateY: 0, rotateZ: 120 },
  4: { rotateX: 0, rotateY: 180, rotateZ: 0 },
};

export const d4Geometry: DiceGeometry = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  faces,
  resultRotations,
  wrapperRotation: { rotateX: 0, rotateY: 0, rotateZ: 0 },
};
