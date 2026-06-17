<template>
  <section class="opened-user-general">
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-user-general__grid">
      <wt-section-card>
        <wt-input-text
          :disabled="disableUserInput"
          :label="$t('objects.name')"
          :model-value="itemInstance.name"
          :v="v.itemInstance.name"
          required
          @update:model-value="setItemProp({ prop: 'name', value: $event })"
        />

        <wt-input-text
          :disabled="disableUserInput"
          :label="$t('objects.directory.users.login')"
          :model-value="itemInstance.username"
          :v="v.itemInstance.username"
          required
          @update:model-value="setItemProp({ prop: 'username', value: $event })"
        />

        <user-password-input
          :disabled="disableUserInput"
          :model-value="itemInstance.password"
          required
          @update:model-value="setItemProp({ prop: 'password', value: $event })"
        />

        <wt-input-text
          :disabled="disableUserInput"
          :label="$t('objects.directory.users.extensions')"
          :model-value="itemInstance.extension"
          :v="v.itemInstance.extension"
          @update:model-value="setItemProp({ prop: 'extension', value: $event })"
        />
      </wt-section-card>

      <wt-section-card>
        <wt-multi-select
          :disabled="disableUserInput"
          :label="$t('objects.permissions.permissionsRole')"
          :search-method="loadRolesOptions"
          :model-value="itemInstance.roles"
          @update:model-value="setItemProp({ prop: 'roles', value: $event })"
        />

        <wt-multi-select
          :disabled="disableUserInput"
          :label="$t('objects.directory.license.license', 1)"
          :search-method="loadLicenseOptions"
          :model-value="itemInstance.license"
          @update:model-value="setItemProp({ prop: 'license', value: $event })"
        />

        <div>
          <wt-multi-select
            :disabled="disableUserInput || itemInstance.generateDevice"
            :label="$t('objects.directory.devices.devices', 2)"
            :search-method="loadDevicesOptions"
            :model-value="itemInstance.devices"
            @update:model-value="onDevicesChange"
          />
          <div class="hint-link__wrap typo-body-2">
            <span>{{ $t('objects.directory.users.deviceNotFound') }} </span>
            <adm-item-link
              id="new"
              class="hint-link__link typo-subtitle-2"
              :route-name="RouteNames.DEVICES"
            >
              {{ $t('objects.directory.users.createNewDevice') }}
            </adm-item-link>
          </div>
        </div>

        <wt-single-select
          :disabled="disableUserInput || itemInstance.generateDevice"
          :label="$t('objects.directory.users.defaultDevice')"
          :options="itemInstance.devices"
          :model-value="itemInstance.device"
          :v="v.itemInstance.device"
          required
          data-key="id"
          @update:model-value="setItemProp({ prop: 'device', value: $event })"
          @reset="setItemProp({ prop: 'device', value: {} })"
        />
      </wt-section-card>

      <div class="opened-user-general__col">
        <wt-section-card
          icon="generate"
          :title="$t('objects.directory.users.deviceGenerationTitle')"
        >
          <template #description>
            {{ $t('objects.directory.users.deviceGeneration') }}
          </template>
          <wt-switcher
            controlled
            :disabled="disableUserInput"
            :label="$t('objects.directory.users.generateDevice')"
            :model-value="itemInstance.generateDevice"
            @update:model-value="onToggleGenerateDevice"
          />
        </wt-section-card>

        <wt-section-card
          icon="lock"
          :title="$t('objects.directory.users.authorizationSecurity')"
        >
          <template #description>
            {{ $t('objects.directory.users.mustChangePassword') }}
          </template>

          <wt-switcher
            :disabled="disableUserInput"
            :label="$t('objects.directory.users.temporaryPassword')"
            :model-value="itemInstance.forcePasswordChange"
            @update:model-value="setItemProp({ prop: 'forcePasswordChange', value: $event })"
          />
        </wt-section-card>

        <wt-section-card v-if="isDisplayQRCode">
          <qrcode
            :namespace="namespace"
            :url="itemInstance.totpUrl"
          />
        </wt-section-card>

        <wt-section-card>
          <logout-action
            :id="itemInstance.id"
            :disabled="!isActiveLogout"
          />
        </wt-section-card>
      </div>
    </div>

    <global-state-confirmation-popup
      :shown="isReplaceConfirmShown"
      :title="$t('objects.directory.users.deviceGenerationConfirmTitle')"
      :description="$t('objects.directory.users.generateDeviceConfirmation')"
      @confirm="onConfirmReplaceDevices"
      @close="onCancelReplaceDevices"
    />
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';
import WtSectionCard from '@webitel/ui-sdk/src/components/wt-section-card/wt-section-card.vue';
import { computed } from 'vue';
import { mapGetters } from 'vuex';

