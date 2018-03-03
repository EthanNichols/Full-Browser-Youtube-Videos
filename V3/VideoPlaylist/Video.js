"use strict"

//Iframe that holds the video that doesn't stop playing
let iframeVideo;

//Create the Iframe to hold the video
function SetVideo(autoplay) {
    
    //If there is no video, set the src to a embedded youtube video
    if (!document.URL.includes("watch")) {
        iframeVideo.src = "https://www.youtube.com/embed/";
        return;
    }
    
    //Set the starting embedded video source
    let src = "https://www.youtube.com/embed/";
    
    //Add the video ID to the source
    src += document.URL.split('=')[1].substr(0, 11);

    //Add the autoplay aspect to the video
    src += "?autoplay=" + autoplay;
    
    //TODO
    //Add the ability to start the video at any time
    //This will be useful when the user searches something
    //So the video will continue where they were before they searched
    
    //Set the source of the video
    iframeVideo.src = src;
}

///Get elements for the video
function GetVideoPageElements() {
    
    //Create the iframe and give it an id
    iframeVideo = document.createElement("iframe");
    iframeVideo.id = "playlistVideo";
    
    //Append the iframe to the document
    document.querySelector("body").appendChild(iframeVideo);
    
    //Set information about the iframe video
    iframeVideo.style.zIndex = "10000";
    iframeVideo.style.bottom = "0px";
    iframeVideo.style.left = "0px";
    iframeVideo.style.position = "fixed";
    iframeVideo.style.width = "20%";
    iframeVideo.style.height = "25%";
    iframeVideo.style.border = "none";
    
    //TEMP
    console.log("Created Video");
    
    //Set the video that will play in the iframe
    SetVideo(0);
}