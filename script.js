const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const dayResult = document.getElementById("day-result");
const monthResult = document.getElementById("month-result");
const yearResult = document.getElementById("year-result");

const submitButton = document.querySelector("button");

function showError(input,msg){
    const label = input.parentElement.querySelector("label");
    const errorMessage = input.parentElement.querySelector(".error-message");

    label.style.color="var(--light-red)";
    input.style.borderColor="var(--light-red)";
    errorMessage.textContent=`${msg}`;
}

function isValidDate(){
    const inputDate = new Date(year.value,month.value-1,day.value);

    if(inputDate.getDate()!==Number(day.value) || inputDate.getMonth()!==Number(month.value)-1){
        showError(day,"Must be a valid date");
        showError(month,"");
        showError(year,"");
        return(false);
    }
    return(true);
}

function showResult(currentDate,inputDate){
    const todayDay = currentDate.getDate();
    const todayMonth = currentDate.getMonth() + 1;
    const todayYear = currentDate.getFullYear();

    let yearDiff = todayYear - year.value;
    let monthDiff = todayMonth - month.value;
    let dayDiff = todayDay - day.value;


    if(dayDiff<0){
        monthDiff--;
        dayDiff += new Date(year.value,month.value,0).getDate();
    }

    if(monthDiff<0){
        yearDiff--;
        monthDiff+=12;
    }

    yearResult.textContent=`${yearDiff}`;
    monthResult.textContent=`${monthDiff}`;
    dayResult.textContent=`${dayDiff}`;
}

function resetErrors(){
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input=>{
        const label = input.parentElement.querySelector("label");
        const errorMessage = input.parentElement.querySelector(".error-message");

        input.style.borderColor="";
        label.style.color="";
        errorMessage.textContent="";
    });
}

submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    resetErrors();
    
    let isValid = true;
    const currentDate = new Date();

    if(day.value===""){
        showError(day,"This field is required");
        isValid=false;
    }
    else if(day.value>31 || day.value<=0){
        showError(day,"Must be a valid day");
        isValid=false;
    }

    if(month.value===""){
        showError(month,"This field is required");
        isValid=false;
    }
    else if(month.value>11 || month.value <0){
        showError(month,"Must be a valid month");
        isValid=false;
    }

    if(year.value===""){
        showError(year,"This field is required");
        isValid=false;
    }
    else if(year.value>currentDate.getFullYear() || year.value <=0){
        showError(year,"Must be in the past");
        isValid=false;
    }

    if(isValid && isValidDate()){
        showResult(currentDate,new Date(year.value,month.value-1,day.value));
    }

});