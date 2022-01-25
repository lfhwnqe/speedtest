/*
 * @Author: your name
 * @Date: 2022-01-25 10:20:19
 * @LastEditTime: 2022-01-25 11:30:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /reaction/index.js
 */

const ArrowKeyCodeMap = {
  Top: 38,
  Right: 39,
  Bottom: 40,
  Left: 37,
};
const EnterKeyCode = 13;
const app = {
  data: {
    arrows: [],
    currentArrow: 0,
    currentArrowTime: "",
    doneTime: "",
  },
  init() {
    app.getArrows();
    app.handleStart();
    app.handleKeyDown();
  },
  getArrows() {
    const topArrow = document.querySelector(".arrow-top");
    const rightArrow = document.querySelector(".arrow-right");
    const bottomArrow = document.querySelector(".arrow-bottom");
    const leftArrow = document.querySelector(".arrow-left");
    app.data.arrows = [
      { dom: topArrow, value: "top", keyCode: ArrowKeyCodeMap.Top },
      { dom: rightArrow, value: "right", keyCode: ArrowKeyCodeMap.Right },
      { dom: bottomArrow, value: "bottom", keyCode: ArrowKeyCodeMap.Bottom },
      { dom: leftArrow, value: "left", keyCode: ArrowKeyCodeMap.Left },
    ];
  },
  handleStart() {
    const startButton = document.querySelector(".start");
    startButton.addEventListener("click", () => {
      app.startGame();
    });
  },
  // 开启反应计时
  startGame() {
    console.log("startGame");
    app.data.currentArrow = 0;
    app.data.currentArrowTime = "";
    app.data.doneTime = "";
    document.querySelector(".container-arrows").style.display = "flex";
    document.querySelector(".container-text").style.display = "none";
    app.randomArrow();
  },
  randomArrow() {
    const arrows = app.data.arrows;
    const arrow = (Math.random() * arrows.length) | 0;
    const choosenArrow = arrows[arrow];
    app.hideAllImg();
    const showArrowTime = Math.random() * 3 * 1000;
    setTimeout(() => {
      choosenArrow.dom.style.display = "block";
      app.data.currentArrow = choosenArrow.value;
      app.data.currentArrowTime = Date.now();
    }, showArrowTime);
  },
  handleKeyDown() {
    document.onkeydown = ({ keyCode }) => {
      if (keyCode === EnterKeyCode) {
        return app.startGame();
      }
      if (app.data.doneTime) return;
      const currentArrowItem = app.data.arrows.find(
        (i) => i.keyCode === keyCode
      );
      if (!currentArrowItem) return;
      if (currentArrowItem.value !== app.data.currentArrow) {
        return alert("叼毛，你搞错了");
      }
      const doneTime = Date.now();
      const reactionTime = doneTime - app.data.currentArrowTime;
      app.setReactionTime(reactionTime);
      app.hideAllImg();
      app.data.doneTime = doneTime;
    };
  },
  setReactionTime(time) {
    console.log("reaction time:", time);
    const reactionDom = document.querySelector("#reaction-time");
    const reactionContainerDom = document.querySelector(".container-text");
    reactionDom.innerHTML = time;
    reactionContainerDom.style.display = "block";
    document.querySelector(".container-arrows").style.display = "none";
  },
  hideAllImg() {
    const arrows = app.data.arrows;
    arrows
      .map((i) => i.dom)
      .filter((item) => {
        const display = item.style.display;
        return display && display !== "none";
      })
      .forEach((item) => {
        item.style.display = "none";
      });
  },
};

app.init();
