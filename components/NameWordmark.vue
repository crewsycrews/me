<script setup lang="ts">
const artwork = ref<SVGSVGElement | null>(null);
const cycleMs = 17000;
const waveStartMs = 6000;

const glyphs = [
  { id: "d", x: 12, width: 80, delayMs: 0, durationMs: 1875 },
  { id: "i-first", x: 207.1, width: 44, delayMs: 325, durationMs: 875 },
  { id: "r", x: 303.4, width: 76, delayMs: 712.5, durationMs: 1437.5 },
  { id: "i-last", x: 497.4, width: 44, delayMs: 1100, durationMs: 687.5 },
];

let motionPreference: MediaQueryList | undefined;
let animations: Animation[] = [];

function stopAnimations() {
  animations.forEach((animation) => animation.cancel());
  animations = [];
}

function startAnimations() {
  stopAnimations();
  if (!artwork.value || motionPreference?.matches) return;

  const animate = (element: Element, frames: Keyframe[]) => {
    animations.push(element.animate(frames, {
      duration: cycleMs,
      iterations: Infinity,
      easing: "linear",
    }));
  };

  glyphs.forEach((glyph) => {
    const slot = artwork.value!.querySelector(`.glyph--${glyph.id}`)!;
    const start = waveStartMs + glyph.delayMs;
    const end = start + glyph.durationMs;
    const frame = (time: number, values: Keyframe): Keyframe => ({
      ...values, offset: time / cycleMs, easing: "ease-in-out",
    });

    // Both directions share the same stagger, with a complete word between waves.
    for (const [selector, from, to] of [
      [".glyph-runic", 1, 0], [".glyph-classic", 0, 1],
    ] as const) {
      slot.querySelectorAll(selector).forEach((element) => animate(element, [
        frame(0, { opacity: from }), frame(start, { opacity: from }),
        frame(end, { opacity: to }), frame(start + cycleMs / 2, { opacity: to }),
        frame(end + cycleMs / 2, { opacity: from }), frame(cycleMs, { opacity: from }),
      ]));
    }

    const pulse = (rest: Keyframe, peak: Keyframe): Keyframe[] => [
      frame(0, rest),
      ...[0, cycleMs / 2].flatMap((shift) => [
        frame(start + shift, rest),
        frame(start + glyph.durationMs / 2 + shift, peak),
        frame(end + shift, rest),
      ]),
      frame(cycleMs, rest),
    ];
    const style = getComputedStyle(slot);
    animate(slot.querySelector(".glyph-body")!, pulse(
      { transform: "none" }, { transform: style.getPropertyValue("--distortion").trim() },
    ));
    const scan = glyph.id === "i-first";
    animate(slot.querySelector(".glyph-echo")!, pulse(
      { opacity: 0, transform: "none", ...(scan ? { clipPath: "inset(12% 0 65% 0)" } : {}) },
      { opacity: scan ? 0.9 : 0.8, transform: style.getPropertyValue("--echo").trim(),
        ...(scan ? { clipPath: "inset(52% 0 22% 0)" } : {}) },
    ));
  });

  // Use one clock so only the intentional per-glyph offsets affect timing.
  const startTime = document.timeline.currentTime;
  animations.forEach((animation) => { animation.startTime = startTime; });
}

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPreference.addEventListener("change", startAnimations);
  startAnimations();
});

onBeforeUnmount(() => {
  motionPreference?.removeEventListener("change", startAnimations);
  stopAnimations();
});
</script>

<template>
  <h1 class="name-wordmark">
    <span class="sr-only">Danil Rodin</span>
    <svg ref="artwork" class="wordmark-art" viewBox="0 0 611.8 112" fill="#d4ef99" aria-hidden="true" focusable="false">
      <use href="/wordmark-glyphs.svg#stationary" width="611.8" height="112" />
      <svg
        v-for="glyph in glyphs"
        :key="glyph.id"
        :x="glyph.x"
        :width="glyph.width"
        height="112"
        :viewBox="`0 0 ${glyph.width} 112`"
        class="glyph-window"
        :class="`glyph--${glyph.id}`"
        :style="{ '--origin': `${glyph.width / 2}px 56px` }"
      >
        <g class="glyph-body">
          <use :href="`/wordmark-glyphs.svg#runic-${glyph.id}`" :width="glyph.width" height="112" class="glyph-runic" />
          <use :href="`/wordmark-glyphs.svg#classic-${glyph.id}`" :width="glyph.width" height="112" class="glyph-classic" />
        </g>
        <g class="glyph-echo">
          <use :href="`/wordmark-glyphs.svg#runic-${glyph.id}`" :width="glyph.width" height="112" class="glyph-runic" />
          <use :href="`/wordmark-glyphs.svg#classic-${glyph.id}`" :width="glyph.width" height="112" class="glyph-classic" />
        </g>
      </svg>
    </svg>
  </h1>
</template>

<style scoped>
.name-wordmark {
  width: min(100%, 38.25rem);
  margin-inline: auto;
  text-shadow: none;
}

.wordmark-art {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 0 12px rgba(40, 210, 40, 0.65));
}

/* Each slot clips its own distortion so neighboring letters stay untouched. */
.glyph-window {
  overflow: hidden;
}

.glyph-body,
.glyph-echo {
  transform-origin: var(--origin);
}

.glyph-classic,
.glyph-echo {
  opacity: 0;
}

/* D: opposing horizontal shear and a displaced middle band. */
.glyph--d {
  --distortion: translateX(-2px) skewX(5deg);
  --echo: translateX(7px) skewX(-8deg);
}

.glyph--d .glyph-echo {
  clip-path: inset(32% 0 38% 0);
  filter: drop-shadow(-2px 0 #84ded9);
}

/* First i: a vertical signal jump with a bright scanning strip. */
.glyph--i-first {
  --distortion: translateY(-4px) scaleY(1.08);
  --echo: translateY(7px) scaleY(0.9);
}

.glyph--i-first .glyph-echo {
  clip-path: inset(12% 0 65% 0);
  filter: drop-shadow(0 -2px #e6b4dd);
}

/* R: a diagonal tear through its bowl and shortened leg. */
.glyph--r {
  --distortion: skewX(-9deg) scaleX(0.94);
  --echo: translate(4px, -3px) skewX(12deg);
}

.glyph--r .glyph-echo {
  clip-path: polygon(0 15%, 100% 55%, 100% 75%, 0 35%);
  filter: drop-shadow(2px 1px #84ded9);
}

/* Last i: horizontal compression with a split column echo. */
.glyph--i-last {
  --distortion: scaleX(0.65) translateY(2px);
  --echo: translateX(-5px) scaleX(1.1);
}

.glyph--i-last .glyph-echo {
  clip-path: polygon(0 0, 45% 0, 45% 48%, 100% 48%, 100% 100%, 55% 100%, 55% 60%, 0 60%);
  filter: drop-shadow(3px 0 #e6b4dd);
}

@media (prefers-reduced-motion: reduce) {
  .glyph-classic,
  .glyph-echo {
    display: none;
  }
}
</style>
