/* eslint-disable quote-props */

export default {
  reusable: {
    state: 'Состояние',
  },
  auth: {
    register: 'Создать',
    login: 'Вход',
    registerReset: 'Скинуть пароль',
    detailsSubtitle: 'Введите свои данные',
    resetPasswordLink: 'Забыли пароль?',
    user: 'Имя пользователя',
    password: 'Пароль',
    confirmPassword: 'Повторить пароль',
    key: 'Лицензионный ключ',
    registerSubmit: 'Зарегистрироваться',
    resetSubmit: 'Скинуть',
    loginSubmit: 'Войти',
    carousel: {
      title1: 'Облако и в Он-сайт',
      text1: 'Политика безопасности не позволяет хранить данные и использовать облачные сервисы? С Webitel вы можете построить контакт-центр на своей площадке!',

      title2: 'Мультиканальность и Омниканальность',
      text2: 'Будьте всегда и везде на связи со своими клиентами!  IVR-меню любой сложности,  входящие, исходящие кампании взаимодействия или сообщение в социальные сети - теперь просто как никогда!',

      title3: 'Отказоустойчивая инфраструктура',
      text3: 'Больше никаких простоев и потерь данных. Быстрое масштабирование и отказоустойчивая архитектура позволяет обслуживать одновременно более 1000 обращений клиентов в минуту с разных каналов коммуникаций.',

      title4: 'Дизайн',
      text4: 'Новый минималистичный интерфейс с максимально удобной для пользователя админ-панелью, позволяющей иметь оперативный доступ ко всем необходимым функциям. Меньше кликов - больше возможностей.',

      title5: 'Новый модуль работы с операторскими группами',
      text5: 'Максимально эффективное распределение звонков. Оператор может обладать сразу несколькими навыками для участия в разных кампаниях. Клиента обслуживают только профессионалы своего дела.',

      title6: 'Настройка прав доступа',
      text6: 'Новый модуль управления правами - новые возможности для контроля. Вы можете назначать права не только на разделы, но и на действия пользователей, при этом отслеживая вносимые изменения. ',
    },
  },

  header: {
    logout: 'Выйти',
    docs: 'Справка',
  },

  appNavigator: {
    title: 'Приложения Webitel',
    admin: 'Admin',
    agent: 'Agent Workspace',
    supervisor: 'Supervisor Workspace',
    audit: 'Audit',
    history: 'Call History',
    grafana: 'Grafana',
  },

  settings: {
    settings: 'Настройки',
    changePassword: 'Изменить пароль',
    language: 'Язык',
  },

  validation: {
    email: 'Введите адрес электронной почты',
    required: 'Обязательное поле для заполнения',
    sameAs: 'Неверный пароль',
    gatewayHostValidator: 'Should look like IPv4 or FQDN',
    ipValidator: 'Should look like IPv4',
    macValidator: 'Should look like MAC',
    minValue: 'Значение должно быть не менее',
    maxValue: 'Значение должно быть не слишком большим',
    numeric: 'Должны быть цифры',
    requiredArrayValue: 'Поле не должно быть пустым',
    isPositiveValue: 'Значение должно быть больше нуля',
  },

  nav: {
    directory: {
      directory: 'Каталог',
    },
    routing: {
      routing: 'Маршрутизация',
    },
    lookups: {
      lookups: 'Справочники',
    },
    ccenter: {
      ccenter: 'Контакт-центр',
    },
    integrations: {
      integrations: 'Интеграции',
    },
    permissions: {
      permissions: 'Разрешения',
    },
  },

  home: {
    dashboard: 'Отчеты',
    welcomeText: 'Приветствуем!',
    news: 'Новости',
  },

  objects: {
    administration: 'Управление',

    general: 'Общая',
    new: 'Новый объект',
    add: 'Добавить',
    create: 'Создать',
    read: 'Читать',
    edit: 'Редактировать',
    delete: 'Удалить',
    save: 'Сохранить',
    saved: 'Сохранено',
    close: 'Закрыть',
    name: 'Имя',
    description: 'Описание',
    user: 'Пользователь',
    users: 'Пользователи',
    action: 'Action',
    allow: 'Allow',
    password: 'Пароль',
    history: 'История',
    copy: 'Копировать',
    copied: 'Скопировано в буфер обмена!',
    createdAt: 'Создан в',
    createdBy: 'Кем создан',
    importCSV: 'Импортировать CSV',
    online: 'Онлайн',
    offline: 'Оффлайн',
    on: 'On',
    off: 'Off',
    ok: 'Ok',
    enabled: 'Включено',
    status: 'Статус',
    from: 'От',
    to: 'До',
    importJSON: 'Импортировать JSON',
    addNew: 'Добавить',


    deleteConfirmation: {
      title: 'Подтвердите удаление',
      askingAlert: 'Вы уверенны, что хотите удалить {count} запись? | Вы уверенны, что хотите удалить {count} записей?',
      undoneActionAlert: 'Это действие не может быть отменено.',
      deleteAll: 'ВСЕ',
    },
    CSV: {
      skipHeaders: 'Свернуть заголовки',
      charSet: 'Char set',
      separator: 'Разделитель',
      CSVColumn: 'CSV поле',
      fieldName: 'Название поля',
    },
    generalInfo: 'Общая информация',
    objectHeader: {},
    directory: {
      directory: 'Каталог',
      passwordInfo: 'Введите значение, если хотите перезаписать (или создать навый) пароль',
      users: {
        users: 'Пользователь | Пользователи',
        allUsers: 'Все пользователи',
        searchPlaceholder: 'Имя, пользователь, номера телефона, статус',
        login: 'Имя пользователя',
        extensions: 'Номер телефона',
        state: 'Статус',
        DnD: 'DnD',
        status: 'Статус',
        roles: 'Роли',
        tokens: 'Токены',
        usage: 'Использование',
        roleAdmin: 'Администратор',
        license: 'Лицензия',
        devices: 'Устройство',
        defaultDevice: 'Устройство по умолчанию (из списка выбраных устройств)',
        deviceNotFound: 'Не смогли найти свое устройство?',
        createNewDevice: 'Добавить новое',
        variables: 'Переменные',
        varKey: 'Ключ',
        varVal: 'Значение',
        token: 'Токен | Токены',
        tokenPopupHeader: 'Ваш токен-ключ был успешно создан!',
        tokenPopupText: 'Загрузите файл с ключом сейчас или скопируйте его для дальнейшего использования. Если вы не загрузите файл ключа сейчас, вы не сможете  получить свой токен-ключ снова. Для вашей безопасности никому не передавайте  свой токен-ключ.',
        tokenPopupCopy: 'Копировать',
        tokenPopupSave: 'Сохранить  в формате TXT',
      },
      license: {
        customers: 'Пользователи',
        license: 'Лицензия',
        licenseId: 'ID',
        allCustomers: 'Все пользователи',
        allLicenses: 'Все лицензии',
        serial: 'Серия',
        product: 'Продукт',
        validFrom: 'Время действия',
        validTill: 'Время окончания',
        used: 'Использовано',
        limit: 'Лимит',
        status: 'Статус',
        competitive: 'Конкурентная',
        searchPlaceholder: 'Серия, продукт',
        daysToExpire: {
          '0': 'Истечение срока действия',
          '30': '30 или меньше',
          '90': '90 или меньше',
          days: ' дней',
        },
        importLicense: 'Загрузить лицензию',
        licenseKey: 'Лицензионный ключ',
      },
      devices: {
        devices: 'Устройство | Устройства',
        allDevices: 'Все устройства',
        newDevice: 'Новое устройство',
        newDeviceDescription: 'Описание нового устройства',
        hotdeskDeviceSettings: 'Настройка посменного использования устройства',
        searchPlaceholder: 'Название, пользователь, идентификатор & идентификатор компьютера',
        authId: 'Идентификатор',
        presence: 'Актуальный статус',
        hotdesk: 'Hot desking',
        hotdeskDevice: 'Hot desking устройство',
        hotdeskIncorrectInput: 'Неправильное имя хоста',
        hotdeskInputHint: 'Для имени хоста используйте правильные символы. Разрешены символы: A-Z, a-z, 0-9, -, _',
        deviceSettings: 'Настройки устройства',
        hostName: 'Имя хоста',
        phoneInfo: 'Информация о телефоне',
        phone: 'Телефон',
        vendor: 'Производитель',
        model: 'Модель',
        ipv4: 'IPv4',
        mac: 'MAC',
        deviceHistory: 'История пользования',
        loggedIn: 'В системе',
        loggedOut: 'Вышел из системы',
        state: {
          nonreg: 'Не зарегистрировано',
          reged: 'Зарегистрировано',
          ringing: 'Звонит',
          dialing: 'Набирает',
          dialog: 'В разговоре',
          onhold: 'На удержании',
        },
        passwordSetFromAccount: 'Если вы не установите пароль, он будет таким же, как аккаунт',
      },
    },
    permissions: {
      permissions: 'Разрешения',
      permissionsRole: 'Роль | Роли',
      allRoles: 'Все роли',
      searchPlaceholder: 'роль ..',
      roles: {
        permissions: 'Право доступа роли | Права доступа ролей',
        addPermission: 'Добавить право доступа для роли',
        usage: 'Использование',
        applicationsAccess: {
          applicationsAccess: 'Приложение | Приложения',
          access: 'Доступ',
        },
      },
      object: {
        object: 'Разделы',
        allObjects: 'Все разделы',
        ObAC: 'Управление действиями',
        RbAC: 'Управление записями',
        operations: 'Действия',
        searchPlaceholder: 'раздел ..',
        newPermissionRole: 'Новый владелец прав',
        rbacDefault: 'Права доступа по записям по умолчанию',
        grantor: 'Праводатель',
        grantee: 'Получатель',
        accessMode: {
          '1': 'Запрещено',
          '2': 'Разрешено',
          '3': 'Управление',
        },
      },
    },
    lookups: {
      lookups: 'Справочники',
      skills: {
        skills: 'Навык | Навыки',
        capacity: 'Потенциал',
        minCapacity: 'Минимальный потенциал',
        minCapacityLessOrEqualToMaxCapacityValidator: 'Должно быть меньше или равно Минимальному потенциалу',
        maxCapacity: 'Максимальный потенциал',
        maxCapacityMoreOrEqualToMinCapacityValidator: 'Должно быть больше или равно Максимальному потенциалу',
        lvl: 'Уровень',
        agentSkills: 'Навыки оператора | Навыки операторов',
        allSkills: 'Все навыки',
        state: 'Состояние',
      },
      buckets: {
        buckets: 'Корзина | Корзины',
        allBuckets: 'все корзины',
        addBucket: 'Добавить корзину',
      },
      blacklist: {
        blacklist: 'Черный список | Черные списки',
        allBlacklists: 'Все черные списки',
        number: 'Номер | Номера',
        newNumber: 'Новый номер',
        numbersCount: 'Номера',
      },
      media: {
        mediaFiles: 'Медиафайл| Медиафайлы',
        allMediaFiles: 'Все медиафайлы',
        createdAt: 'Когда создан',
        format: 'Формат',
        size: 'Размер',
        textToSpeech: 'Синтез речи',
        popupSettings: 'Настройки',
        provider: 'Провайдер',
        lang: 'Язык',
        voice: 'Голос',
        token: 'Токен',
        key: 'Ключ',
        dragPlaceholder: 'Перетаскивание файлов',
        dragPlaceholderHere: 'здесь.',
      },
      regions: {
        regions: 'Регион | Регионы',
        allRegions: 'Все регионы',
      },
      timezone: {
        timezone: 'Часовая зона | Часовые зоны',
      },
      calendars: {
        calendars: 'Календарь | Календари',
        allCalendars: 'Все календари',
        searchPlaceholder: 'Название, описание...',
        timezone: 'Часовой пояс',
        start: 'Начало',
        end: 'Конец',
        workWeek: 'Рабочая неделя',
        holidays: 'Выходной | Выходные',
        date: 'Дата',
        repeat: 'Повторить',
        fulltime: 'Временный',
        everyYear: 'Повторять каждый год',
        newHoliday: 'Новый выходной',
        mon: 'Понедельник',
        tue: 'Вторник',
        wed: 'Среда',
        thu: 'Четверг',
        fri: 'Пятница',
        sat: 'Суббота',
        sun: 'Воскресение',
      },
      communications: {
        communications: 'Тип связи| Типы связи',
        allCommunications: 'Все типы связи',
        addCommunication: 'Добавить связь',
        code: 'Код',
      },
      pauseCause: {
        pauseCause: 'Статусы агента | Статус агента',
        allPauseCause: 'Все причины паузы агента',
        limit: 'Лимит (мин)',
        min: 'Минут',
        allowAdmin: 'Администратор может изменять этот статус',
        allowSupervisor: 'Супервизор может изменять этот статус',
        allowAgent: 'Оператор может изменять этот статус',
      },
    },
    routing: {
      routing: 'Маршрутизация',
      ip: 'IP',
      protocol: 'Протокол',
      port: 'Порт',
      configuration: 'Конфигурация',
      schema: 'Схема звонка',
      json: 'JSON',

      flow: {
        flow: 'Схема',
        allFlowSchemas: 'Все схемы звонков',
        newFlow: 'Новая схема',
        flowSchema: 'Схема звонка',
        type: 'Тип',
        debug: 'Отладка',
        newFlowDescription: 'Выберите шаблон, чтобы начать работу или создайте новую схему',
        generalFlow: 'Главная схема',
        generalFlowDescription: 'Описание',
        visual: 'Визуальная схема',
        json: 'JSON-схема',
        callFlow: 'Конструктор схемы звонка',
        callflow: 'Конструктор звонка',
        callFlowDescription: 'Описание',
        visualDescription: 'lorem ipsum',
        jsonDescription: 'lorem ipsum',
        createNew: 'Создать новую схему',
      },

      dialplan: {
        dialplan: 'Исходящая маршрутизация',
        dialplanRules: 'Правила исходящей маршрутизации',
        pattern: 'Номер назначения',
        dialplanRule: 'Правило исходящей маршрутизации',
        position: 'Позиция',
      },

      gateways: {
        gateways: 'Шлюз | Шлюзы',
        allGateways: 'Все шлюзы',
        trunkingGateway: 'Многоканальный шлюз',
        registerGateway: 'Зарегистрировать шлюз',
        stateSuccess: 'Успешно',
        stateFailed: 'Неудачно',
        stateProgress: 'В процессе',
        stateNonreg: 'Не зарегистрирован',
        proxy: 'Прокси',
        searchPlaceholder: 'поиск шлюза...',
        host: 'Хост',
        trunkingACLTitle: 'Контроль доступа',
        trunkingACL: 'Многоканальный список доступа',
        hostnameTrunking: 'Сервер/Хост шлюза или IP',
        hostnameRegister: 'Регистратор/Сервер/Хост шлюза или IP',
        expire: 'Срок действия',
        authID: 'Имя пользователя',
        account: 'Аккаунт',
        outboundProxy: 'Адрес исходящего SIP-прокси',
        newGateway: 'Новый шлюз',
        newGatewayDescription: 'Описание нового шлюза',
        SIPregistrations: 'SIP-регистрация',
        SIPregistrationsDescription: 'Описание SIP-регистрации',
        SIPtrunking: 'SIP-транки',
        SIPtrunkingDescription: 'Описание SIP-транков',

      },

      chatGateways: {
        chatGateways: 'Текстовый шлюз | Текстовые шлюзы',
        allChatGateways: 'Все текстовые шлюзы',
        telegram: 'Телеграм',
        whatsapp: 'Вотсапп',
        facebook: 'Фейсбук',
        viber: 'Вайбер',
        webchat: 'Веб чат',
        uri: 'URI',
        provider: 'Провайдер',
        newChatGateway: 'Новый текстовый шлюз',
        metadata: {
          apiKey: 'Api Key',
          number: 'Number',
          baseUrl: 'Base URL',
          scenarioKey: 'Scenario Key',
          accessToken: 'Access Token',
          verifyToken: 'Verify Token',
          sendApi: 'Send API',
          allowOrigin: 'Allow Origin',
          readTimeout: 'Read Timeout (sec)',
          writeTimeout: 'Write Timeout (sec)',
          handshakeTimeout: 'Handshake Timeout (sec)',
          messageSize: 'Message Size max (bytes)',
          botName: 'Bot Name',
          eventTypes: 'Event Types',
        },
      },

      callflow: {
        callflow: 'Конструктор звонка',
      },
    },
    ccenter: {
      ccenter: 'Контакт центр',
      agents: {
        agents: 'Оператор | Операторы',
        supervisors: 'Супервизор | Супервизоры',
        admins: 'Администратор | Администраторы',
        subordinates: 'Подчинённый оператор | Подчинённые операторы',
        allAgents: 'Все операторы',
        state: 'Статус',
        progressiveCount: 'Количество одновременных звонков',
        chatCount: 'Количество одновременных чатов',
        isSupervisor: 'Супервизор',
        stateTime: 'Время статуса',
        addSkill: 'Добавить навык',
        addSubordinate: 'Добавить подчинённого агента',
        statusHistory: 'История статусов',
        historyState: 'Статус',
        historyChannel: 'Канал',
        historyFrom: 'С',
        historyTo: 'До',
        historyDuration: 'Длительность',
        payload: 'Причина',
      },

      auditors: {
        auditors: 'Аудитор | Аудиторы',
      },

      teams: {
        teams: 'Команда| Команды',
        allTeams: 'Все команды',
        strategy: 'Стратегия',
        timing: 'Параметры дозвона',
        maxNoAnswer: 'Максимальное количество звонков без ответа',
        callTimeout: 'Длительность вызова',
        wrapUpTime: 'Длительность паузы между звонками',
        noAnswerDelayTime: 'Время ожидания при отсутствии ответа оператора',
        strategies: {
          random: 'Случайно',
          fewestCalls: 'Агент с найменьшим количеством звонков',
          leastTalkTime: 'Агент с найменьшим временем разговора',
          topDown: 'Сверху вниз',
          roundRobin: 'По порядку',
          roundRobinBucket: 'По порядку корзины',
          longestIdleAgent: 'Агент с найбольшим временем простоя',
          skillCapacity: 'По уровню навыка',
        },
      },

      members: {
        members: 'Абонент| Абоненты',
        allMembers: 'Все абоненты',
        addMember: 'добавить абонента',
        destination: 'Назначение',
        display: 'Отображение номера',
        priority: 'Приоритет',
        endCause: {
          sysShutdown: 'Выключение системы!',
          dbError: 'Ошибка базы данных',
          abandoned: 'Abandoned',
          timeout: 'Тайм-аут',
          cancel: 'Выход',
          successful: 'Успешно',
          queueNotImplement: 'Очередь не определена',
          unknown: 'Неизвестный',
        },
      },

      queues: {
        queues: 'Очередь | Очереди',
        allQueues: 'Все очереди',
        type: 'Типы',
        state: 'Статус',
        active: 'Активная',
        notActive: 'Не активная',
        activeCalls: 'Активные звонки',
        waiting: 'Ожидание',
        ringtone: 'Мелодия',
        priority: 'Приоритет',
        newQueue: 'Новая очередь',
        newQueueDescription: 'Типы очередей',
        outboundIVRQueue: 'Исходящая IVR-очередь',
        outboundIVR: 'Исходящий IVR',
        outboundIVRDescription: 'Исходящий IVR позволяет организации автоматически привлекать клиентов по нескольким каналам, таким как автоматические голосовые вызовы, SMS-сообщения, электронная почта или сообщения в социальных сетях с использованием персонализированных уведомлений.',
        inboundQueue: 'Входящая очередь',
        inboundQueueDescription: 'Входящая очередь: звонящие находятся в режиме ожидания в очереди, чтобы поговорить с живым оператором.',
        offlineQueue: 'Оффлайн очередь',
        offlineQueueDescription: 'Автономная очередь дает возможность звонящим  прекратить ожидание на удержании, ввести свой номер телефона и получить обратный вызов.',
        previewDialer: 'Превью обзвон',
        previewDialerDescription: 'Инициатором звонка выступает оператор. Предварительный просмотр контакта перед автоматическим набором номера.',
        progressiveDialer: 'Прогрессивный обзвон',
        progressiveDialerDescription: 'Исходящая кампания с резервированием оператора.',
        predictiveDialer: 'Предиктивный обзвон',
        predictiveDialerDescription: 'Исходящая кампания без предварительного резервирования оператора для максимального сокращения времени ожидания звонка.',
        chatInboundQueue: 'Входящая очередь чатов',
        chatInboundQueueDescription: 'То же самое, что и Входящая очередь, но с чатами',
        taskQueue: 'Очередь задач',
        taskQueueDescription: 'Очередь задач',
        strategy: 'Стратегия',
        timezone: 'Часовая зона',
        callLimit: 'Максимальное количество одновременных звонков',
        variables: 'Переменные',
        members: 'Абонент | Абоненты',
        timing: 'Настройка дозвона абонентов',
        discardAbandonedAfter: 'Кол-во секунд до полного удаления абонента',
        timeoutWithNoAgents: 'Время ожидания, когда нет агентов',
        timeBaseScore: 'Рейтинг звонка',
        processing: 'Ожидание результата звонка',
        processingSec: 'Время постобработки (сек)',
        processingRenewalSec: 'Предложить продление после (сек)',
        stickyAgent: 'Липкость',
        stickyAgentSec: 'Время ожидания липкости (сек)',
        varKey: 'Ключ',
        varVal: 'Значение',
        endCause: 'Причина прекращения',
        offeringAt: 'Перезвонить в',
        destination: 'Назначение | Назначения',
        expire: 'Истекает',
        originateTimeout: 'Длительность дозвона',
        maxAgentLine: 'Max agent lines',
        maxAgentLose: 'Max agent lose calls',
        minAttempts: 'Min predict attempts',
        maxAbandonedRate: 'Max abandoned %',
        abandonRateAdjustment: 'Abandon rate adjustment',
        playbackSilence: 'Playback silence',
        targetAbandonedRate: 'Target abandoned rate',
        maxWaitTime: 'Максимальное время ожидания',
        waitBetweenRetries: 'Время между попытками дозвона',
        waitBetweenRetriesDesc: 'Сортировка перезвона абонентам по спаданию',
        retryAbandoned: 'Возобновлять потерянных абонентов',
        playbackFile: 'Проиграть файл',
        timeout: 'Время перерыва между звонками',
        maxNumberOfRetry: 'Максимальное количество попыток звонков',
        minDuration: 'Минимально успешная длительность звонка',
        maxAttempts: 'Максимальное количество попыток дозвониться',
        waitForResultStatus: 'Ожидание результата звонка',
        bucketRatio: 'Соотношение',
        amd: 'AMD',
        enabled: 'Включить автоопределение',
        allowNotSure: 'Неопределенные',
        allowGreetingAgent: 'Разрешить приветствие',
        preSchema: 'Схема предварительного набора',
        afterSchema: 'Схема посленабора',
        maxCalls: 'Лимит звонков',
        maxCallsHint: 'Если значение равно 0, будут использованы все ресурсы',
        recordings: 'Запись',
        maxWordLength: 'Максимальная продолжительность предложения (мс)',
        maxNumberOfWords: 'Максимальное кол-во слов в приветствии',
        betweenWordsSilence: 'Продолжительность тишины между словами (мс)',
        minWordLength: 'Минимальная продолжительность непрерывного звука голоса (мс)',
        totalAnalysisTime: 'Максимальное время для распознавания (мс)',
        silenceThreshold: 'Максимальная продолжительность тишины между словами (мс)',
        afterGreetingSilence: 'Продолжительность тишины после приветствия (мс)',
        greeting: 'Максимальная длина приветствия (мс)',
        initialSilence: 'Максимальная продолжительность тишины перед приветствием (мс)',
        queueStrategy: {
          fifo: 'FIFO (Первый зашёл Первый вышел)',
          lifo: 'LIFO (Последний зашёл Первый вышел)',
        },
        logs: {
          logs: 'Лог | Логи',
          destination: 'Назначение',
          offeringAt: 'Распределение',
          joinedAt: 'Начало',
          leavingAt: 'Конец',
          duration: 'Длительность',
          viewNumber: 'Номер',
          result: 'Результат',
        },
        hooks: {
          hooks: 'Хук | Хуки',
          event: 'Событие',
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
        res: 'Ресурс | Ресурсы',
        allRes: 'Все ресурсы',
        reserve: 'Резервный',
        searchPlaceholder: 'название, шлюз..',
        cps: 'CPS',
        limit: 'Лимит',
        numbers: 'Номер | Номера',
        displayNumbers: 'Номер для отображения',
        failure: 'Сбой',
        maxErrors: 'Максимальное количество ошибок',
        errorCodes: 'Коды ошибок',
        patterns: 'Шаблон исходящего номера',
        priority: 'Приоритет',
        reserveResource: 'Резервный ресурс',
      },

      resGroups: {
        resGroups: 'Группа ресурсов | Группы ресурсов',
        allResGroups: 'Все группы ресурсов',
        searchPlaceholder: 'название группы ресурсов..',
        addResGroup: 'Добавить группу ресурсов',
        strategy: 'Стратегия',
        timerange: 'Интервал',
        timerangeFrom: 'ОТ',
        timerangeTo: 'До',
      },
    },
    integrations: {
      integrations: 'Интеграции',

      storage: {
        storage: 'Хранилище',
        allStorages: 'Все хранилища',
        type: 'Тип',
        maxSize: 'Объем хранилища (GB)',
        expireDays: 'Срок хранения (дней)',
        priority: 'Приоритет',
        newStorage: 'Новое хранилище',
        newStorageDescription: 'Описание нового хранилища',
        local: 'Local',
        s3: 'Amazon S3',
        digitalOcean: 'Digital Ocean Spaces',
        backblaze: 'Backblaze B2',
        dropbox: 'Dropbox',
        drive: 'Google Drive',
        configuration: 'Конфигурация',
        pathPattern: 'Шаблон пути',
        localFolder: 'Local folder',
        s3Key: 'Key ID',
        s3Access: 'Access Key',
        bucket: 'Корзина',
        region: 'Площадка',
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
        service: 'Сервис',
      },

      tokens: {
        tokens: 'Токен | Токены',
        allTokens: 'Все токены',
        expires: 'Истекает',
        popupMessage: 'Загрузите файл ключа или скопируйте его. Если вы не загрузите файл ключа сейчас, вы не сможете извлечь его еще раз. Чтобы повысить безопасность, храните ключ в надежном месте и не делитесь им.',
        tokenCreated: 'Ваш токен успешно создан!',
      },

      triggers: {
        triggers: 'Триггер| Триггеры',
        allTriggers: 'Все триггеры',
        type: 'Тип',
        schema: 'Схема',
        newTrigger: 'Новый триггер',
        newTriggerDescription: 'Choose a template to get going or start from scratch with a blank canvas',
        onEvent: 'On event',
        onEventDescription: 'An event-based JSON Schema scheduler',
        atTime: 'At time',
        atTimeDescription: 'A time-based JSON Schema scheduler',
        event: 'Event',
      },
    },
    pagination: {
      rowsPerPage: 'Количество строк на странице',
    },
  },

  utils: {
    downloadFilesBtn: {
      downloadFiles: 'Скачать файлы',
      filesLoaded: 'Файлов скачано',
      zippingProgress: 'Прогресс архивации',
    },
  },

  errorPages: {
    goToHome: 'Вернуться Домой',
    page403: {
      title: 'Нет доступа',
      text: 'Извините, у вас недостаточно прав доступа для просмотра этой страницы.',
    },
    page404: {
      title: 'Похоже, вы потерялись',
      text: 'Извините, мы не можем найти то, что вы ищете',
    },
  },

  icon: {
    docs: 'Документация',
    logout: 'Выйти',
    account: 'Аккаунт',
    appNavigator: 'Навигатор приложений',
    settings: 'Настройки',
  },

  iconHints: {
    upload: 'Загрузить',
    reload: 'Обновить',
    edit: 'Редактировать',
    delete: 'Удалить',
    deleteAll: 'Удалить все объекты',
    deleteSelected: 'Удалить {count} выбраных объктов',
    generate: 'Создать',
    add: 'Добавить',
    history: 'История',
    download: 'Скачать',
    downloadAll: 'Скачать все',
    draggable: 'Перетащить',
    play: 'Играть',
    pause: 'Пауза',
    resume: 'Возобновить',
    close: 'Закрыть',
    volume: 'Громкость',
    stop: 'Остановить',
    members: 'Абоненты',
    moveUp: 'Передвинуть вверх',
    moveDown: 'Передвинуть вниз',
    nextPage: 'Следующая страница',
    prevPage: 'Предыдущая страница',
    expand: 'Развернуть',
    collapse: 'Свернуть',
  },
};
