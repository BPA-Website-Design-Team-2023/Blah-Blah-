

car =  document.getElementById('v0');
car.addEventListener("timeupdate", function(){
    if(this.currentTime >= 3.141) {

        //var vid = $('#v0')[0]; // jquery option
        car.pause()
        // pause video on load
        //vid.pause();
        var frameNumber = 3.141, // start video at frame 0
        // lower numbers = faster playback
        playbackConst = 300, 
        //300
        // get page height from video duration
        setHeight = document.getElementById("set-height"), 
        // select video element         
        vid = document.getElementById('v0'); 
        // var vid = $('#v0')[0]; // jquery option

        document.querySelector("body").style.overflowY = "invisible"

        // Use requestAnimationFrame for smooth playback
        function scrollPlay(){  
            var frameNumber  = window.pageYOffset/playbackConst;
            vid.currentTime  = frameNumber + 3.2;
            window.addEventListener("scroll", scrollPlay);
            window.requestAnimationFrame(scrollPlay);
        }

        window.requestAnimationFrame(scrollPlay);
        window.addEventListener("scroll", scrollPlay);
    }
    if(this.currentTime >= 3){
        document.querySelector("body").style.overflowY = "scroll"
    }
    console.log(this.currentTime)

}
);

window.onbeforeunload = function(){
    window.scrollTo(0,0)
}

