class CalcController {
  constructor() {
    this._operation = [];
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

  clearAll() {
    this.operand = [];
  }
  clearEntry() {
    this._operation.pop();
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  getLastOperand() {
    return this._operation[this._operation.length - 1];
  }

  setLastOperand(value) {
    this._operation[this._operation.length - 1] = value;
  }

  addOperator(value) {
    this._operation.push(value);
  }

  addOperand(value) {
    if (isNaN(this.getLastOperand())) {
      this._operation.push(value);
    } else {
      let newValue = this.getLastOperand().toString() + value.toString();
      this.setLastOperand(parseInt(newValue));
    }
    console.log(this._operation);
  }

  setError() {
    this.displayCalc = "Error";
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;

      case "ce":
        this.clearEntry();
        break;

      case "soma":
        this.addOperator("+");
        break;

      case "subtracao":
        this.addOperator("-");
        break;

      case "divisao":
        this.addOperator("/");
        break;

      case "multiplicacao":
        this.addOperator("*");
        break;

      case "porcento":
        break;

      case "igual":
        break;
      case "ponto":
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperand(parseInt(value));
        break;

      default:
        this.setError;
    }
  }

  initButtonEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", e => {
        let textBtn = btn.className.baseVal.replace("btn-", "");
        this.execBtn(textBtn);
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
