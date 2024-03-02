const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[date-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength= 10;
let checkCount = 0;
handleSlider();
//set strength color to gray
setIndicator('#ccc')

//set passwordLength 
function handleSlider(){
    inputSlider.value = passwordLength ;
   // passwordLength = inputSlider.value;
    lengthDisplay.innerText = passwordLength;
    // const min = inputSlider.min;
    const max = inputSlider.max;
    // inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%";
    inputSlider.style.backgroundSize = (passwordLength)*100/(max) + "% 100%";

}


inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    // console.log("value", passwordLength);
    handleSlider();
   
  });

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
   
}

function getRndInteger(min,max)
{
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,122))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    //const randNum = getRndInteger(0,symbols.length);
    //return symbols.charAt(randNum);
    return symbols.charAt(getRndInteger(0,symbols.length));
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText="copied";
    }
    catch(e) {
        copyMsg.innerText="failed";
    }

    //to make span tag data visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

copyBtn.addEventListener('click',() => {
    try
    {
        if(passwordDisplay.value)
    {
        copyContent();
    }
    }
    catch(e){
        console.log("hi")
    }
    
})

allCheckBox.forEach( (checkbox) => 
    checkbox.addEventListener('change',handleCheckBoxChange)
)


function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
        {
            checkCount++;        
        }
    }) ;
  

    //special checkbox condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}


generateBtn.addEventListener('click',() => {
   // let checkbox=0;

    //none of the checkbox are selected
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }


    //let's start the journey to find new password

    //remove old password
    password = "";

    //lets put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbols.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercase.checked)
        funcArr.push(generateUpperCase);

    if(lowercase.checked)
        funcArr.push(generateLowerCase);

    if(numbers.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0;i<checkCount;i++)
    {
        password += funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-checkCount;i++)
    {
        // let randIndex = getRndInteger(0,funcArr.length);
        // password += funcArr[randIndex]();
        password += funcArr[getRndInteger(0,checkCount)]();
    }

    console.log(funcArr);

    //shuffle the password
    console.log(Array.from(password))
    password = shufflePassword(Array.from(password));
   

    //show in UI
    passwordDisplay.value = password;

    //calculate strength
    calcStrength();
})

function shufflePassword(array) {
    //Fisher Yates Method
    console.log(array.length);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    // console.log("hi value for array",array);
    let str = "";
    array.forEach((el) => (str += el));
  
    return str;
    
}

