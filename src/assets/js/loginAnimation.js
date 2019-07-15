export default (function () {
    'use strict';
    const animateBackground = function (canvas) {
        const canvasContext = canvas.getContext('2d');

        // normalizes canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const img = {
            callCenter: new Image(),
            email: new Image(),
            internet: new Image(),
            phoneCall: new Image(),
            rating: new Image(),
            shield: new Image(),
            videoCall: new Image(),
            wallClock: new Image(),
        };
        img.callCenter.src = require('../img/call-center.svg');
        img.email.src = require('../img/email.svg');
        img.internet.src = require('../img/internet.svg');
        img.phoneCall.src = require('../img/phone-call.svg');
        img.rating.src = require('../img/rating.svg');
        img.shield.src = require('../img/shield.svg');
        img.videoCall.src = require('../img/video-call.svg');
        img.wallClock.src = require('../img/wall-clock.svg');

        // elements list to draw
        const elements = [];

        // loop generates elements
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                if (!(canvas.width/2.8 < x && x < canvas.width/1.55) || !(canvas.height/3.6 < y && y < canvas.height/1.4)) {
                    if (Math.round(Math.random() * 16000) === 1) {
                        const s = ((Math.random() * 5) + 1) / 10;
                        if (Math.round(Math.random()) === 1) {
                            elements.push(canvasPresetO(x, y, s, 0, 0));
                        } else {
                            elements.push(canvasPresetX(x, y, s, 0, 0,
                                ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
                        }
                    }
                }
            }
        }


        elements.push(canvasPresetImg(img.callCenter, canvas.width / 5.5, canvas.height / 2, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.email, canvas.width / 1.55, canvas.height / 2.9, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.internet, canvas.width / 2.9, canvas.height / 5, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.rating, canvas.width / 1.4, canvas.height / 1.6, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.shield, canvas.width / 2.9, canvas.height / 1.3, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.videoCall, canvas.width / 3.8, canvas.height / 1.3, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.wallClock, canvas.width / 1.4, canvas.height / 4, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));

        elements.push(canvasPresetImg(img.phoneCall, canvas.width / 4.9, canvas.height / 4, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.phoneCall, canvas.width / 1.6, canvas.height / 8, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        elements.push(canvasPresetImg(img.phoneCall, canvas.width / 1.6, canvas.height / 1.3, ((Math.random() * 5) + 1) / 10, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));


        // moving animation, which depends on time
        setInterval(() => {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);

            const time = new Date().getTime();
            Object.keys(elements).forEach((elem) => {
                elements[elem].draw(canvasContext, time);
            });
        }, 5);
    };

    const canvasPresetX = function (x, y, s, dx, dy, dr, r = 0) { // animation drawing and trajectory
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

                const line = (x, y, tx, ty, c, o = 0) => {
                    context.beginPath();
                    context.moveTo(-o + ((this.s / 2) * x), o + ((this.s / 2) * y));
                    context.lineTo(-o + ((this.s / 2) * tx), o + ((this.s / 2) * ty));
                    context.lineWidth = this.w;
                    context.strokeStyle = c;
                    context.stroke();
                };

                context.save();

                context.translate(this.x + Math.sin((x + (time / 10)) / 100) * 5,
                    this.y + Math.sin((10 + x + (time / 10)) / 100) * 2);
                context.rotate(this.r * Math.PI / 180);

                line(-1, -1, 1, 1, '#fff');
                line(1, -1, -1, 1, '#fff');

                context.restore();
            },
        };
    };
    const canvasPresetO = function (x, y, s, dx, dy) { // animation drawing and trajectory
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

                context.beginPath();
                context.arc(this.x + Math.sin((50 + x + (time / 10)) / 100) * 3, // x
                    this.y + Math.sin((45 + x + (time / 10)) / 100) * 4, // y
                    this.r, // radius
                    0, // startAngle
                    2 * Math.PI, // endAngle
                    false); // not clockwise
                context.lineWidth = this.w;
                context.strokeStyle = '#fff';
                context.stroke();
            },
        };
    };
    const canvasPresetImg = function (img, x, y, s, dx, dy) { // animation trajectory
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

                context.beginPath();
                context.drawImage(img, this.x + Math.sin((100 + x + (time / 10)) / 100) * 4,
                    this.y + Math.sin((75 + x + (time / 10)) / 100) * 3, 29, 29);
                context.lineWidth = this.w;
                context.strokeStyle = '#fff';
                context.stroke();
            },
        };
    };

    return animateBackground;
}());
