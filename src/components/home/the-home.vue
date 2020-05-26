<template>
    <div class="content-wrap">
        <object-header hide-primary-action>
            {{$t('home.dashboard')}}
        </object-header>

        <section class="charts-wrap">
            <article class="chart">
                <h3 class="chart-title">User Status Chart</h3>
                <doughnut-chart
                        :width="null"
                        :height="null"
                        :chartdata="userStatusData"
                        :options="userStatusOptions"
                ></doughnut-chart>
            </article>
            <article class="chart">
                <h3 class="chart-title">Storage Space Chart</h3>
                <bar-chart
                        :width="null"
                        :height="null"
                        :chartdata="storageSpaceData"
                        :options="storageSpaceOptions"
                ></bar-chart>
            </article>
            <article class="chart">
                <h3 class="chart-title">Gateway Status Chart</h3>
                <doughnut-chart
                        :width="null"
                        :height="null"
                        :chartdata="gatewayStatusData"
                        :options="gatewayStatusOptions"
                ></doughnut-chart>
            </article>
        </section>

        <section class="dashboard-info">
            <article class="dashboard-info__article">
                <p>
                    <!-- {{$t('home.welcomeText')}}-->
                    <b>Cloud vs On-Site: </b>Security policy does not allow to store data and use cloud services?
                    With Webitel, you can build a contact center on your site!
                    <br><br><b>Multichannel vs Omni-Channel: </b>Be always and everywhere in touch with your
                    customers! IVR-menu of any complexity, outbound, inbound interaction campaigns or message on
                    social networks - now it's easier than ever!
                    <br><br><b>Fault-tolerant infrastructure: </b>No more unplanned downtime. Fast scaling and
                    fault-tolerant architecture allows you to simultaneously serve more than 1000 customer calls per
                    minute from different communication channels.
                    <br><br><b>Design: </b>The new minimalistic interface with the most user-friendly admin panel
                    that allows you to have quick access to all the necessary functions. Less clicks - more
                    features.
                    <br><br><b>New agent group work module: </b>The most efficient call distribution. An agent can
                    have several skills at once for participating in different campaigns. The client is served only
                    by professionals.
                    <br><br><b>Setting Permissions: </b>New permissions management module - new opportunities for
                    control. Users can make changes only to sections, as well as to actions.
                </p>
            </article>
            <aside class="dashboard-news">
                <h3 class="dashboard-news__title">{{$t('home.news')}}</h3>
                <ul class="dashboard-news__list">
                    <li
                            class="dashboard-news__list-item"
                            v-for="(item, key) of newsFeed"
                            :key="key"
                    >
                        <header class="dashboard-news__item-header">
                            <a
                                    class="dashboard-news__item-title-link"
                                    :href="item.link"
                                    target="_blank"
                            >{{item.title}}</a>
                            <span class="dashboard-news__item-date">{{item.date}}</span>
                        </header>
                        <p class="dashboard-news__item-text">{{item.text}}</p>
                    </li>
                </ul>
            </aside>
        </section>
    </div>
</template>

