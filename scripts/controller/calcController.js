class CalcController {
  constructor() {
    this._lastOperand = "";
    this._lastOperator = "";
    this._result = "";
    this._hasDot = false;
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
    this._operation = [];
    this.displayCalc = "0";
  }
  clearEntry() {
    this._operation.pop();
    this._lastOperand = "";
    this.displayCalc = "0";
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  getLastItem() {
    return this._operation[this._operation.length - 1];
  }

  setLastItem(value) {
    this._operation[this._operation.length - 1] = value;
  }

  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    }
  }

  calc() {
    if (this._operation.length < 3) {
      this._operation = [
        this._operation[0],
        this._lastOperator,
        this._lastOperand
      ];
    }

    if (this._operation.length === 3) {
      this._result = eval(this._operation.join(""));
      console.log(this._result);
    }

    if (this._operation.length > 3) {
      this._operation.pop();
      this._result = eval(this._operation.join(""));
      this._lastOperand = eval(this._operation.join(""));
    }

    if (this._lastOperator === "%") {
      this._operation = [(this._result /= 100)];
    } else {
      this._operation = [this._result.toString(), this._lastOperator];
    }

    this.displayCalc = this._result.toString().substring(0, 10);
  }

  addOperator(value) {
    if (this.isOperator(this.getLastItem())) {
      this._lastOperator = value;
      this.setLastItem(value);
    } else {
      this.pushOperation(value);
      this._lastOperator = value;
    }
  }

  addOperand(value) {
    if (isNaN(this.getLastItem())) {
      this._lastOperand = value;
      this.pushOperation(value);
    } else {
      let newValue = this.getLastItem().toString() + value.toString();
      this.setLastItem(newValue);
      this._lastOperand = newValue;
    }
    console.log(this._operation);
    this.displayCalc = this._lastOperand.toString().substring(0, 10);
  }

  setError() {
    this.displayCalc = "Error";
  }

  addDot() {
    if (
      this.getLastItem &&
      this.getLastItem()
        .toString()
        .split("")
        .indexOf() > -1
    )
      return;

    if (this.isOperator(this.getLastItem()) || !this.getLastItem()) {
      this._lastOperand = "0.";
      this.pushOperation(this._lastOperand);
    } else {
      this.setLastItem(this._lastOperand.toString() + ".");
    }

    this.displayCalc = this._lastOperand.toString().substring(0, 10);
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
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
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
        this.addOperator("%");
        break;

      case "igual":
        this.calc();

        break;
      case "ponto":
        this.addDot();
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
}
