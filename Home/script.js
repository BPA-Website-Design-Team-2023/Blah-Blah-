car =  document.getElementById('car_animation');

car.addEventListener("timeupdate", function(){
    if(this.currentTime >= 3.141) {
        this.pause();
    }
});