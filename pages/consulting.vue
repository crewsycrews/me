<script setup lang="ts">
definePageMeta({ alias: ["/en/consulting"] });

const { locale, isRussian, localePath } = useSiteLocale();
const copy = computed(() =>
  isRussian.value
    ? {
        title: "ИТ-консалтинг для бизнеса | Данил Родин",
        description:
          "Помогаю малому и среднему бизнесу разобраться в ИТ, наладить серверы и сети, автоматизировать процессы и развивать сервисы. Данил Родин — разработчик и системный администратор.",
        eyebrow: "Данил Родин / ИТ для малого и среднего бизнеса",
        heading: "Помогу привести ИТ в порядок и развивать ваш бизнес",
        intro:
          "Сайт тормозит, сеть работает нестабильно, сотрудники переносят данные вручную, а предложения подрядчиков сложно сравнить? Разберусь в ситуации, объясню варианты и возьму на себя техническую работу.",
        cta: "Обсудить задачу в Telegram",
        secondary: "Посмотреть, чем я могу помочь ↓",
        note: "Можно начать с описания проблемы своими словами — техническое задание не обязательно.",
        servicesTitle: "С чем ко мне можно обратиться",
        services: [
          {
            title: "Разобраться, что происходит с ИТ",
            text: "Изучу, как устроены ваши системы, где возникают сбои и что мешает работе. Помогу оценить предложения подрядчиков и выбрать, за что браться первым.",
            result:
              "Результат: понятный список проблем и план действий с приоритетами.",
          },
          {
            title: "Наладить серверы, сеть и рабочие места",
            text: "Возьму на себя системное администрирование: Linux и Windows, доступы сотрудников, локальную сеть, Wi-Fi, VPN, резервные копии и мониторинг. Помогу разобраться с унаследованной инфраструктурой.",
            result:
              "Результат: настроенная инфраструктура, документация и согласованный порядок обслуживания.",
          },
          {
            title: "Убрать ручную работу и связать сервисы",
            text: "Соединю системы через API, настрою передачу данных и уведомления. Разработаю внутренний инструмент, если готовые решения не закрывают задачу.",
            result:
              "Результат: работающий процесс с меньшим количеством повторного ввода данных.",
          },
          {
            title: "Доработать сайт или запустить сервис",
            text: "Помогу с существующим кодом, базой данных и размещением приложения. Могу пройти путь от идеи и первого рабочего варианта до развития продукта вместе с вашей командой.",
            result:
              "Результат: согласованные функции, проверенные в работе, и понятный следующий шаг.",
          },
        ],
        storyTitle: "От рабочих мест до продуктов и команд",
        story: [
          "Я Данил Родин. Мой путь в ИТ начался с сайтов и работы с рекламой. Затем я стал системным администратором в группе компаний «РУСТ»: поддерживал более 200 пользователей, вводил в домен более 150 компьютеров, занимался серверами, сетью и корпоративными сервисами.",
          "Позже перешёл в разработку: делал интеграции для страхового бизнеса, работал над сервисами для жилых домов в «Домиленд», вырос до тимлида в Umbrella IT. В международном стартапе занимался приложением, переносом базы данных и инфраструктурой его запуска.",
          "Сейчас этот опыт сходится в практических задачах: я могу разобраться и в приложении, и в сервере, на котором оно работает. Поддерживаю инфраструктуру отеля — от физического оборудования до сети. Мне важно понимать, как техническое решение повлияет на работу людей.",
        ],
        evidenceTitle: "Что стоит за этим опытом",
        evidence: [
          {
            title: "Сервер работающего отеля",
            text: "Подобрал совместимый процессор и заменил его в ночное окно обслуживания. Сервер перешёл с 4 на 20 ядер без замены всей платформы.",
            link: "/blog/2026-09-04-hotel-admin-part-1",
            label: "Как проходил апгрейд →",
          },
          {
            title: "Сеть, которую можно обслуживать",
            text: "Восстановил фактическую схему сети отеля и поэтапно заменил корневые коммутаторы. Сохранил старое оборудование для отката и задокументировал соединения.",
            link: "/blog/2026-09-07-hotel-admin-part-2",
            label: "История замены сети →",
          },
          {
            title: "Разработка и интеграции",
            text: "В страховом сервисе интегрировал калькуляторы компаний через API и разрабатывал административную часть. Такой опыт полезен, когда несколько систем нужно связать в один рабочий процесс.",
            link: "/about",
            label: "Больше обо мне и технологиях →",
          },
        ],
        processTitle: "Как будем работать",
        steps: [
          {
            title: "Обсудим ситуацию",
            text: "Расскажите, чем занимается бизнес, что сейчас не работает или чего хотите добиться. Определим, какую задачу имеет смысл решать.",
          },
          {
            title: "Согласуем объём и стоимость",
            text: "Предложу следующий шаг: консультацию, обследование или конкретную работу. До начала договоримся о результате, сроках и цене. Если нужна диагностика, отдельно определим её объём.",
          },
          {
            title: "Выполним и проверим",
            text: "Внесу согласованные изменения, проверю результат и передам документацию. Для действующих систем заранее обсудим окно работ и способ возврата к прежнему состоянию.",
          },
        ],
        format:
          "Можно обратиться за разовой консультацией, отдельным проектом или регулярным сопровождением. Я в Таганроге, работаю удалённо; необходимость и возможность выезда обсудим отдельно. График поддержки и время реакции согласуем под вашу задачу.",
        contactTitle: "Расскажите, что мешает вашему бизнесу",
        contactText:
          "Напишите, чем занимается компания, какая задача возникла и насколько она срочная. Этого достаточно, чтобы начать разговор и определить следующий шаг.",
        emailLabel: "Или напишите на почту",
      }
    : {
        title: "IT consulting for businesses | Danil Rodin",
        description:
          "IT consulting, system administration, automation and software development for small and medium businesses. Work directly with Danil Rodin.",
        eyebrow: "Danil Rodin / IT for small and medium businesses",
        heading: "Helping you get IT in order and move your business forward",
        intro:
          "A slow website, an unreliable network, manual data entry or vendor proposals that are hard to compare? I can investigate, explain your options and take on the technical work.",
        cta: "Discuss your task on Telegram",
        secondary: "See how I can help ↓",
        note: "Start by describing the problem in your own words. You do not need a technical specification.",
        servicesTitle: "What I can help with",
        services: [
          {
            title: "Understand what is happening with your IT",
            text: "I review your systems, investigate failures and identify what gets in the way. I can help assess vendor proposals and decide what to tackle first.",
            result:
              "Outcome: a clear list of issues and a prioritised action plan.",
          },
          {
            title: "Look after servers, networks and workstations",
            text: "I handle system administration: Linux and Windows, staff access, local networks, Wi-Fi, VPNs, backups and monitoring. I can also untangle inherited infrastructure.",
            result:
              "Outcome: configured infrastructure, documentation and an agreed maintenance process.",
          },
          {
            title: "Connect services and reduce manual work",
            text: "I integrate systems through APIs and set up data transfers and notifications. Where existing products do not fit, I can build an internal tool.",
            result:
              "Outcome: a working process with less duplicate data entry.",
          },
          {
            title: "Improve a website or launch a service",
            text: "I work with existing code, databases and application hosting. I can take an idea through its first working version and continue developing it with your team.",
            result:
              "Outcome: agreed features verified in use and a clear next step.",
          },
        ],
        storyTitle: "From workstations to products and teams",
        story: [
          "I'm Danil Rodin. I started with websites and advertising, then became a system administrator at RUST Group. I supported over 200 users, joined over 150 computers to the domain and looked after servers, networking and internal services.",
          "I later moved into software development: insurance integrations, residential building services at Domiland and a team lead role at Umbrella IT. At an international startup, I worked on the application, a database migration and deployment infrastructure.",
          "Today, these skills come together in practical work: I can investigate both an application and the server it runs on. I also maintain hotel infrastructure, from physical hardware to networking. I care about how technical decisions affect the people using these systems.",
        ],
        evidenceTitle: "Experience behind the offer",
        evidence: [
          {
            title: "A server in an operating hotel",
            text: "I selected a compatible CPU and installed it during a night maintenance window. The server went from 4 to 20 cores without replacing the entire platform.",
            link: "/blog/2026-09-04-hotel-admin-part-1",
            label: "Read about the upgrade →",
          },
          {
            title: "A network that can be maintained",
            text: "I mapped the hotel's actual network and replaced the core switches in stages. I kept the old equipment ready for rollback and documented the connections.",
            link: "/blog/2026-09-07-hotel-admin-part-2",
            label: "Read about the network migration →",
          },
          {
            title: "Software and integrations",
            text: "For an insurance service, I integrated insurers' calculators through APIs and developed the administration interface. This experience helps when separate systems need to become a working process.",
            link: "/about",
            label: "More about my background and tools →",
          },
        ],
        processTitle: "How we can work together",
        steps: [
          {
            title: "Discuss the situation",
            text: "Tell me about your business, what is not working or what you want to achieve. We will identify the problem worth solving.",
          },
          {
            title: "Agree on scope and cost",
            text: "I will suggest a consultation, an assessment or a specific piece of work. We agree on the outcome, timing and price before starting. If diagnosis is needed, we scope it separately.",
          },
          {
            title: "Implement and verify",
            text: "I make the agreed changes, check the outcome and hand over documentation. For live systems, we discuss a maintenance window and a rollback plan in advance.",
          },
        ],
        format:
          "You can engage me for a consultation, a project or ongoing support. I am based in Taganrog and work remotely; we can discuss the need and feasibility of a site visit separately. Support hours and response times are agreed for your task.",
        contactTitle: "Tell me what is holding your business back",
        contactText:
          "Describe what your company does, the task you have and how urgent it is. That is enough to start a conversation and decide on the next step.",
        emailLabel: "Or send me an email",
      },
);

