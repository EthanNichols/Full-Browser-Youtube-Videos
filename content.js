//The entire web page
var htmlBody = document.getElementsByTagName("html")[0];

//The banner for YouTube (Searchbar + YouTube button_)
var topBar = document.getElementById("masthead-positioner");
var topBar2 = document.getElementById("masthead-positioner-height-offset");

//The video that will be playing
var video = document.getElementById("player-api");

//Whether the video is in full browser mode or not
var fullBrowser = false;

function FullBrowser() {
	//The video that is on the screen
    //The controls for the video at the bottom
	var video2 = document.getElementsByClassName("video-stream html5-main-video")[0];
	var controls = document.getElementsByClassName("ytp-chrome-bottom")[0];

    //Hide The scrollbars on the website
    htmlBody.style.overflow = "hidden";

    //Remove the banner off the browser
    topBar.style.top = "-50px";
	topBar2.style.height = "0px";

	//Increase the size of the video to fit the entire browser
	//Move the video to the left side of the browser
	video.style.position = "fixed";
	video.style.width = "100vw";
	video.style.height = "100vh";
	video.style.top = "0px";
	video.style.left = "0px";
	video.style.marginLeft = "0px";

	//Change the resolution of the video to fit the browser
	video2.style.width = "100vw";
	video2.style.height = "100vh";

	//Change the size of the controls to fit the browser
	//Remove the offset
	controls.style.width = "98%";
	controls.style.left = "1%";

	//Set that the video is in full browser mode
	fullBrowser = true;
}

function OriginalBrowser() {

	//The video that is on the screen
    //The controls for the video at the bottom
	var video2 = document.getElementsByClassName("video-stream html5-main-video")[0];
    var controls = document.getElementsByClassName("ytp-chrome-bottom")[0];

    //Make the scroll bars visible again
    htmlBody.style.overflow = null;

    //Move the top banner back into the browser
    topBar.style.top = null;
	topBar2.style.height = null;

	//Reset the size of the video
	//Center the video
	video.style.width = null;
	video.style.height = null;
	video.style.top = null;
	video.style.left = null;
	video.style.marginLeft = null;
	video.style.position = null;

	//Set the video back to the default dimensions
	//Remove the offset of the video
	video2.style.width = "100%";
	video2.style.height = "100%";
	video2.style.left = "0px";

	//Set the width of the controls to the size of the video
	controls.style.width = "98%";
	controls.style.left = "1%";

	//Set that the video isn't in full browser mode
	fullBrowser = false;
}

//Waiting for the extension button to be clicked
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      
      //Test if the video isn't full browser mode
      if (fullBrowser == false &&
      window.location.href.includes("watch")) {

      	//Set the video to display on the full browser
      	//Add a listener to the video mode and run the original size when it's clicked
      	FullBrowser();
        document.getElementsByClassName("ytp-size-button ytp-button")[0].addEventListener("click", OriginalBrowser);

	  //Test if the video is in full browser mode
      } else {

      	//Return the video back to the original size
      	OriginalBrowser();
      }
    }
  }
);