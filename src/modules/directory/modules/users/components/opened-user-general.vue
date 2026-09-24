<template>
  <section class="opened-user-general">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-user-general__grid">
      <wt-card>
        <div class="opened-user-general__card-content">
          <wt-input-text
            v-model:model-value="modelValue.name"
            :disabled="disableUserInput"
            :label="t('objects.name')"
            :regle-validation="validationFields?.name"
            required
          />

          <wt-input-text
            v-model:model-value="modelValue.username"
            :disabled="disableUserInput"
            :label="t('objects.directory.users.login')"
            :regle-validation="validationFields?.username"
            required
          />

          <generate-password-input
            :disabled="disableUserInput"
            :regle-validation="validationFields?.password"
            :value="modelValue.password"
            required
            @input="modelValue.password = $event"
          />

          <wt-input-text
            v-model:model-value="modelValue.extension"
            :disabled="disableUserInput"
            :label="t('objects.directory.users.extensions')"
            :regle-validation="validationFields?.extension"
          />
        </div>
      </wt-card>

      <wt-card>
        <div class="opened-user-general__card-content">
          <wt-multi-select
            v-model:model-value="modelValue.roles"
            :disabled="disableUserInput || !hasRolesReadAccess"
            :label="t('objects.permissions.permissionsRole')"
            :search-method="loadRolesOptions"
          />

          <wt-multi-select
            v-model:model-value="modelValue.license"
            :disabled="disableUserInput"
            :label="t('objects.directory.license.license', 1)"
            :search-method="loadLicenseOptions"
          />

          <div>
            <wt-multi-select
              :disabled="disableUserInput || modelValue.generateDevice || !hasDevicesReadAccess"
              :label="t('objects.directory.devices.devices', 2)"
              :model-value="modelValue.devices"
              :search-method="loadDevicesOptions"
              @update:model-value="setUserDevices(modelValue, $event)"
            />
            <div class="opened-user-general__hint-link typo-body-2">
              <span>{{ t('objects.directory.users.deviceNotFound') }} </span>
              <wt-item-link
                v-if="hasDevicesCreateAccess"
                :link="{
                  name: `${RouteNames.DEVICES}-card`,
                  params: { id: 'new' },
                }"
                class="opened-user-general__hint-link-link typo-subtitle-2"
              >
                {{ t('objects.directory.users.createNewDevice') }}
              </wt-item-link>
            </div>
          </div>

          <wt-single-select
            v-model:model-value="modelValue.device"
            :disabled="disableUserInput || modelValue.generateDevice || !hasDevicesReadAccess"
            :label="t('objects.directory.users.defaultDevice')"
            :options="modelValue.devices"
            data-key="id"
            @reset="modelValue.device = {}"
          />
        </div>
      </wt-card>

      <div class="opened-user-general__col">
        <wt-card>
          <div class="opened-user-general__card-content">
            <header class="opened-user-general__card-header">
              <wt-icon
                color="info"
                icon="generate"
              />
              <wt-label>
                {{ t('objects.directory.users.deviceGenerationTitle') }}
              </wt-label>
            </header>
            <p class="opened-user-general__card-description typo-subtitle-2">
              {{ t('objects.directory.users.deviceGeneration') }}
            </p>
            <wt-switcher
              :disabled="disableUserInput"
              :label="t('objects.directory.users.generateDevice')"
              :model-value="modelValue.generateDevice"
              controlled
              @update:model-value="toggleGenerateDevice"
            />
          </div>
        </wt-card>

        <wt-card>
          <div class="opened-user-general__card-content">
            <header class="opened-user-general__card-header">
              <wt-icon
                color="info"
                icon="shield-check"
              />
              <wt-label>
                {{ t('objects.directory.users.authorizationSecurity') }}
              </wt-label>
            </header>
            <p class="opened-user-general__card-description typo-subtitle-2">
              {{ t('objects.directory.users.mustChangePassword') }}
            </p>
            <wt-switcher
              v-model:model-value="modelValue.forcePasswordChange"
              :disabled="disableUserInput"
              :label="t('objects.directory.users.temporaryPassword')"
            />
          </div>
        </wt-card>

        <wt-card v-if="isDisplayQRCode">
          <qrcode-two-factor-auth :url="modelValue.totpUrl" />
        </wt-card>

        <wt-card>
          <logout-action
            :id="modelValue.id"
            :disabled="!isActiveLogout"
            wide
          />
        </wt-card>
      </div>
    </div>

    <global-state-confirmation-popup
      :description="t('objects.directory.users.generateDeviceConfirmation')"
      :shown="isReplaceConfirmShown"
      :title="t('objects.directory.users.deviceGenerationConfirmTitle')"
      @close="isReplaceConfirmShown = false"
      @confirm="confirmReplaceDevices"
    />
  </section>
