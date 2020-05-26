<template>
    <div class="not-found">
        <section class="not-found-content">
            <img class="not-found__img" src="../../assets/img/travolta-404.png" alt="404-img">
            <h2 class="not-found__title typo-404-title">{{$t('page404.title404')}}</h2>
            <p class="not-found__text typo-404-text">{{$t('page404.text404')}}</p>
            <btn class="not-found__btn" @click.native="$router.go(-1)">{{$t('page404.btn404')}}</btn>
        </section>
    </div>
</template>

<script>
    import btn from './btn';

    export default {
        name: 'the-not-found-component',
        components: { btn },
    };
</script>

<style lang="scss" scoped>
    $bg-color: #171A2A;

    .not-found {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100vw;
        min-height: 100vh;
        padding: 90px;
        background: $bg-color;

        .not-found-content {
            text-align: center;
            color: #fff;

            .not-found__img {
                max-width: 65vw;
                width: 778px;
                user-select: none;
            }

            .not-found__title {
                text-transform: uppercase;
                margin-top: 69px;
            }

            .not-found__text {
                margin-top: 21px;
            }

            .not-found__btn {
                height: 60px;
                min-width: 160px;
                margin-top: 40px;
                font-size: 21px;
            }
        }
    }
</style>
