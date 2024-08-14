const form = document.querySelector("form");

const nameInput = form.querySelector("#name-input");
const cardNumberInput = form.querySelector("#card-number-input");
const monthInput = form.querySelector("#month-input");
const yearInput = form.querySelector("#year-input");
const cvcInput = form.querySelector("#cvc-input");

const cardNumberResult = document.getElementById("card-number-result");
const nameResult = document.getElementById("name-result");
const monthResult = document.getElementById("month-result");
const yearResult = document.getElementById("year-result");
const cvcResult = document.getElementById("cvc-result");

const submitButton = document.querySelector("button");

const successContainer = document.querySelector(".success-container");

function resetErrors(){
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input=>{
        const errorMessage = input.parentElement.querySelector(".error-message");

        errorMessage.textContent="";
        input.style.borderColor="";
    });
}

function showError(input,msg){
    const errorMessage = input.parentElement.querySelector(".error-message");

    errorMessage.textContent=`${msg}`;
    input.style.borderColor="var(--red)";
}

function showSuccess(){
    form.classList.add("hidden");
    successContainer.classList.remove("hidden");
}

submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    resetErrors();

    let isValid=true;

    if(nameInput.value===""){
        showError(nameInput,"Can't be blank");
        isValid=false;
    }
    else{
        nameResult.textContent=`${nameInput.value}`;
    }

    if(cardNumberInput.value===""){
        showError(cardNumberInput,"Can't be blank");
        isValid=false;
    }
    else if(cardNumberInput.value.length !==19){
        showError(cardNumberInput,"Must contain 16 digits with space in each 4 digits");
    }
    else if(isNaN(cardNumberInput.value.replace(/ /g,""))){
        showError(cardNumberInput,"Wrong format, numbers only");
        cardNumberResult.textContent=`${cardNumberInput.value}`;
        isValid=false;
    }
    else{
        cardNumberResult.textContent=`${cardNumberInput.value}`;
    }

    if(monthInput.value===""){
        showError(monthInput,"Can't be blank");
        isValid=false;
    }
    else if(monthInput.value>11 || monthInput.value<0){
        showError(monthInput,"Must be a valid date");
        isValid=false;
    }
    else{
        monthResult.textContent=`${monthInput.value<10?"0"+Number(monthInput.value):monthInput.value}`;
    }

    if(yearInput.value===""){
        showError(yearInput,"Can't be blank");
        isValid=false;
    }
    else if(yearInput.value<0 || yearInput.value>99){
        showError(yearInput,"Must be a valid date");
        isValid=false;
    }
    else{
        yearResult.textContent=`${yearInput.value<10?"0"+Number(yearInput.value):yearInput.value}`;
    }

    if(cvcInput.value===""){
        showError(cvcInput,"Can't be blank");
        isValid=false;
    }
    else if(cvcInput.value <100 || cvcInput.value >999){
        showError(cvcInput,"Must contain 3 digits");
        isValid=false;
    }
    else{
        cvcResult.textContent=`${cvcInput.value}`;
    }

    if(isValid){
        showSuccess();
    }

});