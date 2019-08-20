<template>
    <aside class="the-nav__wrap">
        <nav class="the-nav">
            <div class="logo">
                <img class="logo-sm__img" src="../assets/img/logo-sm.svg" alt="logo">
                <img class="logo__img" src="../assets/img/logo.svg" alt="logo">
            </div>
            <ul class="nav-items">
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
                <li class="nav-item">
                    <i class="nav-icon-arrow icon-icon_arrow-down"></i>
                    <i class="nav-icon icon-icon_approve"></i>
                    <span class="nav-text">Directory</span>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
    export default {
        name: 'the-nav',
        data() {
            return {
                current: {
                    home: false,
                },
                hovered: false,
            };
        },
        mounted() {
            this.current[this.$route.name] = true;
        },
    };
</script>

<style lang="scss" scoped>
    .the-nav__wrap {
        position: relative;
        min-width: 74px;
        width: 74px;
        min-height: 100vh;
        z-index: 1;

    }

    .the-nav {
        position: fixed;
        width: 74px;
        height: 100%;
        color: $nav-icon-color;
        background: #171A2A;
        transition: $transition;

        i {
            color: $nav-icon-color;
        }
    }

    .logo {
        width: 100%;
        height: 20px; // reserving a place for absolute positioned img's
        margin: 21px auto 42px;

        img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            transition: $transition;
            pointer-events: none;
        }

        .logo__img {
            opacity: 0;
        }
    }

    .nav-item {
        position: relative; // text pos absolute
        height: 24px;
        padding: 14px 0;
        box-sizing: content-box;
        cursor: pointer;

        .nav-icon-arrow {
            position: absolute;
            left: 3px;
            /*border: 1px solid blue;*/
            transform: rotate(-90deg);
            transition: $transition;
            opacity: 0;
        }

        .nav-icon {
            text-align: center;
            display: inline-block;
            width: 70px;
            /*border: 1px solid red;*/
            transition: $transition;
        }

        .nav-text {
            position: absolute; // to prevent appearance below icon on transition start
            top: 50%;
            transform: translateY(-50%);
            transition: $transition;
            opacity: 0;
        }

        &:hover {
            .nav-icon-arrow, .nav-icon, .nav-text {
                color: $accent-color;
            }
        }
    }

    .the-nav:hover {
        @extend .box-shadow;

        width: 275px;

        .logo-sm__img {
            opacity: 0;
        }

        .logo__img {
            opacity: 1;
        }

        .nav-icon-arrow, .nav-text {
            opacity: 1;
        }

        .nav-icon {
            transform: translateX(6px);
        }
    }

</style>
