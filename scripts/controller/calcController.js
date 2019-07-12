class CalcController {
  constructor() {
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    this.initialize();
    this.initButtonEvents();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  addEventListenerAll(element, events, fun) {
    events.split(" ").forEach(event => {
      element.addEventListener(event, fun, false);
    });
  }

  initButtonEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", e => {
        let textBtn = btn.className.baseVal.replace("btn-", "");
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
        btn.style.cursor = "pointer";
      });
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale);
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalc;
  }

  set displayCalc(value) {
    this._displayCalc = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
