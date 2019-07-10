<template>
    <v-app>
        <v-container fluid>
            <v-layout>
                <v-flex xs12>
                    <canvas ref="login-canvas" class="login-canvas">

                    </canvas>

                    <section class="login">
                        <h2>Enter your details below</h2>
                        <v-form @submit="login()">
                            <v-text-field
                                    label="Root"
                            ></v-text-field>
                            <v-text-field
                                    label="Password"
                                    password
                            ></v-text-field>
                            <v-text-field
                                    label="Server address"
                            ></v-text-field>
                            <v-btn>Submit</v-btn>
                        </v-form>
                    </section>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import {login} from "../api/login";

    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                address: ''
            }
        },
        mounted() {
            this.animateBackground();
        },
        methods: {
            login() {
                // login({this.username, this.password, this.address})
                //     .then(resolve => {
                //             console.log(resolve);
                //         },
                //         reject => {
                //             console.log(reject);
                //         }
                //     );
            },
            animateBackground() {
                let canvas = this.$refs['login-canvas'];
                let canvasContext = canvas.getContext('2d');

                let resize = function () {
                    canvas.width = canvas.clientWidth;
                    canvas.height = canvas.clientHeight;
                };

                window.addEventListener('resize', resize);
                resize();

                let elements = [];
                let presets = {};

                // presets.o = function (x, y, s, dx, dy) {
                //     return {
                //         x,
                //         y,
                //         r: 12 * s,
                //         w: 5 * s,
                //         dx,
                //         dy,
                //         draw (context, time) {
                //             this.x += this.dx;
                //             this.y += this.dy;
                //
                //             context.beginPath();
                //             //draw an arc
                //             context.arc(this.x + Math.sin((50 + x + (time / 10)) / 100) * 3, //x
                //                 this.y + Math.sin((45 + x + (time / 10)) / 100) * 4,  //y
                //                 this.r, //radius
                //                 0, //startAngle
                //                 2 * Math.PI,  //endAngle
                //                 false); //not clockwise
                //             context.lineWidth = this.w;
                //             context.strokeStyle = '#fff';
                //             context.stroke();
                //         }
                //     }
                // };

                let img = new Image();
                img.src = 'https://media.giphy.com/media/IB9foBA4PVkKA/giphy.gif';
                presets.o = function (x, y, s, dx, dy) {
                    return {
                        x,
                        y,
                        r: 12 * s,
                        w: 5 * s,
                        dx,
                        dy,
                        draw(context, time) {
                            this.x += this.dx;
                            this.y += this.dy;

                            // context.beginPath();

                            context.drawImage(img,this.x + Math.sin((100 + x + (time / 10)) / 100) * 4,
                                this.y + Math.sin((75 + x + (time / 10)) / 100) * 3, 50, 50);
                            context.beginPath();

                            context.arc(this.x + Math.sin((50 + x + (time / 10)) / 100) * 3, //x
                                this.y + Math.sin((45 + x + (time / 10)) / 100) * 4,  //y
                                this.r, //radius
                                0, //startAngle
                                2 * Math.PI,  //endAngle
                                false); //not clockwise
                            context.lineWidth = this.w;
                            context.strokeStyle = '#fff';
                            context.stroke();

                            //draw an arc
                            // context.arc(this.x + Math.sin((50 + x + (time / 10)) / 100) * 3, //x
                            //     this.y + Math.sin((45 + x + (time / 10)) / 100) * 4,  //y
                            //     this.r, //radius
                            //     0, //startAngle
                            //     2 * Math.PI,  //endAngle
                            //     false); //not clockwise
                            // context.lineWidth = this.w;
                            // context.strokeStyle = '#fff';
                            // context.stroke();
                        }
                    }
                };

                presets.x = function (x, y, s, dx, dy, dr, r) {
                    r = r || 0;
                    return {
                        x,
                        y,
                        s: 20 * s,
                        w: 5 * s,
                        r,
                        dx,
                        dy,
                        dr,
                        draw(context, time) {
                            this.x += this.dx;
                            this.y += this.dy;
                            this.r += this.dr;

                            let line = (x, y, tx, ty, c, o) => {
                                o = o || 0;
                                context.beginPath();
                                context.moveTo(-o + ((this.s / 2) * x), o + ((this.s / 2) * y));
                                context.lineTo(-o + ((this.s / 2) * tx), o + ((this.s / 2) * ty));
                                context.lineWidth = this.w;
                                context.strokeStyle = c;
                                context.stroke();
                            };

                            context.save();

                            context.translate(this.x + Math.sin((x + (time / 10)) / 100) * 5, this.y + Math.sin((10 + x + (time / 10)) / 100) * 2);
                            context.rotate(this.r * Math.PI / 180);

                            line(-1, -1, 1, 1, '#fff');
                            line(1, -1, -1, 1, '#fff');

                            context.restore();
                        }
                    }
                };

                for (let x = 0; x < canvas.width; x++) {
                    for (let y = 0; y < canvas.height; y++) {
                        if (Math.round(Math.random() * 8000) === 1) {
                            let s = ((Math.random() * 5) + 1) / 10;
                            if (Math.round(Math.random()) === 1)
                                elements.push(presets.o(x, y, s, 0, 0));
                            else
                                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
                        }
                    }
                }

                setInterval(function () {
                    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

                    let time = new Date().getTime();
                    for (let elem in elements)
                        elements[elem].draw(canvasContext, time);
                }, 10);
            }
        }
    }
</script>

<style scoped>
    .login-canvas {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: #04BBD3;
    }

    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 20px;
        background: #fff;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
</style>