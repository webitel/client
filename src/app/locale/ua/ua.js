/* eslint-disable quote-props */

export default {
  reusable: {
    state: 'Стан',
  },
  auth: {
    register: 'Створити',
    login: 'Вхід',
    registerReset: 'Скинути пароль',
    detailsSubtitle: 'Введіть свої дані',
    resetPasswordLink: 'Забули пароль?',
    user: 'Ім\'я користувача',
    password: 'Пароль',
    confirmPassword: 'Підтвердіть пароль',
    key: 'Ліцензійний ключ',
    registerSubmit: 'Зареєструватися',
    resetSubmit: 'Скинути',
    loginSubmit: 'Ввійти',
    carousel: {
      title1: 'Cloud vs On-Site',
      text1: 'Політика безпеки не дозволяє зберігати дані і використовувати хмарні сервіси? З Webitel Ви можете створити контакт-центр на своїй площадці!',

      title2: 'Мультиканальність vs Омніканальність',
      text2: 'Будьте завжди і всюди на зв\'язку зі своїми клієнтами! IVR-меню будь-якої складності,  вхідні, вихідні кампанії взаємодії чи повідомлення в соцмережі - зараз просто, як ніколи!',

      title3: 'Відмовостійка інфраструктура',
      text3: 'Більше ніяких простоїв та втрат даних. Швидке масштабування та відмовостійка архітектура дозволяє одночасно обслуговувати більше 1000 звернень клієнтів за хвиилину з різних каналів комунікацій.',

      title4: 'Дизайн',
      text4: 'Новий мінімалістичний інтерфейс з максимально зручною для користувача адмін-панеллю, що дозволяє мати оператичний доступ до всіх необхідних функцій. Менше кліків - більше можливостей.',

      title5: 'Новий модуль роботи з операторськими групами',
      text5: 'Максимально ефективне розподілення дзвінків. Оператор може мати одразу декілька навичок для участі у різних кампаніях. Клієнта обслуговують лише професіонали своєї справи.',

      title6: 'Налаштування прав доступу',
      text6: 'Новий модуль управління правами - нові можливості для контролю. Ви можете надавати права не тільки на розділи, але і на дії користувачів, відслідковуючи при цьому зміни. ',
    },
  },

  header: {
    logout: 'Вийти',
    docs: 'Довідка',
  },

  appNavigator: {
    title: 'Додатки Webitel',
    admin: 'Адміністрування',
    agent: 'Робоче місце оператора',
    supervisor: 'Робоче місце супервізора',
    audit: 'Аудит',
    history: 'Історія дзвінків',
    grafana: 'Grafana',
  },

  settings: {
    settings: 'Налаштування',
    changePassword: 'Змінити пароль',
    language: 'Мова',
  },

  validation: {
    email: 'Введіть адресу електронної пошти',
    required: 'Поле обов\'язкове для заповнення',
    sameAs: 'Невірний пароль',
    gatewayHostValidator: 'Має виглядати як IPv4 або FQDN',
    ipValidator: 'Має виглядати як IPv4',
    macValidator: 'Має виглядати як MAC',
    minValue: 'Значення має бути не менше',
    maxValue: 'Значення має бути не надто велкиим',
    numeric: 'Мають бути цифри',
    requiredArrayValue: 'Поле не може бути пустим',
    isPositiveValue: 'Значення має бути додатнім числом',
  },

  nav: {
    directory: {
      directory: 'Каталог',
    },
    routing: {
      routing: 'Маршрутизація',
    },
    lookups: {
      lookups: 'Довідники',
    },
    ccenter: {
      ccenter: 'Контакт-центр',
    },
    integrations: {
      integrations: 'Інтеграції',
    },
    permissions: {
      permissions: 'Дозволи',
    },
  },

  home: {
    dashboard: 'Звіти',
    welcomeText: 'Вітання!',
    news: 'Новини',
  },

  objects: {
    administration: 'Управління',

    general: 'Загальне',
    new: 'Новий',
    add: 'Додати',
    create: 'Створити',
    read: 'Читати',
    edit: 'Редагувати',
    delete: 'Видалити',
    save: 'Зберегти',
    saved: 'Збережено',
    close: 'Закрити',
    name: 'Ім\'я',
    description: 'Опис',
    user: 'Користувач',
    users: 'Користувачі',
    action: 'Дія',
    allow: 'Дозволити',
    password: 'Пароль',
    history: 'Історія',
    copy: 'Копіювати',
    copied: 'Скопійовано в буфер обміну',
    createdAt: 'Коли створено',
    createdBy: 'Ким створено',
    importCSV: 'Імпортувати CSV',
    online: 'Онлайн',
    offline: 'Офлайн',
    on: 'On',
    off: 'Off',
    ok: 'Ok',
    enabled: 'Ввімкнено',
    status: 'Статус',
    from: 'Від',
    to: 'До',
    importJSON: 'Імпортувати JSON',
    addNew: 'Додати',

    deleteConfirmation: {
      title: 'Підтвердіть видалення',
      askingAlert: 'Ви впевнені, що хочете видалити {count} запис? | Ви впевнені, що хочете видалити {count} записів?',
      undoneActionAlert: 'Дана дія не може бути скасована.',
      deleteAll: 'ВСІ',
    },
    CSV: {
      skipHeaders: 'Згорнути заголовки',
      charSet: 'Char set',
      separator: 'Розділювач',
      CSVColumn: 'CSV поле',
      fieldName: 'Назва поля',
    },
    generalInfo: 'Загальна інформація',
    objectHeader: {},
    directory: {
      directory: 'Каталог',
      passwordInfo: 'Введіть значення, якщо хочете перезаписати (або ставорити новий) пароль',
      users: {
        users: 'Користувач | Користувачі',
        allUsers: 'Всі користувачі',
        searchPlaceholder: 'Ім\'я, користувач, номери телефону, статус',
        login: 'Ім\'я користувача',
        extensions: 'Номер телефону',
        state: 'Стан',
        DnD: 'DnD',
        status: 'Статус',
        roles: 'Ролі',
        tokens: 'Токени',
        usage: 'Використання',
        roleAdmin: 'Адміністратор',
        license: 'Ліцензія',
        devices: 'Пристрій',
        defaultDevice: 'Пристрій за замовчуванням (зі списку вибраних пристроїв)',
        deviceNotFound: 'Не знайшли свій пристрій?',
        createNewDevice: 'Додати новий',
        variables: 'Змінні',
        varKey: 'Ключ',
        varVal: 'Значення',
        token: 'Токен | Токени',
        tokenPopupHeader: 'Ваш токен-ключ був успішно створений',
        tokenPopupText: 'Завантажте файл з ключем зараз або скопіюйте його для подальшого використання. Якщо Ви не завантажите файл ключа зараз, то не зможете отримати свій токен-ключ знову. Для Вашої безпеки нікому не передвайте свій токен-ключ.',
        tokenPopupCopy: 'Копіювати',
        tokenPopupSave: 'Зберегти у форматі TXT',
      },
      license: {
        customers: 'Користувачі',
        license: 'Ліцензія',
        licenseId: 'ID',
        allCustomers: 'Всі користувачі',
        allLicenses: 'Всі ліцензії',
        serial: 'Серія',
        product: 'Продукт',
        validFrom: 'Час дії',
        validTill: 'Час завершення',
        used: 'Використано',
        limit: 'Ліміт',
        status: 'Статус',
        competitive: 'Конкурентна',
        searchPlaceholder: 'Серія, продукт',
        daysToExpire: {
          '0': 'Час дії вичерпано',
          '30': '30 або менше',
          '90': '90 або менше',
          days: ' днів',
        },
        importLicense: 'Завантажити ліцензію',
        licenseKey: 'Ліцензійний ключ',
      },
      devices: {
        devices: 'Пристрій | Пристрої',
        allDevices: 'Всі пристрої',
        newDevice: 'Новий пристрій',
        newDeviceDescription: 'Опис нового пристрою',
        hotdeskDeviceSettings: 'Налаштування позмінного використання пристрою',
        searchPlaceholder: 'Назва, користувач, ідентифікатор, ідентифікатор комп\'ютера',
        authId: 'Ідентифікатор',
        presence: 'Актуальний статус',
        hotdesk: 'Hot desking',
        hotdeskDevice: 'Hot desking пристрій',
        hotdeskIncorrectInput: 'Неправильне ім\'я хоста',
        hotdeskInputHint: 'Для імені хоста використовуйте лише правильні символи. Дозволені символи: A-Z, a-z, 0-9, -, _',
        deviceSettings: 'Налаштування пристрою',
        hostName: 'Ім\'я хоста',
        phoneInfo: 'Інформація про телефон',
        phone: 'Телефон',
        vendor: 'Виробник',
        model: 'Модель',
        ipv4: 'IPv4',
        mac: 'MAC',
        deviceHistory: 'Історія користування',
        loggedIn: 'В системі',
        loggedOut: 'Вийшов із системи',
        state: {
          nonreg: 'Не зареєстровано',
          reged: 'Зареєстровано',
          ringing: 'Дзвонить',
          dialing: 'Викликає',
          dialog: 'В розмові',
          onhold: 'На утриманні',
        },
        passwordSetFromAccount: 'Якщо Ви не встановите пароль, він буде таким же, як і акаунт',
      },
    },
    permissions: {
      permissions: 'Дозволи',
      permissionsRole: 'Роль | Ролі',
      allRoles: 'Всі ролі',
      searchPlaceholder: 'роль ..',
      roles: {
        permissions: 'Дозвіл ролі | Дозволи ролей',
        addPermission: 'Надати дозвіл',
        usage: 'Використання',
        applicationsAccess: {
          applicationsAccess: 'Апплікація | Апплікації',
          access: 'Доступ',
        },
      },
      object: {
        object: 'Розділи',
        allObjects: 'Всі розділи',
        ObAC: 'Управління діями',
        RbAC: 'Управління записами',
        operations: 'Дії',
        searchPlaceholder: 'розділ ..',
        newPermissionRole: 'Новий власник прав',
        rbacDefault: 'Права доступу на записи за замовчуванням',
        grantor: 'Праводатель',
        grantee: 'Отримувач',
        accessMode: {
          '1': 'Заборонено',
          '2': 'Дозволено',
          '3': 'Управління',
        },
      },
    },
    lookups: {
      lookups: 'Довідники',
      skills: {
        skills: 'Навичка | Навички',
        capacity: 'Потенціал',
        minCapacity: 'Мінімальний потенціал',
        maxCapacity: 'Максимальний потенціал',
        lvl: 'Рівень',
        agentSkills: 'Навички оператора | Навички операторів',
        allSkills: 'Всі навички',
        state: 'Стан',
        minCapacityLessOrEqualToMaxCapacityValidator: 'Має бути менше або рівне Мінімальному потенціалу',
        maxCapacityMoreOrEqualToMinCapacityValidator: 'Має бути більше або рівне Максимальному потенціалу',
      },
      buckets: {
        buckets: 'Кошик | Кошики',
        allBuckets: 'Всі кошики',
        addBucket: 'Додати кошик',
      },
      blacklist: {
        blacklist: 'Чорний список | Чорні списки',
        allBlacklists: 'Всі чорні списки',
        number: 'Номер | Номери',
        newNumber: 'Новий номер',
        numbersCount: 'Номери',
      },
      media: {
        mediaFiles: 'Медіафайл| Медіафайли',
        allMediaFiles: 'Всі медіафайли',
        createdAt: 'Створено',
        format: 'Формат',
        size: 'Розмір',
        textToSpeech: 'Синтез мовлення',
        popupSettings: 'Налаштування',
        provider: 'Провайдер',
        lang: 'Мова',
        voice: 'Голос',
        token: 'Токен',
        key: 'Ключ',
        dragPlaceholder: 'Перетягування файлів',
        dragPlaceholderHere: 'тут.',
      },
      regions: {
        regions: 'Розміщення | Розміщення',
        allRegions: 'Всі розміщення',
      },
      timezone: {
        timezone: 'Часова зона | Часові зони',
      },
      calendars: {
        calendars: 'Календар | Календарі',
        allCalendars: 'Всі календарі',
        searchPlaceholder: 'Назва, опис...',
        timezone: 'Часовий пояс',
        start: 'Початок',
        end: 'Кінець',
        workWeek: 'Робочий тиждень',
        holidays: 'Вихідний | Вихідні',
        date: 'Дата',
        repeat: 'Повторювати',
        fulltime: 'Тимчасовий',
        everyYear: 'Повторювати щороку',
        newHoliday: 'Новий вихідний',
        mon: 'Понеділок',
        tue: 'Вівторок',
        wed: 'Середа',
        thu: 'Четвер',
        fri: 'П\'ятниця',
        sat: 'Субота',
        sun: 'Неділя',
      },
      communications: {
        communications: 'Тип зв\'язку | Типи зв\'язку',
        allCommunications: 'Всі типи зв\'язку',
        addCommunication: 'Додати тип зв\'язку',
        code: 'Код',
      },
      pauseCause: {
        pauseCause: 'Статуси оператора | Статус оператора',
        allPauseCause: 'Всі причини паузи оператора',
        limit: 'Ліміт (хв)',
        min: 'хвилин',
        allowAdmin: 'Адміністратор може змінювати статус',
        allowSupervisor: 'Супервізор може змінювати статус',
        allowAgent: 'Оператор може змінювати статус',
      },
    },
    routing: {
      routing: 'Маршрутизація',
      ip: 'IP',
      protocol: 'Протокол',
      port: 'Порт',
      configuration: 'Конфігурація',
      schema: 'Схема дзвінка',
      json: 'JSON',

      flow: {
        flow: 'Схема',
        allFlowSchemas: 'Всі схеми дзвінків',
        createFlowSelectionPopup: 'Створити нову схему',
        createNew: 'Створити нову схему?',
        editor: 'Редактор',
        diagram: {
          diagram: 'Діаграма',
          description: 'Створити нову схему використовуючи Webitel Flow Diagram',
        },
        code: {
          code: 'Код',
          description: 'Створити нову схему використовуючи JSON-схему у редакторі коду',
        },
      },

      dialplan: {
        dialplan: 'Правила вихідного набору',
        dialplanRules: 'Правила вихідного набору',
        pattern: 'Номер призначення',
        dialplanRule: 'Правило вихідного набору',
        position: 'Позиція',
      },

      gateways: {
        gateways: 'Шлюз | Шлюзи',
        allGateways: 'Всі шлюзи',
        trunkingGateway: 'Багатоканальний шлюз',
        registerGateway: 'Зареєструвати шлюз',
        stateSuccess: 'Успішно',
        stateFailed: 'Неуспішно',
        stateProgress: 'В процесі',
        stateNonreg: 'Не зареєстрований',
        proxy: 'Проксі',
        searchPlaceholder: 'пошук шлюзу...',
        host: 'Хост',
        trunkingACLTitle: 'Контроль доступу',
        trunkingACL: 'Багатоканальний список доступу',
        hostnameTrunking: 'Сервер/Хост шлюзу чи IP',
        hostnameRegister: 'Реєстратор/Сервер/Хост шлюзу чи IP',
        expire: 'Термін дії',
        authID: 'Ім\'я користувача',
        account: 'Акаунт',
        outboundProxy: 'Адреса вихідного SIP-проксі',
        newGateway: 'Новий шлюз',
        newGatewayDescription: 'Опис нового шлюзу',
        SIPregistrations: 'SIP-реєстрація',
        SIPregistrationsDescription: 'Опис SIP-реєстрації',
        SIPtrunking: 'SIP-транки',
        SIPtrunkingDescription: 'Опис SIP-транків',
      },

      chatGateways: {
        chatGateways: 'Текстовий шлюз | Текстові шлюзи',
        allChatGateways: 'Всі текстові шлюзи',
        telegram: 'Telegram',
        infobip: 'Infobip',
        facebook: 'Facebook',
        viber: 'Viber',
        webchat: 'Web chat',
        uri: 'URI',
        provider: 'Провайдер',
        newChatGateway: 'Новий текстовий шлюз',
        metadata: {
          apiKey: 'Api Key',
          number: 'Number',
          baseUrl: 'Base URL',
          scenarioKey: 'Scenario Key',
          accessToken: 'Facebook Page Access Token',
          verifyToken: 'App Webhook Verify Token',
          sendApi: 'Send API',
          allowOrigin: 'Allow Origin',
          readTimeout: 'Read Timeout (sec)',
          writeTimeout: 'Write Timeout (sec)',
          handshakeTimeout: 'Handshake Timeout (sec)',
          messageSize: 'Message Size max (bytes)',
          botName: 'Bot Name',
          eventTypes: 'Event Types',
          telegramToken: 'Telegram BOT API Token',
          facebookApiUrl: 'Facebook API URL',
          borderRadius: 'Вигляд кнопки',
          language: 'Мова',
          view: 'Вигляд',
          position: 'Сторона',
          btnOpacity: 'Прозорість кнопки',
          btnColor: 'Колір кнопки',
          logoUrl: 'URL логотипу',
          logoHint: 'Підтримуваний формат логотипу - \'JPEG\' or \'PNG\', 24x24px',
          rounded: 'Кругла',
          square: 'Квадратна',
          right: 'Справа',
          left: 'Зліва',
          static: 'Статична',
          copy: 'Копіювати код',
          openTimeout: 'Затримка відкриття',
        },
      },

      callflow: {
        callflow: 'Конструктор дзвінка',
      },
    },
    ccenter: {
      ccenter: 'Контакт-центр',

      agents: {
        agents: 'Оператор | Оператори',
        supervisors: 'Супервізор | Супервізори',
        admins: 'Адміністратор | Адміністратори',
        subordinates: 'Підлеглий оператор | Підлеглі оператори',
        allAgents: 'Всі оператори',
        state: 'Стан',
        progressiveCount: 'Кількість одночасних дзвінків',
        chatCount: 'Кількість одночасних чатів',
        isSupervisor: 'Супервізор',
        stateTime: 'Тривалість статусу',
        addSkill: 'Додати навичку',
        addSubordinate: 'Додати підлеглого оператора',
        statusHistory: 'Історія статусів',
        historyState: 'Статус',
        historyChannel: 'Канал',
        historyFrom: 'Від',
        historyTo: 'До',
        historyDuration: 'Тривалість',
        payload: 'Причина',
      },

      auditors: {
        auditors: 'Аудитор | Аудитори',
      },

      teams: {
        teams: 'Команда| Команди',
        allTeams: 'Всі команди',
        strategy: 'Стратегія',
        timing: 'Параметри додзвону',
        maxNoAnswer: 'Максимальна кількість дзвінків без відповіді',
        callTimeout: 'Тривалість виклику',
        wrapUpTime: 'Тривалість паузи між дзвінками',
        noAnswerDelayTime: 'Час очікування при відсутності відповіді оператора',
        strategies: {
          random: 'Випадково',
          fewestCalls: 'Оператор з найменшою кількістю дзвінків',
          leastTalkTime: 'Оператор з найменшим часом розмови',
          topDown: 'Згори вниз',
          roundRobin: 'По порядку',
          roundRobinBucket: 'По порядку кошика',
          longestIdleAgent: 'Оператор з найбільшим часом простою',
          skillCapacity: 'По рівню навички',
        },
      },

      members: {
        members: 'Абонент| Абоненти',
        allMembers: 'Всі абоненти',
        addMember: 'Додати абонента',
        destination: 'Призначення',
        display: 'Відображення номера',
        priority: 'Пріоритет',
        endCause: {
          sysShutdown: 'Вимкнення системи',
          dbError: 'Помилка бази даних',
          abandoned: 'Втрачений',
          timeout: 'Тайм-аут',
          cancel: 'Вихід',
          successful: 'Успішно',
          queueNotImplement: 'Черга не визначена',
          unknown: 'Невідомо',
        },
      },

      queues: {
        queues: 'Черга | Черги',
        allQueues: 'Всі черги',
        type: 'Тип',
        state: 'Стан',
        active: 'Активна',
        notActive: 'Не активна',
        activeCalls: 'Активні дзвінки',
        waiting: 'Очікування',
        ringtone: 'Мелодія',
        priority: 'Пріоритет',
        newQueue: 'Нова черга',
        newQueueDescription: 'Типи черг',
        outboundIVRQueue: 'Вихідна IVR-черга',
        outboundIVR: 'Вихідний IVR',
        outboundIVRDescription: 'Вихідний IVR дозволяє організації автоматично залучати клієнтів по кількох каналах, таких як автоматичні голосові виклики, SMS-повідомлення, електронна пошта або повідомлення в соцмережах з використанням персоналізованих сповіщень.',
        inboundQueue: 'Вхідна черга',
        inboundQueueDescription: 'Абоненти вхідної черги знаходяться в режимі очікування, щоб поспілкуватися з живим оператором.',
        offlineQueue: 'Офлайн черга',
        offlineQueueDescription: 'Автономна черга дає можливість абонентам завершити очікування на утриманні, ввести свій номер телефону і отримати зворотній дзвінок.',
        previewDialer: 'Прев\'ю-обдзвін',
        previewDialerDescription: 'Ініціатором дзвінка виступає оператор. Він попередньо переглядає контакт перед автоматичним набором номеру.',
        progressiveDialer: 'Прогресивний обдзвін',
        progressiveDialerDescription: 'Вихідна кампанія з резервуванням оператора.',
        predictiveDialer: 'Предиктивний обдзвін',
        predictiveDialerDescription: 'Вихідна кампанія без попереднього резервування оператора для максимального скорочення часу очікування дзвінка.',
        chatInboundQueue: 'Вхідна черга чатів',
        chatInboundQueueDescription: 'Така ж вхідна черга, але для чатів',
        taskQueue: 'Черга задач',
        taskQueueDescription: 'Черга задач',
        strategy: 'Стратегія',
        timezone: 'Часова зона',
        callLimit: 'Максимальна кількість одночасних дзвінків',
        variables: 'Змінні',
        members: 'Абонент | Абоненти',
        timing: 'Налаштування додзвону абонентів',
        discardAbandonedAfter: 'Кількість секунд до повного видалення абонента',
        timeoutWithNoAgents: 'Час очікування, коли немає операторів',
        timeBaseScore: 'Рейтинг дзвінка',
        processing: 'Очікування результату дзвінка',
        processingSec: 'Час постобробки (сек)',
        processingRenewalSec: 'Запропонувати продовження через (сек)',
        stickyAgent: 'Липкість',
        stickyAgentSec: 'Час очікування липкості (сек)',
        varKey: 'Ключ',
        varVal: 'Значення',
        endCause: 'Причина припинення',
        offeringAt: 'Передзвонити в',
        destination: 'Призначення | Призначення',
        expire: 'Закінчується',
        originateTimeout: 'Тривалість додзвону',
        maxAgentLine: 'Max agent lines',
        maxAgentLose: 'Max agent lose calls',
        minAttempts: 'Min predict attempts',
        maxAbandonedRate: 'Max abandoned %',
        abandonRateAdjustment: 'Abandon rate adjustment',
        playbackSilence: 'Playback silence',
        targetAbandonedRate: 'Target abandoned rate',
        maxWaitTime: 'Максимальний час очікування',
        waitBetweenRetries: 'Час між спробами додзвону',
        waitBetweenRetriesDesc: 'Сортування перезвонів абонентам: низхідний',
        strictCircuit: 'Strict circuit',
        timeout: 'Час перерви між дзвінками',
        maxNumberOfRetry: 'Максимальна кількість повторів додзвону',
        minDuration: 'Мінімальна тривалість успішного дзвінка',
        maxAttempts: 'Максимальна кількість спроб додзвону',
        waitForResultStatus: 'Очікування результату дзвінка',
        retryAbandoned: 'Відновлювати втрачених абонентів',
        playbackFile: 'Програти файл',
        bucketRatio: 'Співвідношення',
        amd: 'AMD',
        enabled: 'Увімкнути автовизначення',
        allowNotSure: 'Невизначені',
        allowGreetingAgent: 'Дозволити привітання',
        preSchema: 'Схема попереднього набору',
        afterSchema: 'Схема подальшого набору',
        maxCalls: 'Ліміт дзвінків',
        maxCallsHint: 'Якщо значення дорівнює 0, будуть використані всі ресурси',
        recordings: 'Запис',
        maxWordLength: 'Максимальна тривалість речення (мс)',
        maxNumberOfWords: 'Максимальна кількість слів в привітанні',
        betweenWordsSilence: 'Тривалість тиші між словами (мс)',
        minWordLength: 'Мінімальна пропозиція неперервного звуку голосу (мс)',
        totalAnalysisTime: 'Максимальний час для розпізнавання (мс)',
        silenceThreshold: 'Максимальний поріг тиші (мс)',
        afterGreetingSilence: 'Тривалість тиші після привітання (мс)',
        greeting: 'Максимальна довжина привітання (мс)',
        initialSilence: 'Максимальна тривалість тиші перед привітанням (мс)',
        statisticTime: 'Інтервал перерахунку',
        queueStrategy: {
          fifo: 'FIFO (Першим зайшов, першим вийшов)',
          lifo: 'LIFO (Останнім зайшов, першим вийшов)',
          strict_fifo: 'Strict FIFO (Першим зайшов, першим вийшов)',
        },
        time: {
          t15m: '15 хв',
          t30m: '30 хв',
          t45m: '45 хв',
          t1h: '1 год',
          t3h: '4 год',
          t6h: '6 год',
        },
        logs: {
          logs: 'Лог | Логи',
          destination: 'Призначення',
          offeringAt: 'Розподілення',
          joinedAt: 'Початок',
          leavingAt: 'Кінець',
          duration: 'Тривалість',
          viewNumber: 'Номер',
          result: 'Результат',
        },
        hooks: {
          hooks: 'Хук | Хуки',
          event: 'Подія',
          eventTypes: {
            joined: 'Joined',
            answered: 'Answered',
            offering: 'Offering',
            bridged: 'Bridged',
            missed: 'Missed',
            leaving: 'Leaving',
            processing: 'Processing',
            active: 'Active',
          },
        },
      },

      res: {
        res: 'Ресурс | Ресурси',
        allRes: 'Всі ресурси',
        reserve: 'Резервний',
        searchPlaceholder: 'назва, шлюз..',
        cps: 'CPS',
        limit: 'Ліміт',
        cidType: 'CID Type',
        ignoreEarlyMedia: 'Ignore Early Media',
        numbers: 'Номер | Номери',
        displayNumbers: 'Номер для відображення',
        failure: 'Збій',
        maxErrors: 'Максимальна кількість помилок',
        errorCodes: 'Коди помилок',
        patterns: 'Шаблон вихідного номера',
        priority: 'Пріоритет',
        reserveResource: 'Резервний ресурс',
        failureDialDelay: 'Затримка при помилці набору',
      },

      resGroups: {
        resGroups: 'Група ресурсів | Групи ресурсів',
        allResGroups: 'Всі групи ресурсів',
        searchPlaceholder: 'назва групи ресурсів..',
        addResGroup: 'Додати групу ресурсів',
        strategy: 'Стратегія',
        timerange: 'Інтервал',
        timerangeFrom: 'Від',
        timerangeTo: 'До',
      },
    },
    integrations: {
      integrations: 'Інтеграції',

      storage: {
        storage: 'Сховище',
        allStorages: 'Всі сховища',
        type: 'Тип',
        maxSize: 'Об\'єм сховища (GB)',
        expireDays: 'Термін зберігання (днів)',
        priority: 'Пріоритет',
        newStorage: 'Нове сховище',
        newStorageDescription: 'Опис нового сховища',
        local: 'Local',
        s3: 'Amazon S3',
        digitalOcean: 'Digital Ocean Spaces',
        backblaze: 'Backblaze B2',
        dropbox: 'Dropbox',
        drive: 'Google Drive',
        configuration: 'Конфігурація',
        pathPattern: 'Шаблон шляху',
        localFolder: 'Local folder',
        s3Key: 'Key ID',
        s3Access: 'Access Key',
        bucket: 'Bucket',
        region: 'Розміщення',
        oceanKey: 'Key ID',
        oceanAccess: 'Access Key',
        backblazeAccount: 'Account ID',
        backblazeKey: 'Application key',
        backblazeBucketId: 'Bucket Id',
        dropboxKey: 'Access Token',
        driveFolder: 'Folder name',
        driveEmail: 'Google Email',
        driveKey: 'Private key',
        s3Endpoint: 'Endpoint',
        service: 'Service',
      },

      tokens: {
        tokens: 'Токен | Токени',
        allTokens: 'Всі токени',
        expires: 'Закінчується',
        popupMessage: 'Завантажте файл з ключем зараз або скопіюйте його для подальшого використання. Якщо Ви не завантажите файл ключа зараз, то не зможете отримати свій токен-ключ знову. Для Вашої безпеки нікому не передвайте свій токен-ключ.',
        tokenCreated: 'Ваш токен успішно створений',
      },

      triggers: {
        triggers: 'Тригер| Тригери',
        allTriggers: 'Всі тригери',
        type: 'Тип',
        schema: 'Схема',
        newTrigger: 'Новий тригер',
        newTriggerDescription: 'Оберіть шаблон або почніть з нуля',
        onEvent: 'On event',
        onEventDescription: 'An event-based JSON Schema scheduler',
        atTime: 'At time',
        atTimeDescription: 'A time-based JSON Schema scheduler',
        event: 'Event',
      },
    },
    pagination: {
      rowsPerPage: 'Кількість записів',
    },
  },

  utils: {
    downloadFilesBtn: {
      downloadFiles: 'Скачати файли',
      filesLoaded: 'Файлів скачано',
      zippingProgress: 'Прогрес архівації',
    },
  },

  errorPages: {
    goToHome: 'Повернутись додому',
    page403: {
      title: 'Немає доступу',
      text: 'Вибачте, у Вас недостатньо прав доступу для перегляду цієї сторінки',
    },
    page404: {
      title: 'Здається, Ви загубились',
      text: 'Вибачте, ми не можемо знайти те, що Ви шукаєте',
    },
  },

  icon: {
    docs: 'Документація',
    logout: 'Вийти',
    account: 'Акаунт',
    appNavigator: 'Додатки Webitel',
    settings: 'Налаштування',
  },

  iconHints: {
    upload: 'Завантажити',
    reload: 'Оновити',
    edit: 'Редагувати',
    delete: 'Видалити',
    deleteAll: 'Видалити всі об\'єкти',
    deleteSelected: 'Видалити {count} обраних об\'єктів',
    generate: 'Створити',
    add: 'Додати',
    history: 'Історія',
    download: 'Скачати',
    downloadAll: 'Скачати все',
    draggable: 'Перетягнути',
    play: 'Програти',
    pause: 'Пауза',
    resume: 'Продовжити',
    close: 'Зкрити',
    volume: 'Гучність',
    stop: 'Зупинити',
    members: 'Абоненти',
    moveUp: 'Пересунути вгору',
    moveDown: 'Пересунути вниз',
    nextPage: 'Наступна сторінка',
    prevPage: 'Попередня сторінка',
    expand: 'Розгорнути',
    collapse: 'Згорнути',
  },
};
