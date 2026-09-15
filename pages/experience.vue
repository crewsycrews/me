<script setup lang="ts">
import { experience } from "~/data/experience";

definePageMeta({ alias: ["/en/experience"] });

const { locale, isRussian } = useSiteLocale();
const heading = isRussian.value ? "Опыт" : "Experience";

// Keep alternation continuous across years, including years with several clients.
const periods = computed(() => {
  let projectIndex = 0;
  return experience.map((period) => ({
    ...period,
    projects: period.projects.map((project) => ({
      ...project,
      side: projectIndex++ % 2 === 0 ? "left" : "right",
    })),
  }));
});

usePageSeo({
  title: `${heading} | ${isRussian.value ? "Данил Родин" : "Danil Rodin"}`,
  description: isRussian.value
    ? "Опыт Данила Родина: проекты, разработка продуктов, руководство командами и системное администрирование. От первых сайтов до Sababuu и работы с текущими клиентами."
    : "Danil Rodin's experience: software projects, team leadership and system administration. From early websites to Sababuu and current client work.",
  locale: locale.value,
  path: "/experience",
  breadcrumbs: [
    { name: isRussian.value ? "Главная" : "Home", path: "/" },
    { name: heading, path: "/experience" },
  ],
});
</script>

<template>
  <article class="experience mx-auto w-full max-w-5xl px-3 pb-16 text-left sm:px-6">
    <header class="mx-auto max-w-2xl pb-10 pt-5 text-center sm:pb-14 sm:pt-8">
      <p class="text-sm text-[#d4ef99]">{{ isRussian ? "Данил Родин / Профессиональный путь" : "Danil Rodin / Career journey" }}</p>
      <h1 class="mt-3 text-4xl sm:text-5xl">{{ isRussian ? "Опыт" : "Experience" }}</h1>
      <p class="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
        {{ isRussian
          ? "От первых сайтов и серверов до продуктов и команд. Проекты, над которыми я работал, и то, что помог им сделать."
          : "From early websites and servers to products and teams. The projects I worked on and what I helped them achieve." }}
      </p>
    </header>

    <ol class="timeline" :aria-label="isRussian ? 'Опыт работы от нового к старому' : 'Work experience, newest first'">
      <li v-for="period in periods" :key="period.year" class="timeline-period">
        <header class="period-heading">
          <h2 class="year" :class="{ 'year-current': period.current }">
            <time :datetime="String(period.year)">{{ period.year }}</time>
          </h2>
          <p v-if="period.note" class="period-note">{{ period.note[locale] }}</p>
        </header>

        <ol class="project-list">
          <li
            v-for="(project, index) in period.projects"
            :key="`${period.year}-${index}`"
            class="timeline-row"
            :class="[`timeline-row-${project.side}`, { 'timeline-row-current': period.current }]"
          >
            <span class="timeline-dot" aria-hidden="true" />
            <article class="project-card">
              <p class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-relaxed text-white/60 sm:text-sm">
                <span>{{ period.period[locale] }}</span>
                <span v-if="period.current" class="current-badge">{{ isRussian ? "Сейчас" : "Now" }}</span>
              </p>
              <h3 class="mt-3 text-xl leading-tight sm:text-2xl">
                <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer" class="project-link">
                  {{ project.name[locale] }} <span aria-hidden="true">↗</span>
                </a>
                <span v-else>{{ project.name[locale] }}</span>
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-[#d4ef99]/80">{{ period.role[locale] }}</p>
              <p class="mt-4 text-base leading-relaxed text-white/75">{{ project.description[locale] }}</p>
            </article>
          </li>
        </ol>
      </li>
    </ol>
  </article>
</template>

<style scoped>
.timeline {
  --axis: 0.625rem;
  position: relative;
  isolation: isolate;
}
.timeline::before {
  position: absolute;
  z-index: -1;
  top: 1.5rem;
  bottom: 0;
  left: var(--axis);
  width: 1px;
  background: linear-gradient(to bottom, #d4ef99, rgb(212 239 153 / 0.25) 18%, rgb(255 255 255 / 0.15) 92%, transparent);
  content: "";
}
.timeline-period + .timeline-period {
  margin-top: 2rem;
}
.period-heading {
  position: relative;
  margin-bottom: 1.75rem;
  padding-left: 2.25rem;
}
.year {
  display: inline-block;
  border: 1px solid rgb(255 255 255 / 0.2);
  border-radius: 999px;
  background: #0f0f0f;
  padding: 0.4rem 1rem;
  color: #d4ef99;
  font-size: 1.25rem;
  line-height: 1.4;
}
.year-current {
  border-color: rgb(212 239 153 / 0.5);
}
.period-note {
  position: relative;
  margin: 0.75rem auto 0;
  max-width: 34rem;
  background: #0f0f0f;
  padding-block: 0.5rem;
  color: rgb(255 255 255 / 0.6);
  font-size: 0.875rem;
  line-height: 1.6;
}
.timeline-row {
  position: relative;
  padding-left: 2.25rem;
  padding-bottom: 1.5rem;
}
.timeline-dot {
  position: absolute;
  top: 1.75rem;
  left: var(--axis);
  width: 0.625rem;
  height: 0.625rem;
  transform: translateX(-50%);
  border: 1px solid #d4ef99;
  border-radius: 50%;
  background: #0f0f0f;
  box-shadow: 0 0 0 5px #0f0f0f;
}
.timeline-row-current .timeline-dot {
  background: #d4ef99;
}
.project-card {
  position: relative;
  min-width: 0;
  border: 1px solid rgb(255 255 255 / 0.12);
  border-radius: 1rem;
  background: #151613;
  padding: 1.25rem;
  overflow-wrap: anywhere;
}
.project-card::before {
  position: absolute;
  top: 2rem;
  right: 100%;
  width: 1rem;
  height: 1px;
  background: rgb(212 239 153 / 0.3);
  content: "";
}
.timeline-row-current .project-card {
  border-color: rgb(212 239 153 / 0.25);
}
.current-badge {
  border-radius: 999px;
  background: rgb(212 239 153 / 0.1);
  padding: 0.15rem 0.5rem;
  color: #d4ef99;
  font-size: 0.75rem;
}
.project-link:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.project-link:focus-visible {
  border-radius: 0.125rem;
  outline: 2px solid #d4ef99;
  outline-offset: 4px;
}
@media (min-width: 768px) {
  .timeline {
    --axis: 50%;
  }
  .period-heading {
    padding-left: 0;
    text-align: center;
  }
  .period-note {
    padding: 0.75rem 1rem;
  }
  .timeline-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 4rem minmax(0, 1fr);
    padding-left: 0;
    padding-bottom: 1rem;
  }
  .timeline-row-left .project-card {
    grid-column: 1;
  }
  .timeline-row-right .project-card {
    grid-column: 3;
  }
  .project-card {
    padding: 1.5rem;
  }
  .project-card::before {
    width: 2rem;
  }
  .timeline-row-left .project-card::before {
    right: auto;
    left: 100%;
  }
}
</style>
