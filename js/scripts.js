const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText  = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
       this.previousOperationText = previousOperationText
       this.currentOperationText = currentOperationText
       this.currentOperation = ""
    }

    addDigit(digit) {

        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen();
    }

    // Process all calculator operation
    processOperation(operation) {
        // check if current is empty
        if(this.currentOperationText === "") {
            // change operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previous value
        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText

        switch(operation ) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;       
             default:
                return;
        }

    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ) {

        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";   
        }
    }

    // cjange math operation
    changeOperation(operation) {

        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});