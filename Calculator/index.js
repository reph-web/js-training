//Define global var
var buffer1 = 0;
var buffer2 = 0;
var float = {
    enabled : false,
    scale : 1,
    decimal : 0
}
var operator = {
    value : '',
    enabled : false
};

//Callback functions: 
function addDigits(){
    if(operator.enabled){
        if(float.enabled){
            buffer2 = addFloat(this.innerText, buffer2);
            document.getElementById("result").innerText = buffer2;
            return;
        }
        buffer2 = buffer2 * 10 + parseInt(this.innerText);
        document.getElementById("result").innerText = buffer2;
        return;
    }
    if(float.enabled){
        buffer1 = addFloat(this.innerText, buffer1);
        console.log(buffer1);
        document.getElementById("result").innerText = buffer1;
        return;
    }
    buffer1 = buffer1 * 10 + parseInt(this.innerText);
    document.getElementById("result").innerText = buffer1;
}

function calculate(){
    console.log(operator.value);
    switch(operator.value){
        case '+' :
            console.log("yes");
            buffer1 += buffer2;
            document.getElementById("result").innerText = buffer1;
            break;
        case '−' : 
            buffer1 -=buffer2;
            document.getElementById("result").innerText = buffer1;
            break;
        case '×' :
            buffer1 *= buffer2;
            document.getElementById("result").innerText = buffer1;
            break;
        case '÷':
            buffer1 /= buffer2;
            document.getElementById("result").innerText = buffer1;
            break;
    }
    buffer2 = 0;
    operator.enabled = false;
}

function addSign(){
    if(operator.enabled){
        buffer2 *= -1;
        document.getElementById("result").innerText = buffer2;
        return;
    }
    buffer1 *= -1
    document.getElementById("result").innerText = buffer1;
}

function addFloat(digit, buffer){
    console.log(float.scale, float.decimal)
    float.scale *= 0.1
    float.decimal ++;
    buffer = buffer + (float.scale * digit);
    return parseFloat(buffer.toFixed(float.decimal));
}

//Setup Event Listeners
var digitBtns = document.getElementsByClassName("digit-btn");
for(btn of digitBtns){
    btn.addEventListener("click", addDigits);
}

var operatorBtns = document.getElementsByClassName("op-btn");
for(btn of operatorBtns){
    btn.addEventListener("click", function(){
        float.enabled = false;
        float.scale = 1;
        float.decimal = 0;
        operator.enabled = true;
        operator.value = this.innerText;       
    });
}

document.getElementById("calc-btn").addEventListener("click", calculate);
document.getElementById("sign").addEventListener("click", addSign);
document.getElementById("float").addEventListener("click", function(){float.enabled = true});
document.getElementById("erase").addEventListener("click", function(){
    float.enabled = false;
    operator.enabled = false;
    float.decimal = 0;
    float.scale = 1;
    buffer1 = 0;
    buffer2 = 0;
    document.getElementById("result").innerText = buffer1;
});



