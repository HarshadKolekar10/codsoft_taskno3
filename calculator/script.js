document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "";
  let operator = "";
  let firstOperand = "";
  let waitingForSecondOperand = false;

  const updateDisplay = () => {
    let displayValue = firstOperand;
    if (operator) {
      displayValue += ` ${operator} `;
    }
    displayValue += currentInput || "0";
    display.textContent = displayValue;
  };

  const handleButtonClick = (value) => {
    if (value >= "0" && value <= "9") {
      if (waitingForSecondOperand) {
        currentInput = value;
        waitingForSecondOperand = false;
      } else {
        currentInput += value;
      }
    } else if (value === ".") {
      if (!currentInput.includes(".")) {
        currentInput += ".";
      }
    } else if (value === "C") {
      currentInput = "";
      operator = "";
      firstOperand = "";
      waitingForSecondOperand = false;
      updateDisplay();
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (firstOperand && operator) {
        currentInput = String(evaluate(firstOperand, currentInput, operator));
        firstOperand = currentInput; // Update firstOperand for the next calculation
      } else {
        firstOperand = currentInput;
        currentInput = "";
      }
      operator = value;
      waitingForSecondOperand = true;
    } else if (value === "=") {
      if (operator && firstOperand) {
        currentInput = String(evaluate(firstOperand, currentInput, operator));
        operator = "";
        firstOperand = "";
        waitingForSecondOperand = false;
      }
    }
    updateDisplay();
  };

  const evaluate = (first, second, operator) => {
    const x = parseFloat(first);
    const y = parseFloat(second);
    switch (operator) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return y === 0 ? "Error" : x / y; // Handle division by zero
      default:
        return y;
    }
  };

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(button.textContent)
    );
  });
});
