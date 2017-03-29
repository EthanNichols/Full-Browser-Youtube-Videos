
var testURL = setInterval( function() {
	//Test for a youtube browser that is playing a video
	//Set all of the elements needed for the page
	//Stop looping through the test
	if (window.location.href.includes("watch")) {
		getElements();
		clearInterval(testURL);
	}
}, 1000);

//The entire web page
//The banner for YouTube (Searchbar + YouTube button)
var htmlBody;
var topBar;
var topBar2;

//The video that will be playing
//The controls for the video
//The full browser mode button
var video;
var video2;
var controls;
var videoControls;
var videoResizeButton;
var fullBrowserButton;

//Whether the video is in full browser mode or not
var fullBrowser = false;

function getElements() {
	//Set the elements for the page and the top bar
	htmlBody = document.getElementsByTagName("html")[0];
	topBar = document.getElementById("masthead-positioner");
	topBar2 = document.getElementById("masthead-positioner-height-offset");
	
	//Set the elements for the video and the controls
	//Create a full browser button
	//The video that is on the screen
    //The controls for the video at the bottom
	video = document.getElementById("player-api");
	video2 = document.getElementsByClassName("video-stream html5-main-video")[0];
	controls = document.getElementsByClassName("ytp-chrome-bottom")[0];
	videoControls = document.getElementsByClassName("ytp-right-controls")[0];
	videoResizeButton = document.getElementsByClassName("ytp-size-button ytp-button")[0];
	fullBrowserButton = createBrowserButton();

	//Place the button before the full screen button
	videoControls.insertBefore(fullBrowserButton, document.getElementsByClassName("ytp-fullscreen-button ytp-button")[0]);

	//Add listeners to all of the video size changers
	//Set the size of the video depending on which button is pressed
	fullBrowserButton.addEventListener("click", testBrowserMode);
	fullBrowserButton.addEventListener("mouseover", function() {hover(true)});
	fullBrowserButton.addEventListener("mouseout", function(){hover(false)});
	videoResizeButton.addEventListener("click", OriginalBrowser);
    document.getElementsByClassName("ytp-fullscreen-button ytp-button")[0].addEventListener("click", OriginalBrowser);
}

function createBrowserButton() {
	//Create the button
	var button = document.createElement("button");

	//Set the class of the button to be a 'youtube player button'
	//Set the title of the button that will be displayed
	button.className = "ytp-button";

	//Create an image inside of the button
	//Set the image to be drawn
	//Set the width and height of the image to the button's size
	button.append(document.createElement("img"));
	button.children[0].src = chrome.extension.getURL("Images/FullBrowserButton.png");
	button.children[0].style.width = "100%";
	button.children[0].style.height = "100%";

	button.append(document.createElement("div"));

	Object.assign(button.children[1].style, {
		backgroundColor: "black",
		opacity: ".8",
		borderRadius: "2px",
		height: "25px",
		position: "absolute",
		top: "-36px",
		right: "1%",
		visibility: "hidden",
		textAlign: "center",
		lineHeight: "25px",
		paddingLeft: "9px",
		paddingRight: "9px"
	});

	button.children[1].append(document.createElement("p"));
	Object.assign(button.children[1].children[0].style, {
		fontWeight: "bold"
	});

	//Return the button
	return button;
}

function hover(hovering) {
	if (hovering) {
		fullBrowserButton.children[1].style.visibility = 'visible';

		if (!fullBrowser) {
			fullBrowserButton.children[1].children[0].innerHTML = "Full browser";
		} else {
			fullBrowserButton.children[1].children[0].innerHTML = "Theater mode";
		}
	} else {
		fullBrowserButton.children[1].style.visibility = 'hidden';
	}
}

function testBrowserMode() {

	if (document.getElementsByClassName("ytp-size-button ytp-button")[0].title != "Default view") {
		document.getElementsByClassName("ytp-size-button ytp-button")[0].click();
	}

	//Test for the state of the browser mode
	//Set the size of the video relative to the state
	if (!fullBrowser) {
		FullBrowser();

		fullBrowserButton.children[0].src = chrome.extension.getURL("Images/TheaterModeButton.png");

	} else {
		OriginalBrowser();

		fullBrowserButton.children[0].src = chrome.extension.getURL("Images/FullBrowserButton.png");
	}
}

//Make the video fullscreen
function FullBrowser() {
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

//Make the video back to the original size
function OriginalBrowser() {
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

      if (window.location.href.includes("watch")) {
      	//Check the state of the video
      	testBrowserMode();
      }
    }
  }
);