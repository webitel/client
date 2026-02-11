<template>
  <popup :disable-action="!!selectedOption" :primary-action="createItemInstance" :primary-text="$t('objects.create')"
    :title="$t('objects.integrations.storage.newStorage')" @close="$emit('close')">
    <section>
      <p class="popup-subheading">
        {{ $t('objects.integrations.storage.newStorageDescription') }}
      </p>
      <ul class="popup-options">
        <!--                <li-->
        <!--                        class="popup-options__item-wrap"-->
        <!--                        :class="{'active': computeSelectedOption('local')}"-->
        <!--                        @click="selectPopupOption('local')"-->
        <!--                >-->
        <!--                    <h4 class="popup-options__item-header">-->
        <!--                        {{$t('objects.integrations.storage.local')}}-->
        <!--                    </h4>-->
        <!--                </li>-->
        <li :class="{ 'active': computeSelectedOption('s3') }" class="popup-options__item-wrap"
          @click="selectPopupOption('s3')">
          <h4 class="popup-options__item-header typo-body-2">
            {{ $t('objects.integrations.storage.s3') }}
          </h4>
        </li>
        <!--                <li-->
        <!--                        class="popup-options__item-wrap"-->
        <!--                        :class="{'active': computeSelectedOption('backblaze')}"-->
        <!--                        @click="selectPopupOption('backblaze')"-->
        <!--                >-->
        <!--                    <h4 class="popup-options__item-header">-->
        <!--                        {{$t('objects.integrations.storage.backblaze')}}-->
        <!--                    </h4>-->
        <!--                </li>-->
        <!-- <li
                 class="popup-options__item-wrap"
                 :class="{'active': computeSelectedOption('dropbox')}"
                 @click="selectPopupOption('dropbox')"
         >
             <h4 class="popup-options__item-header">
                 {{$t('objects.integrations.storage.dropbox')}}
             </h4>
         </li>
         <li
                 class="popup-options__item-wrap"
                 :class="{'active': computeSelectedOption('drive')}"
                 @click="selectPopupOption('drive')"
         >
             <h4 class="popup-options__item-header">
                 {{$t('objects.integrations.storage.drive')}}
             </h4>
         </li>-->
      </ul>
    </section>
  </popup>
</template>

<script>
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';

export default {
	name: 'CreateStoragePopup',

	data() {
		return {
			selectedOption: '',
		};
	},

	methods: {
		selectPopupOption(option) {
			this.selectedOption = option;
		},

		createItemInstance() {
			if (this.selectedOption) {
				this.$router.push({
					name: `${RouteNames.STORAGE}-new`,
					params: {
						type: this.selectedOption,
					},
				});
			}
		},

		computeSelectedOption(option) {
			return option === this.selectedOption;
		},
	},
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.popup-subheading {
  margin: 0 0 28px;
}

.popup-options {
  margin-bottom: 28px;

  .popup-options__item-wrap {
    position: relative;
    margin-bottom: 18px;
    padding: 14px;
    cursor: pointer;
    border-radius: var(--border-radius);

    &:hover,
    &.active {}
  }

  .popup-options__item-header {
    margin: 0;
    /*font-size: 1em;*/
  }

  .popup-options__item-text {
    margin: 0;
    /*font-size: 0.9em;*/
  }

  .popup-options__item-icon {
    position: absolute;
    top: 50%;
    right: 26px;
    transform: translateY(-50%);
  }
}
</style>
