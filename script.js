const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");
const totalBill = document.getElementById("billTotal");

//get tip % values from the tip buttons 
buttons.forEach ((button) => {
    button.addEventListener("click", (e) => {
        let tipvalue = e.target.innerText;
        tipvalue = tipvalue.substr(0, tipvalue.length - 1);

        if (billAmount.value === "") return;
        if (numberOfPeople.value === "") numberOfPeople.value = 1;

        calculateTip(
            parseFloat(billAmount.value),
            parseInt(tipvalue),
            parseInt(numberOfPeople.value)
        );
    })
})

//get tip % when entered customly
customTipPercentage.addEventListener("blur", (e) => {
    if (billAmount.value === "") {
        resetEverything();
        return;
    }
    if (numberOfPeople.value === "") numberOfPeople.value = 1;
    calculateTip(
        parseFloat(billAmount.value),
        parseFloat(e.target.value),
        parseInt(numberOfPeople.value)
    );
})

//calculate tip
function calculateTip(billAmount, tipPercentage, numberOfPeople) {
    let tipAmount = (billAmount * (tipPercentage / 100) / numberOfPeople);
    let tip = Math.floor(tipAmount *100) / 100;
    tip = tip.toFixed(2);

    let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
    totalAmount = totalAmount.toFixed(2);

    let totalBillAmount = billAmount.toFixed(2);

    totalBill.innerHTML = `$${totalBillAmount}`;
    billTipAmount.innerHTML = `$${tip}`;
    billTotalPerPerson.innerHTML = `$${totalAmount}`;

}

// reset all fields
resetButton.addEventListener("click", resetEverything);

// reset func
function resetEverything() {
    totalBill.innerHTML = "$0.00";
    billTipAmount.innerHTML = "$0.00";
    billTotalPerPerson.innerHTML = "$0.00";
    billAmount.value = "";
    numberOfPeople.value = "";
    customTipPercentage.value = "";
}