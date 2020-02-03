<template>
    <div class="content-wrap">
        <object-header hide-primary-action>
            {{$t('home.dashboard')}}
        </object-header>

        <section class="object-content">
            <section class="dashboard__info-section">
                <div class="dashboard__info-wrap">
                    <header class="content-header">
                        <div class="logo-wrap">
                            <img src="../../assets/img/logo-dark.svg" alt="logo" class="logo">
                        </div>
                    </header>
                    <p class="dashboard__info-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nesciunt porro ullam. Fugit
                        labore nemo obcaecati quos ratione? Aliquam aspernatur et facere laborum magni molestiae
                        nesciunt perferendis reprehenderit temporibus unde!
                    </p>
                </div>
                <aside class="dashboard__rss-wrap">
                    <h2 class="dashboard__rss-title">{{rssTitle}}</h2>
                    <div
                            class="dashboard__rss-item"
                            v-for="(item, key) of rssFeed"
                            :key="key"
                    >
                        {{item.title}}:
                        <a
                                class="dashboard__rss-link"
                                :href="item.link"
                                target="_blank"
                        >
                            {{$t('home.rssLink')}}
                        </a>
                    </div>
                </aside>
            </section>
        </section>
    </div>
</template>

<script>
    import RSSParser from 'rss-parser';
    import objectHeader from '../object-utils/the-object-header';

    const parser = new RSSParser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    export default {
        name: 'the-home',
        components: {
            objectHeader,
        },

        data: () => ({
            rssTitle: '',
            rssFeed: [],
        }),

        mounted() {
            this.loadRSS();
        },

        methods: {
            loadRSS() {
                parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss', (err, feed) => {
                    if (err) throw err;
                    this.rssTitle = feed.title;
                    this.rssFeed = [...feed.items];
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .dashboard__info-section {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-column-gap: 28px;

        .dashboard__info-wrap {

            .logo-wrap {
                display: inline-block;
                margin: auto;
            }

            .dashboard__info-text {
                margin-top: 28px;
            }
        }

        .dashboard__rss-wrap {
            .dashboard__rss-title {
                @extend .typo-heading-md;
                margin-bottom: 28px;
            }

            .dashboard__rss-item {
                @extend .typo-body-sm;
                margin-bottom: 14px;
            }

            .dashboard__rss-link {
                @extend .typo-body-sm;

                color: #000;
            }
        }
    }
</style>
