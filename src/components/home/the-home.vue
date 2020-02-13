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

        <section class="object-content">
            <section class="dashboard__info-section">
                <div class="dashboard__info-wrap">
                    <header class="content-header">
                        <div class="logo-wrap">
                            <img src="../../assets/img/logo-dark.svg" alt="logo" class="logo">
                        </div>
                    </header>
                    <p class="dashboard__info-text">
                        <!--                        {{$t('home.welcomeText')}}-->
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
    import ObjectHeader from '../object-utils/the-object-header';
    import DoughnutChart from './charts/doughnut-chart';
    import BarChart from './charts/bar-chart';

    const parser = new RSSParser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    const userStatusData = {
        labels: ['Ready', 'Idle', 'DnD', 'Offline', 'Dialing',],
        datasets: [
            {
                backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB',],
                data: [10, 20, 4, 12, 8,]
            },
        ]
    };
    const userStatusOptions = {
        legend: {
            labels: {fontFamily: "'Montserrat Medium', 'monospace'"},
            position: 'right'
        }
    };
    const storageSpaceData = {
        labels: ['06.02', '07.02', '08.02', '09.02', '10.02', '11.02', '12.02', '13.02',],
        datasets: [
            {
                label: 'S3',
                backgroundColor: '#FF6384',
                data: [1, 2, 1 * 3, 1 * 4, 1 * 5, 1 * 6, 1 * 7, 1 * 8]
            },
            {
                label: 'Digital Ocean',
                backgroundColor: '#36A2EB',
                data: [1, 2, 1, 2, 1, 2 * 3, 1, 2 * 4, 1, 2 * 5, 1, 2 * 6, 1, 2 * 7, 1, 2 * 8]
            },
            {
                label: 'Dropbox',
                backgroundColor: '#4BC0C0',
                data: [1, 4, 1, 4, 1, 4 * 3, 1, 4 * 4, 1, 4 * 5, 1, 4 * 6, 1, 4 * 7, 1, 4 * 8]
            },
            {
                label: 'Google Drive',
                backgroundColor: '#FFCD56',
                data: [2, 4, 6, 8, 10, 12, 14, 16,]
            },
        ]
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
                    labelString: 'Gb'
                },
                stacked: true,
            }]
        },
    };
    const gatewayStatusData = {
        labels: ['Not registered', 'Registered', 'In progress', 'Offline', 'Online',],
        datasets: [
            {
                backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB',],
                data: [10, 20, 4, 12, 8,].reverse()
            },
        ]
    };
    const gatewayStatusOptions = {
        legend: {
            labels: {fontFamily: "'Montserrat Medium', 'monospace'"},
            position: 'right'
        }
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

            rssTitle: 'NEWS',
            rssFeed: [],
        }),

        mounted() {
            this.loadRSS();
        },

        methods: {
            loadRSS() {
                parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss', (err, feed) => {
                    if (err) throw err;
                    // this.rssTitle = feed.title;
                    this.rssFeed = [...feed.items];
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .charts-wrap {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        grid-column-gap: 28px;
        grid-row-gap: 28px;

        .chart {
            padding: 33px 41px;
            background: #fff;

            .chart-title {
                @extend .typo-heading-md;
                margin: 0 0 26px;
            }
        }
    }

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