usePageSeo({
  title: copy.value.title,
  description: copy.value.description,
  locale: locale.value,
  path: "/consulting",
  breadcrumbs: [
    { name: isRussian.value ? "Главная" : "Home", path: "/" },
    {
      name: isRussian.value ? "Для бизнеса" : "For business",
      path: "/consulting",
    },
  ],
});
</script>

<template>
  <article class="consulting mx-auto max-w-4xl px-3 pb-12 text-left sm:px-6">
    <header class="py-7 sm:py-12">
      <p class="text-sm text-[#d4ef99]">{{ copy.eyebrow }}</p>
      <h1 class="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
        {{ copy.heading }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
        {{ copy.intro }}
      </p>
      <div class="mt-7 flex flex-wrap items-center gap-5">
        <a href="https://t.me/casiq" class="contact-link"
          >{{ copy.cta }} <span aria-hidden="true">↗</span></a
        >
        <a
          href="#services"
          class="text-sm underline decoration-[#d4ef99]/40 underline-offset-4"
          >{{ copy.secondary }}</a
        >
      </div>
      <p class="mt-4 max-w-xl text-sm text-white/60">{{ copy.note }}</p>
    </header>

    <section id="services" aria-labelledby="services-title" class="section">
      <h2 id="services-title">{{ copy.servicesTitle }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          v-for="service in copy.services"
          :key="service.title"
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <h3 class="text-xl leading-snug text-[#d4ef99]">
            {{ service.title }}
          </h3>
          <p class="mt-3 text-white/75">{{ service.text }}</p>
          <p class="mt-4 border-t border-white/10 pt-4 text-sm">
            {{ service.result }}
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="story-title" class="section">
      <div class="flex items-center gap-5">
        <img
          src="/assets/images/avatar.png"
          :alt="isRussian ? 'Данил Родин' : 'Danil Rodin'"
          width="80"
          height="80"
          loading="lazy"
          class="h-20 w-20 shrink-0 rounded-xl border border-[#d4ef99]/40 object-cover"
        />
        <h2 id="story-title">{{ copy.storyTitle }}</h2>
      </div>
      <p
        v-for="paragraph in copy.story"
        :key="paragraph"
        class="mt-5 text-white/75"
      >
        {{ paragraph }}
      </p>
    </section>

    <section aria-labelledby="evidence-title" class="section">
      <h2 id="evidence-title">{{ copy.evidenceTitle }}</h2>
      <div class="mt-6 space-y-7">
        <div
          v-for="item in copy.evidence"
          :key="item.title"
          class="border-l-2 border-[#d4ef99]/40 pl-5"
        >
          <h3 class="text-xl">{{ item.title }}</h3>
          <p class="mt-2 text-white/75">{{ item.text }}</p>
          <NuxtLink
            :to="localePath(item.link)"
            class="mt-3 inline-block text-sm underline decoration-[#d4ef99]/40 underline-offset-4"
            >{{ item.label }}</NuxtLink
          >
        </div>
      </div>
    </section>

    <section aria-labelledby="process-title" class="section">
      <h2 id="process-title">{{ copy.processTitle }}</h2>
      <ol class="mt-6 space-y-6">
        <li
          v-for="(step, index) in copy.steps"
          :key="step.title"
          class="flex gap-4"
        >
          <span aria-hidden="true" class="pt-1 text-sm text-[#d4ef99]"
            >0{{ index + 1 }}</span
          >
          <div>
            <h3 class="text-xl">{{ step.title }}</h3>
            <p class="mt-2 text-white/75">{{ step.text }}</p>
          </div>
        </li>
      </ol>
      <p
        class="mt-7 rounded-xl border border-white/10 p-5 text-sm text-white/70"
      >
        {{ copy.format }}
      </p>
    </section>

    <section
      aria-labelledby="contact-title"
      class="mt-10 rounded-2xl border border-[#d4ef99]/30 bg-[#d4ef99]/[0.04] p-6 sm:p-8"
    >
      <h2 id="contact-title">{{ copy.contactTitle }}</h2>
      <p class="mt-4 max-w-2xl text-white/75">{{ copy.contactText }}</p>
      <a href="https://t.me/casiq" class="contact-link mt-6"
        >{{ copy.cta }} <span aria-hidden="true">↗</span></a
      >
      <p class="mt-4 text-sm text-white/60">
        {{ copy.emailLabel }}:
        <a href="mailto:danre1@bk.ru" class="underline underline-offset-4"
          >danre1@bk.ru</a
        >
      </p>
    </section>
  </article>
</template>

<style scoped>
.consulting {
  line-height: 1.65;
}
.consulting h2 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}
.section {
  border-top: 1px solid rgb(255 255 255 / 0.1);
  padding-block: 2rem;
  scroll-margin-top: 8rem;
}
.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgb(212 239 153 / 0.5);
  border-radius: 0.5rem;
  background: rgb(212 239 153 / 0.1);
  padding: 0.75rem 1rem;
  transition: background-color 0.15s;
}
.contact-link:hover {
  background: rgb(212 239 153 / 0.18);
}
.consulting a:focus-visible {
  outline: 2px solid #d4ef99;
  outline-offset: 4px;
}
</style>
