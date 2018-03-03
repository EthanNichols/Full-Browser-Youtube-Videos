
let testURL = setInterval( function() {
	//Test for a youtube browser that is playing a video
	//Set all of the elements needed for the page
	//Stop looping through the test
	if (window.location.href.includes("youtube.com/watch")) {
		GetElements();
		clearInterval(testURL);
	}
}, 1000);

//The entire web page
//The banner for YouTube (Searchbar + YouTube button)
let htmlBody;
let topBar;
let pageContent;


//The video that will be playing
//The controls for the video
//The full browser mode button
let videoBackground;
let video;
let controls;
let videoControls;
let fullBrowserButton;

let mediaQuerier;

//Whether the video is in full browser mode or not
let fullBrowser = false;

function GetElements() {
	//Set the elements for the page and the top bar
	htmlBody = document.querySelector("html");
	topBar = document.querySelector("#masthead-container");
	pageContent = document.querySelector("#page-manager");

	mediaQuerier = pageContent.querySelectorAll("*")[0].querySelectorAll("*")[0];
	
	//Set the elements for the video and the controls
	//Create a full browser button
	//The video that is on the screen
    //The controls for the video at the bottom
    document.querySelectorAll("#player").forEach(function(element) {
    	if (element.className == "style-scope ytd-watch") {
    		videoBackground = element;
    		videoBackground.addEventListener("mouseover", UpdateButton);
    	}
    });
	video = document.querySelector(".video-stream, html5-main-video");
	controls = document.querySelector(".ytp-chrome-bottom");
	videoControls = document.querySelector(".ytp-right-controls");
	fullBrowserButton = CreateBrowserButton();

	//Place the button before the full screen button
	videoControls.insertBefore(fullBrowserButton, videoControls.querySelector(".ytp-fullscreen-button, ytp-button"));

	//Add listeners to all of the video size changers
	//Set the size of the video depending on which button is pressed
	fullBrowserButton.addEventListener("click", TestBrowserMode);
	fullBrowserButton.addEventListener("mouseover", function() {Hover(true)});
	fullBrowserButton.addEventListener("mouseout", function(){Hover(false)});
	videoControls.querySelector(".ytp-size-button, ytp-button").addEventListener("click", OriginalBrowser);
    videoControls.querySelector(".ytp-fullscreen-button, ytp-button").addEventListener("click", OriginalBrowser);
}

function CreateBrowserButton() {
	//Create the button
	let button = document.createElement("div");

	//Set the class of the button to be a 'youtube player button'
	//Set the title of the button that will be displayed
	button.className = "ytp-button";
	button.id = "FullBrowser";

	//Create an image inside of the button
	//Set the image to be drawn
	//Set the width and height of the image to the button's size
	button.append(document.createElement("img"));
	button.querySelector("img").src = chrome.extension.getURL("Images/FullBrowserButton.png");
	button.querySelector("img").style.width = "100%";
	button.querySelector("img").style.height = "100%";

	button.append(document.createElement("div"));

	Object.assign(button.querySelector("div").style, {
		backgroundColor: "#1f1f1f",
		opacity: "1",
		borderRadius: "2px",
		height: "25px",
		position: "absolute",
		top: "-36px",
		right: "1%",
		visibility: "hidden",
		textAlign: "center",
		lineHeight: "25px",
		fontFamily: '"YouTube Noto",Roboto,Arial,Helvetica,sans-serif',
		fontWeight: "500",
		fontSize: "108%",
		paddingLeft: "9px",
		paddingRight: "9px"
	});

	button.querySelector("div").append(document.createElement("p"));

	button.querySelector("div").querySelector("p").innerHTML = "Full Browser";

	//Return the button
	return button;
}

function Hover(hovering) {
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

//Change the image of the Full browser buttong depending on the mode
function UpdateButton() {
	//Display the theater mode image if the video is in full browser mode
	if (fullBrowser) {
		fullBrowserButton.children[0].src = chrome.extension.getURL("Images/TheaterModeButton.png");
	} else {
		fullBrowserButton.children[0].src = chrome.extension.getURL("Images/FullBrowserButton.png");
	}
}

function TestBrowserMode() {

	if (document.querySelector(".ytp-size-button, ytp-button").title != "Default view") {
		document.querySelector(".ytp-size-button, ytp-button").click();
	}

	if (videoControls.querySelector(".ytp-fullscreen-button, ytp-button").title == "Exit full screen") {
		videoControls.querySelector(".ytp-fullscreen-button, ytp-button").click();
	}

	//Test for the state of the browser mode
	//Set the size of the video relative to the state
	if (!fullBrowser) {
		FullBrowser();

		fullBrowserButton.children[0].src = chrome.extension.getURL("Images/TheaterModeButton.png");
		fullBrowserButton.children[1].children[0].innerHTML = "Theater mode";


	} else {
		OriginalBrowser();

		fullBrowserButton.children[0].src = chrome.extension.getURL("Images/FullBrowserButton.png");
		fullBrowserButton.children[1].children[0].innerHTML = "Full Browser";
	}
}

//Make the video fullscreen
function FullBrowser() {
    //Hide The scrollbars on the website
    htmlBody.style.overflow = "hidden";

    //Remove the banner off the browser
    topBar.style.display = "none";
    topBar.style.position = "absolute";

    pageContent.style.display = "inline";

	//Increase the size of the video to fit the entire browser
	//Move the video to the left side of the browser
	videoBackground.style.maxHeight = "100vh";
	videoBackground.style.height = "100vh";
	videoBackground.class = "style-scope";

	videoBackground.parentElement.style.marginTop = "0px";
	videoBackground.parentElement.style.width = "100vw";
	videoBackground.parentElement.className = "style-scope";

	//Change the query in this element to be 0
	//Then when you go back to the normal view set it to 882px
	mediaQuerier.attributes[0].nodeValue = "min-width: 0px";

	//Change the resolution of the video to fit the browser
	video.style.width = "100vw";
	video.style.height = "100vh";
	video.style.left = "0px";
	video.style.position = "fixed";

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
    topBar.style.display = null;
    topBar.style.position = null;

    pageContent.style.display = null;

	//Reset the size of the video
	//Center the video
	videoBackground.style.maxHeight = null;
	videoBackground.style.height = null;
	videoBackground.className = "style-scope ytd-watch";

	videoBackground.parentElement.style.marginTop = null;
	videoBackground.parentElement.style.width = null;
	videoBackground.parentElement.className = "style-scope ytd-watch";

	mediaQuerier.attributes[0].nodeValue = "min-width: 882px";

	//Set the video back to the default dimensions
	//Remove the offset of the video
	video.style.width = "100%";
	video.style.height = "100%";
	video.style.left = "0px";
	video.style.top = "0px";

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
      	TestBrowserMode();
      }
    }
  }
);