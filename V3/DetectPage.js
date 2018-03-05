/// Ethan Nichols
/// Ethan.Thomas.Nichols@gmail.com
/// 3 / 2 / 2018
///
/// This script is for initialization
/// Reading the URL and calling functions that need specific URLs
/// This script should only call init funcions in other scripts

"use strict"

//Test for a youtube browser that is playing a video
//Set all of the elements needed for the page
//Stop looping through the test
let testURL = setInterval( function() {
    
    let localURL = window.location.href;
    
	if (localURL.includes("youtube.com/")) {
        
        console.log("Video Page");
        
        GetControlElements();
        OverlayUpdate();
        CreateCanvas();
        GetVideoPageElements();
        
        clearInterval(testURL);
	}
    
}, 1000);