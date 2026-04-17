<script setup lang="ts">
import { ref } from "vue";
import Dice3D from "./Dice3D.vue";

export interface DiceRollResult {
  roll_value: number;
  result_element: "fire" | "water" | "earth" | "air" | "lightning";
}

const elementLabelMap: Record<DiceRollResult["result_element"], string> = {
  fire: "Fire",
  water: "Water",
  earth: "Earth",
  air: "Air",
  lightning: "Lightning",
};

const props = defineProps<{
  diceType: "d4" | "d6" | "d10" | "d12" | "d20";
  affinity?: "fire" | "water" | "earth" | "air" | "lightning";
  elementFaces?: string[];
  autoRoll?: boolean;
  result?: DiceRollResult;
  scale?: number;
  showOutcome?: boolean;
  spinDuration?: number;
  settleDuration?: number;
}>();

const emit = defineEmits<{
  rollComplete: [];
  click: [];
}>();

const scale = props.scale ?? 1;
const showOutcome = props.showOutcome ?? true;

const dice3DRef = ref<InstanceType<typeof Dice3D> | null>(null);
const isRolling = ref(false);
const showResult = ref(false);

async function roll() {
  if (isRolling.value) {
    return;
  }

  isRolling.value = true;
  showResult.value = false;

  if (props.result && dice3DRef.value) {
    await dice3DRef.value.roll(props.result.roll_value);
  }

  showResult.value = true;
  isRolling.value = false;
}

function handleRollComplete() {
  emit("rollComplete");
}

function handleDieClick() {
  emit("click");
}

function getElementLabel(element: DiceRollResult["result_element"]): string {
  return elementLabelMap[element];
}

defineExpose({
  roll,
});
</script>

<template>
  <div class="dice-roll-visualization">
    <Dice3D
      ref="dice3DRef"
      :dice-type="props.diceType"
      :affinity="props.affinity"
      :element-faces="props.elementFaces"
      :scale="scale"
      :is-rolling="isRolling"
      :value="props.result?.roll_value"
      :spin-duration="props.spinDuration"
      :settle-duration="props.settleDuration"
      @roll-completed="handleRollComplete"
      @click="handleDieClick"
    />

    <div
      v-if="showResult && showOutcome && props.result"
      class="result-display"
      :class="`result-${props.result.result_element}`"
    >
      <div class="outcome-badge">
        {{ getElementLabel(props.result.result_element) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dice-roll-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.result-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.outcome-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.result-fire .outcome-badge {
  background: linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%);
}

.result-water .outcome-badge {
  background: linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%);
}

.result-earth .outcome-badge {
  background: linear-gradient(135deg, #4a2f16 0%, #c08457 100%);
}

.result-air .outcome-badge {
  background: linear-gradient(135deg, #164e63 0%, #67e8f9 100%);
}

.result-lightning .outcome-badge {
  background: linear-gradient(135deg, #713f12 0%, #fde047 100%);
  color: #111;
}
</style>
