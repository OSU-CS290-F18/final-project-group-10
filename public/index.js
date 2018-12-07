var display = document.getElementById('answer-text');
console.log("display text:", display.textContent);
var calculator = document.getElementById('calculator');
calculator.addEventListener('click', function(event){
  handleClick(event.target);
});

function handleClick(btn){
  var val = btn.value;
  var id = btn.id;
  var prevKey = calculator.dataset.prevKeyType;

  if(id === 'numButton' || id === 'decButton'){
    if(display.textContent === '0' || prevKey === "op"){
      display.textContent = val;
    }
    else{
      display.textContent += val;
    }
    calculator.dataset.prevKeyType = 'num';
  }
  else if(id === 'opButton'){
    calculator.dataset.prevKeyType = "op";
    calculator.dataset.firstVal = display.textContent;
    calculator.dataset.op = val;
  }
  else if(id === 'clearButton'){
    display.textContent = '0';
  }
  else if(id === 'eqButton'){
    var firstVal = calculator.dataset.firstVal;
    var op = calculator.dataset.op;
    var secondVal = display.textContent;
    var answer = calculate(firstVal, op, secondVal);
    //display.textContent = calculate(firstVal, op, secondVal);
    display.textContent = answer;
    //var eq = firstVal + " " + " " + op + " " + secondVal + " " + "=" + answer;
    //results.insertOne({
    //  eq: eq
    //});
    //displayAnswer(answer);
  }
  console.log("display text: ", display.textContent);
}

function calculate(first, op, sec){
  var result = '';

  if(op === '+'){
    result = parseFloat(first) + parseFloat(sec);
  }
  else if(op === '-'){
    result = parseFloat(first) - parseFloat(sec);
  }
  else if(op === '*'){
    result = parseFloat(first) * parseFloat(sec);
  }
  else if(op === '/'){
    result = parseFloat(first) / parseFloat(sec);
  }
  else if(op === '2nd'){
    result = parseFloat(first) * parseFloat(first);
  }
  else{
    result = parseFloat(first) % parseFloat(sec);
  }

  return result;
}

//function displayAnswer(ans){
//  var answerBar = document.getElementById('answer-text');

//}
