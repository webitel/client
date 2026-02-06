import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "vuex";
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';

import { useUserinfoStore } from "../../../../../../userinfo/stores/userinfoStore";
import { useUserAccessControl } from "../../../../../../../app/composables/useUserAccessControl";

export const useHasUserTokensAccess = () => {
    const store = useStore();

    const userinfoStore = useUserinfoStore();
    const { userId } = storeToRefs(userinfoStore);


    const itemInstance = computed(
        () => getNamespacedState(store.state, 'directory/users').itemInstance,
    );

    const { 
        hasReadAccess: hasGlobalReadAccess,
        disableUserInput: disableUserInputGlobalAccess,
        hasDeleteAccess: hasGlobalDeleteAccess,
        hasCreateAccess: hasGlobalCreateAccess,
        hasUpdateAccess: hasGlobalUpdateAccess,
      } = useUserAccessControl({
        useGlobalAccessAsChecksSource: true,
      });

    const isMe = computed(() => {
        return userId.value === itemInstance.value.id;
    });

    const hasReadAccess = computed(() => {
        return isMe.value || hasGlobalReadAccess.value;
    });

    const hasCreateAccess = computed(() => {
        return isMe.value || hasGlobalCreateAccess.value;
    });
    const hasUpdateAccess = computed(() => {
        return isMe.value || hasGlobalUpdateAccess.value;
    });

    const hasDeleteAccess = computed(() => {
        return isMe.value || hasGlobalDeleteAccess.value;
    });

    const disableUserInput = computed(() => {
        return isMe.value || disableUserInputGlobalAccess.value;
    });

    return {
        hasReadAccess,
        hasDeleteAccess,
        hasCreateAccess,
        hasUpdateAccess,
        disableUserInput,
    };
};