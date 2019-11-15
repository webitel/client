<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.directory.devices.devices')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$t('objects.directory.devices.devices')}}
                </div>

                <tags-input
                        v-model="deviceTag"
                        :tags="itemInstance.deviceTags"
                        :autocomplete-items="deviceList"
                        :autocomplete-min-length="0"
                        :placeholder="$t('objects.directory.devices.devices')"
                        @tags-changed="newTags => this.itemInstance.deviceTags = newTags"
                        add-only-from-autocomplete
                        autocomplete-filter-duplicates
                >
                </tags-input>

                <div class="hint-link__wrap">
                    <span>{{$t('objects.directory.users.deviceNotFound')}}</span>
                    <router-link class="hint-link__link" to="/directory/devices/new">
                        {{$t('objects.directory.users.createNewDevice')}}
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-user-devices",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                deviceTag: '',
                deviceList: [
                    {text: 'Dev1', isAdmin: false},
                    {text: 'Dev2', isAdmin: false},
                    {text: 'Dev3', isAdmin: false},
                    {text: 'Dev5', isAdmin: false}
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hint-link__wrap {
        @extend .typo-body-md;

        margin-top: 8px;
        color: $label-color;
    }
</style>