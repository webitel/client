<template>
    <aside class="the-nav__wrap">
        <nav class="the-nav">
            <div class="logo logo__closed">
                W
            </div>
            <ul class="nav__icons">
                <li class="nav-icon icon__closed"
                    :class="{'nav__current': current.home && !hovered}"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/home.svg" alt="home">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/home.svg"
                                alt="home">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/domain.svg" alt="domain">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/domain.svg"
                                alt="domain">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/store.svg" alt="store">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/store.svg"
                                alt="store">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/callflow.svg" alt="callflow">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/callflow.svg"
                                alt="callflow">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/queue.svg" alt="queue">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/queue.svg"
                                alt="queue">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/flag.svg" alt="flag">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/flag.svg"
                                alt="flag">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/calendar.svg" alt="calendar">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/calendar.svg"
                                alt="calendar">
                    </div>
                </li>
                <li class="nav-icon icon__closed"
                    @mouseover="hovered = true"
                    @mouseleave="hovered = false"
                >
                    <div class="nav-icon__img">
                        <img src="../assets/img/nav/gray/media.svg" alt="media">
                        <img
                                class="nav-icon__img__hovered"
                                src="../assets/img/nav/accent/media.svg"
                                alt="media">
                    </div>
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
    @import '../assets/css/main';

    .the-nav__wrap {
        position: relative;
        min-width: 74px;
        width: 74px;
        height: 100%;
        min-height: 100vh;
        background: #171A2A;
        z-index: 1;
    }

    .logo {
        text-align: center;
        margin: 21px auto 42px;
    }

    .the-nav {
        position: fixed;
    }

    .nav-icon {
        position: relative;
        width: 73px;
        height: 52px;
        margin-left: 1px;
        border-left: 3px solid transparent;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            border-color: $accent-color;

        }
        img {
            position: absolute;
            top: 50%;
            left: calc(50% - 3px);
            transform: translate(-50%, -50%);
            transition: 0.3s;
        }

        &:hover img {
            opacity: 0;
        }

        .nav-icon__img__hovered {
            opacity: 0;

        }

        &:hover .nav-icon__img__hovered {
            opacity: 1;
        }

    }

    .nav__current {
        border-color: $accent-color;

        img {
            opacity: 0;
        }

        .nav-icon__img__hovered {
            opacity: 1;
        }
    }

</style>
