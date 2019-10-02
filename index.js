let runningTotal = 0;
let buffer = "0";
let previousOperator = "";

const size = document.querySelectorAll(".identifyElement").length;

for (let i = 0; i < size; i++) {
  document
    .querySelectorAll(".identifyElement")
    [i].addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

const screen = document.querySelector(".screen");

const buttonClick = value => {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
};

const handleNumber = value => {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
};

function rerender() {
  screen.innerText = buffer;
}

const handleSymbol = value => {
  //   runningTotal = parseInt(buffer);
  //   buffer = "0";
  switch (value) {
    case "<-":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case "C":
      runningTotal = 0;
      buffer = "0";
      previousOperator = null;
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;

    default:
      handleMath(value);
      break;
  }
};

const handleMath = value => {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
};

const flushOperation = intBuffer => {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;

    case "-":
      runningTotal -= intBuffer;
      break;

    case "x":
      runningTotal *= intBuffer;
      break;

    case "/":
      runningTotal /= intBuffer;
      break;
  }
};
