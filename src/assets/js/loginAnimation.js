export default (function () {
  'use strict';

  let intervalState = null;
  const start = (canvas, form) => {

    // form border for further calculations
    // used to disable animation in this area
    const leftBorder = form.offsetLeft - 10;
    const rightBorder = form.offsetLeft + form.offsetWidth + 10;
    const topBorder = form.offsetTop - 10;
    const bottomBorder = form.offsetTop + form.offsetHeight + 10;

    // element list to draw
    const elements = [];

    // calcs responsive icon coords
    const calcIconPos = function (x, y) {   // coords - position in mock
      const mockScreen = {
        width: 1440,
        height: 923,
      };
      x = x * canvas.width / mockScreen.width;
      y = y * canvas.height / mockScreen.height;

      // if (canvas.width < 1280) {
      // if icon's default coords are in form area
      if ((leftBorder < x && x < rightBorder) && (topBorder < y && y < bottomBorder)) {
        if (canvas.width / 2 > x) {      // if element is in the left half
          return {
            x: getRandomFromRange(canvas.width * 0.1, leftBorder - 20),
            y: y,
          };
        } else {                            // if element is in the right half
          return {
            x: getRandomFromRange(rightBorder + 20, canvas.width * 0.9),
            y: y,
          };
        }
      }
      // }
      return {
        x, y,
      };
    };

    // main function, creates and draws elements
    const animateBackground = function () {
      const canvasContext = canvas.getContext('2d');

      // moving animation, which depends on time
      intervalState = setInterval(() => {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        const time = new Date().getTime();
        elements.forEach((elem) => {
          elem.draw(canvasContext, time);
        });
      }, 5);

    };

    // template for creating O-s
    const canvasPresetO = function ({ x, y }, dx = 0, dy = 0) { // animation drawing and trajectory
      const size = ((Math.random() * 5) + 1) / 10;
      return {
        x,
        y,
        r: 4 * size,
        w: 5 * size,
        dx,
        dy,
        draw(context, time) {
          this.x += this.dx;
          this.y += this.dy;

          context.beginPath();
          context.arc(this.x + Math.sin((50 + x + (time / 10)) / 100) * 3 * 10, // x
            this.y + Math.sin((45 + x + (time / 10)) / 100) * 4 * 10, // y
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

    // template for creating img`s
    const canvasPresetImg = function (img, { x, y }, size = {
      width: 28,
      height: 28,
    }, dx = 0, dy = 0) { // animation trajectory
      return {
        x,
        y,
        dx,
        dy,
        draw(context, time) {
          this.x += this.dx;
          this.y += this.dy;

          time *= 0.01;

          context.beginPath();
          context.drawImage(img, this.x + Math.sin((2000 + x + (time / 10))) * 4 * 10,
            this.y + Math.sin((x + (time / 10))) * 3 * 10, size.width, size.height);
          context.stroke();
        },
      };

    };

    function generateElements() {
      elements.length = 0;

      // loop generates elements
      for (let x = canvas.width * 0.05; x < canvas.width * 0.95; x++) { // add item on each coords
        for (let y = canvas.height * 0.05; y < canvas.height * 0.95; y++) {// add item on each coords
          if (!((leftBorder < x && x < rightBorder) && (topBorder < y && y < bottomBorder))) {
            // smaller multiplier => more elements
            let elementsMultiplier = 12000;
            if (canvas.width < 1024) {
              elementsMultiplier = 4000;
            }
            if (Math.round(Math.random() * elementsMultiplier) === 1) {
              elements.push(canvasPresetO({ x, y }));
            }
          }
        }
      }

      if (canvas.width >= 768) {
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(149, 198)));
        elements.push(canvasPresetImg(img.callCenterOk, calcIconPos(292, 269)));
        elements.push(canvasPresetImg(img.peoplePhone, calcIconPos(172, 423)));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(422, 387)));
        elements.push(canvasPresetImg(img.phoneInfo, calcIconPos(159, 595)));
        elements.push(canvasPresetImg(img.callCenterOk, calcIconPos(340, 553)));
        elements.push(canvasPresetImg(img.callCenterSettings, calcIconPos(470, 712)));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(617, 694)));
        elements.push(canvasPresetImg(img.phonePlus, calcIconPos(470, 159)));
        elements.push(canvasPresetImg(img.phoneReply, calcIconPos(634, 199)));
        elements.push(canvasPresetImg(img.phoneInfo, calcIconPos(1024, 670)));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(1163, 550)));
        elements.push(canvasPresetImg(img.callCenterOk, calcIconPos(1013, 438)));
        elements.push(canvasPresetImg(img.peoplePhone, calcIconPos(1175, 337)));
        elements.push(canvasPresetImg(img.phoneText, calcIconPos(916, 313)));
        elements.push(canvasPresetImg(img.peopleCallCenter, calcIconPos(1063, 179)));
      }
    }


    function getRandomFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }


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


    // normalizes canvas size
    const resize = () => {
      // canvas.width = canvas.offsetWidth;
      // canvas.height = canvas.offsetHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateElements();
    };
    window.addEventListener('resize', resize);
    resize();

    animateBackground();
  };

  const end = () => {
    clearInterval(intervalState);
  };

  return {
    start,
    end,
  };
}());
