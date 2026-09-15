<script setup lang="ts">
import { experience } from "~/data/experience";

const { leadHref, leadEndpoint } = useLeadContact();
definePageMeta({ alias: ["/en/consulting"] });

const { locale, isRussian, localePath } = useSiteLocale();
const currentClients = experience.filter((period) => period.current).flatMap((period) => period.projects);
const copy = computed(() =>
  isRussian.value
    ? {
        title: "ИТ-консалтинг для бизнеса | Данил Родин",
        description:
          "Разработка и запуск продуктов, интеграции, серверы и сети, помощь командам разработки. Данил Родин — ведущий разработчик с опытом Dallari, Sababuu, Домиленда и инфраструктуры отеля «Бристоль».",
        eyebrow: "Данил Родин / ИТ для малого и среднего бизнеса",
        heading: "Помогу запустить продукт и наладить ИТ вашего бизнеса",
        intro:
          "Нужно запустить сервис, связать несколько систем или разобраться, почему приложение и сеть работают нестабильно? Я разрабатывал продукты с нуля, руководил командами и обслуживал серверы. Помогу выбрать решение и довести его до работающего результата.",
        cta: "Обсудить задачу в Telegram",
        secondary: "Посмотреть, чем я могу помочь ↓",
        note: "Можно начать с описания проблемы своими словами — техническое задание не обязательно.",
        servicesTitle: "С чем ко мне можно обратиться",
        services: [
          {
            title: "Запустить или развить продукт",
            text: "Спроектирую серверную часть, API и базу данных, разработаю веб-приложение или помогу с мобильным. Возьму на себя путь от первого рабочего варианта до запуска и последующих доработок.",
            result: "Результат: работающий продукт с согласованными функциями и понятной архитектурой для дальнейшего развития.",
          },
          {
            title: "Связать системы и убрать ручную работу",
            text: "Соединю сервисы через API, настрою обмен данными и уведомления. Разработаю интеграцию с внешним поставщиком, внутренний сервис или корпоративный портал.",
            result: "Результат: автоматизированный обмен данными с обработкой ошибок и меньшим количеством повторного ввода.",
          },
          {
            title: "Подготовить приложение к росту",
            text: "Найду узкие места в серверной части и базе данных. Помогу перенести данные и файлы, настроить автоматическую сборку и выпуск обновлений, подобрать инфраструктуру под нагрузку.",
            result: "Результат: проверенные изменения, воспроизводимый выпуск обновлений и план переноса с возможностью отката.",
          },
          {
            title: "Помочь команде разработки",
            text: "Помогу превратить требования бизнеса в технические задачи, выбрать архитектуру и проверить код. Подключусь к сложной реализации и помогу разработчикам освоить подходы, которые они смогут поддерживать самостоятельно.",
            result: "Результат: согласованные технические решения, задачи с приоритетами и переданные команде знания.",
          },
          {
            title: "Наладить серверы, сеть и рабочие места",
            text: "Возьму на себя системное администрирование: Linux и Windows, доступы сотрудников, локальную сеть, Wi-Fi, VPN, резервные копии и мониторинг. Помогу разобраться с унаследованной инфраструктурой.",
            result:
              "Результат: настроенная инфраструктура, документация и согласованный порядок обслуживания.",
          },
          {
            title: "Разобраться, что происходит с ИТ",
            text: "Изучу код, серверы и связи между системами, найду причины сбоев. Помогу оценить предложения подрядчиков и определить, какие изменения действительно нужны бизнесу.",
            result:
              "Результат: понятный список проблем и план действий с приоритетами.",
          },
        ],
        storyTitle: "Опыт разработки, инфраструктуры и руководства",
        story: [
          "Я Данил Родин. Работаю в ИТ с 2015 года: начинал с сайтов и системного администрирования, затем перешёл к разработке продуктов. В Umbrella IT руководил командами из 3–6 разработчиков, проектировал архитектуру и сам писал код. В Sababuu отвечал за разработку приложения и инфраструктуру.",
          "Этот опыт позволяет разбирать задачу целиком: от того, что нужно пользователю, до кода, базы данных и сервера. Могу самостоятельно выполнить работу или подключиться к вашей команде — с понятным объёмом ответственности и передачей знаний.",
        ],
        experienceLabel: "Все проекты и этапы работы →",
        clientsTitle: "С кем работаю сейчас",
        clientsText: "В 2026 году параллельно работаю с тремя клиентами:",
        evidenceTitle: "Задачи, которые я уже решал",
        evidence: [
          {
            title: "Dallari и Rent Responsibly — запуск с нуля",
            text: "Разработал и запустил маркетплейс для продуктовой розницы и платформу сообществ арендодателей в США. Для Dallari спроектировал отдельный сервис обмена данными с учётной системой.",
          },
          {
            title: "Sababuu — приложение и инфраструктура",
            text: "Перевёл базу с MySQL на PostgreSQL, настроил Kubernetes с автоматическим масштабированием под нагрузку и выпуском обновлений через GitOps. Руководил переходом от приложения с WebView к полноценному React Native-приложению.",
          },
          {
            title: "Домиленд — интеграции и хранение файлов",
            text: "Интегрировал Ujin для управления устройствами умного дома. Перенёс хранение файлов из локального хранилища на сервере в S3 Object Storage.",
          },
          {
            title: "Пкаско — быстрее расчёты, больше интеграций",
            text: "Подключал API страховых компаний и разрабатывал административную часть агрегатора ОСАГО и КАСКО. Оптимизировал расчёт страховых премий, сократив время ответа примерно на 20–30%.",
          },
          {
            title: "«Бристоль» — сервер и сеть работающего отеля",
            text: "Обновил сервер с 4 до 20 ядер без замены всей платформы. Восстановил схему сети и поэтапно заменил корневые коммутаторы, сохранив оборудование для отката и задокументировав соединения.",
            links: [
              { path: "/blog/2026-09-04-hotel-admin-part-1", label: "Обновление сервера →" },
              { path: "/blog/2026-09-07-hotel-admin-part-2", label: "Замена сети →" },
            ],
          },
          {
            title: "«РУСТ» — ИТ для более 200 пользователей",
            text: "Обслуживал серверы и сеть, ввёл в домен более 150 компьютеров. Создал корпоративный портал с авторизацией через Active Directory и единым справочником сотрудников.",
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
        contactTitle: "Обсудим вашу задачу",
        contactText:
          "Расскажите, что хотите запустить или улучшить, что уже есть и кто работает над задачей. Если возник сбой — опишите, кому он мешает и насколько срочно нужно разобраться.",
        emailLabel: "Или напишите на почту",
      }
    : {
        title: "IT consulting for businesses | Danil Rodin",
        description:
          "Product development, integrations, servers, networks and engineering team support. Danil Rodin, a lead developer with experience at Dallari, Sababuu, Domiland and Bristol Hotel.",
        eyebrow: "Danil Rodin / IT for small and medium businesses",
        heading: "Helping you launch products and get your business IT in order",
        intro:
          "Need to launch a service, connect several systems or understand why your application and network are unreliable? I have built products from scratch, led teams and maintained servers. I can help choose a solution and deliver it.",
        cta: "Discuss your task on Telegram",
        secondary: "See how I can help ↓",
        note: "Start by describing the problem in your own words. You do not need a technical specification.",
        servicesTitle: "What I can help with",
        services: [
          {
            title: "Launch or develop a product",
            text: "I design backends, APIs and databases, build web applications and help with mobile development. I can take a product from its first working version through launch and subsequent improvements.",
            result: "Outcome: a working product with agreed features and a clear architecture for further development.",
          },
          {
            title: "Connect systems and reduce manual work",
            text: "I connect services through APIs and set up data exchange and notifications. I can build an integration with an external provider, an internal service or an intranet portal.",
            result: "Outcome: automated data exchange with error handling and less duplicate data entry.",
          },
          {
            title: "Prepare an application for growth",
            text: "I investigate backend and database bottlenecks, help migrate data and files, automate builds and releases, and select infrastructure for your workload.",
            result: "Outcome: verified changes, repeatable releases and a migration plan with a rollback option.",
          },
          {
            title: "Support your engineering team",
            text: "I help translate business requirements into technical tasks, choose architecture and review code. I can take on complex implementation work and help developers adopt approaches they can maintain independently.",
            result: "Outcome: agreed technical decisions, prioritised tasks and knowledge shared with the team.",
          },
          {
            title: "Look after servers, networks and workstations",
            text: "I handle system administration: Linux and Windows, staff access, local networks, Wi-Fi, VPNs, backups and monitoring. I can also untangle inherited infrastructure.",
            result:
              "Outcome: configured infrastructure, documentation and an agreed maintenance process.",
          },
          {
            title: "Understand what is happening with your IT",
            text: "I review code, servers and connections between systems to find the causes of failures. I can assess vendor proposals and identify the changes your business actually needs.",
            result:
              "Outcome: a clear list of issues and a prioritised action plan.",
          },
        ],
        storyTitle: "Experience in development, infrastructure and leadership",
        story: [
          "I'm Danil Rodin. I have worked in IT since 2015, starting with websites and system administration before moving into product development. At Umbrella IT, I led teams of 3–6 developers, designed architecture and wrote code. At Sababuu, I was responsible for application development and infrastructure.",
          "This background lets me work through a problem as a whole, from user needs to code, databases and servers. I can deliver the work independently or join your team, with a clear scope of responsibility and knowledge transfer.",
        ],
        experienceLabel: "All projects and career milestones →",
        clientsTitle: "Who I work with now",
        clientsText: "In 2026, I am working with three clients in parallel:",
        evidenceTitle: "Problems I have already solved",
        evidence: [
          {
            title: "Dallari and Rent Responsibly — built from scratch",
            text: "Built and launched a grocery retail marketplace and a platform for US landlord communities. For Dallari, I designed a dedicated service to exchange data with the client's accounting system.",
          },
          {
            title: "Sababuu — application and infrastructure",
            text: "Migrated the database from MySQL to PostgreSQL and set up Kubernetes with load-based autoscaling and GitOps releases. Led the move from a WebView-based application to a full React Native app.",
          },
          {
            title: "Domiland — integrations and file storage",
            text: "Integrated Ujin for smart home device management. Migrated file storage from local storage on the server to S3 Object Storage.",
          },
          {
            title: "PKASKO — faster calculations, more integrations",
            text: "Integrated insurer APIs and developed the administration interface for a car insurance aggregator. Optimised premium calculations, reducing response times by approximately 20–30%.",
          },
          {
            title: "Bristol — servers and networking in an operating hotel",
            text: "Upgraded the server from 4 to 20 cores without replacing the entire platform. Mapped the network and replaced core switches in stages, retaining hardware for rollback and documenting the connections.",
            links: [
              { path: "/blog/2026-09-04-hotel-admin-part-1", label: "Server upgrade →" },
              { path: "/blog/2026-09-07-hotel-admin-part-2", label: "Network migration →" },
            ],
          },
          {
            title: "RUST — IT for over 200 users",
            text: "Maintained servers and networking and joined over 150 computers to the domain. Built an intranet portal with Active Directory sign-in and a shared employee directory.",
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
        contactTitle: "Let's discuss your task",
        contactText:
          "Tell me what you want to launch or improve, what you already have and who is working on it. If something has failed, describe who is affected and how urgently it needs attention.",
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
  <article class="consulting mx-auto w-full max-w-4xl px-3 pb-12 text-left sm:px-6">
    <header class="py-7 sm:py-12">
      <p class="text-sm text-[#d4ef99]">{{ copy.eyebrow }}</p>
      <h1 class="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
        {{ copy.heading }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
        {{ copy.intro }}
      </p>
      <div class="mt-7 flex flex-wrap items-center gap-5">
        <a :href="leadHref" :data-lead-endpoint="leadEndpoint" class="contact-link"
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
      <div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
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
      <NuxtLink
        :to="localePath('/experience')"
        class="mt-5 inline-block text-sm underline decoration-[#d4ef99]/40 underline-offset-4"
        >{{ copy.experienceLabel }}</NuxtLink
      >
      <div class="mt-7 rounded-xl border border-white/10 p-5">
        <h3 class="text-lg">{{ copy.clientsTitle }}</h3>
        <p class="mt-2 text-sm text-white/65">{{ copy.clientsText }}</p>
        <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <li v-for="client in currentClients" :key="client.href">
            <a :href="client.href" target="_blank" rel="noopener noreferrer" class="underline decoration-[#d4ef99]/40 underline-offset-4">
              {{ client.name[locale] }} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section aria-labelledby="evidence-title" class="section">
      <h2 id="evidence-title">{{ copy.evidenceTitle }}</h2>
      <div class="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div
          v-for="item in copy.evidence"
          :key="item.title"
          class="border-l-2 border-[#d4ef99]/40 pl-5"
        >
          <h3 class="text-xl">{{ item.title }}</h3>
          <p class="mt-2 text-white/75">{{ item.text }}</p>
          <NuxtLink
            v-for="link in item.links"
            :key="link.path"
            :to="localePath(link.path)"
            class="mr-4 mt-3 inline-block text-sm underline decoration-[#d4ef99]/40 underline-offset-4"
            >{{ link.label }}</NuxtLink
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
      <a :href="leadHref" :data-lead-endpoint="leadEndpoint" class="contact-link mt-6"
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
