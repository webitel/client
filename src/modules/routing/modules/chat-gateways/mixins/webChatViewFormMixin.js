export default {
  data: () => ({
    selectedBorderRadius: {},
    selectedPosition: {},
    selectedLanguage: {},
    color: {
      h: 42,
      s: 1,
      l: 0.5,
      a: 1,
    },
  }),
  computed: {
    languages() {
      return [{
        name: this.$t('reusable.lang.en'),
        value: 'en',
      }, {
        name: this.$t('reusable.lang.ru'),
        value: 'ru',
      }, {
        name: this.$t('reusable.lang.ua'),
        value: 'ua',
      }];
    },
    borderRadiusOptions() {
      return [{
        name: this.$t('objects.routing.chatGateways.metadata.square'),
        value: 'square',
      }, {
        name: this.$t('objects.routing.chatGateways.metadata.rounded'),
        value: 'rounded',
      }];
    },
    positionOptions() {
      return [{
        name: this.$t('objects.routing.chatGateways.metadata.right'),
        value: 'right',
      }, {
        name: this.$t('objects.routing.chatGateways.metadata.left'),
        value: 'left',
      },
      // Uncomment position static if needed. Not available until documentation is ready.
      // {
      // name: this.$t('objects.routing.chatGateways.metadata.static'),
      // value: 'static',
      // }
      ];
    },
    disableOpenTimeout() {
      return !this.itemInstance.metadata.timeoutIsActive || this.disableUserInput;
    },
  },
  methods: {
    restoreLanguage(value) {
      if (value) {
        this.selectedLanguage = this.languages.find((language) => language.value === value);
      }
    },
    restorePosition(value) {
      if (value) {
        this.selectedPosition = this.positionOptions.find((position) => position.value === value);
      }
    },
    restoreBorderRadius(value) {
      if (value) {
        this.selectedBorderRadius = this.borderRadiusOptions.find((type) => type.value === value);
      }
    },
    setColor(value) {
      this.color = value;
      const h = Math.floor(this.color.hsl.h);
      const s = value.hsl.s.toFixed(2) * 100;
      const l = value.hsl.l.toFixed(2) * 100;
      const hsl = `hsl(${h}, ${s}%, ${l}%)`;
      this.setItemMetadata({ prop: 'accentColor', value: hsl });
      this.setItemMetadata({ prop: 'btnOpacity', value: `${value.a}` });
    },
    restoreOpacity(value) {
      if (value) {
        this.color.a = value;
      }
    },
    restoreColor(value) {
      if (value) {
        const colorArray = value.replace(/\s+|%|hsl|\(|\)/g, '').split(',');
        this.color = {
          h: +colorArray[0],
          s: (+colorArray[1] / 100).toFixed(2),
          l: (+colorArray[2] / 100).toFixed(2),
        };
      }
    },
    restoreConfig() {
      this.restoreLanguage(this.itemInstance.metadata.lang);
      this.restorePosition(this.itemInstance.metadata.position);
      this.restoreBorderRadius(this.itemInstance.metadata.borderRadiusStyle);
      this.restoreColor(this.itemInstance.metadata.accentColor);
      this.restoreOpacity(this.itemInstance.metadata.btnOpacity);
    },
  },
  created() {
    this.restoreConfig();
  },
};
