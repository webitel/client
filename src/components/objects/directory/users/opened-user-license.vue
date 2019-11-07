<template>
    <section>
        <header class="content-header">
            <h3 class="content-title">{{$t('objects.license.license')}}</h3>
        </header>
        <form class="object-input-grid">
            <ul class="checkbox-list">
                <li
                        class="checkbox-list__item"
                        v-for="item in licenseProducts"

                >
                    <checkbox
                            :value="item.allowed"
                            :label="item.text"
                            @toggleCheckbox="item.allowed = $event"
                    ></checkbox>
                </li>
            </ul>
        </form>
    </section>
</template>

<script>
    import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';

    export default {
        name: "opened-user-license",
        mixins: [openedTabComponentMixin],
        data() {
            return {
                licenseProducts: [
                    {text: 'Product 1', allowed: false},
                    {text: 'Product 2', allowed: false},
                    {text: 'Product 3', allowed: false},
                    {text: 'Product 4', allowed: false}
                ],
            }
        }
    }
</script>

<style scoped>

</style>