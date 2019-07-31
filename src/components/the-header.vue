<template>
    <header class="the-header">
        <div class="the-header__user-panel">
            <div class="the-header__user-item the-header__user-pic">
                <i
                        class="the-header__img icon-icon_chat"
                ></i>
            </div>
            <div class="the-header__user-item the-header__user-notifications">
                <i
                        class="the-header__img icon-icon_ball"
                ></i>
            </div>
            <div class="the-header__user-item the-header__user-add">
                <i
                        class="the-header__img icon-icon_plus"
                ></i>
            </div>
            <div class="the-header__user-item the-header__domain-select">
                <div class="the-header__domain-select-title">
                    Select domain <span class="the-header__domain-select-icon icon-icon_arrow_down"></span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'the-header',
    };
</script>

<style lang="scss" scoped>
    @import "../assets/css/main";

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
        color: rgba(0, 0, 0, 0.3);
        transition: $transition;

        &:hover {
            color: #000;
        }
    }

    .the-header__domain-select-title {
        letter-spacing: 0.5px;
        font-family: 'AvantGardeDemi', sans-serif;
        color: rgba(0, 0, 0, 0.3);
        user-select: none;
    }

    .the-header__domain-select-icon {
        vertical-align: middle;
    }

</style>
