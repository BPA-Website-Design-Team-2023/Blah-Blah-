

car =  document.getElementById('v0');
car.addEventListener("timeupdate", function(){
    if(this.currentTime >= 3.141) {
        //var vid = document.getElementById('v0');
        //var vid = $('#v0')[0]; // jquery option
        car.pause()
        // pause video on load
        //vid.pause();
        var frameNumber = 3.141, // start video at frame 0
        // lower numbers = faster playback
        playbackConst = 300, 
        // get page height from video duration
        setHeight = document.getElementById("set-height"), 
        // select video element         
        vid = document.getElementById('v0'); 
        // var vid = $('#v0')[0]; // jquery option



        // Use requestAnimationFrame for smooth playback
        function scrollPlay(){  
        var frameNumber  = window.pageYOffset/playbackConst;
        vid.currentTime  = frameNumber + 3.2;
        console.log(frameNumber)
        window.addEventListener("scroll", scrollPlay);
        window.requestAnimationFrame(scrollPlay);
        }

        window.requestAnimationFrame(scrollPlay);
        window.addEventListener("scroll", scrollPlay);
        
    }
}
);


/*

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

*/

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

