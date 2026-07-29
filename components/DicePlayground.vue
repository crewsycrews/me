<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import DiceRollVisualization, {
  type DiceRollResult,
} from "./dice/DiceRollVisualization.vue";

type DiceType = "d4" | "d6" | "d10" | "d12" | "d20";
type Affinity = "fire" | "water" | "earth" | "air" | "lightning";

const diceTypes: DiceType[] = ["d4", "d6", "d10", "d12", "d20"];
const affinities: { label: string; value: Affinity | undefined }[] = [
  { label: "None", value: undefined },
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Earth", value: "earth" },
  { label: "Air", value: "air" },
  { label: "Lightning", value: "lightning" },
];
const elements: DiceRollResult["result_element"][] = [
  "fire",
  "water",
  "earth",
  "air",
  "lightning",
];
const diceMax: Record<DiceType, number> = {
  d4: 4,
  d6: 6,
  d10: 10,
  d12: 12,
  d20: 20,
};

const selectedDice = ref<DiceType>("d6");
const selectedAffinity = ref<Affinity | undefined>(undefined);
const forcedValue = ref<string>("");
const spinDuration = ref(500);
const settleDuration = ref(1000);
const isRolling = ref(false);
const currentResult = ref<DiceRollResult>();
const vizRef = ref<InstanceType<typeof DiceRollVisualization> | null>(null);

const forcedValueOptions = computed(() =>
  Array.from({ length: diceMax[selectedDice.value] }, (_, index) => index + 1),
);

watch(selectedDice, (diceType) => {
  if (forcedValue.value && Number(forcedValue.value) > diceMax[diceType]) {
    forcedValue.value = "";
  }
});

const rollLog = ref<
  Array<{ dice: string; value: number; result_element: DiceRollResult["result_element"] }>
>([]);

async function rollDice() {
  if (isRolling.value) {
    return;
  }

  isRolling.value = true;

  const dice = selectedDice.value;
  const max = diceMax[dice];
  const rollValue = forcedValue.value
    ? Number(forcedValue.value)
    : Math.floor(Math.random() * max) + 1;

  const resultElement: DiceRollResult["result_element"] =
    elements[Math.floor(Math.random() * elements.length)];

  currentResult.value = {
    roll_value: rollValue,
    result_element: resultElement,
  };

  await nextTick();
  await vizRef.value?.roll();

  rollLog.value.unshift({
    dice: selectedDice.value.toUpperCase(),
    value: rollValue,
    result_element: resultElement,
  });

  rollLog.value = rollLog.value.slice(0, 6);
  isRolling.value = false;
}

function onRollComplete() {
  return;
}
</script>

<template>
  <section
    class="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-6 text-left shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur sm:px-8 sm:py-8"
  >
    <div class="flex flex-col gap-2">
      <p class="text-xs uppercase tracking-[0.3em] text-[#d4ef99]/80">
        Dice Playground
      </p>
      <h2 class="text-xl font-semibold text-white sm:text-2xl">
        Elemental dice animation test
      </h2>
      <p class="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
        The purpose of this tool was to play around with different animations on
        each die and see it in action.
      </p>
    </div>

    <div class="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-start">
      <div class="space-y-5">
        <div>
          <p class="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">
            Dice type
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in diceTypes"
              :key="type"
              type="button"
              class="rounded-full border px-3 py-1.5 text-sm transition"
              :class="
                selectedDice === type
                  ? 'border-[#d4ef99]/70 bg-[#d4ef99]/12 text-[#d4ef99]'
                  : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25 hover:text-white'
              "
              @click="selectedDice = type"
            >
              {{ type.toUpperCase() }}
            </button>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">
            Affinity
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="affinity in affinities"
              :key="affinity.value ?? 'none'"
              type="button"
              class="rounded-full border px-3 py-1.5 text-sm transition"
              :class="
                selectedAffinity === affinity.value
                  ? 'border-[#d4ef99]/70 bg-[#d4ef99]/12 text-[#d4ef99]'
                  : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25 hover:text-white'
              "
              @click="selectedAffinity = affinity.value"
            >
              {{ affinity.label }}
            </button>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm text-white/75">
              Spin duration
              <input
                v-model.number="spinDuration"
                type="number"
                min="0"
                step="50"
                class="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-sm text-white outline-none transition focus:border-[#d4ef99]/60"
              />
            </label>

            <label class="flex flex-col gap-2 text-sm text-white/75">
              Settle duration
              <input
                v-model.number="settleDuration"
                type="number"
                min="0"
                step="50"
                class="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-sm text-white outline-none transition focus:border-[#d4ef99]/60"
              />
            </label>
          </div>
        </div>

        <div class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-end sm:justify-between">
          <label class="flex flex-col gap-2 text-sm text-white/75">
            Force result value
            <select
              v-model="forcedValue"
              class="rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-sm text-white outline-none transition focus:border-[#d4ef99]/60"
            >
              <option value="">Random</option>
              <option
                v-for="value in forcedValueOptions"
                :key="value"
                :value="String(value)"
              >
                {{ value }}
              </option>
            </select>
          </label>

          <button
            type="button"
            class="inline-flex min-w-36 items-center justify-center rounded-xl border border-[#d4ef99]/50 bg-[#d4ef99]/12 px-4 py-2.5 text-sm font-semibold text-[#e8f8bf] transition hover:bg-[#d4ef99]/18 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="isRolling"
            @click="rollDice"
          >
            {{ isRolling ? "Rolling..." : "Roll dice" }}
          </button>
        </div>

        <div v-if="rollLog.length" class="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p class="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Recent rolls
          </p>
          <div class="space-y-2">
            <div
              v-for="(entry, index) in rollLog"
              :key="`${entry.dice}-${entry.value}-${index}`"
              class="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 text-sm"
            >
              <span class="text-white/75">
                {{ entry.dice }} <span class="text-white/45">rolled</span>
                {{ entry.value }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(212,239,153,0.09),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-3 py-6 sm:px-6">
        <DiceRollVisualization
          ref="vizRef"
          :dice-type="selectedDice"
          :affinity="selectedAffinity"
          :result="currentResult"
          :scale="0.92"
          :spin-duration="spinDuration"
          :settle-duration="settleDuration"
          @roll-complete="onRollComplete"
          @click="rollDice"
        />
      </div>
    </div>
  </section>
</template>
