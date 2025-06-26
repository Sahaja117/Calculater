 let display = document.getElementById('display')
let historylist = document.getElementById('history-list');
let history = []

function addtoDisplay(pvalue){
    display.value += pvalue;
}

function clearDisplay(){
    display.value = '';
}

function deleteLast(){
    display.value= display.value.slice(0,-1);
}

function sqrt(){
    let value = parseFloat(display.value)
    if(!isNaN(value))
    {
        let result = Math.sqrt(value);
        addToHistory(`√${value} = ${result}`);
        display.value = result;
    }
}

function calculate(){
    let expression = display.value.replace(/\^/g,"**");
    let result = eval(expression);
    addToHistory(`${display.value} = ${result}`);
    display.value = result;
}

function addToHistory(entry){
    if(history.length == 10)
        history.pop();//keep only 10 values
    history.unshift(entry);
    updateHistoryUI();
}
function updateHistoryUI(){
    historylist.innerHTML = "";
    history.forEach(
        (item,index) =>{
            let li = document.createElement('li');
            li.textContent = item;
            let equation = item.split('=')[0];
            li.onclick = () =>{
                display.value = equation;
            };
            let deletebtn = document.createElement("button");
            deletebtn.textContent = "x";
            deletebtn.onclick =()  =>{
                history.splice(index,1);
                updateHistoryUI();
            }
            li.appendChild(deletebtn);
            historylist.appendChild(li);
        }
    )
}