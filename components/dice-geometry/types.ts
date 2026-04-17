export interface DiceFace {
  value: number;
  transform: string;
  clipPath?: string;
}

export interface Rotation {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
}

export interface DiceGeometry {
  faces: DiceFace[];
  resultRotations: Record<number, Rotation>;
  wrapperRotation?: Rotation;
  width: number;
  height: number;
}

export type DiceType = "d4" | "d6" | "d10" | "d12" | "d20";

export const DICE_MAX_VALUES: Record<DiceType, number> = {
  d4: 4,
  d6: 6,
  d10: 10,
  d12: 12,
  d20: 20,
};

export function createTransform(rotation: Rotation): string {
  return `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) rotateZ(${rotation.rotateZ}deg)`;
}
