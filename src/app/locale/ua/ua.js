/* eslint-disable quote-props */

import { EngineCommunicationChannels, LoggerAction } from 'webitel-sdk';

export default {
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
    settings: 'Налаштування | Налаштування',
    changePassword: 'Змінити пароль',
    language: 'Мова',
    webPhone: 'Web-телефон',
    useWebPhone: 'Використовувати Web-телефон',
    useStun: 'Використовувати STUN',
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
    cron: 'Некорректний cron-вираз',
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
    system: {
      system: 'Система',
    },
  },

  home: {
    dashboard: 'Звіти',
    welcomeText: 'Вітання!',
    news: 'Новини',
  },

  objects: {
    all: 'Всі {entity}',
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
    saveAs: 'Зберігти як нового',
    close: 'Закрити',
    next: 'Далі',
    back: 'Назад',
    change: 'Замінити',
    name: 'Ім\'я',
    description: 'Опис',
    user: 'Користувач',
    users: 'Користувачі',
    action: 'Дія',
    allow: 'Дозволити',
    password: 'Пароль',
    history: 'Історія',
    copy: 'Копіювати',
    copied: 'Скопійовано!',
    createdAt: 'Створено',
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
    provider: 'Провайдер',
    default: 'За замовчуванням',
    service: 'Сервіс',
    tts: 'Text-to-Speech',
    stt: 'Speech-to-Text',
    key: 'Ключ',
    ID: 'ID',
    email: 'Адреса електронної пошти',
    updatedAt: 'Змінено',
    emptyWorkspace: 'Записи у розділі ще не створені',
    emptyResultSearch: 'Пошук не дав результатів',

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
      clearMember: 'Очистити абонента',
    },
    generalInfo: 'Загальна інформація',
    objectHeader: {},
    directory: {
      directory: 'Каталог',
      passwordInfo: 'Введіть значення, якщо хочете перезаписати (або створити новий) пароль',
      users: {
        users: 'Користувач | Користувачі',
        allUsers: 'Всі користувачі',
        searchPlaceholder: 'Ім\'я, користувач, номери телефону, статус',
        login: 'Логін',
        extensions: 'Внутрішній номер',
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
        userIp: 'IP користувача',
        userId: 'ID користувача',
      },
      license: {
        customers: 'Користувачі',
        license: 'Ліцензія | Ліцензії',
        licenseId: 'ID',
        allCustomers: 'Всі користувачі',
        allLicenses: 'Всі ліцензії',
        serial: 'Серія',
        product: 'Продукт',
        validFrom: 'Дійсно з',
        validTill: 'Дійсно до',
        used: 'Використано',
        limit: 'Ліміт',
        status: 'Статус',
        competitive: 'Конкурентна',
        searchPlaceholder: 'Серія, продукт',
        domain: 'Домен',
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
        permissions: {
          permissions: 'Дозвіл ролі | Дозволи ролей',
          add: 'Створювати',
          delete: 'Видаляти',
          read: 'Вибирати',
          write: 'Редагувати',
          eavesdropCall: 'Прослуховувати активний дзвінок',
          playbackRecordFile: 'Відтворювати записи розмов',
          exportDataGrid: 'Експортувати дані',
          viewCdrPhoneNumbers: 'Перегляд незашифрованих номерів телефонів',
          manageUserRoles: 'Управління ролями користувачів',
          manageUserLicense: 'Управління ліцензіями користувачів',
          changeUserPassword: 'Змінювати паролі користувачів',
          manageConfiguration: 'Управління системними конфігураціями',
          addDescription: 'Надає дозвіл на створення об’єктів',
          deleteDescription: 'Надає дозвіл на видалення об’єктів',
          readDescription: 'Надає дозвіл на вибір об’єктів',
          writeDescription: 'Надає дозвіл змінювати об’єкти',
          eavesdropCallDescription: 'Надає дозвіл прослуховувати активну розмову',
          playbackRecordFileDescription: 'Надає дозвіл на відтворення файлів записів дзвінків',
          exportDataGridDescription: 'Надає дозвіл на експорт даних',
          viewCdrPhoneNumbersDescription: 'Надає дозвіл на відображення  незашифрованих телефонних номерів',
          manageUserRolesDescription: 'Надає дозвіл на керування набором ролей користувачів',
          manageUserLicenseDescription: 'Надає дозвіл на керування набором ліцензій користувача',
          changeUserPasswordDescription: 'Надає дозвіл на зміну пароля користувача',
          manageConfigurationDescription: 'Надає дозвіл на керування розділом Конфігурація',
        },
        addPermission: 'Надати дозвіл',
        usage: 'Використання',
        applicationsAccess: {
          applicationsAccess: 'Застосунок | Застосунки',
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
        create: 'Створювати',
        delete: 'Видаляти',
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
        stateForAll: 'Стан для всіх',
        changeSkillTo: 'Замінити навичку на',
        changeAgentsSkill: 'Замінити навичку операторам',
        totalAgents: 'Всього операторів',
        activeSkillAgents: 'З активною навичкою',
        assignSkillToAgents: 'Назначити навичку операторам',
        assignAgent: 'Призначити оператора',
        selectCapacityAndState: 'Вибрати потенціал і стан',
        minCapacityLessOrEqualToMaxCapacityValidator: 'Має бути менше або рівне Максимальному потенціалу',
        maxCapacityMoreOrEqualToMinCapacityValidator: 'Має бути більше або рівне Мінімальному потенціалу',
      },
      buckets: {
        buckets: 'Кошик | Кошики',
        allBuckets: 'Всі кошики',
        addBucket: 'Додати кошик',
      },
      blacklist: {
        blacklist: 'Список | Списки',
        allBlacklists: 'Всі списки',
        number: 'Номер | Номери',
        newNumber: 'Новий номер',
        numbersCount: 'Номери',
        expireAt: 'Термін дії',
        temporary: 'Тимчасовий',
      },
      media: {
        mediaFiles: 'Медіафайл| Медіафайли',
        allMediaFiles: 'Всі медіафайли',
        createdAt: 'Створено',
        format: 'Формат',
        size: 'Розмір',
        textToSpeech: 'Синтез мовлення',
        popupSettings: 'Налаштування',
        lang: 'Мова',
        voice: 'Голос',
        token: 'Токен',
        key: 'Ключ',
        dragPlaceholder: 'Завантаження файлів',
        dragPlaceholderHere: 'тут.',
        tts: {
          hint: 'Створити аудіофайл',
          textType: {
            textType: 'Тип тексту',
            ssml: 'SSML',
          },
        },
      },
      regions: {
        regions: 'Розташування | Розташування',
        allRegions: 'Всі розташування',
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
        channels: {
          [EngineCommunicationChannels.Phone]: 'Телефон',
          [EngineCommunicationChannels.Email]: 'Електронна пошта',
          [EngineCommunicationChannels.Messaging]: 'Повідомлення',
        },
      },
      pauseCause: {
        pauseCause: 'Статуси оператора',
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
        flow: 'Схема | Схеми',
        allFlowSchemas: 'Всі схеми',
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

      chatplan: {
        chatplan: 'Правило маршрутизації текстових повідомлень | Правила маршрутизації текстових повідомлень',
        allChatplans: 'Всі правила маршрутизації текстових повідомлень',
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
        templates: {
          templates: 'Шаблони',
          title: 'Анонімне ім\'я абонента у Workspace',
          close: 'Повідомлення завершення чату',
          join: 'Повідомлення приєднання оператора',
          left: 'Повідомлення від\'єднання оператора',
        },
        chatGateways: 'Текстовий шлюз | Текстові шлюзи',
        allChatGateways: 'Всі текстові шлюзи',
        telegramBot: {
          telegramBot: 'Telegram Бот',
        },
        telegramApp: {
          telegramApp: 'Telegram Застосунок',
          signedAs: 'Ви авторизовані як',
          joinTelegram: 'Sign in to Telegram',
          metadata: {
            apiId: 'API ідентифікатор',
            apiHash: 'API хеш',
          },
        },
        infobip: {
          infobip: 'Infobip',
        },
        messenger: {
          meta: 'Meta',
          addOrRemovePages: 'Додати або видалити сторінки',
          accounts: 'Аккаунти',
          metadata: {
            clientId: 'App ID',
            clientSecret: 'App Secret',
          },
          facebook: {
            pages: 'Facebook сторінки',
            subscription: 'Webhook підписки',
          },
          instagram: {
            instagram: 'Instagram',
            comments: 'Відслідковувати коментарі',
            mentions: 'Відслідковувати згадування',
          },
          whatsapp: {
            whatsapp: 'Whatsapp',
            token: 'Токен',
            status: 'Статус',
            number: 'Номер телефону',
            review: 'Розгляд',
          },
        },
        viber: {
          viber: 'Viber',

          style: {
            style: 'Стиль',
            btnBackColor: 'Колір фону кнопки',
            btnFontColor: 'Колір тексту кнопки',
          },
        },
        webchat: {
          webchat: 'Web chat',
          copyCode: 'Копіювати код',
          copyCodeHint: 'Необхідно перегенерувати та вставити код Віджета на сайт після кожної модифікації налаштувань',
          metadata: {
            mediaMaxSize: 'Максимальний розмір файла (Мб)',
          },
          view: {
            borderRadius: 'Вигляд кнопки',
            language: 'Мова',
            view: 'Вигляд',
            position: 'Розміщення',
            btnColor: 'Колір кнопки',
            logoUrl: 'URL логотипу',
            logoHint: 'Підтримуваний формат логотипу - \'JPEG\' or \'PNG\', 24x24px',
            rounded: 'Кругла',
            square: 'Квадратна',
            right: 'Справа',
            left: 'Зліва',
            static: 'Статична',
          },
          chat: {
            chat: 'Чат',
            openTimeout: 'Ввімкнути затримку відкриття',
            openTimeoutSec: 'Час затримки відкриття',
          },
          appointment: {
            appointment: 'Замовлення дзвінка',
            days: 'Кількість днів',
            availableAgents: 'Вільні агенти',
            showEmailField: 'Показати поле вводу пошти',
            showMessageField: 'Показати поле вводу повідомлення',
            resultPageText: 'Текст на сторінці результату',
            headingText: 'Заголовок',
            subheadingText: 'Підзаголовок',
            showDefaultHeading: 'Показати стандартний заголовок та підзаголовок на сторінці результату',
          },
          alternativeChannels: {
            alternativeChannels: 'Альтернативні канали',
            email: 'Електронна пошта',
            whatsapp: 'WhatsApp',
            telegram: 'Telegram',
          },
        },
        uri: 'URI',
        newChatGateway: 'Новий текстовий шлюз',
        metadata: {
          apiKey: 'Api Key',
          number: 'Number',
          baseUrl: 'Base URL',
          sendApi: 'Send API',
          allowOrigin: 'Allow Origin',
          readTimeout: 'Read Timeout (sec)',
          writeTimeout: 'Write Timeout (sec)',
          handshakeTimeout: 'Handshake Timeout (sec)',
          messageSize: 'Message Size max (bytes)',
          botName: 'Bot Name',
          eventTypes: 'Event Types',
          telegramToken: 'Telegram BOT API Token',
          messengerApiUrl: 'Messenger API URL',
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
        state: 'Статус',
        progressiveCount: 'Кількість одночасних дзвінків',
        chatCount: 'Кількість одночасних чатів',
        isSupervisor: 'Супервізор',
        stateTime: 'Тривалість',
        addSkill: 'Додати навичку',
        addSubordinate: 'Додати підлеглого оператора',
        statusHistory: 'Історія станів',
        historyState: 'Стан',
        historyChannel: 'Канал',
        historyFrom: 'Від',
        historyTo: 'До',
        historyDuration: 'Тривалість',
        payload: 'Причина',
        emptyPopup: 'Будь ласка, перевірте налаштування фільтрів',
        status: {
          online: 'Онлайн',
          offline: 'Офлайн',
          pause: 'Пауза',
          breakOut: 'Примусова пауза',
        },
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
        inviteChatTimeout: 'Час прийняття чату',
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
        dtmf: 'DTMF',
        priority: 'Пріоритет',
        attempts: 'Спроб',
        emptyWorkspace: 'Абонентів не знайдено',
        resetMembers: {
          resetMembers: 'Перезапустити абонентів',
          description: 'Ви впевнені, що бажаєте перезапустити усі неуспішні спроби повторно?',
          reset: 'Перезапустити',
          successResetCount: 'Успішно перезапущено {count} абонентів',
        },
        endCause: {
          abandoned: 'Втрачений',
          timeout: 'Тайм-аут',
          cancel: 'Скасований',
          success: 'Успішний',
          failed: 'Неуспішний',
          missed: 'Пропущений',
          expired: 'Час вийшов',
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
        blacklist: 'Стоп лист',
        newQueue: 'Нова черга',
        newQueueDescription: 'Типи черг',
        outboundIVRQueue: 'Вихідна IVR-черга',
        outboundIVR: 'Вихідний IVR',
        outboundIVRQueueDescription: 'Вихідний IVR дозволяє організації автоматично залучати клієнтів по кількох каналах, таких як автоматичні голосові виклики, SMS-повідомлення, електронна пошта або повідомлення в соцмережах з використанням персоналізованих сповіщень.',
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
        inboundJobQueue: 'Вхідна черга завдань',
        inboundJobQueueDescription: 'Вхідна черга завдань',
        outboundJobQueue: 'Вихідна черга завдань',
        outboundJobQueueDescription: 'Вихідна черга завдань',
        strategy: 'Стратегія',
        timezone: 'Часова зона',
        callLimit: 'Максимальна кількість одночасних дзвінків',
        variables: 'Змінні',
        members: 'Абонент | Абоненти',
        params: 'Налаштування додзвону абонентів',
        discardAbandonedAfter: 'Кількість секунд до повного видалення абонента',
        maxIdleAgent: 'Очікування відповіді оператора',
        maxIdleClient: 'Очікування відповіді абонента',
        maxIdleDialog: 'Максимальний час очікування повідомлення',
        timeoutWithNoAgents: 'Час очікування, коли немає операторів',
        timeBaseScore: 'Рейтинг дзвінка',
        endless: 'Не припиняти набір',
        stickyAgent: 'Липкість',
        stickyAgentSec: 'Час очікування липкості (сек)',
        autoAnswerTone: 'Попереджувальний сигнал автоматичної відповіді',
        varKey: 'Ключ',
        varVal: 'Значення',
        endCause: 'Причина припинення',
        offeringAt: 'Передзвонити в',
        destination: 'Призначення | Призначення',
        expire: 'Закінчується',
        originateTimeout: 'Час очікування',
        maxAgentLine: 'Кількість одночасних дзвінків на оператора',
        maxAgentLose: 'Максимальна кількість неприйнятих дзвінків для припинення донабору ліній',
        minAttempts: 'Кількість спроб для переходу в предиктивний режим',
        maxAbandonedRate: 'Дозволений % втрачених дзвінків',
        loadFactor: 'Коефіцієнт навантаження',
        abandonRateAdjustment: 'Коригування втрачених дзвінків',
        playbackSilence: 'Тиша перед програванням аудіофайлу (мс.)',
        targetAbandonedRate: 'Бажаний % втрачених дзвінків',
        maxWaitTime: 'Максимальний час очікування',
        maxWaitingSize: 'Максимальна кількість очікування',
        waitBetweenRetries: 'Час між спробами',
        waitBetweenRetriesDesc: 'Сортування нових спроб за спаданням',
        strictCircuit: 'Strict circuit',
        timeout: 'Час перерви між дзвінками',
        maxNumberOfRetry: 'Максимальна кількість повторів додзвону',
        minDuration: 'Мінімальна тривалість успішного дзвінка',
        maxAttempts: 'Максимальна кількість спроб',
        minOnlineAgents: 'Доступ до паузи, якщо кількість операторів онлайн більше ніж:',
        waitForResultStatus: 'Очікування результату дзвінка',
        retryAbandoned: 'Відновлювати втрачених абонентів',
        playbackFile: 'Програти файл',
        bucketPriority: 'Пріоритет',
        amd: 'AMD',
        enabled: 'Увімкнути автовизначення',
        ai: 'Штучний інтелект',
        positiveLabels: 'Позитивні мітки',
        aiPlayback: 'Програти файл',
        allowNotSure: 'Невизначені',
        silenceNotSure: 'Тиша',
        allowGreetingAgent: 'Дозволити привітання',
        preSchema: 'Схема попереднього набору',
        afterSchema: 'Схема подальшого набору',
        maxCalls: 'Ліміт задач',
        maxCallsHint: 'Якщо значення дорівнює 0, дайлер не буде дзвонити',
        recordings: 'Запис',
        recordAll: 'Почати запис після відповіді',
        perNumbers: 'Ініціація на кожен номер',
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
        communications: 'Тип зв\'язку',
        manualDistribution: 'Ручне розподілення',
        processing: {
          processing: 'Обробка',
          enabled: 'Очікування результату задачі',
          formSchema: 'Схема динамічної обробки',
          sec: 'Час обробки (сек)',
          renewalSec: 'Запропонувати продовження після (сек)',
        },
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
          attempts: 'Спроба',
          resultName: {
            abandoned: 'Abandoned',
            cancel: 'Cancel',
            success: 'Success',
            failed: 'Failed',
            missed: 'Missed',
            timeout: 'Timeout',
            endless: 'Endless',
            transferred: 'Transferred',
          },
        },
        hooks: {
          hooks: 'Хук | Хуки',
          event: 'Подія',
          eventTypes: {
            joined: 'Абонент увійшов в чергу',
            answered: 'Прийнятий оператором',
            offering: 'Розподілення на оператора',
            bridged: 'З’єднання абонента з оператором',
            missed: 'Пропущений оператором',
            leaving: 'Абонент вийшов із черги',
            processing: 'Постобробка',
            active: 'Активна дія',
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
      emptyWorkspace: 'Профілі у розділі ще не створені',

      storage: {
        storage: 'Сховища',
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
      },

      cognitiveProfiles: {
        cognitiveProfiles: 'Голосовий профіль | Голосові профілі',
        properties: {
          region: 'Регіон',
          locale: 'Мова',
        },
      },
      emailProfiles: {
        emailProfiles: 'Email профіль | Email профілі',
        mailbox: 'Почтова скринька',
        smtpPort: 'SMTP Порт',
        imapPort: 'IMAP Порт',
        smtpHost: 'SMTP Хост',
        imapHost: 'IMAP Хост',
        fetchInterval: 'Інтервал оновлення',
      },
      singleSignOn: {
        allTypes: 'Всі типи',
        // TODO: add locale
        singleSignOn: 'Single Sign-on',
        clientId: 'Client id',
        clientSecret: 'Client secret',
        discoveryUrl: 'Discovery url',
      },
      importCsv: {
        importCsv: 'Імпорт даних з CSV файлу | Імпорт даних з CSV файлів',
        allImportsCsv: 'Всі імпорти даних з CSV файлів',
        source: 'Призначення імпорту',
        settings: 'Налаштування',
        mappings: 'Мапінги полів',
        mappingsHint: 'У цій секції необхідно вказати назви колонок CSV файлу у полях нижче у відповідності до їх заголовків',
        columnHeader: 'Колонка {name}',
        members: {
          clearMembers: 'Видалити існуючих абонентів',
        },
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
        cron: 'At time',
        atTimeDescription: 'A time-based JSON Schema scheduler',
        event: 'Event',
        expression: 'Вираз',
        timeout: 'Затримка',
        logs: {
          logs: 'Історія запуску',
          startedAt: 'Початок',
          result: 'Результат',
          resultName: {
            idle: 'Неактивний',
            active: 'Активний',
            done: 'Завершений',
            error: 'Помилка',
          },
        },
      },
    },
    system: {
      system: 'Система',
      changelogs: {
        changelogs: 'Журнал змін | Журнали змін',
        objects: 'Об\'єкт | Об\'єкти',
        daysToStore: 'Днів зберігання',
        storage: 'Вивантажити в',
        logs: {
          logs: 'Лог | Логи',
          actions: 'Дія | Дії',
          records: 'ID запису | ID записів',
          actionType: {
            [LoggerAction.Create]: 'Створення',
            [LoggerAction.Delete]: 'Видалення',
            [LoggerAction.Update]: 'Редагування',
          },
        },
        period: {
          period: 'Період',
          options: {
            daily: 'Щодня',
            weekly: 'Щотижня',
            fortnightly: 'Кожні два тижня',
            monthly: 'Щомісяця',
          },
        },
      },
      configuration: {
        configuration: 'Конфігурація | Конфігурації',
        parameter: 'Параметр',
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
    deleteFiltered: 'Видалити всі відфільтровані об\'єкти',
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
  errors: {
    invalidJson: 'Некоректний JSON',
  },
};
