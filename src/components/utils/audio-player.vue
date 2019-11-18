<template>
    <aside class="player">
        <div class="player-controls">
            <div>
                <a @click.prevent="stop" title="Stop" href="#">
                    <i class="icon-icon_close"></i>
                </a>
            </div>
            <div>
                <a @click.prevent="playing = !playing" title="Play/Pause" href="#">
                    <i class="icon-icon_notification" v-if="!playing"></i>
                    <i class="icon-icon_approve" v-else></i>
                </a>
            </div>
            <div @click="seek" class="player-progress" title="Time played : Total time">
                <div
                        class="player-seeker"
                        :style="{width: this.percentComplete+'%'}"
                ></div>
                <div class="player-time">
                    <div class="player-time-current">{{''}}</div>
                    <div class="player-time-total">{{''}}</div>
                </div>
            </div>
            <div>
                <a @click.prevent="stop" title="Stop" href="#">
                    <i class="icon-icon_filter"></i>
                </a>
            </div>
        </div>
        <audio
                class="audio"
                ref="audiofile"
                :src="file"
                :loop="loop"
                preload="auto"
        ></audio>
    </aside>
</template>

<script>
    export default {
        name: "audio-player",
        props: {
            file: {
                type: String,
                default: null,
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            loop: {
                type: Boolean,
            },
        },
        data: () => ({
            audio: null,
            currentSeconds: 0,
            durationSeconds: 0,
            loaded: false,
            playing: false,
            previousVolume: 35,
            volume: 50,
        }),

        computed: {
            percentComplete() {
                return parseInt(this.currentSeconds / this.durationSeconds * 100);
            },
            muted() {
                return this.value / 100 === 0;
            },
        },

        filters: {
            convertTimeHHMMSS(val) {
                const time = new Date(val * 1000).toISOString().substr(11, 8);
                return time.includes('00:0') ? time.substr(3) : time;
            }
        },

        watch: {
            playing(val) {
                return val ? this.audio.play() : this.audio.pause();
            },

            volume(value) {
                this.showVolume = false;
                this.audio.volume = this.volume / 100;
            },
        },

        mounted() {
            this.audio = this.$el.querySelectorAll('audio')[0];
            this.audio.addEventListener('timeupdate', this.update);
            this.audio.addEventListener('loadeddata', this.load);
            this.audio.addEventListener('pause', () => this.playing = false);
            this.audio.addEventListener('play', () => this.playing = true);
        },

        beforeDestroy() {
            this.audio.removeEventListener('timeupdate', this.update);
            this.audio.removeEventListener('loadeddata', this.load);
            this.audio.removeEventListener('pause', () => this.playing = false);
            this.audio.removeEventListener('play', () => this.playing = true);
        },

        methods: {
            load() {
                if (this.audio.readyState >= 2) {
                    this.loaded = true;
                    this.durationSeconds = parseInt(this.audio.duration);
                    return this.playing = this.autoPlay;
                }
                throw new Error('Failed to load sound file.');
            },

            seek(event) {
                if (!this.playing || event.target.tagName === 'SPAN') return;

                const el = event.target.getBoundingClientRect();
                const seekPos = (event.clientX - el.left) / el.width;
                this.audio.currentTime = parseInt(this.audio.duration * seekPos);
            },

            stop() {
                this.playing = false;
                this.audio.currentTime = 0;
            },

            update(event) {
                this.currentSeconds = parseInt(this.audio.currentTime);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .audio {
        display: none;
    }

    $player-bg: #fff;
    $player-border-color: darken($player-bg, 12%);
    $player-link-color: darken($player-bg, 75%);
    $player-progress-color: $player-border-color;
    $player-seeker-color: $player-link-color;
    $player-text-color: $player-link-color;

    .player {
        position: sticky;
        bottom: 66px;
        width: 100%;
        right: 58px;
        background-color: $player-bg;
        border: 1px solid $player-border-color;
        box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
        color: $player-text-color;
        z-index: 10000;
    }

    .player-controls {
        display: flex;

        > div {
            border-right: 1px solid $player-border-color;

            &:last-child {
                border-right: none;
            }

            a {
                color: $player-link-color;
                display: block;
                line-height: 0;
                padding: 1em;
                text-decoration: none;
            }
        }
    }

    .player-progress {
        background-color: $player-progress-color;
        cursor: pointer;
        height: 3px;
        flex-grow: 1;
        /*min-width: 100%;*/
        /*width: 100%;*/
        position: relative;
        margin: auto 20px;

        .player-seeker {
            background-color: $player-seeker-color;
            bottom: 0;
            left: 0;
            position: absolute;
            top: 0;
        }
    }

    .player-time {
        display: flex;
        justify-content: space-between;

        .player-time-current {
            font-weight: 700;
            padding-left: 5px;
        }

        .player-time-total {
            opacity: 0.5;
            padding-right: 5px;
        }
    }
</style>