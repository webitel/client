<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid object-input-grid__1-col object-input-grid__w50">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>

      <wt-datetimepicker
        :label="$t('objects.expireAt')"
        :value="itemInstance.date"
        :v-model="expiredAt"
        @input="setExpiredAt({ prop: 'expiredAt'})"
      >
      </wt-datetimepicker>

      {{ setExpiredAt }}

      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>

import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-blacklist-general',
  mixins: [openedTabComponentMixin],

  data() {
    return {
      expiredAt: new Date(),
      time: new Date(),
    };
  },
  computed: {
    setExpiredAt() {
      const expiredAt = new Date(this.expiredAt);
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        expiredAt.setHours(hours);
        expiredAt.setMinutes(minutes);
      } else {
        expiredAt.setHours(this.time.getHours());
        expiredAt.setMinutes(this.time.getMinutes());
      }
      return expiredAt;
    },
  },
  methods: {

  },

};

</script>
