
const form = document.querySelector('#form');
const bill = document.querySelector('#bill');
const numberPeople = document.querySelector('#number-people');
const customTipp = document.querySelector('#tip6'); // custom tip
const resultTip = document.querySelector('#calculated-tip');
const resultSum = document.querySelector('#calculated-sum');

const resetBtn = document.querySelector('#reset');

// prevent form from reloading the page
document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();
})
// Prevent typing letters in number inputs
const onInputNumbers = event => {
    event.target.value = event.target.value.replace(/[^0-9+]/g, '')
}
customTipp.addEventListener('input', (event)=>{
    onInputNumbers(event);
})

let activeRadio;
let arrayRadios = document.querySelectorAll('.tip-input');


for(var i = 0; i < arrayRadios.length; i++){
    // when a radio is clicked activeRadio gets it's number
    arrayRadios[i].onclick = function(){
        activeRadio = this.value;
        calculate();
        return activeRadio;
    }
}
//===============

// uncheck radios if custom tip is activated
customTipp.addEventListener('keyup', ()=>{
    if(customTipp.value !== ''){
        arrayRadios.forEach((item) => {
            item.checked = false;
        })
        activeRadio = customTipp.value;
        resetBtn.disabled = false;
        calculate();
    }
    
});

const validate = (inputs)=>{
    inputsArray = Array.from(inputs);
    let isValid = inputsArray.every(input => input.value !== "" && parseFloat(input.value) !== 0 && !isNaN(input.value));
    return isValid;
}
const calculate = () => {
    //the calculations starts only if all fields are filled/checked
    if(activeRadio && validate(requestedFields)){

        let calcTip = parseFloat(bill.value) / 100 * parseFloat(activeRadio) / parseFloat(numberPeople.value);
        resultTip.innerText = `$${(Math.round((calcTip) * 100) / 100).toFixed(2)}`;

        let calcSum = parseFloat(bill.value) / parseFloat(numberPeople.value) + calcTip;
        resultSum.innerText = `$${(Math.round((calcSum) * 100) / 100).toFixed(2)}`;

    }
}

// calling calculating on typing
let requestedFields = document.querySelectorAll('.text-input');

requestedFields.forEach((item) =>{
    item.addEventListener('input', (event)=>{
        onInputNumbers(event);
    })
    //Getting values on typing
    item.addEventListener('keyup', ()=>{
        resetBtn.disabled = false;
        // add error if bill or number of persons is 0
        if(parseFloat(item.value) == 0){
            item.previousElementSibling.classList.add('active');
            resultTip.innerText ='$0.00';
            resultSum.innerText ='$0.00';
            return;
        };
        item.previousElementSibling.classList.remove('active');
        calculate();
        
    });
});

// reset all fields
resetBtn.addEventListener('click', function() {
    arrayRadios.forEach((item) => {
        item.checked = false;
    });
    customTipp.value = '';
    bill.value = '';
    numberPeople.value = '';
    resultTip.innerText ='$0.00';
    resultSum.innerText ='$0.00';
    resetBtn.disabled = true;
    const activeErrors = document.querySelectorAll('.active');
    for(let i=0; i<activeErrors.length; i++){
        activeErrors[i].classList.remove('active')
    }
    bill.focus();
})