</template>

<script setup lang="ts">
import { DevicesAPI, LicenseAPI } from '@webitel/api-services/api';
import type { ApiLicenseV1 } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GeneratePasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import GlobalStateConfirmationPopup from '../../../../_shared/global-state-confirmation-popup/global-state-confirmation-popup.vue';
import LogoutAction from '../../../../_shared/logout-action/logout-action.vue';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import {
	hasAssignedDevices,
	replaceUserDevicesWithGenerated,
	setUserDevices,
} from '../scripts/userDevices';
import type { User } from '../types/User';
import QrcodeTwoFactorAuth from './_internals/qrcode-two-factor-auth.vue';

const modelValue = defineModel<User>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<User>;
}>();

const { t } = useI18n();

const userinfoStore = useUserinfoStore();
const { hasSpecialGlobalActionAccess } = userinfoStore;

const { disableUserInput, hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl(WtObject.User);
const {
	hasReadAccess: hasDevicesReadAccess,
	hasCreateAccess: hasDevicesCreateAccess,
} = useUserAccessControl(WtObject.Device);
const { hasReadAccess: hasRolesReadAccess } = useUserAccessControl(
	WtObject.Role,
);

const isReplaceConfirmShown = ref(false);

const isDisplayQRCode = computed(
	() =>
		hasSpecialGlobalActionAccess(SpecialGlobalAction.ChangeUserPassword) &&
		!!modelValue.value.totpUrl,
);

const isActiveLogout = computed(
	() =>
		!!modelValue.value.id &&
		(hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value),
);

const loadRolesOptions = (params: Record<string, unknown>) => {
	if (!hasRolesReadAccess.value) {
		return {
			items: [],
		};
	}

	return RolesAPI.getLookup(params);
};

const loadLicenseOptions = async (params: Record<string, unknown>) => {
	const response = await LicenseAPI.getList({
		...params,
		fields: [
			'product',
			'id',
		],
	});
	return {
		...response,
		items: response.items.map(({ name, product, id }: ApiLicenseV1) => ({
			name: name || product,
			id,
		})),
	};
};

const loadDevicesOptions = async (params: Record<string, unknown>) => {
	if (!hasDevicesReadAccess.value) {
		return {
			items: [],
		};
	}

	const response = await DevicesAPI.getLookup({
		...params,
		fields: [
			'id',
			'name',
			'hotdesk',
		],
	});
	return {
		...response,
		items: response.items.filter(
			(item: { hotdesk?: boolean }) => !item.hotdesk,
		),
	};
};

const toggleGenerateDevice = (value: boolean) => {
	if (value && hasAssignedDevices(modelValue.value)) {
		isReplaceConfirmShown.value = true;
		return;
	}

	modelValue.value.generateDevice = value;
};

const confirmReplaceDevices = () => {
	replaceUserDevicesWithGenerated(modelValue.value);
	isReplaceConfirmShown.value = false;
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

.opened-user-general__hint-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
  padding: var(--spacing-2xs) var(--spacing-xs);
}

.opened-user-general__hint-link-link {
  --wt-item-link-text-color: var(--info-color);
}
</style>
