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
    confirmPassword: 'Incorrect password',
  },
  objects: {
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
      permissionsTitle: 'Permissions',
      permissionsRole: 'Role | Roles',
      allRoles: 'All roles',
      permissionsNew: {
        description: 'Description',
      },
      object: {
        object: 'Object',
        allObjects: 'All Objects',
        ObAC: 'Managed by operations',
        RbAC: 'Managed by records',
        edit: {
          operations: 'Operations'
        }
      }
    },
    devices: {
      devicesTitle: 'Devices',
      allDevices: 'All devices',
      searchPlaceholder: 'Name, user, auth ID & desk ID',
      authId: 'Auth ID',
      presence: 'Presence',
      devicesNew: {
        hotDesking: 'Hot desking',
        hostName: 'Host Name',
        phoneInfo: 'Phone info',
        phone: 'Phone',
        vendor: 'Vendor',
        model: 'Model',
        deviceHistory: 'Device history',
        loggedIn: 'Logged In',
        loggedOut: 'Logged Out',
      }
    },
    license: {
      customersTitle: 'Customers',
      licenseTitle: 'License',
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
      certificate: 'Certificate'
    },
    usersObject: {
      usersTitle: 'Users',
      allUsers: 'All users',
      searchPlaceholder: 'Name, login, extensions, status',
      login: 'Login',
      extentions: 'Extentions',
      state: 'State',
      DnD: 'DnD',
      status: 'Status',
      new: {
        roleAdmin: 'Admin',
        deviceNotFound: "Didn't find the device?",
        variables: 'Variables',
        varKey: 'Key',
        varVal: 'Value'
      }
    }
  },
};
