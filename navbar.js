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

function appearAnimation(){
    const element = document.getElementById("fourth");
    const rect = element.getBoundingClientRect();
    if(rect.top.toFixed() <= 200){
       $("#dissapear").fadeOut(5000);
       $("#appear").fadeIn(5000);
       if(innerWidth >= 850){
        document.getElementById("appear").style.display = "flex";
       }
    }
}