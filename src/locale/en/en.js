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

    objects: {

        directory: 'Directory',
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
        importCSV: 'Import CSV',
        online: 'Online',
        offline: 'Offline',
        on: 'On',
        off: 'Off',
        enabled: 'Enabled',
        status: 'Status',

        CSV: {
            skipHeaders: 'Skip headers',
            charSet: 'Char set',
            separator: 'Separator',
            CSVColumn: 'CSV column',
            testRailField: 'Test rail field'
        },
        generalInfo: 'General info',
        objectHeader: {},
        permissions: {
            permissions: 'Permissions',
            permissionsRole: 'Role | Roles',
            allRoles: 'All roles',
            object: {
                object: 'Objects',
                allObjects: 'All objects',
                ObAC: 'Managed by operations',
                RbAC: 'Managed by records',
                operations: 'Operations'
            }
        },
        devices: {
            devices: 'Devices',
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
            deviceHistory: 'Device history',
            loggedIn: 'Logged In',
            loggedOut: 'Logged Out',
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
        usersObject: {
            users: 'Users',
            allUsers: 'All users',
            searchPlaceholder: 'Name, login, extensions, status',
            login: 'Login',
            extentions: 'Extentions',
            state: 'State',
            DnD: 'DnD',
            status: 'Status',
            roleAdmin: 'Admin',
            deviceNotFound: "Didn't find the device?",
            variables: 'Variables',
            varKey: 'Key',
            varVal: 'Value'
        },
        lookups: {
            lookups: 'Lookups',
            skills: {
                skills: 'Agent skill | Agent skills',
                allSkills: 'All skills'
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
                repeat: 'Repeat'
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

            gateways: {
                gateways: 'Gateway | Gateways',
                allGateways: 'All gateways',
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
                timerange: 'Time range'
            },
        }
    },
};
