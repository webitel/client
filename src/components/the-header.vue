<template>
<!--    <v-app>-->
<!--        <v-container fluid class="pa-0 d-block">-->
<!--            <v-layout>-->
<!--                <v-flex xs11>-->
                    <header class="the-header">
                        <div class="the-header__user-panel">
                            <div class="the-header__user-item the-header__user-pic">
<!--                                TODO: IT MIGHT BE A v-avatar-->
                                <img class="the-header__img" src="../assets/img/home/user-pic.svg" alt="user picture">
                            </div>
                            <div class="the-header__user-item the-header__user-notifications">
                                <img  class="the-header__img" src="../assets/img/home/user-notification.svg"
                                      alt="notifications">
                            </div>
                            <div class="the-header__user-item the-header__user-add">
                                <img  class="the-header__img" src="../assets/img/home/user-add.svg" alt="add button">
                            </div>
                            <div class="the-header__user-item the-header__domain-select">
                                <v-expansion-panel class="the-header__domain-panel elevation-0">
                                    <v-expansion-panel-content
                                            expand-icon='../assets/img/home/select-domain-arrow.svg'
                                    >
                                        <template v-slot:header>
                                            Select domain
                                        </template>
                                        <div>text</div>
<!--                                            <v-card>-->
<!--                                                <v-card-text></v-card-text>-->
<!--                                            </v-card>-->
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </div>
                        </div>
                    </header>
<!--                </v-flex>-->
<!--            </v-layout>-->
<!--        </v-container>-->
<!--    </v-app>-->
</template>

<script>
    export default {
        name: "the-header"
    }
</script>

<style scoped>
    .the-header {
        height: 63px;
        background: #e8e8e8;
        color: #000;
    }

    .the-header__user-panel {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
    }
    
    .the-header__user-item {
        margin-right: 27px;
        cursor: pointer;
    }

    .the-header__user-pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 39px;
        height: 39px;
        background: #eee;
        border-radius: 50%;
    }

    .the-header__img {
        display: block;
    }

    .the-header__domain-panel {
        color: rgba(0, 0, 0, 0.3);;
    }
</style>