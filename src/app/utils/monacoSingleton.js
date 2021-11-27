const createProposals = (range) =>
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup
  [

    // General applications.
    {
      label: '"if"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Оператор if управляет условным ветвлением.',
      insertText: JSON.stringify({
        if: {
          expression: '${myVar} == 1',
          then: [],
          else: [],
        },
      }, null, 4),
    },
    {
      label: '"switch"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Операторы switch и case помогают управлять сложными условными операциями и операциями ветвления..',
      insertText: JSON.stringify({
        switch: {
          variable: '${getIvrDigit}',
          case: {
            1: [],
            2: [],
            3: [],
            default: [],
          },
        },
      }, null, 4),
    },
    {
      label: '"disconnected"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Выполняет набор приложений после завершение основного скрипта. Объявляется единожды вначале скрипта.',
      insertText: JSON.stringify({
        trigger: {
          disconnected: [],
        },
      }, null, 4),
    },
    {
      label: '"function"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Объединить набор приложений в именную функцию. Объявляется вначале скрипта.',
      insertText: JSON.stringify({
        function: {
          name: 'myFunction',
          actions: [],
        },
      }, null, 4),
    },
    {
      label: '"execute"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Выполнение предварительно объявленной функции по имени.',
      insertText: JSON.stringify({
        execute: {
          name: 'myFunction',
        },
      }, null, 4),
    },
    {
      label: '"set"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Назначение переменных на канал',
      insertText: JSON.stringify({
        set: {
          hangup_after_bridge: 'true',
          ivrLang: 'en',
        },
      }, null, 4),
    },
    {
      label: '"export"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Экспорт переменных на сторону оператора, а так же, в статистику.',
      insertText: JSON.stringify({
        export: [
          'reverted_caller_id_number',
        ],
      }, null, 4),
    },
    {
      label: '"unSet"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Разустанавливает переменную.',
      insertText: JSON.stringify({
        unSet: [
          'reverted_caller_id_number',
        ],
      }, null, 4),
    },
    {
      label: '"calendar"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет проверить текущее время с рабочем календарем. Значение сохраняется в переменную',
      insertText: JSON.stringify({
        calendar: {
          extended: false,
          name: 'WorkDay',
          setVar: 'isWorkDay',
        },
      }, null, 4),
    },
    {
      label: '"httpRequest"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Выполнение HTTP REST запроса и обработка результата (get JSON)',
      insertText: JSON.stringify({
        httpRequest: {
          // eslint-disable-next-line no-template-curly-in-string
          url: 'https://sales.bpmonline.com/${id}/dataservice/json/reply/SelectQuery',
          method: 'POST',
          timeout: 1000,
          insecureSkipVerify: false,
          parser: 'application/json',
          responseCode: 'http_response_code',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line no-template-curly-in-string
            Cookie: '${my_cookie}',
          },
          path: {
            id: 0,
          },
          data: {
            Name: 'Supervisor',
            UserID: 'Supervisor',
          },
          exportVariables: {
            effective_caller_id_name: 'callerIdName',
            owner_caller_id_number: 'callerIdOwner',
          },
        },
      }, null, 4),
    },
    {
      label: '"js"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Executes JavaScript code.',
      insertText: JSON.stringify({
        js: {
          data: 'var time = LocalDate(); time.setDate(time.getDate() + (+${dpd}*-1)); return time.getMonth() + \'-\' + time.getDate() + \'-\' + time.getFullYear()',
          setVar: 'myVar',
        },
      }, null, 4),
    },
    {
      label: '"string"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Math application allows you to perform mathematical tasks on numbers.',
      insertText: JSON.stringify({
        string: {
          data: '${caller_id_number}',
          fn: 'reverse',
          setVar: 'reverted_caller_id_number',
        },
      }, null, 4),
    },
    {
      label: '"markIVR"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Позволяет сохранить массив значений в переменную, которая будет доступна в истории',
      insertText: JSON.stringify({
        markIVR: {
          name: 'Log',
          value: 'Входящий звонок',
        },
      }, null, 4),
    },
    {
      label: '"userInfo"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет получить значение из объекта пользователя по номеру телефона',
      insertText: JSON.stringify({
        userInfo: {
          set: {
            usrId: 'id',
            mob: 'variables.fwd_mob',
            out: 'variables.out_cid',
          },
          user: {
            extension: '${ext}',
          },
        },
      }, null, 4),
    },
    {
      label: '"setGrantee"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Передать права на канал пользователю с идентификатором указанным в id',
      insertText: JSON.stringify({
        setGrantee: {
          id: 10,
        },
      }, null, 4),
    },
    {
      label: '"schema"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Выполнить внешнюю схему по идентификатору',
      insertText: JSON.stringify({
        schema: {
          id: 1,
        },
      }, null, 4),
    },
    {
      label: '"sleep"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Пауза выполнения скрипта в миллисекундах ',
      insertText: JSON.stringify({
        sleep: 1000,
      }, null, 4),
    },
    {
      label: '"log"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Вывод дополнительной информации в лог файл приложений',
      insertText: JSON.stringify({
        log: '>> ${Hold} <<<',
      }, null, 4),
    },
    {
      label: '"goto"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Перейти к именной метке',
      insertText: JSON.stringify({
        goto: 'tagName',
      }, null, 4),
    },
    {
      label: '"tag"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Установить именную метку в скрипте',
      insertText: JSON.stringify({
        tag: 'tagName',
      }, null, 4),
    },
    {
      label: '"async"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Выполнение приложения без блокировки',
      insertText: JSON.stringify({
        async: true,
      }, null, 4),
    },
    {
      label: '"break"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Прерывает выполнение скрипта',
      insertText: JSON.stringify({
        break: true,
      }, null, 4),
    },
    {
      label: '"limit"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Позволяет прерывать цикл после прохождения количества указанного в атрибуте max. Выход осуществляется в именную метку указанною в атрибуте failover.',
      insertText: JSON.stringify({
        limit: {
          max: 5,
          failover: 'anotherTag',
        },
      }, null, 4),
    },

    // Messaging applications
    {
      label: '"menu"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет сгенерировать меню навигации, где выбор будет сохранен в переменную',
      insertText: JSON.stringify({
        menu: {
          text: 'Выберите пункт меню',
          set: '${onClick.Menu}',
          variable: '${response}',
          buttons: [
            [
              {
                text: '💰 Кредиты',
                type: 'reply',
              },
              {
                text: '⚙️ Главное меню',
                type: 'reply',
              },
            ],
            [
              {
                text: '💰 Депозиты',
                type: 'reply',
              },
              {
                text: '🧙‍♂️ Помощь оператора',
                type: 'reply',
              },
            ],
          ],
        },
      }, null, 4),
    },
    {
      label: '"recvMessage"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Сохранить в переменную текстовое сообщение полученное от пользователя в рамках активного диалога',
      insertText: JSON.stringify({
        recvMessage: {
          set: 'response',
          timeout: 60,
        },
      }, null, 4),
    },
    {
      label: '"sendText"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет отправить текстовое сообщение в рамках активного диалога.',
      insertText: JSON.stringify({}, null, 4),
    },
    {
      label: '"sendFile"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет отправить ссылку на файл в рамках активного диалога',
      insertText: JSON.stringify({
        sendFile: {
          url: '${file_link}',
        },
      }, null, 4),
    },
    {
      label: '"sendEmail"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Отправка Email сообщения\n'
        + '\n',
      insertText: JSON.stringify({
        sendEmail: {
          cc: [
            'office@mail.com',
          ],
          from: '\'"Bot Name\" <bot@mail.com>',
          message: 'H3>Turn on SMS</h3>\n<b>Creditcard</b>: ${Creditcard[0]} <i>***</i> ${Creditcard[1]}',
          smtp: {
            auth: {
              password: 'pass',
              user: 'bot@mail.com',
            },
            port: '587',
            server: 'smtp.mail.com',
            tls: true,
          },
          subject: '[webitel](${caller_id_name}) Email notification',
          to: [
            '${customer_email}',
          ],
        },
      }, null, 4),
    },
    {
      label: '"classifier"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Классификатор типов ответов клиента',
      insertText: JSON.stringify({
        classifier: {
          cluster: {
            y: [
              'да',
              'будет',
              'так',
              'оплачу',
            ],
          },
          input: '${google_transcript}',
          set: 'answer_def',
        },
      }, null, 4),
    },

    // Call's applications
    {
      label: '"ringReady"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Ответ 180 Ringing на входящий INVITE запрос',
      insertText: JSON.stringify({
        ringReady: '',
      }, null, 4),
    },
    {
      label: '"preAnswer"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Ответ 183 Session Progress на входящий INVITE запрос',
      insertText: JSON.stringify({
        preAnswer: '',
      }, null, 4),
    },
    {
      label: '"answer"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Ответ 200 Ok на входящий INVITE запрос.',
      insertText: JSON.stringify({
        answer: '',
      }, null, 4),
    },
    {
      label: '"sipRedirect"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Ответ SIP 302 Moved Temporarily на входящий INVITE запрос',
      insertText: JSON.stringify({
        sipRedirect: 'sip:foo@end.com',
      }, null, 4),
    },
    {
      label: '"ringback"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет задать тон КПВ либо медиафайл',
      insertText: JSON.stringify({
        ringback: {
          all: true,
          call: {
            name: '%(1000,6000,425);loops=-1',
            type: 'tone',
          },
          hold: {
            id: 10,
          },
          transfer: {
            name: '%(1000,6000,425);loops=-1',
            type: 'tone',
          },
        },
      }, null, 4),
    },
    {
      label: '"updateCid"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение позволяет изменить значение номера и имени абонента.',
      insertText: JSON.stringify({
        updateCid: {
          name: 'Новый клиент',
          number: '8${effective_caller_id_number}',
        },
      }, null, 4),
    },
    {
      label: '"sleep"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Пауза, указывается в миллисекундах',
      insertText: JSON.stringify({
        sleep: 1000,
      }, null, 4),
    },
    {
      label: '"park"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Удержание звонка на стороне сервера',
      insertText: JSON.stringify({
        park: {
          name: 'myPark',
          lot: '1000-2000',
          auto: 'in',
        },
      }, null, 4),
    },
    {
      label: '"conference"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Вход в конференцию.',
      insertText: JSON.stringify({
        conference: {
          flags: [
            'audio-always',
          ],
          name: 'CR-$1',
          profile: 'video-mcu-stereo',
        },

      }, null, 4),
    },
    {
      label: '"bridge"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Инициация Б-канала с дальнейшим соединением с А-каналом',
      insertText: JSON.stringify({
        bridge: {
          endpoints: [
            {
              extension: 1008,
              idle: true,
              type: 'user',
            },
            {
              dialString: '380732327758',
              name: 'lifecell_out',
              type: 'gateway',
              parameters: {
                origination_caller_id_number: '380732327757',
                'sip_h_X-FWD-Original': '${caller_id_number}',
              },
            },
          ],
        },
      }, null, 4),
    },
    {
      label: '"hangup"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Завершение звонка. В качестве параметра может быть указан код ответа из списка Hangup cause',
      insertText: JSON.stringify({
        hangup: '',
      }, null, 4),
    },
    {
      label: '"inBandDTMF"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Управление in-band DTMF',
      insertText: JSON.stringify({
        inBandDTMF: 'start',
      }, null, 4),
    },
    {
      label: '"flushDTMF"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Очистка буфера ввода абонентом',
      insertText: JSON.stringify({
        flushDTMF: true,
      }, null, 4),
    },
    {
      label: '"playback"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Воспроизведение медиафайла с возможностью сохранить ввод абонента в переменную.',
      insertText: JSON.stringify({
        playback: {
          files: [
            {
              name: 'its_${lang}.wav',
            },
          ],
          getDigits: {
            flushDTMF: true,
            max: 4,
            min: 1,
            setVar: 'getIVR',
            timeout: 3000,
            tries: 1,
          },
        },
      }, null, 4),
    },
    {
      label: '"recordFile"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Записать медиа в файл',
      insertText: JSON.stringify({
        recordFile: {
          maxSec: 30,
          name: '${uuid}',
          silenceHits: 5,
          terminators: '#',
          type: 'mp3',
          voiceMail: true,
        },
      }, null, 4),
    },
    {
      label: '"recordSession"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Управление записью медиапотока в файл.',
      insertText: JSON.stringify({
        recordSession: {
          action: 'start',
          bridged: false,
          followTransfer: true,
          minSec: 2,
          stereo: true,
          type: 'mp3',
        },
      }, null, 4),
    },
    {
      label: '"generateLink"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Приложение создает публичную ссылку на запись и сохраняет значение в переменную',
      insertText: JSON.stringify({
        generateLink: {
          expire: 604800,
          server: 'https://dev.webitel.com',
          set: 'record_link',
        },
      }, null, 4),
    },
    {
      label: '"tts"',
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Генерация речи',
      insertText: JSON.stringify({
        tts: {
          language: 'ru-RU',
          provider: 'google',
          text: '<speak>Ваш номер договора ${usr_selected_prolongation}.</speak>',
          textType: 'ssml',
        },
      }, null, 4),
    },
    {
      label: '"getSpeech"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Асинхронное распознавание речи.',
      insertText: JSON.stringify([
        {
          set: {
            GOOGLE_DISABLE_BREAK: true,
            GOOGLE_OFFSET: 14000,
            GOOGLE_SILENCE_THRESHOLD: 100,
            GOOGLE_SPEECH_ALTERNATIVE_LANG: 'ru-RU',
            GOOGLE_SPEECH_ENABLE_AUTOMATIC_PUNCTUATION: true,
            GOOGLE_SPEECH_LANG: 'uk-UA',
          },
        },
        {
          playback: {
            files: [
              {
                name: 'media_file_menu.wav',
              },
              {
                name: 3500,
                type: 'silence',
              },
            ],
            getSpeech: {},
          },
        },
        {
          set: {
            usr_text: '${google_transcript}',
          },
        },
      ], null, 4),
    },
    {
      label: '"joinQueue"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Постановка абонента в очередь.',
      insertText: JSON.stringify({
        joinQueue: {
          bucket_id: 1,
          priority: 100,
          agent: {
            extension: 1000,
          },
          queue: {
            id: 1,
          },
          ringtone: {
            id: 126,
            type: 'wav',
          },
          timers: [
            {
              actions: [
                {
                  playback: {
                    files: [
                      {
                        name: 'hold_акции.wav',
                      },
                    ],
                  },
                },
              ],
              interval: 1,
              tries: 20,
            },
          ],
          transferAfterBridge: {
            id: 2,
          },
        },
      }, null, 4),
    },
    {
      label: '"joinAgent"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Постановка абонента в личную очередь оператора.',
      insertText: JSON.stringify({
        joinAgent: {
          agent: {
            extension: 1008,
          },
          bridged: [
            {
              log: 'request 1C',
            },
          ],
          cancel_distribute: true,
          processing: {
            enabled: true,
            renewal_sec: 5,
            sec: 30,
          },
          queue_name: '${cc_queue_name}',
        },
      }, null, 4),
    },
    {
      label: '"getQueueAgents"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Получить информацию по количеству операторов в зависимости от статуса в очереди',
      insertText: JSON.stringify({
        getQueueAgents: {
          queue: {
            id: 2,
          },
          set: {
            res_count: 'count',
            res_offline: 'offline',
            res_online: 'online',
            res_pause: 'pause',
            res_waiting: 'waiting',
          },
        },
      }, null, 4),
    },
    {
      label: '"getQueueMetrics"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Рассчитать показатели по очереди.',
      insertText: JSON.stringify({
        getQueueMetrics: {
          bucket: null,
          calls: 'complete',
          field: 'sl',
          lastMinutes: 3800,
          metric: 'sl',
          queue: {
            id: 19,
          },
          set: 'varResult',
          slSec: 20,
        },
      }, null, 4),
    },
    {
      label: '"ccPosition"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Текущая позиция абонента в очереди',
      insertText: JSON.stringify({
        ccPosition: {
          set: 'pos',
        },
      }, null, 4),
    },
    {
      label: '"ewt"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Расчет среднего времени ожидания абонентом в очереди',
      insertText: JSON.stringify({
        ewt: {
          queue_ids: [
            8,
          ],
          setVar: 'ewt',
          strategy: 'puzzle',
        },
      }, null, 4),
    },
    {
      label: '"memberInfo"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Найти информацию по абоненту дайлера.',
      insertText: JSON.stringify({
        memberInfo: {
          bucket_i: 1,
          completed: false,
          destination: '${caller_id_number}',
          name: 'Customer Name',
          queue_ids: [
            8,
          ],
          set: {
            member_var1: 'sum',
            member_var2: 'credit',
          },
          today: true,
        },
      }, null, 4),
    },
    {
      label: '"patchMembers"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Изменить информацию по абоненту дайлера',
      insertText: JSON.stringify({
        patchMembers: {
          bucket_id: 1,
          completed: false,
          destination: '${caller_id_number}',
          name: 'Customer Name',
          queue_ids: [
            8,
          ],
          patch: {
            bucket_id: 2,
            name: 'sum',
            priority: 'credit',
            ready_at: 2147483647,
            stop_cause: 'cancel',
            variables: {
              new_var: 'var',
            },
          },
          today: true,
        },
      }, null, 4),
    },
    {
      label: '"callbackQueue"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Добавить абонента в оффлайн очередь.',
      insertText: JSON.stringify({
        callbackQueue: {
          communication: {
            destination: '${caller_id_number}',
            type_id: 1,
          },
          holdSec: 1,
          name: '${caller_id_number}',
          queue_id: 26,
          variables: {
            DPD: '${DPD}',
            internal_operator_id: '${internal_operator_id}',
            loan_id: '${Loan}',
          },
        },
      }, null, 4),
    },
    {
      label: '"confirm"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Установка значений до набора абонента дайлером',
      insertText: JSON.stringify({
        confirm: {
          destination: '8${destination_number}',
          display: '${agent_extension}',
          export: [
            'new_variable',
          ],
        },
      }, null, 4),
    },
    {
      label: '"cancel"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Отмена текущей попытки набора абонента в дайлере.',
      insertText: JSON.stringify({
        cancel: {
          description: 'do not call',
          export: [
            'new_var',
          ],
          nextDistributeSec: 0,
          stop: false,
        },
      }, null, 4),
    },
    {
      label: '"lastBridged"',
      range,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'Получить информацию по соединениям для липкости звонка.',
      insertText: JSON.stringify({
        lastBridged: {
          calls: {
            inbound: 'all',
            outbound: 'all',
            queue_ids: [
              1, 2,
            ],
          },
          hours: 24,
          number: '380932327757',
          set: {
            my_ag: 'agent_id',
            my_ext: 'extension',
            my_q: 'queue_id',
          },
        },
      }, null, 4),
    },
  ];
const Monaco = (() => {
  let instance;

  const createInstance = () => monaco;

  const registerCompletion = (instance) => {
    instance.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: (model, position, context, token) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createProposals(range),
        };
      },
    });
  };

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
        registerCompletion(instance);
      }
      return instance;
    },
  };
})();

export default Monaco;
