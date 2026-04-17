export * from "./types";
export { d4Geometry } from "./d4-geometry";
export { d6Geometry } from "./d6-geometry";
export { d10Geometry } from "./d10-geometry";
export { d12Geometry } from "./d12-geometry";
export { d20Geometry } from "./d20-geometry";

import type { DiceGeometry, DiceType } from "./types";
import { d4Geometry } from "./d4-geometry";
import { d6Geometry } from "./d6-geometry";
import { d10Geometry } from "./d10-geometry";
import { d12Geometry } from "./d12-geometry";
import { d20Geometry } from "./d20-geometry";

const geometryMap: Record<DiceType, DiceGeometry> = {
  d4: d4Geometry,
  d6: d6Geometry,
  d10: d10Geometry,
  d12: d12Geometry,
  d20: d20Geometry,
};

export function getGeometry(diceType: DiceType): DiceGeometry {
  return geometryMap[diceType];
}
