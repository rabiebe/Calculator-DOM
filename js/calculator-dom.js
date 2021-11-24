const DOT = ".";
const OPERATIONS = [];
const BUTTONS_CONTAINER = document.querySelector("#container-buttons");
const START_WITH_NUMBER = /^\d+/g;
const FINISH_WITH_NUMBER = /[0-9]$/g;
let calculationResult = "";
let displayValueOperations = [];
const DISPLAY_VALUE_INITIAL = "\n                0";
OPERATIONS[10] = ["+"];
OPERATIONS[11] = ["-"];
OPERATIONS[12] = ["*"];
OPERATIONS[13] = ["/"];
OPERATIONS[14] = ["="];

for (let buttonValue = 0; buttonValue <= 15; buttonValue++) {
  let button = null;

  if (buttonValue <= 9) {
    button = createButton(buttonValue);
  } else if (buttonValue == 15) {
    button = createButton(DOT);
  } else {
    let operation = OPERATIONS[buttonValue];
    button = createButton(operation);
  }
  button.addEventListener("click", () => {
    let value = button.innerHTML;
    click(value);
  });
}

function createButton(buttonValue) {
  let button = document.createElement("button");
  button.innerHTML = buttonValue;
  button.className = "number-button" + buttonValue;
  if (button.innerHTML == "=") button.className = "operation-button-result";
  BUTTONS_CONTAINER.appendChild(button);
  return button;
}

function click(buttonValue) {
  if (display.innerText.length >= 12) {
    changeSize();
  }
  if (display.innerText.length >= 28 && buttonValue != "=") return;
  let displayValue = display.innerHTML;
  let isOperation = isExists(buttonValue, OPERATIONS);
  if (buttonValue == DOT) {
    if (checkDotProblemMath(displayValue, OPERATIONS)) {
      return;
    }
  }

  if (isOperation && displayValue.match(FINISH_WITH_NUMBER)) {
    calculationResult = "";

    if (buttonValue == "=") {
      display.innerHTML = calculate();
      return;
    }
    let lastIndexOfArrayChar = displayValue[displayValue.length - 1];
    if (isExists(lastIndexOfArrayChar, OPERATIONS)) {
      changeLastIndexOfArrayChar(displayValue, buttonValue);
    } else {
      display.innerHTML += buttonValue;
    }
  } else if (!isOperation) {
    if (calculationResult != "") {
      display.innerHTML = "";
      calculationResult = "";
    }
    if (displayValue === DISPLAY_VALUE_INITIAL) {
      display.innerHTML = buttonValue;
    } else {
      display.innerHTML += buttonValue;
    }
  }
}

function isExists(value, chars) {
  let flag = false;
  chars.forEach((char) => {
    char == value ? (flag = true) : flag;
  });
  return flag;
}

let search = (value, array) => {
  array.map((char) => {
    if (char === value.toString()) {
      displayValueOperations.push(value);
    }
  });
};

function calculate() {
  let result =
    eval(display.innerHTML) == "Infinity"
      ? "we cannot devide by zero"
      : eval(display.innerHTML);
  calculationResult = result;
  return result;
}

function changeLastIndexOfArrayChar(displayValue, buttonValue) {
  let charsNumber = displayValue.split("");
  let lastIndexOfArrayCharNumber = charsNumber.length - 1;
  charsNumber[lastIndexOfArrayCharNumber] = buttonValue;
  let rs = charsNumber.join("");
  display.innerHTML = rs;
}

function checkDotProblemMath(dv, operations) {
  let operationFound = "";
  if (dv === DISPLAY_VALUE_INITIAL) {
    display.innerHTML += buttonValue;
  }
  if (dv.includes(DOT)) {
    let charsOperations = dv.split("");
    operations.map((op) => {
      search(op, charsOperations);
      if (displayValueOperations[displayValueOperations.length - 1] == op) {
        operationFound = op;
      }
    });
    if (operationFound != "") {
      let numbers = dv.split(operationFound);
      if (
        numbers[numbers.length - 1].includes(DOT) ||
        !numbers[numbers.length - 1].match(START_WITH_NUMBER)
      ) {
        return true;
      }
    } else return true;
  }
  return false;
}

let changeSize = function () {
  let style = window
    .getComputedStyle(display, null)
    .getPropertyValue("font-size");
  let fontSize = parseFloat(style);
  if (fontSize >= 24) display.style.fontSize = fontSize - 4 + "px";
};
