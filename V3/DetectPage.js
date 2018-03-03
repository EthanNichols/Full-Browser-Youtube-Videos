"use strict"

//Test for a youtube browser that is playing a video
//Set all of the elements needed for the page
//Stop looping through the test
let testURL = setInterval( function() {
    
    let localURL = window.location.href;
    
	if (localURL.includes("youtube.com/")) {
        
        console.log("Video Page");
        
        GetControlElements();
        GetVideoPageElements();
        
        clearInterval(testURL);
	}
    
}, 1000);