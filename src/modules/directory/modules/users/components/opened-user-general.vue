<template>
  <section class="opened-user-general">
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-user-general__grid">
      <wt-card>
        <div class="opened-user-general__card-content">
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
        </div>
      </wt-card>

      <wt-card>
        <div class="opened-user-general__card-content">
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
            <div class="hint-link typo-body-2">
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
            data-key="id"
            @update:model-value="setItemProp({ prop: 'device', value: $event })"
            @reset="setItemProp({ prop: 'device', value: {} })"
          />
        </div>
      </wt-card>

      <div class="opened-user-general__col">
        <wt-card>
          <div class="opened-user-general__card-content">
            <header class="opened-user-general__card-header">
              <wt-icon
                icon="generate"
                color="info"
              />
              <wt-label>
                {{ $t('objects.directory.users.deviceGenerationTitle') }}
              </wt-label>
            </header>
            <p class="opened-user-general__card-description typo-subtitle-2">
              {{ $t('objects.directory.users.deviceGeneration') }}
            </p>
            <wt-switcher
              controlled
              :disabled="disableUserInput"
              :label="$t('objects.directory.users.generateDevice')"
              :model-value="itemInstance.generateDevice"
              @update:model-value="onToggleGenerateDevice"
            />
          </div>
        </wt-card>

        <wt-card>
          <div class="opened-user-general__card-content">
            <header class="opened-user-general__card-header">
              <wt-icon
                icon="shield-check"
                color="info"
              />
              <wt-label>
                {{ $t('objects.directory.users.authorizationSecurity') }}
              </wt-label>
            </header>
            <p class="opened-user-general__card-description typo-subtitle-2">
              {{ $t('objects.directory.users.mustChangePassword') }}
            </p>
            <wt-switcher
              :disabled="disableUserInput"
              :label="$t('objects.directory.users.temporaryPassword')"
              :model-value="itemInstance.forcePasswordChange"
              @update:model-value="setItemProp({ prop: 'forcePasswordChange', value: $event })"
            />
          </div>
        </wt-card>

        <wt-card v-if="isDisplayQRCode">
          <qrcode
            :namespace="namespace"
            :url="itemInstance.totpUrl"
          />
        </wt-card>

        <wt-card>
          <logout-action
            :id="itemInstance.id"
            :disabled="!isActiveLogout"
            wide
          />
        </wt-card>
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
@use '@webitel/styleguide/viewport-breakpoints' as *;

.opened-user-general__grid {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: var(--spacing-sm);
  align-items: start;
}

.opened-user-general__col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.opened-user-general__card-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.opened-user-general__card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.opened-user-general__card-description {
  margin: 0;
}

@media (max-width: $viewport-sm) {
  .opened-user-general__grid {
    grid-template-columns: 1.5fr 1fr;
  }

  .opened-user-general__grid > :nth-child(3) {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
}

@media (max-width: $viewport-xs) {
  .opened-user-general__grid {
    grid-template-columns: 1fr;
  }

  .opened-user-general__grid > :nth-child(3) {
    grid-column: auto;
    grid-row: auto;
  }
}

.hint-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
	padding: var(--spacing-2xs) var(--spacing-xs);

  &__link {
    --wt-item-link-text-color: var(--info-color);
  }
}
</style>
