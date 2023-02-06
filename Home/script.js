car =  document.getElementById('car_animation');
car.addEventListener("timeupdate", function(){
    if(this.currentTime >= 3.141) {
        this.pause();
    }
});


function appearAnimation(){
    const element = document.getElementById("fourth");
    const rect = element.getBoundingClientRect();
    if(rect.top.toFixed() <= 200){
       $("#dissapear").fadeOut(5000);
       $("#appear").fadeIn(5000);
       if(innerWidth >= 850){
        document.getElementById("appear").style.display = "flex";
        //document.getElementById("fourth").style.height = "20rem";
       }
       
    }
}