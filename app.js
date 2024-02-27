const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btn = document.querySelector("form button");
const msg = document.querySelector("#warning");
const refresh = document.querySelector(".fa-solid");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

const dropdowns = document.querySelectorAll(".dropdown select"); 
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "AFN") {
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode ==="PKR") {
            newOption.selected = "selected";
        }
    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
};

const updateFlag = (flag) => {
    currCode = flag.value;
    countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = flag.parentElement.querySelector("img");
    img.src = newSrc;
}
refresh.addEventListener("click", () => {
    reset();
    let amount = document.querySelector(".amount input");
})
const reset = () => {
    msg.innerText = "1 AFN = 3.79 PKR";
    msg.style.color = "";
}
const Invalid = () => {
    msg.innerText = "Invalid input: Please enter a valid number";
    msg.style.color = "red";
} 
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() => {
    let dateUpdated = document.querySelector(".lastDate");
    dateUpdated.innerText = ""
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if ((amtVal === "") || (amtVal <= 0)) {
        Invalid();
    }
    else {
        url = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let response = await fetch(url);
        let data = await response.json();
        let lastDate = data.date;
        let rate = data[toCurr.value.toLowerCase()];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
        msg.style.color = "tomato";
        msg.style.fontWeight = "bold";
        let dateUpdated = document.querySelector(".lastDate");
        dateUpdated.innerText = `Last updated: ${lastDate}`;
    }
}
window.addEventListener("load", () => {
    updateExchangeRate();
})