<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { createTransform, getGeometry, type DiceType } from "../dice-geometry";

type Affinity = "fire" | "water" | "earth" | "air" | "lightning";

const props = withDefaults(
  defineProps<{
    diceType: DiceType;
    affinity?: Affinity;
    elementFaces?: string[];
    value?: number;
    scale?: number;
    isRolling?: boolean;
    animationSpeed?: number;
    spinning?: boolean;
    spinDuration?: number;
    settleDuration?: number;
  }>(),
  {
    value: undefined,
    scale: 1,
    isRolling: false,
    animationSpeed: 0.6,
    affinity: undefined,
    elementFaces: undefined,
    spinning: false,
    spinDuration: 500,
    settleDuration: 1000,
  },
);

const emit = defineEmits<{
  rollStart: [];
  rollCompleted: [value: number];
  click: [];
}>();

const diceRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

const geometry = computed(() => getGeometry(props.diceType));
const perspective = computed(() => 1000);

const affinityClassMap: Record<Affinity, string> = {
  fire: "is-fire",
  water: "is-water",
  earth: "is-earth",
  air: "is-air",
  lightning: "is-lightning",
};

const wrapperStyle = computed(() => {
  const baseRotation = geometry.value.wrapperRotation;

  if (!baseRotation) {
    return {};
  }

  return {
    transform: createTransform(baseRotation),
  };
});

const diceStyle = computed(() => ({
  width: `${geometry.value.width}px`,
  height: `${geometry.value.height}px`,
}));

const faceStyles = computed(() => {
  const styles: Record<number, Record<string, string>> = {};

  for (const face of geometry.value.faces) {
    const style: Record<string, string> = { transform: face.transform };

    if (face.clipPath) {
      style.clipPath = face.clipPath;
    }

    if (props.diceType === "d12") {
      style.transformOrigin = "center bottom";
    }

    styles[face.value] = style;
  }

  return styles;
});

const faceClassName = computed(() =>
  props.affinity ? affinityClassMap[props.affinity] : "is-neutral",
);

function getFaceElement(faceValue: number): string | undefined {
  return props.elementFaces?.[faceValue - 1];
}

function handleClick() {
  emit("click");
}

async function roll(targetValue: number): Promise<void> {
  if (isAnimating.value || !diceRef.value) {
    return;
  }

  isAnimating.value = true;
  emit("rollStart");

  const dice = diceRef.value;
  const spinDuration = (props.spinDuration + Math.random() * 250) / props.animationSpeed;
  const settleDuration =
    (props.settleDuration + Math.random() * 250) / props.animationSpeed;

  const randomX = 180 + Math.random() * 180 * 8;
  const randomY = 180 + Math.random() * 180 * 8;
  const randomZ = 180 + Math.random() * 180 * 8;

  dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;
  dice.style.transition = `transform ${spinDuration}ms ease-in-out`;

  await new Promise((resolve) => setTimeout(resolve, spinDuration));

  const rotation = geometry.value.resultRotations[targetValue];

  if (rotation) {
    const { rotateX, rotateY, rotateZ } = rotation;

    dice.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    dice.style.transition = `transform ${settleDuration}ms ease-in-out`;

    await new Promise((resolve) => setTimeout(resolve, settleDuration));
  }

  isAnimating.value = false;
  emit("rollCompleted", targetValue);
}

function setValue(value: number): void {
  if (!diceRef.value) {
    return;
  }

  const rotation = geometry.value.resultRotations[value];

  if (!rotation) {
    return;
  }

  const { rotateX, rotateY, rotateZ } = rotation;
  diceRef.value.style.transition = "none";
  diceRef.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  void diceRef.value.offsetWidth;
  diceRef.value.style.transition = "";
}

onMounted(() => {
  if (props.value !== undefined) {
    setValue(props.value);
  }
});

defineExpose({
  roll,
  setValue,
});
</script>

<template>
  <div
    class="dice-container"
    :style="{
      perspective: `${perspective}px`,
      transform: `scale(${props.scale})`,
      transition: 'transform 0.3s ease',
    }"
  >
    <div class="dice-wrapper" :style="wrapperStyle">
      <div class="spin-wrapper" :class="{ 'is-spinning': props.spinning }">
        <div
          ref="diceRef"
          class="dice-3d"
          :class="[`dice-${props.diceType}`, faceClassName, { 'is-rolling': isAnimating }]"
          :style="diceStyle"
          @click="handleClick"
        >
          <div
            v-for="face in geometry.faces"
            :key="`face-${face.value}`"
            class="dice-face"
            :class="[`dice-face-${props.diceType}`, faceClassName]"
            :style="faceStyles[face.value]"
          >
            <span class="face-value">
              {{ getFaceElement(face.value) ?? face.value }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dice-container {
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dice-wrapper,
.spin-wrapper,
.dice-3d {
  transform-style: preserve-3d;
}

.spin-wrapper.is-spinning {
  animation: spin-x 0.7s linear infinite;
}

@keyframes spin-x {
  from {
    transform: rotateX(0deg);
  }

  to {
    transform: rotateX(360deg);
  }
}

.dice-3d {
  position: relative;
  transform-origin: center;
  transition: transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.dice-face {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: visible;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.22), transparent 34%),
    linear-gradient(135deg, rgba(212, 239, 153, 0.18), rgba(255, 255, 255, 0.06) 42%, rgba(10, 10, 10, 0.88) 100%);
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.06),
    0 10px 30px rgba(0, 0, 0, 0.28);
}

.dice-face.is-neutral {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.95), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(212, 212, 212, 0.96));
  border-color: rgba(255, 255, 255, 0.72);
}

.dice-face.is-neutral .face-value {
  color: #18181b;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.18);
}

.dice-face:nth-child(even) {
  filter: brightness(0.93);
}

.face-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f5f5f5;
  text-shadow: 0 0 12px rgba(212, 239, 153, 0.18);
  user-select: none;
  pointer-events: none;
}

.dice-d4 .dice-face,
.dice-d20 .dice-face {
  border-radius: 0;
}

.dice-d12 .dice-face {
  border-radius: 6px;
}

.dice-d12 .face-value {
  font-size: 1.45rem;
}

.dice-d20 .face-value {
  font-size: 1.1rem;
}

.dice-face.is-fire {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.2), transparent 34%),
    linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(127, 29, 29, 0.96));
}

.dice-face.is-water {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.24), transparent 34%),
    linear-gradient(135deg, rgba(56, 189, 248, 0.9), rgba(8, 47, 73, 0.98));
}

.dice-face.is-earth {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.18), transparent 34%),
    linear-gradient(135deg, rgba(192, 132, 87, 0.92), rgba(68, 43, 19, 0.98));
}

.dice-face.is-air {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.2), transparent 34%),
    linear-gradient(135deg, rgba(103, 232, 249, 0.86), rgba(8, 145, 178, 0.96));
}

.dice-face.is-lightning {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.26), transparent 34%),
    linear-gradient(135deg, rgba(250, 204, 21, 0.92), rgba(113, 63, 18, 0.98));
}

@media (max-width: 640px) {
  .face-value {
    font-size: 1.45rem;
  }

  .dice-d12 .face-value {
    font-size: 1.2rem;
  }

  .dice-d20 .face-value {
    font-size: 1rem;
  }
}
</style>
