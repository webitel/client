/* eslint-disable quote-props */

export default {
  auth: {
    register: 'Register',
    login: 'Login',
    registerReset: 'Reset password',
    detailsSubtitle: 'Enter your details below',
    resetPasswordLink: 'Forgot password?',
    user: 'Username',
    password: 'Password',
    confirmPassword: 'Repeat password',
    key: 'License key',
    registerSubmit: 'Register',
    resetSubmit: 'Reset',
    loginSubmit: 'Log in',
    carousel: {
      title1: 'Cloud vs. On-Site',
      text1: 'Security policy does not allow to store data and use cloud services? With Webitel, you can build a contact center on your site!',

      title2: 'Multichannel VS Omni-Channel',
      text2: "Be always and everywhere in touch with your customers! IVR-menu of any complexity, outbound, inbound interaction campaigns or message on social networks - now it's easier than ever!",

      title3: 'Fault-tolerant infrastructure',
      text3: 'No more unplanned downtime. Fast scaling and fault-tolerant architecture allows you to simultaneously serve more than 1000 customer calls per minute from different communication channels.',

      title4: 'Design',
      text4: 'The new minimalistic interface with the most user-friendly admin panel that allows you to have quick access to all the necessary functions. Less clicks - more features.',

      title5: 'New agent group work module',
      text5: 'The most efficient call distribution. An agent can have several skills at once for participating in different campaigns. The client is served only by professionals.',

      title6: 'Setting Permissions',
      text6: 'New permissions management module - new opportunities for control. Users can make changes only to sections, as well as to actions.',
    },
  },

  header: {
    logout: 'Logout',
    docs: 'Docs',
  },

  appNavigator: {
    title: 'Webitel applications',
    admin: 'Admin',
    agent: 'Agent Workspace',
    supervisor: 'Supervisor Workspace',
    audit: 'Audit',
    history: 'Call History',
    grafana: 'Grafana',
  },

  settings: {
    settings: 'Settings',
    changePassword: 'Change password',
    language: 'Language',
    webPhone: 'WebPhone',
    useWebPhone: 'Use WebPhone',
    useStun: 'Use STUN',
  },

  validation: {
    email: 'Should look email-like',
    required: 'This field is required',
    sameAs: 'Incorrect password',
    gatewayHostValidator: 'Should look like IPv4 or FQDN',
    ipValidator: 'Should look like IPv4',
    macValidator: 'Should look like MAC',
    minValue: 'Value should be at least',
    maxValue: 'Value should be not much',
    numeric: 'Should be numeric',
    requiredArrayValue: 'Array should not be empty',
    isPositiveValue: 'Value should be positive number',
    cron: 'Invalid cron expression',
  },

  nav: {
    directory: {
      directory: 'Directory',
    },
    routing: {
      routing: 'Routing',
    },
    lookups: {
      lookups: 'Lookups',
    },
    ccenter: {
      ccenter: 'Contact center',
    },
    integrations: {
      integrations: 'Integrations',
    },
    permissions: {
      permissions: 'Permissions',
    },
  },

  home: {
    dashboard: 'Dashboard',
    welcomeText: '',
    news: 'News',
  },

  objects: {
    all: 'All {entity}',
    administration: 'Administration',
    general: 'General',
    new: 'New',
    add: 'Add',
    create: 'Create',
    read: 'Read',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    saved: 'Saved',
    saveAs: 'Save as',
    close: 'Close',
    name: 'Name',
    description: 'Description',
    user: 'User',
    users: 'Users',
    action: 'Action',
    allow: 'Allow',
    password: 'Password',
    history: 'History',
    copy: 'Copy',
    copied: 'Copied to clipboard!',
    createdAt: 'Created',
    createdBy: 'Created by',
    importCSV: 'Import CSV',
    online: 'Online',
    offline: 'Offline',
    on: 'On',
    off: 'Off',
    ok: 'Ok',
    enabled: 'Enabled',
    status: 'Status',
    from: 'From',
    to: 'To',
    importJSON: 'Import JSON',
    addNew: 'Add new',
    provider: 'Provider',
    default: 'Default',
    service: 'Service',
    tts: 'Text-to-Speech',
    stt: 'Speech-to-Text',
    key: 'Key',
    ID: 'ID',
    email: 'Email address',
    updatedAt: 'Modified',

    deleteConfirmation: {
      title: 'Confirm deletion',
      askingAlert: 'Are you sure you want to delete {count} item? | Are you sure you want to delete {count} items?',
      undoneActionAlert: 'This action cannot be undone.',
      deleteAll: 'ALL',
    },
    CSV: {
      skipHeaders: 'Skip headers',
      charSet: 'Char set',
      separator: 'Separator',
      CSVColumn: 'CSV column',
      fieldName: 'Field name',
      clearMember: 'Clear member',
    },
    generalInfo: 'General info',
    objectHeader: {},
    directory: {
      directory: 'Directory',
      passwordInfo: 'Enter value only if you want to edit (or create new) password',
      users: {
        users: 'User | Users',
        allUsers: 'All users',
        searchPlaceholder: 'Name, login, extensions, status',
        login: 'Login',
        extensions: 'Extensions',
        state: 'State',
        DnD: 'DnD',
        status: 'Status',
        roles: 'Roles',
        tokens: 'Tokens',
        usage: 'Usage',
        roleAdmin: 'Admin',
        license: 'License',
        devices: 'Devices',
        defaultDevice: 'Default device (from list of selected devices)',
        deviceNotFound: "Didn't find the device?",
        createNewDevice: 'Add new',
        variables: 'Variables',
        varKey: 'Key',
        varVal: 'Value',
        token: 'Token | Tokens',
        tokenPopupHeader: 'Your token key has been created successfully!',
        tokenPopupText: 'Download your key file now or copy it. If you do not download the key file now, you will not be able to retrieve your token key again. To help protect your security, store your token key securely and do not share it.',
        tokenPopupCopy: 'Copy to clipboard',
        tokenPopupSave: 'Save as TXT',
      },
      license: {
        customers: 'Customers',
        license: 'License | Licenses',
        licenseId: 'ID',
        allCustomers: 'All customers',
        allLicenses: 'All licenses',
        serial: 'Serial',
        product: 'Product',
        validFrom: 'Valid from',
        validTill: 'Valid till',
        used: 'Used',
        limit: 'Limit',
        status: 'Status',
        competitive: 'Competitive',
        searchPlaceholder: 'Serial, product',
        domain: 'Domain',
        daysToExpire: {
          '0': 'Expired',
          '30': '30 or less',
          '90': '90 or less',
          days: ' days',
        },
        importLicense: 'Import license',
        licenseKey: 'License key',
      },
      devices: {
        devices: 'Device | Devices',
        newDevice: 'New device',
        newDeviceDescription: 'New device description',
        allDevices: 'All devices',
        searchPlaceholder: 'Name, user, auth ID & desk ID',
        authId: 'Auth ID',
        presence: 'Presence',
        hotdesk: 'Hot desking',
        hotdeskDevice: 'Hot desking device',
        hotdeskDeviceSettings: 'Hot desking device settings',
        hotdeskIncorrectInput: 'Incorrect Host Name',
        hotdeskInputHint: 'To make it easier to identify this device, you should cover it with friendly hot-desk aliases. Valid name must contain following characters: A-Z, a-z, 0-9, -, _',
        deviceSettings: 'Device settings',
        hostName: 'Host Name',
        phoneInfo: 'Phone info',
        phone: 'Phone',
        vendor: 'Vendor',
        model: 'Model',
        ipv4: 'IPv4',
        mac: 'MAC',
        deviceHistory: 'Device history',
        loggedIn: 'Logged In',
        loggedOut: 'Logged Out',
        state: {
          nonreg: 'Not registered',
          reged: 'Registered',
          ringing: 'Ringing',
          dialing: 'Dialing',
          dialog: 'Dialog',
          onhold: 'On hold',
        },
        passwordSetFromAccount: "If you won't set password, it would be the same as account",
      },
    },
    permissions: {
      permissions: 'Permissions',
      permissionsRole: 'Role | Roles',
      allRoles: 'All roles',
      searchPlaceholder: 'role ..',
      roles: {
        permissions: {
          permissions: 'Role permission | Role permissions',
          add: 'Add',
          delete: 'Delete',
          read: 'Select',
          write: 'Update',
          eavesdropCall: 'Eavesdrop call',
          playbackRecordFile: 'Playback record file',
          exportDataGrid: 'Export data grid',
          viewCdrPhoneNumbers: 'View CDR phone numbers',
          manageUserRoles: 'Manage user roles',
          manageUserLicense: 'Manage user license',
          changeUserPassword: 'Change user password',
          addDescription: 'Grants permission to create any objects',
          deleteDescription: 'Grants permission to remove any objects',
          readDescription: 'Grants permission to select any objects',
          writeDescription: 'Grants permission to modify any objects',
          eavesdropCallDescription: 'Grants permission to eavesdrop on an active conversation',
          playbackRecordFileDescription: 'Grants permission to playback call-record files',
          exportDataGridDescription: 'Grants permission to export data grid to a file',
          viewCdrPhoneNumbersDescription: 'View CDR phone numbers',
          manageUserRolesDescription: 'Grants permission to manage a set of user roles',
          manageUserLicenseDescription: 'Grants permission to manage a set of user license',
          changeUserPasswordDescription: 'Grants permission to change the users password',
        },
        addPermission: 'Add role permission',
        usage: 'Usage',
        applicationsAccess: {
          applicationsAccess: 'Application access | Applications access',
          access: 'Access',
        },
      },
      object: {
        object: 'Objects',
        allObjects: 'All objects',
        ObAC: 'Managed by operations',
        RbAC: 'Managed by records',
        operations: 'Operations',
        searchPlaceholder: 'object ..',
        newPermissionRole: 'New grantee',
        rbacDefault: 'Default Record based Access',
        grantor: 'Grantor',
        grantee: 'Grantee',
        create: 'Create',
        delete: 'Delete',
        accessMode: {
          '1': 'Forbidden',
          '2': 'Allow',
          '3': 'Allow with delegation',
        },
      },
    },
    lookups: {
      lookups: 'Lookups',
      skills: {
        skills: 'Skill | Skills',
        capacity: 'Capacity',
        minCapacity: 'Min capacity',
        minCapacityLessOrEqualToMaxCapacityValidator: 'Should be less or equal to Max capacity',
        maxCapacity: 'Max capacity',
        maxCapacityMoreOrEqualToMinCapacityValidator: 'Should be more or equal to Min capacity',
        lvl: 'Level',
        agentSkills: 'Agent skill | Agent skills',
        allSkills: 'All skills',
        state: 'State',
      },
      buckets: {
        buckets: 'Bucket | Buckets',
        allBuckets: 'All buckets',
        addBucket: 'Add bucket',
      },
      blacklist: {
        blacklist: 'Call list | Call lists',
        allBlacklists: 'All call lists',
        number: 'Number | Numbers',
        newNumber: 'New number',
        numbersCount: 'Numbers',
      },
      media: {
        mediaFiles: 'Media file | Media files',
        allMediaFiles: 'All media files',
        createdAt: 'Created',
        format: 'Format',
        size: 'Size',
        textToSpeech: 'Text to speech',
        popupSettings: 'Settings',
        lang: 'Language',
        voice: 'Voice',
        token: 'Token',
        key: 'Key',
        dragPlaceholder: 'Drag and drop files',
        dragPlaceholderHere: 'here.',
        tts: {
          hint: 'Create an audio file',
          textType: {
            textType: 'Text type',
            ssml: 'SSML',
          },
        },
      },
      regions: {
        regions: 'Location | Locations',
        allRegions: 'All locations',
      },
      timezone: {
        timezone: 'Timezone | Timezones',
      },
      calendars: {
        calendars: 'Calendar | Calendars',
        allCalendars: 'All calendars',
        searchPlaceholder: 'Name, description...',
        timezone: 'Timezone',
        start: 'Start',
        end: 'End',
        workWeek: 'Working week',
        holidays: 'Holiday | Holidays',
        date: 'Date',
        repeat: 'Repeat',
        fulltime: 'Temporary',
        everyYear: 'Repeat every year',
        newHoliday: 'New holiday',
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday',
      },
      communications: {
        communications: 'Communication type | Communication types',
        allCommunications: 'All communication types',
        addCommunication: 'Add communication',
        code: 'Code',
      },
      pauseCause: {
        pauseCause: 'Agent statuses',
        allPauseCause: 'All agent pause causes',
        limit: 'Limit (min)',
        min: 'min',
        allowAdmin: 'Admin can change this status',
        allowSupervisor: 'Supervisor can change this status',
        allowAgent: 'Agent can change this status',
      },
    },
    routing: {
      routing: 'Routing',
      ip: 'IP',
      protocol: 'Protocol',
      port: 'Port',
      configuration: 'Configuration',
      schema: 'Flow schema',
      json: 'JSON',

      flow: {
        flow: 'Flow schema | Flow schemas',
        allFlowSchemas: 'All flow schemas',
        createFlowSelectionPopup: 'Create new flow',
        createNew: 'Create new?',
        editor: 'Editor',
        diagram: {
          diagram: 'Diagram',
          description: 'Create new flow using Webitel Flow Diagram tool',
        },
        code: {
          code: 'Code',
          description: 'Create new flow using JSON-schema in code editor',
        },
      },

      dialplan: {
        dialplan: 'Dialplans',
        dialplanRules: 'Dialplan rules',
        pattern: 'Destination number',
        dialplanRule: 'Dialplan rule',
        position: 'Position',
      },

      chatplan: {
        chatplan: 'Chatplan | Chatplans',
        allChatplans: 'All chatplans',
      },

      gateways: {
        gateways: 'Gateway | Gateways',
        allGateways: 'All gateways',
        trunkingGateway: 'Trunking gateway',
        registerGateway: 'Register gateway',
        stateSuccess: 'Success',
        stateFailed: 'Failed',
        stateProgress: 'In progress',
        stateNonreg: 'Not registered',
        proxy: 'Proxy',
        searchPlaceholder: 'gateway search...',
        host: 'Host',
        trunkingACLTitle: 'Access Control',
        trunkingACL: 'Trunking access control list',
        hostnameTrunking: 'Server/Gateway Hostname or IP',
        hostnameRegister: 'Registrar/Server/Gateway Hostname or IP',
        expire: 'Expire',
        authID: 'Username',
        account: 'Account',
        outboundProxy: 'Outbound Proxy Hostname or IP',
        newGateway: 'New gateway',
        newGatewayDescription: 'New gateway description',
        SIPregistrations: 'SIP Registration',
        SIPregistrationsDescription: 'SIP registration description',
        SIPtrunking: 'SIP Trunking',
        SIPtrunkingDescription: 'SIP trunking description',

      },
      chatGateways: {
        templates: {
          templates: 'Templates',
          title: 'Workspace member\'s name',
          close: 'Chat complete message',
          join: 'Agent joining message',
          left: 'Agent disconnection message',
        },
        chatGateways: 'Chat gateway | Chat gateways',
        allChatGateways: 'All chat gateways',
        telegramBot: {
          telegramBot: 'Telegram Bot',
        },
        telegramApp: {
          telegramApp: 'Telegram App',
          signedAs: 'You\'re signed as',
          joinTelegram: 'Sign in to Telegram',
          metadata: {
            apiId: 'API id',
            apiHash: 'API hash',
          },
        },
        infobip: {
          infobip: 'Infobip',
        },
        messenger: {
          meta: 'Meta',
          addOrRemovePages: 'Add or remove pages',
          accounts: 'Accounts',
          metadata: {
            clientId: 'App ID',
            clientSecret: 'App Secret',
          },
          facebook: {
            pages: 'Facebook pages',
            subscription: 'Webhook subscription',
          },
          instagram: {
            instagram: 'Instagram',
            comments: 'Track comments',
            mentions: 'Track mentions',
          },
          whatsapp: {
            whatsapp: 'Whatsapp',
            token: 'Token',
            status: 'Status',
            number: 'Phone number',
            review: 'Review',
          },
        },
        viber: {
          viber: 'Viber',
          style: {
            style: 'Style',
            btnBackColor: 'Button background color',
            btnFontColor: 'Button font color',
          },
        },
        webchat: {
          webchat: 'Web chat',
          copyCode: 'Copy code for site',
          copyCodeHint: 'You must regenerate and reinsert Widget code to website each time after Widget settings modification',
          metadata: {
            mediaMaxSize: 'Max media size (Mb)',
          },
          view: {
            view: 'View',
            borderRadius: 'Button Shape',
            language: 'Language',
            position: 'Position',
            btnColor: 'Button Color',
            logoUrl: 'Logo URL',
            logoHint: 'Supported logo format is \'JPEG\' or \'PNG\', 24x24px',
            rounded: 'Rounded',
            square: 'Square',
            right: 'Right',
            left: 'Left',
            static: 'Static',
          },
          chat: {
            chat: 'Chat',
            openTimeout: 'Open Timeout',
            openTimeoutSec: 'Open Timeout Sec',
          },
          appointment: {
            appointment: 'Appointment',
            days: 'Days',
            availableAgents: 'Available agents',
            showEmailField: 'Show email field',
            showMessageField: 'Show message field',
            resultPageText: 'Result page text',
            headingText: 'Heading text',
            subheadingText: 'Subheading text',
            showDefaultHeading: 'Show default heading and subheading on result page',
          },
          alternativeChannels: {
            alternativeChannels: 'Alternative Channels',
            email: 'Email',
            whatsapp: 'WhatsApp',
            telegram: 'Telegram',
          },
        },
        uri: 'URI',
        newChatGateway: 'New chat gateway',
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
        callflow: 'Callflow',
      },
    },

    ccenter: {
      ccenter: 'Contact center',

      agents: {
        agents: 'Agent | Agents',
        supervisors: 'Supervisor | Supervisors',
        admins: 'Admin | Admins',
        subordinates: 'Subordinate agent | Subordinate agents',
        allAgents: 'All agents',
        progressiveCount: 'Progressive call count',
        chatCount: 'Chat count',
        state: 'Status',
        isSupervisor: 'Supervisor',
        stateTime: 'Status time',
        addSkill: 'Add skill',
        statusHistory: 'State history',
        historyState: 'State',
        payload: 'Cause',
        addSubordinate: 'Add subordinate agent',
        historyChannel: 'Channel',
        historyFrom: 'From',
        historyTo: 'To',
        historyDuration: 'Duration',
        status: {
          online: 'Online',
          offline: 'Offline',
          pause: 'Pause',
          breakOut: 'Break Out',
        },
      },

      auditors: {
        auditors: 'Auditor | Auditors',
      },

      teams: {
        teams: 'Team | Teams',
        allTeams: 'All teams',
        strategy: 'Strategy',
        timing: 'Timing',
        maxNoAnswer: 'Max no answer',
        callTimeout: 'Call timeout',
        inviteChatTimeout: 'Chat accept timeout',
        wrapUpTime: 'Wrap up time',
        noAnswerDelayTime: 'No answer delay time',
        strategies: {
          random: 'Random',
          fewestCalls: 'Agent with fewest calls',
          leastTalkTime: 'Agent with least talk time',
          topDown: 'Top down',
          roundRobin: 'Round robin',
          roundRobinBucket: 'Round robin bucket',
          longestIdleAgent: 'Agent with longest idle time',
          skillCapacity: 'By skill level',
        },
      },

      members: {
        members: 'Member | Members',
        allMembers: 'All members',
        addMember: 'Add member',
        destination: 'Destination',
        display: 'Display number',
        dtmf: 'DTMF',
        priority: 'Priority',
        attempts: 'Attempts',
        resetMembers: {
          resetMembers: 'Reset members',
          description: 'Are you sure you want to reset attempts of unsuccessful members?',
          reset: 'Reset',
          successResetCount: 'Successfully reset {count} members',
        },
        endCause: {
          abandoned: 'Abandoned',
          timeout: 'Timeout',
          cancel: 'Cancel',
          success: 'Success',
          failed: 'Failed',
          missed: 'Missed',
          expired: 'Expired',
        },
      },

      queues: {
        queues: 'Queue | Queues',
        allQueues: 'All queues',
        type: 'Type',
        state: 'State',
        active: 'Active',
        notActive: 'Not active',
        activeCalls: 'Active calls',
        waiting: 'Waiting',
        ringtone: 'Ringtone',
        priority: 'Priority',
        newQueue: 'New queue',
        blacklist: 'Stop list',
        newQueueDescription: 'New queue descriotion',
        outboundIVRQueue: 'Outbound IVR queue',
        outboundIVR: 'Outbound IVR',
        outboundIVRQueueDescription: 'An Outbound IVR allows an organization to automatically engage customers through multiple channels such as automated voice calls, SMS messages, email or social media posts using personalized notifications.',
        inboundQueue: 'Inbound queue',
        inboundQueueDescription: 'An Inbound queue is that it\'s where callers are placed on hold, in a queue, while they wait to speak with a live agent.',
        offlineQueue: 'Offline queue',
        offlineQueueDescription: 'An Offline queue gives callers the option to stop waiting on hold, input their phone number and receive a callback as soon as it\'s their turn.',
        previewDialer: 'Preview dialer',
        previewDialerDescription: 'Preview the contact before auto dialing them.',
        progressiveDialer: 'Progressive dialer',
        progressiveDialerDescription: 'Progressive dialing minimizes wasted time between calls by automatically dialing a number from a call list as soon as an agent becomes available.',
        predictiveDialer: 'Predictive dialer',
        predictiveDialerDescription: 'A predictive dialer calls multiple numbers at one time. As soon as a customer answers, an agent is connected to them.',
        chatInboundQueue: 'Chat inbound queue',
        chatInboundQueueDescription: 'The same as inbound queue, but with chats',
        inboundJobQueue: 'Inbound job queue',
        inboundJobQueueDescription: 'Inbound job queue',
        outboundJobQueue: 'Outbound job queue',
        outboundJobQueueDescription: 'Outbound job queue',
        strategy: 'Strategy',
        timezone: 'Timezone',
        callLimit: 'Call limit',
        variables: 'Variables',
        members: 'Member | Members',
        params: 'Parameters',
        discardAbandonedAfter: 'Discard abandoned after',
        maxIdleAgent: 'Agent response timeout',
        maxIdleClient: 'Customer response timeout',
        maxIdleDialog: 'Maximum response timeout',
        timeoutWithNoAgents: 'Timeout with no agents',
        timeBaseScore: 'Time base score',
        endless: 'Endless',
        stickyAgent: 'Sticky',
        stickyAgentSec: 'Sticky agent (sec)',
        autoAnswerTone: 'Auto answer warning tone',
        varKey: 'Key',
        varVal: 'Value',
        endCause: 'End cause',
        offeringAt: 'Offering at',
        destination: 'Destination | Destinations',
        expire: 'Expire',
        originateTimeout: 'Originate timeout',
        maxAgentLine: 'Max agent lines',
        maxAgentLose: 'Max agent lose calls',
        minAttempts: 'Min predict attempts',
        maxAbandonedRate: 'Max abandoned %',
        abandonRateAdjustment: 'Abandon rate adjustment',
        playbackSilence: 'Playback silence',
        targetAbandonedRate: 'Target abandoned rate',
        maxWaitTime: 'Max wait time',
        maxWaitingSize: 'Max wait count',
        waitBetweenRetries: 'Wait between retries',
        waitBetweenRetriesDesc: 'Sort members retries by descending',
        strictCircuit: 'Strict circuit',
        retryAbandoned: 'Retry abandoned',
        playbackFile: 'Playback file',
        timeout: 'Timeout',
        maxNumberOfRetry: 'Max number of retry',
        minDuration: 'Minimum succeed call duration',
        maxAttempts: 'Max attempts',
        waitForResultStatus: 'Wait for result status',
        bucketPriority: 'Priority',
        amd: 'AMD',
        enabled: 'Use AMD',
        ai: 'Artificial intelligence',
        positiveLabels: 'Positive labels',
        aiPlayback: 'Playback file',
        allowNotSure: 'Transfer NOTSURE to an agent',
        silenceNotSure: 'Transfer silence to an agent',
        allowGreetingAgent: 'Allow greeting agent',
        preSchema: 'Pre-executive schema',
        afterSchema: 'After-executive schema',
        maxCalls: 'Max tasks',
        maxCallsHint: 'If value is 0, dialer won\'t call',
        recordings: 'Recording',
        recordAll: 'Start record after answer',
        perNumbers: 'Dialing Attempts per each phone number',
        maxWordLength: 'Maximum word length (ms)',
        maxNumberOfWords: 'Maximum number of words',
        betweenWordsSilence: 'Between words silence (ms)',
        minWordLength: 'Minimum word length (ms)',
        totalAnalysisTime: 'Total analysis time (ms)',
        silenceThreshold: 'Silence threshold (ms)',
        afterGreetingSilence: 'After greeting silence (ms)',
        greeting: 'Greeting (ms)',
        initialSilence: 'Initial silence (ms)',
        statisticTime: 'Recalculation interval',
        communications: 'Communication type',
        processing: {
          processing: 'Processing',
          enabled: 'Waiting for call result',
          formSchema: 'Dynamic processing schema',
          sec: 'Postprocessing time (sec)',
          renewalSec: 'Notify to continue after (sec)',
        },
        queueStrategy: {
          fifo: 'FIFO (First In First Out)',
          lifo: 'LIFO (Last In First Out)',
          strict_fifo: 'Strict FIFO (First In First Out)',
        },
        time: {
          t15m: '15 min',
          t30m: '30 min',
          t45m: '45 min',
          t1h: '1 hour',
          t3h: '4 hour',
          t6h: '6 hour',
        },
        logs: {
          logs: 'Log | Logs',
          destination: 'Destination',
          offeringAt: 'Offering',
          joinedAt: 'Start',
          leavingAt: 'End',
          duration: 'Duration',
          viewNumber: 'View number',
          result: 'Result',
          attempts: 'Attempt',
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
          hooks: 'Hook | Hooks',
          event: 'Event',
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
        res: 'Resource | Resources',
        allRes: 'All resources',
        reserve: 'Reserve',
        searchPlaceholder: 'name, gateway..',
        cps: 'CPS',
        limit: 'Limit',
        cidType: 'CID Type',
        ignoreEarlyMedia: 'Ignore Early Media',
        numbers: 'Number | Numbers',
        displayNumbers: 'Display numbers',
        failure: 'Failure',
        maxErrors: 'Maximum failure responses',
        errorCodes: 'Request Failure Responses',
        patterns: 'Destination number pattern',
        priority: 'Priority',
        reserveResource: 'Reserve resource',
        failureDialDelay: 'Failure dial delay',
      },

      resGroups: {
        resGroups: 'Resource group | Resource groups',
        allResGroups: 'All resource groups',
        searchPlaceholder: 'res group name..',
        addResGroup: 'Add resource group',
        strategy: 'Strategy',
        timerange: 'Time range',
        timerangeFrom: 'From',
        timerangeTo: 'To',
      },
    },

    integrations: {
      integrations: 'Integrations',

      storage: {
        storage: 'Storage',
        allStorages: 'All storages',
        type: 'Type',
        maxSize: 'Storage space (GB)',
        expireDays: 'Lifetime (days)',
        priority: 'Priority',
        newStorage: 'New storage',
        newStorageDescription: 'New Storage description',
        local: 'Local',
        s3: 'S3 Bucket',
        digitalOcean: 'Digital Ocean Spaces',
        backblaze: 'Backblaze B2',
        dropbox: 'Dropbox',
        drive: 'Google Drive',
        configuration: 'Configuration',
        pathPattern: 'Path pattern',
        localFolder: 'Local folder',
        s3Key: 'Key ID',
        s3Access: 'Access Key',
        bucket: 'Bucket',
        region: 'Region',
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
        cognitiveProfiles: 'Cognitive profile | Cognitive profiles',
        properties: {
          region: 'Region',
          locale: 'Locale',
        },
      },
      emailProfiles: {
        emailProfiles: 'Email profile | Email profiles',
        mailbox: 'Mailbox',
        smtpPort: 'SMTP Port',
        imapPort: 'IMAP Port',
        smtpHost: 'SMTP Host',
        imapHost: 'IMAP Host',
        fetchInterval: 'Refresh interval',
      },

      importCsv: {
        importCsv: 'Import CSV from file | Imports of CSV from file',
        allImportsCsv: 'All imports data from CSV files',
        source: 'Import destination',
        settings: 'Settings',
        mappings: 'Field mappings',
        mappingsHint: 'In this section you should provide names of CSV file columns in inputs below in accordance with its labels',
        columnHeader: '{name} column',
        members: {
          clearMembers: 'Purge existing members',
        },
      },

      tokens: {
        tokens: 'Token | Tokens',
        allTokens: 'All tokens',
        expires: 'Expires on',
        popupMessage: 'Download your key file now or copy it. If you do not download the key file now, you will not be able to retrieve your token key again. To help protect your security, store your token key securely and do not share it.',
        tokenCreated: 'Your token has been successfully created!',
      },

      triggers: {
        triggers: 'Trigger | Triggers',
        allTriggers: 'All triggers',
        type: 'Type',
        schema: 'Schema',
        newTrigger: 'New trigger',
        newTriggerDescription: 'Choose a template to get going or start from scratch with a blank canvas',
        onEvent: 'On event',
        onEventDescription: 'An event-based JSON Schema scheduler',
        cron: 'At time',
        atTimeDescription: 'A time-based JSON Schema scheduler',
        event: 'Event',
        expression: 'Expression',
        timeout: 'Timeout',
        logs: {
          logs: 'Running history',
          startedAt: 'Start',
          result: 'Result',
          resultName: {
            idle: 'Idle',
            active: 'Active',
            done: 'Done',
            error: 'Error',
          },
        },
      },
    },

    pagination: {
      rowsPerPage: 'Rows per page',
    },
  },

  utils: {
    downloadFilesBtn: {
      downloadFiles: 'Download files',
      filesLoaded: 'Files loaded',
      zippingProgress: 'Zipping progress',
    },
  },

  errorPages: {
    goToHome: 'Go to Home page',
    page403: {
      title: 'Access denied',
      text: 'Sorry, you have not enough privileges to see this page.',
    },
    page404: {
      title: "Looks like you're lost",
      text: 'Sorry, we can\'t find the page you want.',
    },
  },

  icon: {
    docs: 'Docs',
    logout: 'Logout',
    account: 'Account',
    appNavigator: 'App navigator',
    settings: 'Settings',
  },

  iconHints: {
    upload: 'Upload',
    reload: 'Refresh table',
    edit: 'Edit',
    delete: 'Delete',
    deleteAll: 'Delete all items',
    deleteSelected: 'Delete {count} selected items',
    deleteFiltered: 'Delete all filtered items',
    generate: 'Generate',
    add: 'Add',
    history: 'History',
    download: 'Download',
    downloadAll: 'Download all',
    draggable: 'Draggable',
    play: 'Play',
    pause: 'Pause',
    resume: 'Resume',
    close: 'Close',
    volume: 'Volume',
    stop: 'Stop',
    members: 'Members',
    moveUp: 'Move up',
    moveDown: 'Move down',
    nextPage: 'Next page',
    prevPage: 'Previous page',
    expand: 'Expand',
    collapse: 'Collapse',
  },
  errors: {
    invalidJson: 'JSON is invalid',
  },
};
