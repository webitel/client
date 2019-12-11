module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "vue",
        "jsx"
    ],
    transform: {
        ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.vue$": "vue-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.jsx?$": "babel-jest"
    },
    collectCoverage: false,
    collectCoverageFrom: [
        // "**/*.{js,vue}",
        // "src/components/objects/permissions/**/*{.js,vue}",
        'src/**/*.{js,vue}',
        "!**/node_modules/**"
    ],
    plugins: [
        {
            "src": ",~/plugins/vuelidate",
            "ssr": true
        }
    ],
    transformIgnorePatterns: [
        "/node_modules/(?!vuetable-2)"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "monaco-editor": "<rootDir>/node_modules/monaco-editor-webpack-plugin"
    },
    snapshotSerializers: [
        "jest-serializer-vue"
    ],
    testMatch: [
        "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
    ],
    testURL: "http://localhost/",
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ]
}