export default (function () {
    'use strict';
    const animateBackground = function (canvas, elemWidth, elemHeight) {
        const canvasContext = canvas.getContext('2d');

        // normalizes canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // coords - position in mock
        const calcIconPos = function (coordsX, coordsY) {
            const leftBorder = canvas.width / 2 - elemWidth / 2 - 10;
            const rightBorder = canvas.width / 2 + elemWidth / 2 + 10;
            const topBorder = canvas.height / 2 - elemHeight / 2 - 10;
            const bottomBorder = canvas.height / 2 + elemHeight / 2 + 10;

            let x = coordsX * canvas.width / 1440;
            let y = coordsY * canvas.height / 923;

            if (canvas.width < 1024) {
                if ((leftBorder < x && x < rightBorder) && (topBorder < y && y < bottomBorder)) {
                    // console.log(canvas.width / 2, x);
                    if (canvas.width / 2 > x) {      // if element is in the left half
                        return {
                            x: getRandomFromRange(canvas.width * 0.1, leftBorder - 20),
                            y: y
                        }
                    } else {                            // if element is in the right half
                        // console.log('else', rightBorder, canvas.width * 0.85, x);
                        return {
                            x: getRandomFromRange(rightBorder + 20, canvas.width * 0.9),
                            y: y
                        }
                        // return {
                        //     x: x,
                        //     y: y
                        // }
                    }
                }
            }

            return {
                x, y
            }
        };

        const img = {
            callCenterOk: new Image(),
            callCenterSettings: new Image(),
            peopleCallCenter: new Image(),
            peoplePhone: new Image(),
            phoneInfo: new Image(),
            phonePlus: new Image(),
            phoneReply: new Image(),
            phoneText: new Image(),
        };
        img.callCenterOk.src = require('../img/login/callcenter-ok.svg');
        img.callCenterSettings.src = require('../img/login/callcenter-settings.svg');
        img.peopleCallCenter.src = require('../img/login/people-callcenter.svg');
        img.peoplePhone.src = require('../img/login/people-phone.svg');
        img.phoneInfo.src = require('../img/login/phone-info.svg');
        img.phonePlus.src = require('../img/login/phone-plus.svg');
        img.phoneReply.src = require('../img/login/phone-replying.svg');
        img.phoneText.src = require('../img/login/phone-text.svg');

        // elements list to draw
        const elements = [];

        // loop generates elements
        // element width and height to calc dynamic animation border

        let animationWidthEndingMultiplier = 0.85;
        if (canvas.width < 1024) {
            animationWidthEndingMultiplier = 0.9;
        }

        for (let x = canvas.width * (1 - animationWidthEndingMultiplier); x < canvas.width * animationWidthEndingMultiplier; x++) { // add item on each coords
            for (let y = canvas.height * 0.9 * 0.1; y < canvas.height * 0.9; y++) {// add item on each coords
                // calc dynamic border: divide page on 50% and - half of elements size because it's centered
                if (!((canvas.width / 2) - elemWidth / 2 - 10 < x && x < (canvas.width / 2) + elemWidth / 2 + 10)
                    || !(canvas.height / 2 - elemHeight / 2 - 10 < y && y < canvas.height / 2 + elemHeight / 2 + 10)) {
                    // smaller multiplier => more elements
                    let elementsMultiplier = 8000;
                    if (canvas.width < 1024) {
                        elementsMultiplier = 2000;
                    }
                    if (Math.round(Math.random() * elementsMultiplier) === 1) {
                        const s = ((Math.random() * 5) + 1) / 10;
                        if (Math.round(Math.random()) === 1) {
                            elements.push(canvasPresetO(x, y, s, 0, 0));
                        } else {
                            // elements.push(canvasPresetX(x, y, s, 0, 0,
                            //     ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
                        }
                    }
                }
            }
        }


        // elements.push(canvasPresetImg(img.phoneText, {x: 149, y: 198}));
        // elements.push(canvasPresetImg(img.callCenterOk, {x: 292, y: 269}, {width: 27, height: 24}));
        // elements.push(canvasPresetImg(img.peoplePhone, {x: 172, y: 423}, {width: 26, height: 30}));
        // elements.push(canvasPresetImg(img.phoneText, {x: 422, y: 387}));
        // elements.push(canvasPresetImg(img.phoneInfo, {x: 159, y: 595}, {width: 28, height: 28}));
        // elements.push(canvasPresetImg(img.callCenterOk, {x: 340, y: 553}, {width: 27, height: 24}));
        // elements.push(canvasPresetImg(img.callCenterSettings, {x: 470, y: 712}, {width: 27, height: 24}));
        // elements.push(canvasPresetImg(img.phoneText, {x: 617, y: 694}));
        // elements.push(canvasPresetImg(img.phonePlus, {x: 470, y: 159}, {width: 23, height: 28}));
        // elements.push(canvasPresetImg(img.phoneReply, {x: 634, y: 199}, {width: 24, height: 24}));
        // elements.push(canvasPresetImg(img.phoneInfo, {x: 1024, y: 670}, {width: 26, height: 26}));
        // elements.push(canvasPresetImg(img.phoneText, {x: 1163, y: 550}, {width: 26, height: 26}));
        // elements.push(canvasPresetImg(img.callCenterOk, {x: 1013, y: 438}, {width: 25, height: 22}));
        // elements.push(canvasPresetImg(img.peoplePhone, {x: 1175, y: 327}, {width: 24, height: 28}));
        // elements.push(canvasPresetImg(img.phoneText, {x: 916, y: 313}, {width: 24, height: 24}));
        // elements.push(canvasPresetImg(img.peopleCallCenter, {x: 1063, y: 179}, {width: 19, height: 22}));

        elements.push(canvasPresetImg(img.phoneText, calcIconPos(149, 198)));
        elements.push(canvasPresetImg(img.callCenterOk, calcIconPos(292, 269), {width: 27, height: 24}));
        elements.push(canvasPresetImg(img.peoplePhone, calcIconPos(172, 423), {width: 26, height: 30}));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(422, 387)));
        elements.push(canvasPresetImg(img.phoneInfo, calcIconPos(159, 595), {width: 28, height: 28}));
        elements.push(canvasPresetImg(img.callCenterOk, calcIconPos(340, 553), {width: 27, height: 24}));
        elements.push(canvasPresetImg(img.callCenterSettings, calcIconPos(470, 712), {width: 27, height: 24}));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(617, 694)));
        elements.push(canvasPresetImg(img.phonePlus, calcIconPos(470, 159), {width: 23, height: 28}));
        elements.push(canvasPresetImg(img.phoneReply, calcIconPos(634, 199), {width: 24, height: 24}));
        elements.push(canvasPresetImg(img.phoneInfo, calcIconPos(1024, 670), {width: 26, height: 26}));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(1163, 550), {width: 26, height: 26}));
        elements.push(canvasPresetImg(img.callCenterOk, calcIconPos(1013, 438), {width: 25, height: 22}));
        elements.push(canvasPresetImg(img.peoplePhone, calcIconPos(1175, 337), {width: 24, height: 28}));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(916, 313), {width: 24, height: 24}));
        elements.push(canvasPresetImg(img.peopleCallCenter, calcIconPos(1063, 179), {width: 19, height: 22}));


        // moving animation, which depends on time
        setInterval(() => {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);

            const time = new Date().getTime();
            Object.keys(elements).forEach((elem) => {
                elements[elem].draw(canvasContext, time);
            });
        }, 5);

    };

    // const canvasPresetX = function (x, y, s, dx, dy, dr, r = 0) { // animation drawing and trajectory
    //     return {
    //         x,
    //         y,
    //         s: 15 * s,
    //         w: 5 * s,
    //         r,
    //         dx,
    //         dy,
    //         dr,
    //         draw(context, time) {
    //             this.x += this.dx;
    //             this.y += this.dy;
    //             this.r += this.dr;
    //
    //             const line = (x, y, tx, ty, c, o = 0) => {
    //                 context.beginPath();
    //                 context.moveTo(-o + ((this.s / 2) * x), o + ((this.s / 2) * y));
    //                 context.lineTo(-o + ((this.s / 2) * tx), o + ((this.s / 2) * ty));
    //                 context.lineWidth = this.w;
    //                 context.strokeStyle = c;
    //                 context.stroke();
    //             };
    //
    //             context.save();
    //
    //             context.translate(this.x + Math.sin((x + (time / 10)) / 100) * 5,
    //                 this.y + Math.sin((10 + x + (time / 10)) / 100) * 2);
    //             context.rotate(this.r * Math.PI / 180);
    //
    //             // line(-1, -1, 1, 1, 'rgba(255, 255, 255, 0.4)');
    //             // line(1, -1, -1, 1, 'rgba(255, 255, 255, 0.4)');
    //             line(-1, -1, 1, 1, '#797979');
    //             line(1, -1, -1, 1, '#797979');
    //
    //             context.restore();
    //         },
    //     };
    // };
    const canvasPresetO = function (x, y, s, dx, dy) { // animation drawing and trajectory
        return {
            x,
            y,
            r: 4 * s,
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
                // context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                context.strokeStyle = '#797979';
                context.stroke();
            },
        };
    };
    const canvasPresetImg = function (img, {x, y}, size = {width: 25, height: 25}, dx = 0, dy = 0) { // animation trajectory
        return {
            x,
            y,
            w: 5 * ((Math.random() * 5) + 1) / 10,
            dx,
            dy,
            draw(context, time) {
                this.x += this.dx;
                this.y += this.dy;

                context.beginPath();
                context.drawImage(img, this.x + Math.sin((100 + x + (time / 10)) / 100) * 4,
                    this.y + Math.sin((75 + x + (time / 10)) / 100) * 3, size.width, size.height);
                context.lineWidth = this.w;
                context.stroke();
            },
        };
    };

    function getRandomFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return animateBackground;
}());
