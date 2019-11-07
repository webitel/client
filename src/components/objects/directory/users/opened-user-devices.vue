<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.devices.devices')}}</h3>
        </header>
        <form class="object-input-grid">
            <div class="tags-input-wrap">
                <div class="tags-input__label">
                    {{$t('objects.devices.devices')}}
                    <div class="hint">
                        <i
                                class="hint__img tooltip-activator icon-icon_question"
                        ></i>
                        <div class="tooltip-left">lorem ipsum</div>
                    </div>
                </div>

                <tags-input
                        v-model="deviceTag"
                        :tags="deviceTags"
                        :autocomplete-items="deviceList"
                        :autocomplete-min-length="0"
                        :placeholder="$t('objects.devices.devices')"
                        @tags-changed="newTags => this.deviceTags = newTags"
                        add-only-from-autocomplete
                        autocomplete-filter-duplicates
                >

                </tags-input>

                <div class="hint-link__wrap">
                    <router-link class="hint-link__link" to="/directory/devices/new">{{$t('objects.usersObject.deviceNotFound')}}</router-link>
                    <div class="hint">
                        <i
                                class="hint__img tooltip-activator icon-icon_question"
                        ></i>
                        <div class="tooltip-left">lorem ipsum</div>
                    </div>
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

<style scoped>

</style>