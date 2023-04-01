
car =  document.getElementById('v0');
car.addEventListener("timeupdate", function(){
    if(this.currentTime >= 3.141) {
        //var vid = document.getElementById('v0');
        //var vid = $('#v0')[0]; // jquery option
        car.pause()
        // pause video on load
        //vid.pause();
        
        // pause video on document scroll (stops autoplay once scroll started)
        if(window.onscroll == true){
            car.play()
        }
        else{
            car.pause
        }

        window.addEventListener("scroll", function(){
            car.play();
        })

        // refresh video frames on interval for smoother playback
        /*setInterval(function(){
            this.currentTime = window.pageYOffset/400;
        }, 40);*/
            }
});
console.log(window.onscroll)

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



//////////
// select video element
/*
var vid = document.getElementById('v0');
//var vid = $('#v0')[0]; // jquery option

// pause video on load
vid.pause();
 
// pause video on document scroll (stops autoplay once scroll started)
window.onscroll = function(){
    vid.pause();
};

// refresh video frames on interval for smoother playback
setInterval(function(){
    vid.currentTime = window.pageYOffset/400;
}, 189.5);*/