import UserPasswordInput from '../../../../../app/components/utils/user-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import ItemLinkMixin from '../../../../../app/mixins/baseMixins/baseTableMixin/itemLinkMixin.js';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import GlobalStateConfirmationPopup from '../../../../_shared/global-state-confirmation-popup/global-state-confirmation-popup.vue';
import LogoutAction from '../../../../_shared/logout-action/logout-action.vue';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';
import DevicesAPI from '../../devices/api/devices';
import LicenseAPI from '../../license/api/license';
import Qrcode from './_internals/qrcode-two-factor-auth.vue';

export default {
	name: 'OpenedUserGeneral',
	components: {
		UserPasswordInput,
		Qrcode,
		LogoutAction,
		WtSectionCard,
		GlobalStateConfirmationPopup,
	},
	mixins: [
		openedTabComponentMixin,
		ItemLinkMixin,
	],
	setup: () => {
		const {
			disableUserInput,
			hasCreateAccess,
			hasDeleteAccess,
			hasUpdateAccess,
		} = useUserAccessControl(WtObject.User);

		const hasUserAccess = computed(
			() =>
				hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value,
		);

		return {
			hasUserAccess,
			disableUserInput,
		};
	},
	data: () => ({
		isReplaceConfirmShown: false,
	}),
	computed: {
		...mapGetters('directory/users', {
			isDisplayQRCode: 'IS_DISPLAY_QR_CODE',
		}),
		isActiveLogout() {
			return this.itemInstance.id && this.hasUserAccess;
		},
	},
	methods: {
		loadRolesOptions(params) {
			return RolesAPI.getLookup(params);
		},
		async loadLicenseOptions(params) {
			const fields = [
				'product',
				'id',
			];
			const response = await LicenseAPI.getList({
				...params,
				fields,
			});
			response.items = response.items.map(({ name, product, id }) => ({
				name: name || product,
				id,
			}));
			return response;
		},
		async loadDevicesOptions(params) {
			const fields = [
				'id',
				'name',
				'hotdesk',
			];
			const response = await DevicesAPI.getLookup({
				...params,
				fields,
			});
			response.items = response.items.filter((item) => !item.hotdesk);
			return response;
		},
		onDevicesChange(value) {
			this.setItemProp({
				prop: 'devices',
				value,
			});
			const currentId = this.itemInstance.device?.id;
			if (currentId && !value.some((device) => device.id === currentId)) {
				this.setItemProp({
					prop: 'device',
					value: {},
				});
			}
		},
		onToggleGenerateDevice(value) {
			if (!value) {
				this.setItemProp({
					prop: 'generateDevice',
					value: false,
				});
				return;
			}
			const hasDevice = !!this.itemInstance.device?.id;
			const hasDevices = this.itemInstance.devices?.length > 0;
			if (hasDevice || hasDevices) {
				this.isReplaceConfirmShown = true;
			} else {
				this.setItemProp({
					prop: 'generateDevice',
					value: true,
				});
			}
		},
		onConfirmReplaceDevices() {
			this.setItemProp({
				prop: 'device',
				value: {},
			});
			this.setItemProp({
				prop: 'devices',
				value: [],
			});
			this.setItemProp({
				prop: 'generateDevice',
				value: true,
			});
			this.isReplaceConfirmShown = false;
		},
		onCancelReplaceDevices() {
			this.isReplaceConfirmShown = false;
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
@use '@webitel/ui-sdk/src/css/main' as *;

.opened-user-general__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: var(--spacing-sm);
  align-items: start;
}

.opened-user-general__col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

// WTEL-9735 ризик E1: object-input-grid не має брейкпоінтів — задаємо власні
@media (max-width: 1366px) {
  .opened-user-general__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 960px) {
  .opened-user-general__grid {
    grid-template-columns: 1fr;
  }
}

.hint-link__wrap {
  margin-top: 8px;
}

.hint-link__link {
  display: inline-block;
  text-decoration: underline;
  color: var(--info-color);
}
</style>
