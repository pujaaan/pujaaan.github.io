currentHighlightedText = 0;
inputList= [];

inputText= ""
textToDisplay="";

function learn(){
    currentHighlightedText = 0;
    inputText = document.getElementById("input-textbox").value.replace(/[\s]+$/g, "").replace(/\n/g, " ---newline--- ");
    inputList = inputText.split(" ").filter(word => word !== "")

    if(inputList !== []){
        highlightText();
        document.getElementById("input-container").classList.add('hide');
        document.getElementById("learn-container").classList.remove('hide');
    }


}

function highlightText(markAsError = false, previous = false){
    let arrayWithHighLightedText = [...inputList];
    let htmlTag = markAsError ? "<span class='error highlight'>" : "<span class='highlight'>" 

    while(arrayWithHighLightedText[currentHighlightedText] === "---newline---"){
        if(previous){
            currentHighlightedText -= 1;
        }
        else{
            currentHighlightedText += 1;
        }
    }

    arrayWithHighLightedText[currentHighlightedText] = htmlTag + arrayWithHighLightedText[currentHighlightedText] + "</span>"  

    if(markAsError){
        inputList[currentHighlightedText] = "<span class='error'>" + inputList[currentHighlightedText] + "</span>";
    }

    textToDisplay = arrayWithHighLightedText.join(" ").replace(/[\s]*---newline---[\s]*/g, '<br/>').trim();
    document.getElementById("display-text").innerHTML = textToDisplay

    changeErrorButtonLabel()
}

function next(){
    if(currentHighlightedText < inputList.length -1){
        currentHighlightedText++;
        highlightText()
    }
}

function previous(){
    if(currentHighlightedText > 0){
        currentHighlightedText--;
        highlightText(false, true)
    }
}

function markError(){
    if(inputList[currentHighlightedText].includes("<span class='error'>")){
        inputList[currentHighlightedText] = inputList[currentHighlightedText].replace("<span class='error'>","").replace("</span>","")
        highlightText();
    }
    else{
        highlightText(true)
    }
}

function changeErrorButtonLabel(){
    if(inputList[currentHighlightedText].includes("<span class='error'>")){
        document.getElementById("error-btn").innerHTML = "Unmark as mistake"
    }
    else{
        document.getElementById("error-btn").innerHTML = "Mark as mistake"
    }
}


function edit(){
    document.getElementById("input-container").classList.remove('hide');
    document.getElementById("learn-container").classList.add('hide');
}

document.addEventListener("keyup", event => {
    if(document.getElementById("input-container").classList.contains("hide")){
        if (event.keyCode === 39) {
            next()
        }
        else if (event.keyCode === 37) {
            previous()
        }
        else if (event.keyCode === 13) {
            markError()
        }
    }
});
