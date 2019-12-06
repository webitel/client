export default {
    auth: {
        register: 'Register',
        login: 'Login',
        registerReset: 'Reset password',
        detailsSubtitle: 'Enter your details below',
        resetPasswordLink: 'Reset your password?',
        user: 'Username',
        password: 'Password',
        confirmPassword: 'Repeat password',
        key: 'License key',
        registerSubmit: 'Register',
        resetSubmit: 'Reset',
        loginSubmit: 'Log in',
    },

    validation: {
        email: 'Should look email-like',
        required: 'This field is required',
        sameAs: 'Incorrect password',
        gatewayHostValidator: 'Should look like IPv4 or FQDN',
        ipValidator: 'Should look like IPv4',
        minValue: 'Value shoud be at least',
        maxValue: 'Value shoud be not much',
        numeric: 'Should be numberic',
        requiredArrayValue: 'Array should not be empty',
    },

    nav: {
        directory: {
            directory: 'Directory',
            users: 'Users',
            devices: 'Devices',
        },
        contacts: 'Contacts',
        routing: {
            routing: 'Routing',
            flow: 'Flow',
            dialplan: 'Dialplan',
            chatplan: 'Chatplan',
            gateways: 'SIP endpoints',
        },
        lookups: {
            lookups: 'Lookups',
            media: 'Media files',
            blacklists: 'Blacklist',
            calendars: 'Calendars',
            communications: 'Communication types',
            contactTypes: 'Contact types',
            leadSources: 'Lead sources',
            leadStatus: 'Lead status',
        },
        ccenter: {
            ccenter: 'Contact center',
            agentSkills: 'Agent skills',
            agents: 'Agents',
            teams: 'Teams',
            res: 'Resources',
            resGroups: 'Resource groups',
            queues: 'Queues',
            buckets: 'Buckets'
        },
        kibana: 'Kibana',
        integrations: {
            integrations: 'Integrations',
            tokens: 'API tokens',
            accounts: 'Accounts',
            webhooks: 'Webhooks',
            widgets: 'Widgets',
            callTracking: 'Call tracking',
        },
        administration: {
            administration: 'Administration',
            license: 'License',
            storage: 'Storage',
            media: 'Media',
            blacklists: 'Blacklists',
            adfs: 'ADFS OAuth2',
        },
        permissions: {
            permissions: 'Permissions',
            roles: 'Roles',
            objects: 'Objects',
            operations: 'Operations',
        }
    },

    objects: {
        administration: 'Administration',

        general: 'General',
        new: 'New',
        create: 'Create',
        read: 'Read',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
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
        createdAt: 'Created at',
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

        CSV: {
            skipHeaders: 'Skip headers',
            charSet: 'Char set',
            separator: 'Separator',
            CSVColumn: 'CSV column',
            testRailField: 'Test rail field'
        },
        generalInfo: 'General info',
        objectHeader: {},
        directory: {
            directory: 'Directory',
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
                roleAdmin: 'Admin',
                license: 'License',
                devices: 'Devices',
                deviceNotFound: "Didn't find the device?",
                createNewDevice: 'Add new',
                variables: 'Variables',
                varKey: 'Key',
                varVal: 'Value',
            },
            devices: {
                devices: 'Device | Devices',
                allDevices: 'All devices',
                searchPlaceholder: 'Name, user, auth ID & desk ID',
                authId: 'Auth ID',
                presence: 'Presence',
                hotDesking: 'Hot desking',
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
                ok: 'Ok',
            },
        },
        permissions: {
            permissions: 'Permissions',
            permissionsRole: 'Role | Roles',
            allRoles: 'All roles',
            searchPlaceholder: 'role ..',
            object: {
                object: 'Objects',
                allObjects: 'All objects',
                ObAC: 'Managed by operations',
                RbAC: 'Managed by records',
                operations: 'Operations',
                searchPlaceholder: 'object ..',
            }
        },
        license: {
            customers: 'Customers',
            license: 'License',
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
            daysToExpire: {
                0: 'Expired',
                30: '30 or less',
                90: '90 or less'
            },
            importLicense: 'Import license',
            licenseKey: 'License key'
        },
        lookups: {
            lookups: 'Lookups',
            blacklist: {
                blacklist: 'Blacklist | Blacklists',
                allBlacklists: 'All blacklists',
                number: 'Number | Numbers',
                newNumber: 'New number',
                numbersCount: 'Numbers',
            },
            media: {
                mediaFiles: 'Media file | Media files',
                allMediaFiles: 'All media files',
                createdAt: 'Created at',
                format: 'Format',
                size: 'Size',
                textToSpeech: 'Text to speech',
                popupSettings: 'Settings',
                provider: 'Provider',
                lang: 'Language',
                voice: 'Voice',
                token: 'Token',
                key: 'Key',
            },
            calendars: {
                calendars: 'Calendar | Calendars',
                allCalendars: 'All calendars',
                searchPlaceholder: 'Name, description...',
                timezone: 'Timezone',
                start: 'Start',
                end: 'End',
                workWeek: 'Work week',
                holidays: 'Holidays',
                enabled: 'Enabled',
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
                communications: 'Communication type | Comunication types',
                allCommunications: 'All communiction types',
                code: 'Code'
            },
            contactType: {
                contactType: 'Contact type | Contact types',
                allContactTypes: 'All contact types'
            },
            leadSource: {
                leadSource: 'Lead source | Lead sources',
                allSources: 'All sources'
            },
            leadStatus: {
                leadStatus: 'Lead status',
                allStatuses: 'All statuses'
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
                flow: 'Flow',
                allFlowSchemas: 'All flow schemas',
                newFlow: 'New schema',
                flowSchema: 'Flow schema',
                type: 'Type',
                debug: 'Debug',
                newFlowDescription: 'Choose a template to get going, or start from scratch with a blank canvas',
                generalFlow: 'General schema',
                generalFlowDescription: 'lorem ipsum',
                visual: 'Visual schema',
                json: 'JSON schema',
                callFlow: 'Callflow schema',
                callflow: 'Callflow',
                callFlowDescription: 'lorem ipsum',
                visualDescription: 'lorem ipsum',
                jsonDescription: 'lorem ipsum',
            },

            dialplan: {
                dialplan: 'Dialplan',
                dialplanRules: 'Dialplan rules',
                pattern: 'Destination number',
                dialplanRule: 'Dialplan rule',
            },

            gateways: {
                gateways: 'Gateway | Gateways',
                allGateways: 'All gateways',
                trunkingGateway: 'Trunking gateway',
                registerGateway: 'Register gateway',
                proxy: 'Proxy',
                searchPlaceholder: 'gateway search...',
                host: 'Host',
                trunkingACLTitle: 'Access Control',
                trunkingACL: 'Trunking access control list',
                hostnameTrunking: 'Server/Gateway Hostname or IP',
                hostnameRegister: 'Registrar/Server/Gateway Hostname or IP',
                expire: 'Expire',
                authID: 'Authentication ID',
                accountNumber: 'Account number',
                outboundProxy: 'Outbound Proxy Hostname or IP',
                domain: 'Domain/Realm',
                newGateway: 'New gateway',
                newGatewayDescription: 'New gateway description',
                SIPregistrations: 'SIP Registration',
                SIPregistrationsDescription: 'SIP registration description',
                SIPtrunking: 'SIP Trunking',
                SIPtrunkingDescription: 'SIP trunking description',

            },

            callflow: {
                callflow: 'Callflow'
            }
        },

        ccenter: {
            ccenter: 'Contact center',

            skills: {
                skills: 'Skill | Skills',
                capacity: 'Capacity',
                agentSkills: 'Agent skill | Agent skills',
                allSkills: 'All skills'
            },

            agents: {
                agents: 'Agent | Agents',
                allAgents: 'All agents',
                state: 'State',
                stateTime: 'State time',
            },

            teams: {
                teams: 'Team | Teams',
                allTeams: 'All teams',
                strategy: 'Strategy',
                statusHistory: 'Status history',
                historyState: 'State',
                historyFrom: 'From',
                historyTo: 'To',
                historyDuration: 'Duration',
                supervisors: 'Supervisor | Supervisors',
                level: 'Level',
                timing: 'Timing',
                maxNoAnswer: 'Max no answer',
                callTimeout: 'Call timeout',
                wrapUpTime: 'Wrap up time',
                busyDelayTime: 'Busy delay time',
                rejectDelayTime: 'Reject delay time',
                noAnswerDelayTime: 'No answer delay time',
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
                priority: 'Priority',
                newQueue: 'New queue',
                newQueueDescription: 'lorem ipsum dolor sit amet',
                outboundIVRQueue: 'Outbound IVR queue',
                outboundIVR: 'Outbound IVR',
                outboundIVRDescription: 'An Outbound IVR allows an organization to automatically engage customers through multiple channels such as automated voice calls, SMS messages, email or social media posts using personalized notifications.',
                inboundQueue: 'Inbound queue',
                inboundQueueDescription: 'An Inbound queue is that it’s where callers are placed on hold, in a queue, while they wait to speak with a live agent.',
                offlineQueue: 'Offline queue',
                offlineQueueDescription: 'An Offline queue gives callers the option to stop waiting on hold, input their phone number and receive a callback as soon as it’s their turn.',
                previewDialer: 'Preview dialer',
                previewDialerDescription: 'Preview the contact before auto dialing them.',
                progressiveDialer: 'Progressive dialer',
                progressiveDialerDescription: 'Progressive dialing minimizes wasted time between calls by automatically dialing a number from a call list as soon as an agent becomes available.',
                predictiveDialer: 'Predictive dialer',
                predictiveDialerDescription: 'A predictive dialer calls multiple numbers at one time. As soon as a customer answers, an agent is connected to them.',
                strategy: 'Strategy',
                timezone: 'Timezone',
                callLimit: 'Call limit',
                variables: 'Variables',
                members: 'Member | Members',
                timing: 'Timing',
                varKey: 'Key',
                varVal: 'Value',
                endCause: 'End cause',
                destination: 'Destination | Destinations',
                expire: 'Expire',
                originateTimeout: 'Originate timeout',
                waitBetweenRetries: 'Wait between retries',
                timeout: 'Timeout',
                maxNumberOfRetry: 'Max number of retry',
                waitForResultStatus: 'Wait for result status',
            },

            buckets: {
                buckets: 'Bucket | Buckets',
                allBuckets: 'All buckets',
            },

            res: {
                res: 'Resource | Resources',
                allRes: 'All resources',
                reserve: 'Reserve',
                searchPlaceholder: 'name, gateway..',
                cps: 'CPS',
                limit: 'Limit',
                numbers: 'Number | Numbers',
                displayNumbers: 'Display numbers',
                failure: 'Failure',
                maxErrors: 'Maximum failure responses',
                errorCodes: 'Request Failure Responses',
            },

            resGroups: {
                resGroups: 'Resource group | Resource groups',
                allResGroups: 'All resource groups',
                searchPlaceholder: 'res group name..',
                strategy: 'Strategy',
                timerange: 'Time range',
                timerangeFrom: 'From',
                timerangeTo: 'To'
            },
        },

        pagination: {
            rowsPerPage: 'Rows per page'
        }
    },
};
