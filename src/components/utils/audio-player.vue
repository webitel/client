<template>
    <aside class="player">
        <div class="player-controls">
            <div @click.prevent="stop" :title="$t('iconHints.stop')">
                <i class="icon-icon_stop"></i>
            </div>
            <div @click.prevent="playing = !playing">
                <i
                        class="icon-icon_play"
                        v-if="!playing"
                        :title="$t('iconHints.play')"
                ></i>
                <i
                        class="icon-icon_pause"
                        v-else
                        :title="$t('iconHints.pause')"
                ></i>
            </div>
            <div class="player-time">
                <div class="player-time-current">{{convertTimeHHMMSS}}</div>
            </div>
            <div
                    class="player-progress"
                    @mouseleave="seekbarLeave"
                    @mouseover="seekbarOver"
                    @mousemove="seekbarHover"
                    @click="seek"
            >

                <div
                        class="player-seeker"
                        :style="{width: this.percentComplete+'%'}"
                ></div>
                <div
                        class="player-hover"
                        :style="{width: this.percentHover+'%'}"
                >
                    <div
                            class="player-timer"
                            v-show="showHoverTimer"
                    >{{convertHoverTimeHHMMSS}}</div>
                </div>
            </div>
            <div class="range-wrap" :class="{'hidden': !showVolume}">
                <range
                        v-model="volume"
                        :min-range="0"
                ></range>
            </div>
            <div @click.prevent="showVolume = !showVolume">
                <i
                        v-if="muted"
                        class="volume-icon icon-icon_mute"
                        :title="$t('iconHints.volume')"
                ></i>
                <i
                        v-else
                        class="volume-icon icon-icon_volume"
                        :title="$t('iconHints.volume')"
                ></i>
            </div>
            <i
                    class="icon-icon_close"
                    :title="$t('iconHints.close')"
                    @click="close"
            ></i>

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
    import range from './range';

    export default {
        name: "audio-player",
        components: {
            range,
        },
        props: {
            file: {
                type: String,
                default: null,
            },
            autoPlay: {
                type: Boolean,
                default: true
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
            volume: 50,
            showVolume: false,
            isFirstLoad: true,
            hoverSeconds: 0,
            showHoverTimer: false,
        }),

        computed: {
            percentComplete() {
                return parseInt(this.currentSeconds / this.durationSeconds * 100);
            },
            percentHover() {
                return parseInt(this.hoverSeconds / this.durationSeconds * 100);
            },
            muted() {
                return this.volume === 0;
            },
            convertTimeHHMMSS() {
                const time = new Date(this.currentSeconds * 1000).toISOString().substr(11, 8);
                return time.includes('00:0') ? time.substr(3) : time;
            },
            convertHoverTimeHHMMSS() {
                const time = new Date(this.hoverSeconds * 1000).toISOString().substr(11, 8);
                return time.includes('00:0') ? time.substr(3) : time;
            },
        },

        watch: {
            file(value) {
                this.playing = true;
            },

            playing(value) {
                return value ? this.audio.play() : this.audio.pause();
            },

            volume(value) {
                // this.showVolume = false;
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
                    this.playing = (this.autoPlay && !this.isFirstLoad);
                    if(this.playing) this.audio.play();
                    this.isFirstLoad = false;
                } else {
                    throw new Error('Failed to load sound file.');
                }
            },

            seek(event) {
                // if (!this.playing || event.target.tagName === 'SPAN') return;

                this.playing = true;
                const el = event.target.getBoundingClientRect();
                const seekPos = (event.clientX - el.left) / el.width;
                this.audio.currentTime = parseInt(this.audio.duration * seekPos);
            },

            seekbarLeave(event) {
                this.showHoverTimer = false;
                this.hoverSeconds = 0;
             },

            seekbarOver(event) {
                this.showHoverTimer = true;
            },

            seekbarHover(event) {
                const el = event.target.getBoundingClientRect();
                const seekPos = (event.clientX - el.left) / el.width;
                this.hoverSeconds = parseInt(this.audio.duration * seekPos);
            },

            stop() {
                this.playing = false;
                this.audio.currentTime = 0;
            },

            update(event) {
                this.currentSeconds = parseInt(this.audio.currentTime);
            },

            close() {
                this.stop();
                this.$emit('close');
            },
        }
    }
</script>

<style lang="scss" scoped>

    $player-bg: rgba(0, 0, 0, 0.6);
    $player-border-color: darken($player-bg, 12%);
    $player-link-color: darken($player-bg, 75%);
    $player-progress-color: $player-border-color;
    $player-seeker-color: $accent-color;
    $player-seeker-hover-color: #92939A;
    //$player-text-color: $player-link-color;

    .player {
        position: sticky;
        bottom: 66px;
        /*width: 100%;*/
        padding: 7px 16px;
        margin: 0 20px;
        background-color: $player-bg;
        box-shadow: $box-shadow;
        border-radius: $border-radius;
        z-index: 10000;
    }

    .player-controls {
        display: flex;
        align-items: center;

        > div {
            display: flex;
            align-items: center;

            &:first-child {
                margin-right: 18px;
            }
        }

        i {
            transition: $transition;
            cursor: pointer;

            &:before {
                color: #fff;
            }

            &:hover {
                &:before {
                    color: $accent-color;
                }
            }
        }
    }

    .player-progress {
        position: relative;
        height: 5px;
        /*height: 3px;*/
        flex-grow: 1;
        margin: auto 21px auto 78px;
        background-color: $player-progress-color;
        cursor: pointer;

        &:after { // make clickable area bigger
            content: '';
            position: absolute;
            top: -5px;
            bottom: -5px;
            left: 0;
            right: 0;
        }

        .player-seeker {
            position: absolute;
            bottom: 0;
            left: 0;
            top: 0;
            background-color: $player-seeker-color;
            border-radius: $border-radius;
            pointer-events: none;
            z-index: 2;
        }

        .player-hover {
            position: absolute;
            bottom: 0;
            left: 0;
            top: 0;
            background-color: $player-seeker-hover-color;
            border-radius: $border-radius;
            pointer-events: none;
            z-index: 1;
        }

        .player-timer {
            @extend .typo-body-md;
            position: absolute;
            right: 0;
            bottom: 33px;
            padding: 13px 17px 9px;
            color: #fff;
            transform: translateX(50%);
            background: $player-bg;
            border-radius: $border-radius;
        }
    }

    .player-time {
        display: flex;
        justify-content: space-between;
        width: 40px;
        margin-left: 33px;
        color: #fff;

        .player-time-current {
            @extend .typo-nav-item;
        }
    }


    .range-wrap {
        position: absolute;
        bottom: 56px;
        right: 0;
        padding: 8px 16px 11px;
        background: $player-bg;
        border-radius: $border-radius;
    }

    .volume-icon {
        margin-right: 33px;
        cursor: pointer;
    }

    .audio {
        display: none;
    }
</style>