///
/// Ethan Nichols
/// Ethan.Thomas.Nichols@gmail.com
/// 3 / 2 / 2018
///
/// This script for the YouTube video controls
/// Allowing easy access to the video controls
/// As well as creating new controls for the video
///
"use strict"

//Parent of the controls
let controlDiv;

//Video timer
let progressBar;

//Left controls
let playButton, prevVideoButton, nextVideoButton, muteButton, volumeSlider;

//Right controls
let subTitlesButton, settingsButton, multicamButton, videoSizeButton, playOnTvButton, fullScreenButton;

//Base video controls for new controls
let baseButton;

///Get the controls from the YouTube video player
///Set them to variables that can be accessed/used easily
function GetControlElements() {
    
    //Parent of the controls
    controlDiv = document.querySelector(".ytp-chrome-bottom");
    
    //Video timer
    progressBar = document.querySelector(".ytp-progress-bar-container");
    
    //Right controls
    playButton = document.querySelector(".ytp-play-button");
    prevVideoButton = document.querySelector(".ytp-prev-button");
    nextVideoButton = document.querySelector(".ytp-next-button");
    muteButton = document.querySelector(".ytp-mute-button");
    volumeSlider = document.querySelector(".ytp-volume-panel");
    
    //Left controls
    subTitlesButton = document.querySelector(".ytp-subtitles-button");
    settingsButton = document.querySelector(".ytp-settings-button");
    multicamButton = document.querySelector(".ytp-multicam-button");
    videoSizeButton = document.querySelector(".ytp-size-button");
    playOnTvButton = document.querySelector(".ytp-play-button");
    fullScreenButton = document.querySelector(".ytp-fullscreen-button");
    
    //Setup a control button similar to the current control buttons
    SetupButtonBases();
    
    //TEMP
    CreateControlButton("", "Add to playlist", "Images/PlusControl.png");
}

/// Create a button element similar to the video control buttons
function SetupButtonBases() {
    
    //Create the button div
    baseButton = document.createElement("div");
    
    //Set the class name relative to other buttons on the page
    baseButton.className = "ytp-button";
    
    //Add an image to the button and set the size to fill the button
    baseButton.append(document.createElement("img"));
	baseButton.querySelector("img").style.width = "100%";
	baseButton.querySelector("img").style.height = "100%";
    
    //Add a div to the button to display the button text
    baseButton.append(document.createElement("div"));

    //Set information about the custom button indicator
	Object.assign(baseButton.querySelector("div").style, {
		backgroundColor: "#1f1f1f",
		opacity: "0",
		borderRadius: "2px",
		height: "25px",
		position: "absolute",
		top: "-36px",
		textAlign: "center",
		lineHeight: "25px",
		fontFamily: '"YouTube Noto",Roboto,Arial,Helvetica,sans-serif',
		fontWeight: "500",
		fontSize: "108%",
		paddingLeft: "9px",
		paddingRight: "9px",
        whiteSpace: "nowrap"
	});
}


///Create a custom video button
///id - ID to access the button
///title - The text display when hovering
///imageURL - The location of the image to set on the button
function CreateControlButton(id, title, imageURL) {
    let newButton = new VideoControlButton(baseButton.cloneNode(true), id, title, imageURL);
    
    //TEMP
    //TODO
    //This will take another parameter
    //It will allow the new button to be appended
    //To the left or the right controls
    videoSizeButton.parentElement.appendChild(newButton.element);
}