import { EngineCommunicationChannels } from 'webitel-sdk';

export default {
  auth: {
    register: 'Жасау',
    login: 'Кіру',
    registerReset: 'Құпия сөзді қалпына келтіру ',
    detailsSubtitle: 'Мәліметтеріңізді енгізіңіз',
    resetPasswordLink: 'Құпия сөзіңізді ұмыттыңыз ба?',
    user: 'Қолданушының аты',
    password: 'Құпия сөз',
    confirmPassword: 'Құпия сөзді қайталаңыз',
    key: 'Лицензия кілті',
    registerSubmit: 'Тіркелу',
    resetSubmit: 'Қалпына келтіру',
    loginSubmit: 'Кіру',
    carousel: {
      title1: 'Бұлтта және Он сайтта',
      text1: 'Қауіпсіздік саясатыңыз деректерді сақтауға және бұлттық қызметтерді пайдалануға мүмкіндік бермейді ме? Webitel көмегімен сіз өз сайтыңызда байланыс орталығын құра аласыз!',

      title2: 'Көп арналы және көп арналы',
      text2: 'Клиенттеріңізбен кез келген уақытта, кез келген жерде байланыста болыңыз! Кез келген күрделіліктің IVR мәзірі, кіріс, шығыс өзара әрекеттесу науқандары немесе әлеуметтік желілердегі хабарлар - енді бұл бұрынғыдан оңай!',

      title3: 'Тұрақты инфрақұрылым',
      text3: 'Енді тоқтап қалу немесе деректер жоғалту жағдайы болмайды. Жылдам масштабтау және ақауларға төзімді архитектура бір уақытта әртүрлі байланыс арналарынан минутына 1000-нан астам тұтынушы қоңырауларына қызмет көрсетуге мүмкіндік береді.',

      title4: 'Дизайн',
      text4: 'Барлық қажетті функцияларға жылдам қол жеткізуге мүмкіндік беретін ең ыңғайлы басқару панелі бар жаңа минималистік интерфейс. Аз клик - көп мүмкіндіктер.',

      title5: 'Оператор топтарымен жұмыс істеуге арналған жаңа модуль',
      text5: 'Қоңырауларды максималды тиімді тарату. Оператордың әртүрлі науқандарға қатысу үшін бірнеше дағдылары болуы мүмкін. Клиентке тек өз саласындағы кәсіби мамандар қызмет көрсетеді.',

      title6: 'Қол жеткізу құқықтарын орнату',
      text6: 'Құқықтарды басқарудың жаңа модулі – бақылаудың жаңа мүмкіндіктері. Енгізілген өзгерістерді бақылай отырып, құқықтарды тек бөлімдерге ғана емес, сонымен қатар пайдаланушы әрекеттеріне де тағайындауға болады.'
    },
  },
  header: {
    logout: 'Шығу',
    docs: 'Анықтама',
  },
  appNavigator: {
    title: 'Webitel қолданбалары',
  },
  settings: {
    settings: 'Параметрлер',
    changePassword: 'Құпия сөзді өзгерту',
    language: 'Тіл',
    webPhone: 'Web-телефон',
    useWebPhone: 'Web-телефонды пайдаланыңыз',
    useStun: 'STUN пайдаланыңыз',
  },
  validation: {
    email: 'Электрондық поштаны енгізіңіз',
    required: 'Міндетті түрде толтырылатын өріс',
    sameAs: 'Қате құпия сөз',
    minValue: 'Мән кем дегенде болуы керек',
    maxValue: 'Мән тым үлкен болмауы керек',
    numeric: 'Сандар болуы керек',
    requiredArrayValue: 'Өріс бос болмауы керек',
    isPositiveValue: 'Мән нөлден үлкен болуы керек',
    cron: 'Жарамсыз cron өрнегі',
  },
  nav: {
    directory: {
      directory: 'Каталог',
    },
    routing: {
      routing: 'Маршруттау',
    },
    lookups: {
      lookups: 'Анықтамалар',
    },
    ccenter: {
      ccenter: 'Байланыс орталығы',
    },
    integrations: {
      integrations: 'Интеграциялар',
    },
    permissions: {
      permissions: 'Рұқсаттар',
    },
  },
  home: {
    dashboard: 'Есептер',
    welcomeText: 'Қош келдіңіз!',
    news: 'Жаңалықтар',
  },
  objects: {
    all: 'Барлығы { entity }',
    administration: 'Бақылау',
    general: 'Жалпы',
    new: 'Жаңа нысан',
    add: 'Қосу',
    create: 'Жасау',
    read: 'Оқу',
    edit: 'Өңдеу',
    delete: 'Жою',
    save: 'Сақтау',
    saved: 'Сақталған',
    saveAs: 'Жаңа ретінде сақтаңыз',
    close: 'Жабу',
    next: 'Әрі қарай',
    back: 'Артқа',
    change: 'Ауыстыру',
    name: 'Аты',
    description: 'Сипаттама',
    user: 'Пайдаланушы',
    users: 'Пайдаланушылар',
    password: 'Құпия сөз',
    history: 'Тарих',
    copy: 'Көшіру',
    copied: 'Көшірілген!',
    createdAt: 'Жасалған',
    createdBy: 'Кіммен жасалған',
    importCSV: 'CSV Импорттау',
    online: 'Желіде',
    offline: 'Желіден шыққан',
    enabled: 'енгізілген',
    status: 'Күй',
    from: 'бастап',
    to: 'Дейін',
    importJSON: 'JSON импорттау',
    addNew: 'қосу',
    provider: 'Провайдер',
    default: 'Әдепкі',
    service: 'Қызмет',
    key: 'Кілт',
    email: 'Электрондық поштаның адресі',
    updatedAt: 'Өзгертілді',
    emptyWorkspace: 'Бөлімде әлі жазбалар жасалмаған',
    emptyResultSearch: 'Іздеу еш нәтиже бермеді',
    deleteConfirmation: {
      title: 'Жоюды растаңыз',
      askingAlert: '{count} жазбасын шынымен жойғыңыз келе ме? | {count} жазбаларын шынымен жойғыңыз келе ме?',
      undoneActionAlert: 'Бұл әрекетті қайтару мүмкін емес.',
      deleteAll: 'БАРЛЫҚ',
    },
    CSV: {
      skipHeaders: 'Тақырыптарды жию',
      separator: 'Бөлгіш',
      CSVColumn: 'CSV өрісі',
      fieldName: 'Өріс атауы',
      clearMember: 'Абонентті тазалау',
    },
    generalInfo: 'жалпы ақпарат',
    directory: {
      directory: 'Каталог',
      passwordInfo: 'Құпия сөзді қайта жазу (немесе жаңа жасау) қажет болса, мәнді енгізіңіз',
      users: {
        users: 'Пайдаланушы | Пайдаланушылар',
        allUsers: 'Барлық пайдаланушылар',
        searchPlaceholder: 'Аты, пайдаланушы, телефон нөмірлері, күйі',
        login: 'Пайдаланушы аты ',
        extensions: 'Ішкі нөмір',
        state: 'Күй',
        status: 'Күй',
        roles: 'Рөлдері',
        tokens: 'Токендер',
        usage: 'Қолданылуы',
        roleAdmin: 'Әкімші',
        license: 'Лицензия',
        devices: 'Құрылғы',
        defaultDevice: 'Әдепкі құрылғы (таңдалған құрылғылар тізімінен)',
        deviceNotFound: 'Құрылғыңызды таба алмадыңыз ба?',
        createNewDevice: 'Жаңасын қосыңыз',
        variables: 'Айнымалылар',
        varKey: 'Кілт',
        varVal: 'Мағынасы',
        token: 'Токен | Токендер',
        tokenPopupHeader: 'Сіздің токен-кілтіңіз сәтті жасалды!',
        tokenPopupText: 'Негізгі файлды қазір жүктеп алыңыз немесе кейінірек пайдалану үшін көшіріңіз. Егер кілт файлын қазір жүктеп алмасаңыз, таңбалауыш кілтін қайтадан ала алмайсыз. Қауіпсіздігіңіз үшін таңбалауыш кілтіңізді ешкіммен бөліспеңіз.',
        tokenPopupCopy: 'Көшіру',
        tokenPopupSave: 'TXT пішімі ретінде сақтаңыз',
      },
      license: {
        customers: 'Пайдаланушылар',
        license: 'Лицензия | Лицензиялар',
        allCustomers: 'Барлық пайдаланушылар',
        allLicenses: 'Барлық лицензиялар',
        serial: 'Серия',
        product: 'Өнім',
        validTill: 'дейін жарамды',
        used: 'Қолданылған',
        limit: 'Шектеу',
        status: 'Күй',
        competitive: 'Бәсекелі',
        searchPlaceholder: 'Серия, өнім',
        domain: 'Домен',
        daysToExpire: {
          '0': 'Жарамдылық мерзімі',
          '30': '30 немесе одан аз',
          '90': '90 немесе одан аз',
          days: 'күндер',
        },
        importLicense: 'Лицензияны жүктеп алу',
        licenseKey: 'Лицензия кілті',
      },
      devices: {
        devices: 'Құрылғы | Құрылғылар',
        allDevices: 'Барлық құрылғылар',
        newDevice: 'Жаңа құрылғы',
        newDeviceDescription: 'Жаңа құрылғының сипаттамасы',
        hotdeskDeviceSettings: 'Құрылғыны ауысыммен пайдалануды орнату',
        searchPlaceholder: 'Тақырып, пайдаланушы, идентификатор',
        authId: 'Идентификатор',
        presence: 'Ағымдағы күй',
        hotdesk: 'Hot desking',
        hotdeskDevice: 'Hot desking құрылғы',
        hotdeskIncorrectInput: 'Жарамсыз хост атауы',
        hotdeskInputHint: 'Хост атауы үшін дұрыс таңбаларды пайдаланыңыз. Рұқсат етілген таңбалар: A-Z, a-z, 0-9, -, _',
        deviceSettings: 'Құрылғы параметрлері',
        hostName: 'Хост атауы',
        phoneInfo: 'Телефон ақпараты',
        phone: 'Телефон ',
        vendor: 'Өндіруші',
        model: 'Үлгі',
        deviceHistory: 'Қолдану тарихы',
        loggedIn: 'Жүйеде',
        loggedOut: 'Жүйеден шықты',
        state: {
          nonreg: 'Тіркелмеген',
          reged: 'Тіркелген',
          ringing: 'Қоңырау шалу',
          dialing: 'Теру',
          dialog: 'Әңгімелесу барысында',
          onhold: 'Күтуде'
        },
        passwordSetFromAccount: 'Құпия сөзді орнатпасаңыз, ол есептік жазбамен бірдей болады'
      },
    },
    permissions: {
      permissions: 'Рұқсаттар',
      permissionsRole: 'Рөл | Рөлдер',
      allRoles: 'Барлық рөлдер',
      searchPlaceholder: 'Рөл ',
      roles: {
        permissions: {
          permissions: 'Рөлге қол жеткізу құқығы | Рөлдерге қол жеткізу құқығы',
          add: 'Жасау',
          delete: 'Жою',
          read: 'Таңдау',
          write: 'Өңдеу',
          eavesdropCall: 'Белсенді қоңырауды тыңдау',
          playbackRecordFile: 'Қоңырау жазбаларын ойнату',
          exportDataGrid: 'Деректерді экспорттау',
          viewCdrPhoneNumbers: 'Шифрланбаған телефон нөмірлерін қараңыз',
          manageUserRoles: 'Пайдаланушы рөлдерін басқару',
          manageUserLicense: 'Пайдаланушы лицензиясын басқару',
          changeUserPassword: 'Пайдаланушы құпия сөздерін өзгерту',
          addDescription: 'Нысандарды жасауға рұқсат береді',
          deleteDescription: 'Нысандарды жоюға рұқсат береді',
          readDescription: 'Нысандарды таңдауға рұқсат береді',
          writeDescription: 'Нысандарды өзгертуге рұқсат береді',
          eavesdropCallDescription: 'Белсенді әңгімені тыңдауға рұқсат береді',
          playbackRecordFileDescription: 'Қоңырау жазу файлдарын ойнатуға рұқсат береді',
          exportDataGridDescription: 'Деректерді экспорттауға рұқсат береді',
          viewCdrPhoneNumbersDescription: 'Шифрланбаған телефон нөмірлерін көрсетуге рұқсат береді',
          manageUserRolesDescription: 'Пайдаланушы рөлдерінің жиынын басқаруға рұқсат береді',
          manageUserLicenseDescription: 'Пайдаланушы лицензияларының жинағын басқаруға рұқсат береді',
          changeUserPasswordDescription: 'Пайдаланушының құпия сөзін өзгертуге рұқсат береді',
        },
        addPermission: 'Рөлге кіру рұқсатын қосыңыз',
        usage: 'Қолданылуы',
        applicationsAccess: {
          applicationsAccess: 'Қолданба | Қолданбалар',
          access: 'Қол жеткізу',
        },
      },
      object: {
        object: 'Бөлімдер',
        allObjects: 'Барлық бөлімдер',
        ObAC: 'Әрекеттерді басқару',
        RbAC: 'Жазбаларды басқару',
        operations: 'Әрекеттер',
        searchPlaceholder: 'Бөлім',
        newPermissionRole: 'Жаңа құқық иесі',
        rbacDefault: 'Әдепкі енгізу рұқсаттары',
        grantor: 'Рұқсат беруші',
        grantee: 'Алушы',
        create: 'Жасау',
        delete: 'Жою',
        accessMode: {
          '1': 'Тыйым салынады',
          '2': 'Рұқсат',
          '3': 'Бақылау',
        },
      },
    },
    lookups: {
      lookups: 'Анықтамалар',
      skills: {
        skills: 'Дағды | Дағдылар',
        capacity: 'Потенциал',
        minCapacity: 'Минималды потенциал',
        minCapacityLessOrEqualToMaxCapacityValidator: 'Максималды потенциалдан аз немесе оған тең болуы керек',
        maxCapacity: 'Максималды потенциал',
        maxCapacityMoreOrEqualToMinCapacityValidator: 'Ең аз сыйымдылықтан үлкен немесе оған тең болуы керек',
        lvl: 'Деңгей',
        agentSkills: 'Оператор дағдылары | Операторлардың дағдылары',
        allSkills: 'Барлық дағдылар',
        state: 'Жағдай',
        stateForAll: 'Барлығына арналған жағдай ',
        changeSkillTo: 'дағдыны ауыстыру',
        changeAgentsSkill: 'Операторлар үшін дағдыны ауыстыру',
        totalAgents: 'Жалпы операторлар',
        activeSkillAgents: 'Белсенді шеберлікпен',
        assignSkillToAgents: 'Агенттерге дағдыны тағайындаңыз',
        assignAgent: 'Операторды тағайындау',
        selectCapacityAndState: 'Потенциалды және күйді таңдаңыз',
      },
      buckets: {
        buckets: 'Себет | Себеттер',
        allBuckets: 'Барлық себеттер',
        addBucket: 'Себетті қосу',
      },
      blacklist: {
        blacklist: 'Тізім | Тізімдер',
        allBlacklists: 'Барлық тізімдер',
        number: 'Нөмір | Нөмірлер',
        newNumber: 'Жаңа нөмір',
        numbersCount: 'Нөмірлер',
        expireAt: 'Жарамдылық мерзімі',
        temporary: 'Уақытша',
      },
      media: {
        mediaFiles: 'Медиафайл| Медиафайлдар',
        allMediaFiles: 'Барлық медиафайлдар',
        createdAt: 'Құрылды/Жасалды',
        format: 'Формат',
        size: 'Өлшем',
        textToSpeech: 'Сөйлеу синтезі',
        popupSettings: 'Параметрлер',
        lang: 'Тіл',
        voice: 'Дауыс',
        token: 'Токен',
        key: 'Кілт',
        dragPlaceholder: 'Файлдарды жүктеп салу',
        dragPlaceholderHere: 'Мұнда.',
        tts: {
          hint: 'Аудиофайл жасау',
          textType: {
            textType: 'Мәтін түрі',
          },
        },
      },
      regions: {
        regions: 'Аудан | Аудандар',
        allRegions: 'Барлық аудандар',
      },
      timezone: {
        timezone: 'Уақыт белдеуі | Уақыт белдеулері',
      },
      calendars: {
        calendars: 'Күнтізбе | Күнтізбелер',
        allCalendars: 'Барлық күнтізбелер',
        searchPlaceholder: 'Атауы, сипаттамасы...',
        timezone: 'Сағаттық белдеу',
        start: 'Басы',
        end: 'Соңы',
        workWeek: 'Жұмыс аптасы',
        holidays: 'Демалыс күні | Демалыс күндері',
        date: 'Күні',
        repeat: 'Қайталау',
        fulltime: 'Уақытша',
        everyYear: 'Жыл сайын қайталау',
        newHoliday: 'Жаңа демалыс күні',
        mon: 'Дүйсенб',
        tue: 'Сейсенбі',
        wed: 'Сәрсенбі',
        thu: 'Бейсенбі',
        fri: 'Жұма',
        sat: 'Сенбі',
        sun: 'Жексенбі',
      },
      communications: {
        communications: 'Байланыс түрі| Байланыс түрлері',
        allCommunications: 'Байланыстың барлық түрлері',
        addCommunication: 'Байлансты қосыңыз',
        code: 'Код',
        channels: {
          [EngineCommunicationChannels.Phone]: 'Телефон',
          [EngineCommunicationChannels.Email]: 'Электрондық пошта',
          [EngineCommunicationChannels.Messaging]: 'Хабарламалар',
        },
      },
      pauseCause: {
        pauseCause: 'Оператор күйлері',
        allPauseCause: 'Оператордың үзілісінің барлық себептері',
        limit: 'Шектеу (мин)',
        min: 'Минут',
        allowAdmin: 'Администратор бұл күйді өзгерте алады',
        allowSupervisor: 'Супервизор бұл күйді өзгерте алады',
        allowAgent: 'Оператор бұл күйді өзгерте алады',
      },
    },
    routing: {
      routing: 'Маршруттау',
      protocol: 'Протокол',
      port: 'Порт',
      configuration: 'Конфигурация',
      schema: 'Қоңырау схемасы',
      flow: {
        flow: 'Схема| Схемалар',
        allFlowSchemas: 'Барлық схемалар',
        createFlowSelectionPopup: 'Жаңа схема жасаңыз',
        createNew: 'Жаңа схема жасайсызба',
        editor: 'Редактор',
        diagram: {
          diagram: 'Диаграмма',
          description: 'Webitel Flow Diagram көмегімен жаңа схема жасаңыз'
        },
        code: {
          code: 'Код',
          description: 'Код өңдегішінде JSON схемасын пайдаланып жаңа схема жасаңыз'
        },
      },
      dialplan: {
        dialplan: 'Шығыс бағыттау',
        dialplanRules: 'Шығысты бағыттау ережелері',
        pattern: 'Тағайындалған орын нөмірі',
        dialplanRule: 'Шығысты бағыттау ережелері',
        position: 'Позиция',
      },
      chatplan: {
        chatplan: 'Мәтіндік хабарды бағыттау ережесі | Мәтіндік хабарламаны бағыттау ережелері',
        allChatplans: 'Барлық мәтіндік хабарларды бағыттау ережелері',
      },
      gateways: {
        gateways: 'Шлюз | Шлюздар',
        allGateways: 'Барлық шлюздар',
        trunkingGateway: 'Көп арналы шлюз',
        registerGateway: 'Шлюзді тіркеңіз',
        stateSuccess: 'Сәтті',
        stateFailed: 'Сәтсіз',
        stateProgress: 'Орындалуда',
        stateNonreg: 'Тіркелмеген',
        proxy: 'Прокси',
        searchPlaceholder: 'шлюз іздеуде...',
        host: 'Хост',
        trunkingACLTitle: 'Қатынасты басқару',
        trunkingACL: 'Көп арналы кіру тізімі',
        hostnameTrunking: 'Сервер/Шлюздің хосты немесе IP',
        hostnameRegister: 'Тіркеуші/Сервер/Шлюз Хост немесе IP',
        expire: 'Жарамдылық мерзімі',
        authID: 'Қолданушының аты',
        account: 'Есептік жазба',
        outboundProxy: 'Шығыс SIP прокси мекенжайы',
        newGateway: 'Жаңа шлюз',
        newGatewayDescription: 'Жаңа шлюздің сипаттамасы',
        SIPregistrations: 'SIP тіркеу',
        SIPregistrationsDescription: 'SIP тіркеуінің сипаттамасы',
        SIPtrunking: 'SIP-транктер',
        SIPtrunkingDescription: 'SIP транктерінің сипаттамасы',
      },
      chatGateways: {
        templates: {
          templates: 'Үлгілер',
          title: 'Workspace анонимді қоңырау шалушы идентификаторы',
          close: 'Чатты аяқтау хабары',
          join: 'Операторға қосылу хабары',
          left: 'Оператордың ажырату хабары',
        },
        chatGateways: 'Мәтіндік шлюз | Мәтіндік шлюздер',
        allChatGateways: 'Барлық мәтіндік шлюздер',
        telegramBot: {
          telegramBot: 'Telegram Бот',
        },
        telegramApp: {
          telegramApp: 'Telegram қолданбасы',
          signedAs: 'Сіз жүйеге кірдіңіз',
          metadata: {
            apiId: 'API идентификатор',
            apiHash: 'API хэш',
          },
        },
        infobip: {},
        messenger: {
          addOrRemovePages: 'Беттерді қосу немесе жою',
          accounts: 'Есептік жазбалар',
          metadata: {},
          facebook: {
            pages: 'Facebook парақшалары',
            subscription: 'Webhook жазылымдары',
          },
          instagram: {
            comments: 'Пікірлерді қадағалау',
            mentions: 'Атап өтеуді қадағалау',
          },
          whatsapp: {
            token: 'Токен',
            status: 'Күй',
            number: 'Телефон нөмірі',
            review: 'Қарастыру',
          },
        },
        viber: {
          style: {
            style: 'Стиль',
            btnBackColor: 'Түйме фонының түсі',
            btnFontColor: 'Түйме мәтінінің түсі',
          },
        },
        webchat: {
          copyCode: 'Кодты көшіру',
          copyCodeHint: 'Параметрлерді әр өзгерткеннен кейін сайтқа виджет кодын қайта жасау және енгізу қажет',
          metadata: {
            mediaMaxSize: 'Максималды файл өлшемі (МБ)',
          },
          view: {
            borderRadius: 'Түйме түрі',
            language: 'Тіл',
            view: 'Түрі',
            position: 'Орналастыру',
            btnColor: 'Түйменің түсі',
            logoUrl: 'Логотип URL',
            logoHint: 'Қолдау көрсетілетін логотип пішімі - \'JPEG\' немесе \'PNG\', 24x24px',
            rounded: 'Дөңгелек',
            square: 'Шаршы',
            right: 'Оң жақта',
            left: 'Сол жақта',
            static: 'Статикалық',
          },
          chat: {
            chat: 'Чат',
            openTimeout: 'Ашылу кідірісін қосыңыз',
            openTimeoutSec: 'Ашудың кешігу уақыты',
          },
          appointment: {
            appointment: 'Қоңырауға тапсырыс беріңіз',
            days: 'Күндер саны',
            availableAgents: 'Еркін агенттер',
            showEmailField: 'Электрондық поштаны енгізу өрісін көрсету',
            showMessageField: 'Хабарлама енгізу өрісін көрсету',
            resultPageText: 'Нәтиже бетіндегі мәтін',
            headingText: 'Тақырып',
            subheadingText: 'Тақырыпша',
            showDefaultHeading: 'Нәтиже бетінде стандартты тақырып пен тақырыпшаны көрсетіңіз',
          },
          alternativeChannels: {
            alternativeChannels: 'Балама арналар',
            email: 'Электрондық пошта',
          },
        },
        newChatGateway: 'Жаңа мәтіндік шлюз',
        metadata: {},
      },
      callflow: {
        callflow: 'Конструкторды шақыру',
      },
    },
    ccenter: {
      ccenter: 'Байланыс орталығы',
      agents: {
        agents: 'Оператор | Операторлар',
        supervisors: 'Супервизор | Супервизорлар',
        admins: 'Администратор | Администраторлар',
        subordinates: 'Бағыныңқы оператор | Бағыныңқы операторлар',
        allAgents: 'Барлық операторлар',
        state: 'Күйі',
        progressiveCount: 'Бір уақыттағы қоңыраулар саны',
        chatCount: 'Бір уақыттағы чаттар саны',
        isSupervisor: 'Супервизор',
        stateTime: 'Ұзақтығы',
        addSkill: 'Дағды қосу',
        addSubordinate: 'Бағыныңқы операторды қосыңыз',
        statusHistory: 'Куйдің тарихы',
        historyState: 'Куй',
        historyChannel: 'Арна',
        historyFrom: 'бастап',
        historyTo: 'Дейін',
        historyDuration: 'Ұзақтығы',
        payload: 'Себеп',
        emptyPopup: 'Өтінемін, сұрыптау параметрлерін текстеріңіз',
        status: {
          online: 'Желіде',
          offline: 'Желіден шыққан',
          pause: 'Үзіліс',
          breakOut: 'Мәжбүрлі үзіліс',
        },
      },
      auditors: {
        auditors: 'Аудитор | Аудиторлар',
      },
      teams: {
        teams: 'Команда| Командалар',
        allTeams: 'Барлық командалар',
        strategy: 'Стратегия',
        timing: 'Теру параметрлері',
        maxNoAnswer: 'Жауапсыз қоңыраулардың максималды саны',
        callTimeout: 'Қоңырау ұзақтығы',
        inviteChatTimeout: 'Чатты қабылдау уақыты',
        wrapUpTime: 'Қоңыраулар арасындағы үзіліс ұзақтығы',
        noAnswerDelayTime: 'Оператордың жауабы болмаған кезде күту уақыты',
        strategies: {
          random: 'Кездейсоқ',
          fewestCalls: 'Ең аз қоңырау шалатын агент',
          leastTalkTime: 'Ең қысқа сөйлесу уақыты бар агент',
          topDown: 'Жоғарыдан төмен',
          roundRobin: 'Қалпында',
          roundRobinBucket: 'Себет қалпында',
          longestIdleAgent: 'Ең көп тоқтап тұрған агент',
          skillCapacity: 'Дағды деңгейі бойынша',
        },
      },
      members: {
        members: 'Жазылушы| Жазылушылар',
        allMembers: 'Барлық жазылушылар',
        addMember: 'Жазылушыны қосыңыз',
        destination: 'Мақсат',
        display: 'Нөмірді көрсету',
        priority: 'Басымдық',
        attempts: 'Әрекеттер',
        emptyWorkspace: 'Жазылушылар табылмады',
        resetMembers: {
          resetMembers: 'Жазылушыларды қайта іске қосыңыз',
          description: 'Сәтсіз қоңыраулар үшін қайта теруді шынымен қайта бастағыңыз келе ме?',
          reset: 'Қайтадан қосу',
          successResetCount: '{count} жазылушы сәтті қайта іске қосылды',
        },
        endCause: {
          abandoned: 'Жоғалған',
          timeout: 'Үзіліс',
          cancel: 'Болдырмаған',
          success: 'Сәтті',
          failed: 'Сәтсіз',
          missed: 'Қабылданбаған',
          expired: 'Жарамдылық мерзімі өткен',
        },
      },
      queues: {
        queues: 'Кезек | Кезектер',
        allQueues: 'Барлық кезектер',
        type: 'Түрі',
        state: 'Күйі',
        active: 'Белсенді',
        notActive: 'Белсенді емес',
        activeCalls: 'Белсенді қоңыраулар',
        waiting: 'Күту',
        ringtone: 'Әуен',
        priority: 'Басымдық',
        blacklist: 'Тоқтату тізімі',
        newQueue: 'Жаңа кезек',
        newQueueDescription: 'Кезек түрлері',
        outboundIVRQueue: 'Шығыс IVR кезегі',
        outboundIVR: 'Шығыс IVR',
        outboundIVRQueueDescription: 'Шығыс IVR ұйымға жеке хабарландыруларды пайдалана отырып, автоматтандырылған дауыстық қоңыраулар, SMS, электрондық пошта немесе әлеуметтік медиа хабарлары сияқты бірнеше арналар арқылы тұтынушыларды автоматты түрде тартуға мүмкіндік береді.',
        inboundQueue: 'Кіріс кезегі',
        inboundQueueDescription: 'Кіріс кезегі: Қоңырау шалушылар тірі оператормен сөйлесу үшін кезекте күтеді.',
        offlineQueue: 'Офлайн кезек',
        offlineQueueDescription: 'Автономды кезек қоңырау шалушыларға күтуді тоқтатуға, телефон нөмірін енгізуге және кері қоңырауды қабылдауға мүмкіндік береді.',
        previewDialer: 'Қоңырауды алдын ала қарау',
        previewDialerDescription: 'Оператор қоңырауды бастайды. Автоматты түрде теру алдында контактіні алдын ала қараңыз.',
        progressiveDialer: 'Прогрессивті теру',
        progressiveDialerDescription: 'Оператордың брондауымен шығыс науқан.',
        predictiveDialer: 'Болжалды қоңырау',
        predictiveDialerDescription: 'Қоңырауды күту уақытын азайту үшін оператордың алдын ала тапсырысынсыз шығыс науқаны.',
        chatInboundQueue: 'Кіріс чат кезегі',
        chatInboundQueueDescription: 'Кіріс кезегі сияқты, бірақ чаттармен',
        inboundJobQueue: 'Кіріс жұмыс кезегі',
        inboundJobQueueDescription: 'Кіріс жұмыс кезегі',
        outboundJobQueue: 'Шығыс жұмыс кезегі',
        outboundJobQueueDescription: 'Шығыс жұмыс кезегі',
        strategy: 'Стратегия',
        timezone: 'Уақыт белдеуі',
        callLimit: 'Бір уақыттағы қоңыраулардың максималды саны',
        variables: 'Айнымалылар',
        members: 'Жазылушы | Жазылушылар',
        params: 'Теру параметрлері',
        discardAbandonedAfter: 'Абонент толығымен жойылғанша секунд саны',
        maxIdleAgent: 'Оператордың жауабы күтілуде',
        maxIdleClient: 'Оператордың жауабы күтілуде',
        maxIdleDialog: 'Хабардың максималды күту уақыты',
        timeoutWithNoAgents: 'Агенттер болмаған кезде күту уақыты',
        timeBaseScore: 'Қоңырау рейтингі',
        endless: 'Қоңырауды тоқтатпаңыз',
        stickyAgent: 'Жабысқақтық',
        stickyAgentSec: 'Жабысқақ күту уақыты (сек)',
        autoAnswerTone: 'Автоматты жауап беру сигналы',
        varKey: 'Кілт',
        varVal: 'Мағынасы',
        endCause: 'Тоқтату себебі',
        offeringAt: 'Қайта қоңырау шалыңыз',
        destination: 'Мақсат | Мақсаттар',
        expire: 'Мерзімі бітеді',
        originateTimeout: 'Күту уақыты',
        maxAgentLine: 'Бір операторға бір уақыттағы қоңыраулар саны',
        maxAgentLose: 'Теруді тоқтату үшін қабылданбаған қоңыраулардың максималды саны',
        minAttempts: 'Болжалды режимге ауысу әрекеттерінің саны',
        maxAbandonedRate: 'Жоғалған қоңыраулардың рұқсат етілген пайызы',
        loadFactor: 'Жүктеме коэффициенті',
        abandonRateAdjustment: 'Жоғалған қоңырауларды түзету',
        playbackSilence: 'Аудио файлды ойнату алдында дыбысты өшіру (мс.)',
        targetAbandonedRate: 'Жоғалған қоңыраулардың қалаған пайызы',
        maxWaitTime: 'Максималды күту уақыты',
        maxWaitingSize: 'Күту уақытының максималды саны',
        waitBetweenRetries: 'Әрекеттер арасындағы уақыт',
        waitBetweenRetriesDesc: 'Жаңа әрекеттерді кему реті бойынша сұрыптау',
        retryAbandoned: 'Жоғалған жазылушыларды жаңартыңыз',
        playbackFile: 'Файлды ойнату',
        timeout: 'Қоңыраулар арасындағы үзіліс уақыты',
        maxNumberOfRetry: 'Қоңырау әрекеттерінің максималды саны',
        minDuration: 'Ең аз сәтті қоңырау ұзақтығы',
        maxAttempts: 'Әрекеттердің максималды саны',
        waitForResultStatus: 'Қоңырау нәтижесін күтуде',
        bucketPriority: 'Басымдық',
        enabled: 'Автоматты анықтауды қосыңыз',
        ai: 'Жасанды интеллект',
        positiveLabels: 'Позитивті тегтер',
        aiPlayback: 'Файлды ойнату',
        allowNotSure: 'Белгісіз',
        silenceNotSure: 'Тыныштық',
        allowGreetingAgent: 'Сәлемдесуге рұқсат етіңіз',
        preSchema: 'Алдын ала теру схемасы',
        afterSchema: 'Бүктеуден кейінгі схема',
        maxCalls: 'Тапсырма шегі',
        maxCallsHint: 'Мән 0 болса, теруші қоңырау шалмайды',
        recordings: 'Жазба',
        recordAll: 'Жауап бергеннен кейін жазуды бастаңыз',
        perNumbers: 'Әрбір сан үшін бастама',
        maxWordLength: 'Сөйлемнің максималды ұзақтығы (мс)',
        maxNumberOfWords: 'Сәлемдесудегі сөздердің максималды саны',
        betweenWordsSilence: 'Сөздер арасындағы үнсіздік ұзақтығы (мс)',
        minWordLength: 'Үздіксіз дауыстық дыбыстың ең аз ұзақтығы (мс)',
        totalAnalysisTime: 'Таныудың ең көп уақыты (мс)',
        silenceThreshold: 'Сөздер арасындағы үнсіздіктің максималды ұзақтығы (мс)',
        afterGreetingSilence: 'Сәлемдесуден кейінгі үнсіздік ұзақтығы (мс)',
        greeting: 'Максималды сәлем ұзақтығы (мс)',
        initialSilence: 'Сәлемдесу алдындағы үнсіздіктің максималды ұзақтығы (мс)',
        statisticTime: 'Қайта есептеу аралығы',
        communications: 'Байланыс түрі',
        processing: {
          processing: 'Өңдеу',
          enabled: 'Тапсырма нәтижесін күту',
          formSchema: 'Динамикалық өңдеу схемасы',
          sec: 'Өңдеу уақыты (сек)',
          renewalSec: '(сек) кейін кеңейтуді ұсыну',
        },
        queueStrategy: {
          fifo: 'FIFO (Бірінші кіреді Бірінші шығады)',
          lifo: 'LIFO (Соңғы курду Бірінші шыққан)',
          strict_fifo: 'StrictFIFO (Бірінші кіреді Бірінші шығады)',
        },
        time: {
          t15m: '15 мин',
          t30m: '30 мин',
          t45m: '45 мин',
          t1h: '1 сағат',
          t3h: '4 сағат',
          t6h: '6 сағат',
        },
        logs: {
          logs: 'Лог | Логтар',
          destination: 'Мақсат',
          offeringAt: 'Тарату',
          joinedAt: 'Бастау',
          leavingAt: 'Соңы',
          duration: 'Ұзақтығы',
          viewNumber: 'Нөмір',
          result: 'Нәтиже',
          attempts: 'Әрекет',
          resultName: {},
        },
        hooks: {
          hooks: 'Хук | Хуктар',
          event: 'Оқиға',
          eventTypes: {
            joined: 'Абонент кезекке тұрды',
            answered: 'Оператор қабылдайды',
            offering: 'Бір операторға бөлу',
            bridged: 'Абонентті операторға қосу',
            missed: 'Оператор жіберіп алды',
            leaving: 'Абонент кезектен шықты',
            processing: 'Кейінгі өңдеу',
            active: 'Белсенді әрекет',
          },
        },
      },
      res: {
        res: 'Ресурс | Ресурстар',
        allRes: 'Барлық ресурстар',
        reserve: 'Қосалқы',
        searchPlaceholder: 'аты, шлюз...',
        limit: 'Шектеу',
        numbers: 'Нөмір | Нөмірлер',
        displayNumbers: 'Көрсетілетін нөмір',
        failure: 'Ақаулық',
        maxErrors: 'Қателердің максималды саны',
        errorCodes: 'Қате кодтары',
        patterns: 'Шығыс нөмір үлгісі',
        priority: 'Басымдық',
        reserveResource: 'Резервтік ресурс',
        failureDialDelay: 'Теру қатесінің кешігуі',
      },
      resGroups: {
        resGroups: 'Ресурстар тобы | Ресурстар тобтары ',
        allResGroups: 'Барлық ресурстар топтары',
        searchPlaceholder: 'ресурс тобының атауы..',
        addResGroup: 'Ресурстар тобын қосыңыз',
        strategy: 'Стратегия',
        timerange: 'Интервал',
        timerangeFrom: 'Бастап',
        timerangeTo: 'Дейін',
      },
    },
    integrations: {
      integrations: 'Интеграции',
      emptyWorkspace: 'Бөлімдегі профильдер әлі жасалмаған',
      storage: {
        storage: 'Қойма',
        allStorages: 'Барлық қоймалар',
        type: 'Түрі',
        maxSize: 'Қойма көлемі',
        expireDays: 'Сақтау мерзімі',
        priority: 'Басымдық',
        newStorage: 'Жаңа қойма',
        newStorageDescription: 'Жаңа қойманың сипаттамасы',
        configuration: 'Конфигурация',
        pathPattern: 'Үлгі жолдары',
        bucket: 'Себет',
        region: 'Аудан',
      },
      cognitiveProfiles: {
        cognitiveProfiles: 'Дауыстық профиль | Дауыстық профильдер',
        properties: {
          region: ' Аймақ',
          locale: 'Тіл',
        },
      },
      emailProfiles: {
        emailProfiles: 'Email профилі | Email профилдері',
        mailbox: 'Пошталық жәшік',
        fetchInterval: 'Жаңарту аралығы',
      },
      importCsv: {
        importCsv: 'CSV файлынан деректерді импорттау | CSV файлдарынан деректерді импорттау',
        allImportsCsv: 'Барлық деректер CSV файлдарынан импортталады',
        source: 'Импорттың атауы',
        settings: 'Орнату немесе Баптау',
        mappings: 'Өрістерді салыстыру',
        mappingsHint: 'Бұл бөлімде сіз CSV файлының бағандарының атауларын олардың тақырыптарына сәйкес төмендегі өрістерде көрсетуіңіз керек',
        columnHeader: 'Баған',
        members: {
          clearMembers: 'Бар жазылушыларды жою',
        },
      },
      tokens: {
        tokens: 'Токен | Токендер ',
        allTokens: 'Барлық токендер ',
        expires: 'Мерзімі бітеді',
        popupMessage: 'Кілттік файлды жүктеп алыңыз немесе оны көшіріңіз. Егер кілт файлын қазір жүктеп алмасаңыз, оны қайтадан шығарып ала алмайсыз. Қауіпсіздікті арттыру үшін кілтті қауіпсіз жерде сақтаңыз және онымен бөліспеңіз',
        tokenCreated: 'Сіздің токеніңіз сәтті жасалды',
      },
      triggers: {
        triggers: 'Триггер | Триггерлер',
        allTriggers: 'Барлық триггерлер',
        type: 'Түр',
        schema: 'Схема',
        newTrigger: 'Жаңа триггер',
        expression: 'Өрнек',
        timeout: 'Кешігу',
        logs: {
          logs: 'Басталу тарихы',
          startedAt: 'Басы',
          result: 'Нәтиже',
          resultName: {
            idle: 'Белсенді емес',
            active: 'Белсенді',
            done: 'Аяқталған',
            error: 'Қате',
          },
        },
      },
    },
    pagination: {
      rowsPerPage: 'Бір беттегі жолдар саны',
    },
  },
  utils: {
    downloadFilesBtn: {
      downloadFiles: 'Файлдарды жүктеп алу',
      filesLoaded: 'Файлдар жүктелген',
      zippingProgress: 'Мұрағаттау барысы',
    },
  },
  errorPages: {
    goToHome: 'Басына оралу',
    page403: {
      title: 'Кіру мүмкіндігі жоқ',
      text: 'Кешіріңіз, сізге бұл бетті қарауғажеткілікті мумкіндігіңіз жоқ',
    },
    page404: {
      title: 'Сіз жоғалған сияқтысыз',
      text: 'Кешіріңіз, біз сіз іздеген нәрсені таба алмаймыз',
    },
  },
  icon: {
    docs: 'Құжаттама',
    logout: 'Шығу',
    account: 'Есептік жазба',
    appNavigator: 'Қолданбалар нафигаторы',
    settings: 'Орнату немесе баптау',
  },
  iconHints: {
    upload: 'Жүктеу',
    reload: 'Жаңарту',
    edit: 'Өңдеу',
    delete: 'Жою',
    deleteAll: 'Барлық объекттерді жою',
    deleteSelected: 'Таңдалған объекттерді жою',
    deleteFiltered: 'Барлық сұрыпталған объектілерді жою',
    generate: 'Жасау',
    add: 'Қосу',
    history: 'Тарих',
    download: 'Жүктеу',
    downloadAll: 'Бәрін жүктеу',
    draggable: 'Жылжыту',
    play: 'Ойнау',
    pause: 'Кідіртү',
    resume: 'Қайтадан жалғастыру',
    close: 'Жабу',
    volume: 'Дыбыс деңгейі',
    stop: 'Тоқтату',
    members: 'Абоненттер',
    moveUp: 'Жоғарыға жылжыту',
    moveDown: 'Төменге жылжыту',
    nextPage: 'Келесі бет',
    prevPage: 'Алдыңғы бет',
    expand: 'Ашу',
    collapse: 'Жабу',
  },
  errors: {
    invalidJson: 'Жарамсыз JSON',
  },
};
