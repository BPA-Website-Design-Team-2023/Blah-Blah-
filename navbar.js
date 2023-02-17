function dropDown(){
    document.getElementById("before").style.display = "none";
    document.getElementById("after").style.display = "block";
    document.getElementById("container").style.display = "block";
}
function goUp(){
    document.getElementById("before").style.display = "block";
    document.getElementById("after").style.display = "none";
    document.getElementById("container").style.display = "none";
}



//Contact Us

function popDown(){
    document.getElementById("contact").style.display = "none";
    document.getElementById("opacity").style.display = "none";
    document.querySelector("*").style.overflowY = "scroll"
    
}
function popUp(){
    document.getElementById("contact").style.display = "block";
    document.getElementById("opacity").style.display = "block";
    document.querySelector("*").style.overflowY = "hidden"
    
}