<script>
    import ObjectHeader from '../object-utils/the-object-header';
    import DoughnutChart from './charts/doughnut-chart';
    import BarChart from './charts/bar-chart';
    import { getNews } from '../../api/dashboard/dashboard';

    const userStatusData = {
        labels: ['Ready', 'Idle', 'DnD', 'Offline', 'Dialing'],
        datasets: [
            {
                backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
                data: [10, 20, 4, 12, 8],
            },
        ],
    };
    const userStatusOptions = {
        legend: {
            labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
            position: 'right',
        },
    };
    const storageSpaceData = {
        labels: ['06.02', '07.02', '08.02', '09.02', '10.02', '11.02', '12.02', '13.02'],
        datasets: [
            {
                label: 'S3',
                backgroundColor: '#FF6384',
                data: [1, 2, 1 * 3, 1 * 4, 1 * 5, 1 * 6, 1 * 7, 1 * 8],
            },
            {
                label: 'Digital Ocean',
                backgroundColor: '#36A2EB',
                data: [1, 2, 1, 2, 1, 2 * 3, 1, 2 * 4, 1, 2 * 5, 1, 2 * 6, 1, 2 * 7, 1, 2 * 8],
            },
            {
                label: 'Dropbox',
                backgroundColor: '#4BC0C0',
                data: [1, 4, 1, 4, 1, 4 * 3, 1, 4 * 4, 1, 4 * 5, 1, 4 * 6, 1, 4 * 7, 1, 4 * 8],
            },
            {
                label: 'Google Drive',
                backgroundColor: '#FFCD56',
                data: [2, 4, 6, 8, 10, 12, 14, 16],
            },
        ],
    };
    const storageSpaceOptions = {
        responsive: true,
        aspectRatio: 2,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Gb',
                },
                stacked: true,
            }],
        },
    };
    const gatewayStatusData = {
        labels: ['Not registered', 'Registered', 'In progress', 'Offline', 'Online'],
        datasets: [
            {
                backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
                data: [10, 20, 4, 12, 8].reverse(),
            },
        ],
    };
    const gatewayStatusOptions = {
        legend: {
            labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
            position: 'right',
        },
    };

    export default {
        name: 'the-home',
        components: {
            ObjectHeader,
            DoughnutChart,
            BarChart,
        },

        data: () => ({
            userStatusData,
            userStatusOptions,

            storageSpaceData,
            storageSpaceOptions,

            gatewayStatusData,
            gatewayStatusOptions,

            newsFeed: [],
        }),

        mounted() {
            this.loadNews();
        },

        methods: {
            async loadNews() {
                const lang = localStorage.getItem('lang') || 'en';
                const news = await getNews(lang);
                this.newsFeed = news.map((item) => ({
                    ...item,
                    title: item.title || 'Webitel Telegram',
                }));
            },
        },
    };
</script>

<style lang="scss" scoped>
    $scrollbar-bg-color: #EAEAEA;

    .charts-wrap {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        grid-gap: 28px;

        .chart {
            padding: 33px 41px;
            background: #fff;
            border-radius: $border-radius;

            .chart-title {
                @extend .typo-heading-md;
                margin: 0 0 26px;
            }
        }
    }

    .dashboard-info {
        display: grid;
        grid-template-columns: calc((100% * 2 - 28px) / 3) 1fr; // calc(2fr - 28px grid gap)
        grid-gap: 28px;
        margin-top: 28px;

        .dashboard-info__article {
            padding: 32px 41px;
            background: #fff;
            border-radius: $border-radius;
        }

        .dashboard-news {
            position: relative;
            min-height: 400px;
            padding: 32px 41px;
            background: #fff;
            border-radius: $border-radius;

            .dashboard-news__title {
                @extend .typo-heading-md;
                margin: 0 0 28px;
            }

            .dashboard-news__list {
                @extend .typo-body-md;
                position: absolute;
                top: calc(32px + 22px + 28px); // top padding + h3 line height + h3 margin-bottom
                left: 41px;
                right: 41px;
                bottom: 32px;
                padding-right: 41px;
                overflow-y: auto;

                // scrollbar itself
                &::-webkit-scrollbar {
                    width: 4px;
                    background-color: $scrollbar-bg-color;
                    cursor: pointer;
                }

                // scrollable element
                &::-webkit-scrollbar-thumb {
                    width: 4px;
                    background-color: $accent-color;
                    border-radius: $border-radius;
                }

                &-item {
                    margin-bottom: 44px;

                   .dashboard-news__item-title-link {
                       @extend .typo-heading-sm;
                       margin-right: 10px;
                       text-decoration: none;
                       color: #000;

                       &:hover {
                           text-decoration: underline;
                           cursor: pointer;
                       }
                   }

                    .dashboard-news__item-date {
                        color: $icon-color;
                    }

                    .dashboard-news__item-text {
                        margin: 18px 0 0;
                    }
                }
            }
        }
    }
</style>
