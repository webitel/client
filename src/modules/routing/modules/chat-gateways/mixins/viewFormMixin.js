export default {
  data: () => ({
    isCopied: false,
    selectedBorderRadius: {},
    selectedPosition: {},
    selectedLanguage: {},
    color: {
      a: 1,
      hsl: { h: 0, s: 100, l: 50, a: 1 },
      rgba: { r: 0, g: 0, b: 0, a: 1 },
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
      }, {
        name: this.$t('objects.routing.chatGateways.metadata.static'),
        value: 'static',
      }];
    },
    buttonLabel() {
      return this.isCopied ? this.$t('objects.copied') : this.$t('objects.routing.chatGateways.metadata.copy');
    },
    disableOpenTimeout() {
      return !this.itemInstance.metadata.timeoutIsActive || this.disableUserInput;
    },
  },
  methods: {
    restoreLanguage(value) {
      if (value) {
        this.selectedLanguage = this.languages.find((language) => language.value === value);
      };
    },
    restorePosition(value) {
      if (value) {
        this.selectedPosition = this.positionOptions.find((position) => position.value === value);
      };
    },
    restoreBorderRadius(value) {
      if (value) {
        this.selectedBorderRadius = this.borderRadiusOptions.find((type) => type.value === value);
      };
    },
    setColor(value) {
      this.color = value;
      const h = Math.floor(this.color.hsl.h);
      const s = +this.color.hsl.s.toFixed(2) * 100;
      const l = +this.color.hsl.l.toFixed(2) * 100;
      const hsl = `hsl(${h}, ${s}%, ${l}%)`;
      this.setItemMetadata({ prop: 'accentColor', value: hsl });
      this.setItemMetadata({ prop: 'btnOpacity', value: `${this.color.a}` });
    },
    setAlpha(value) {
      this.color = {
        ...this.color,
        rgba: {
          ...this.color.rgba,
          a: value.a,
        },
        hsl: {
          ...this.color.hsl,
          a: value.a,
        },
        a: value.a,
      };
      this.setItemMetadata({ prop: 'btnOpacity', value: `${value.a}` });
    },
    restoreOpacity(value) {
      if (value) {
        this.color.a = value;
        this.color.rgba.a = value;
        this.color.hsl.a = value;
      }
    },
    restoreColor(value) {
      if (value) {
        const colorArray = value.replace(/\s+|%|hsl|\(|\)/g, '')
          .split(',');
        this.color.hsl = {
          h: +colorArray[0],
          s: +colorArray[1] / 100,
          l: +colorArray[2] / 100,
        };
        this.restoreOpacity(this.itemInstance.metadata.btnOpacity);
      }
    },
    restoreConfig() {
      this.restoreLanguage(this.itemInstance.metadata.lang);
      this.restorePosition(this.itemInstance.metadata.position);
      this.restoreBorderRadius(this.itemInstance.metadata.borderRadiusStyle);
      this.restoreOpacity(this.itemInstance.metadata.btnOpacity);
      this.restoreColor(this.itemInstance.metadata.accentColor);
    },
  },
  created() {
    this.restoreConfig();
  },
};
