const convertHslToRgb = ({ h, s, l }) => {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const rgbColor = {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
  return rgbColor;
};

export default {
  data: () => ({
    isCopied: false,
    selectedBorderRadius: {},
    selectedPosition: {},
    selectedLanguage: {},
    color: {
      a: 1,
      hsl: { h: 42, s: 1, l: 0.5, a: 1 },
      rgba: { r: 255, g: 179, b: 0, a: 1 },
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
        this.color.rgba = convertHslToRgb(this.color.hsl);
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
