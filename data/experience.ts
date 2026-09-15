type LocalizedText = { ru: string; en: string };

type ExperienceProject = {
  name: LocalizedText;
  description: LocalizedText;
  href?: string;
};

type ExperiencePeriod = {
  year: number;
  period: LocalizedText;
  role: LocalizedText;
  note?: LocalizedText;
  current?: boolean;
  projects: ExperienceProject[];
};

const text = (ru: string, en: string): LocalizedText => ({ ru, en });

// Years mark the start of each period, newest first. Projects within the same
// employer period share its dates: the CV does not give individual project dates.
export const experience: ExperiencePeriod[] = [
  {
    year: 2026,
    period: text("2026 — сейчас", "2026 — present"),
    role: text("Работа с клиентами", "Client work"),
    note: text("Сейчас работаю параллельно с тремя клиентами.", "Currently working with three clients in parallel."),
    current: true,
    projects: [
      {
        name: text("Dallari", "Dallari"),
        href: "https://dallari.ru",
        description: text(
          "Продолжаю развивать маркетплейс для независимой продуктовой розницы: работаю над приложением, серверной частью и интеграциями.",
          "Continuing to develop a marketplace for independent grocery retailers, working on the application, backend and integrations.",
        ),
      },
      {
        name: text("Спа-отель «Бристоль»", "Bristol Spa Hotel"),
        href: "https://spahotel-bristol.ru",
        description: text(
          "Поддерживаю ИТ-инфраструктуру отеля: серверы, сеть и оборудование. Обновил сервер и корневые коммутаторы, восстановил и задокументировал схему сети.",
          "Maintaining the hotel's IT infrastructure: servers, networking and hardware. Upgraded the server and core switches, mapped the network and documented its connections.",
        ),
      },
      {
        name: text("Готов", "Gotov"),
        href: "https://gotov.org",
        description: text(
          "Работаю над развитием цифровой платформы еврейских общин: веб-приложением и сервисами для пользователей и организаций.",
          "Working on a digital platform for Jewish communities, developing the web application and services for users and organisations.",
        ),
      },
    ],
  },
  {
    year: 2025,
    period: text("Январь 2025 — май 2026", "January 2025 — May 2026"),
    role: text("Ведущий разработчик", "Lead Developer"),
    projects: [
      {
        name: text("Sababuu", "Sababuu"),
        description: text(
          "Руководил разработкой дейтинг-приложения для африканского рынка. Перевёл базу на PostgreSQL, настроил Kubernetes и GitOps с автомасштабированием, возглавил переход на полноценное React Native-приложение и внедрил систему рекомендаций на основе RAG.",
          "Led development of a dating app for the African market. Migrated the database to PostgreSQL, set up Kubernetes and GitOps with autoscaling, led the move to a full React Native app and implemented RAG-based recommendations.",
        ),
      },
    ],
  },
  {
    year: 2021,
    period: text("Ноябрь 2021 — январь 2025", "November 2021 — January 2025"),
    role: text("Umbrella IT · Senior → Team Lead", "Umbrella IT · Senior → Team Lead"),
    note: text(
      "С марта 2022 — тимлид. Руководил командами из 3–6 разработчиков, проектировал архитектуру и помогал инженерам расти. Проекты ниже относятся к этому периоду работы в Umbrella IT.",
      "Team lead from March 2022. Led teams of 3–6 developers, designed architecture and mentored engineers. The projects below belong to this period at Umbrella IT.",
    ),
    projects: [
      {
        name: text("Dallari", "Dallari"),
        description: text(
          "Разработал и запустил с нуля маркетплейс для продуктовой розницы. Спроектировал отдельный сервис интеграции с учётной системой, чтобы связать данные маркетплейса и бизнеса.",
          "Built and launched a grocery retail marketplace from scratch. Designed a dedicated integration service connecting marketplace data with the client's accounting system.",
        ),
      },
      {
        name: text("Rent Responsibly", "Rent Responsibly"),
        description: text(
          "Разработал и запустил с нуля платформу для сообществ арендодателей в США — community.rentresponsibly.org. Работал над архитектурой и серверной частью сервиса.",
          "Built and launched community.rentresponsibly.org, a platform for US landlord communities, from scratch. Worked on the service's architecture and backend.",
        ),
      },
      {
        name: text("METRO C&C", "METRO C&C"),
        description: text(
          "Работал над e-commerce-решением для METRO в составе команды Umbrella IT: разрабатывал серверные сервисы и интеграционные компоненты.",
          "Worked on an e-commerce solution for METRO as part of the Umbrella IT team, developing backend services and integration components.",
        ),
      },
    ],
  },
  {
    year: 2020,
    period: text("Декабрь 2020 — ноябрь 2021", "December 2020 — November 2021"),
    role: text("Бэкенд-разработчик", "Backend Developer"),
    projects: [
      {
        name: text("Домиленд", "Domiland"),
        description: text(
          "Развивал платформу сервисов для жилых домов. Интегрировал Ujin для управления устройствами умного дома, перенёс хранение файлов из локального хранилища на сервере в S3 Object Storage и улучшил обработку типизированных запросов в Phalcon.",
          "Developed a residential services platform. Integrated Ujin for smart home device management, migrated file storage from local storage on the server to S3 Object Storage and improved typed request handling in Phalcon.",
        ),
      },
    ],
  },
  {
    year: 2019,
    period: text("Апрель 2019 — декабрь 2020", "April 2019 — December 2020"),
    role: text("Umbrella IT · Fullstack-разработчик", "Umbrella IT · Fullstack Developer"),
    note: text("Проекты этого периода в Umbrella IT.", "Projects from this period at Umbrella IT."),
    projects: [
      {
        name: text("9GAG", "9GAG"),
        description: text(
          "Участвовал в разработке международного высоконагруженного продукта: добавлял новые функции, исправлял ошибки и работал над стабильностью приложения.",
          "Contributed to an international high-traffic product, adding features, fixing bugs and working on application stability.",
        ),
      },
      {
        name: text("Home Credit Insurance Kids", "Home Credit Insurance Kids"),
        description: text(
          "Спроектировал REST API по спецификации JSON:API для страхового продукта. Работал над серверной частью и взаимодействием приложения с API.",
          "Designed a REST API following the JSON:API specification for an insurance product. Worked on the backend and the application's API integration.",
        ),
      },
      {
        name: text("Iristel", "Iristel"),
        description: text(
          "Работал над iristel.com: разрабатывал пользовательские функции, участвовал в тестировании и исправлении ошибок.",
          "Worked on iristel.com, developing user-facing features, testing and fixing bugs.",
        ),
      },
    ],
  },
  {
    year: 2018,
    period: text("Август 2018 — апрель 2019", "August 2018 — April 2019"),
    role: text("PHP-разработчик", "PHP Developer"),
    projects: [
      {
        name: text("Пкаско", "PKASKO"),
        description: text(
          "Разрабатывал агрегатор ОСАГО и КАСКО: административную часть, расчёт страховых премий и интеграции со страховыми компаниями. Оптимизировал расчёты, сократив время ответа примерно на 20–30%.",
          "Developed a car insurance aggregator: its administration interface, premium calculations and insurer integrations. Optimised calculations, reducing response times by approximately 20–30%.",
        ),
      },
    ],
  },
  {
    year: 2016,
    period: text("Декабрь 2016 — август 2018", "December 2016 — August 2018"),
    role: text("Системный администратор", "System Administrator"),
    projects: [
      {
        name: text("Группа компаний «РУСТ»", "RUST Group"),
        description: text(
          "Поддерживал более 200 пользователей, ввёл в домен свыше 150 компьютеров, обслуживал серверы и сеть. Создал корпоративный портал с авторизацией через Active Directory и единым справочником сотрудников.",
          "Supported over 200 users, joined more than 150 computers to the domain and maintained servers and networking. Built an intranet portal with Active Directory sign-in and a shared employee directory.",
        ),
      },
    ],
  },
  {
    year: 2015,
    period: text("Сентябрь 2015 — сентябрь 2016", "September 2015 — September 2016"),
    role: text("Сайты и интернет-реклама", "Websites and online advertising"),
    projects: [
      {
        name: text("Рекламное агентство «Наш стиль»", "Nash Stil Advertising Agency"),
        description: text(
          "Создавал сайты и интернет-магазины для клиентов из разных отраслей. Занимался SEO и настраивал рекламные кампании в Яндекс.Директе и Google AdWords.",
          "Built websites and online stores for clients across different industries. Worked on SEO and set up campaigns in Yandex Direct and Google AdWords.",
        ),
      },
    ],
  },
];
