<template>
  <div class="user-status-chips">
    <wt-chip
      :color="isWeb ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >Web
    </wt-chip>
    <wt-chip
      :color="isSip ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >SIP
    </wt-chip>
    <wt-chip
      :color="isDlg ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >Dlg
    </wt-chip>
    <wt-chip
      :color="isDnd ? 'main' : 'secondary'"
      class="user-status-chips__chips"
    >DnD
    </wt-chip>
  </div>
</template>

<script setup lang="ts">
import { UserPresenceStatus } from '@webitel/api-services/enums';
import type { ApiUserPresence } from '@webitel/api-services/gen/models';
import { computed } from 'vue';

const props = defineProps<{
	presence?: ApiUserPresence;
}>();

const status = computed(() => props.presence?.status ?? '');

const isSip = computed(() => status.value.includes(UserPresenceStatus.SIP));
const isWeb = computed(() => status.value.includes(UserPresenceStatus.WEB));
const isDnd = computed(() => status.value.includes(UserPresenceStatus.DND));
const isDlg = computed(() => status.value.includes(UserPresenceStatus.DLG));
</script>

<style scoped>
.user-status-chips {
  display: grid;
  grid-template-columns: repeat(4, 70px);
  grid-gap: var(--spacing-sm);
}

.user-status-chips__chips {
  justify-content: center;
}
</style>
