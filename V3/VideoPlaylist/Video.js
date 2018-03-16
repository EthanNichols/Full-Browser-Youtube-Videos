///
/// Ethan Nichols
/// Ethan.Thomas.Nichols@gmail.com
/// 3 / 2 / 2018
///
/// This script is for the video iframe
/// Allowing the user to search for other videos while watching the current video
/// This script should only mess with data about the video iframe
///

"use strict"

//Iframe that holds the video that doesn't stop playing
let iframeVideo, iVideo, innerDoc;

let prevVid;

//Create the Iframe to hold the video
function SetVideo(link = null, autoplay = 0) {
    
    //Set the starting embedded video source
    let src = "https://www.youtube.com/embed/";
    
    src += link;

    //Add the autoplay aspect to the video
    src += "?autoplay=" + autoplay;
    
    //TODO
    //Add the ability to start the video at any time
    //This will be useful when the user searches something
    //So the video will continue where they were before they searched
    
    //Set the source of the video
    iframeVideo.src = src;
    
    //Display the video and allow pointer events if the link isn't null
    if (link) {
        iframeVideo.style.opacity = "1";
        iframeVideo.style.pointerEvents = null;
        
    //If the link is null don't display the video and remove pointer events
    } else {
        iframeVideo.style.opacity = "0";
        iframeVideo.style.pointerEvents = "none"
    }
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
    iframeVideo.style.width = "373px";
    iframeVideo.style.height = "210px";
    iframeVideo.style.border = "none";
    iframeVideo.style.pointerEvents = "none";
    
    SetVideo();
    
    innerDoc = iframeVideo.contentDocument || iframeVideo.contentWindow.document;
    
    UpdateVideo();
}

///Get the most updated video in the iframe
function GetInnerVideo() {
    
    //Update the innerDoc if the video is null
    if (!iVideo) {
        innerDoc = iframeVideo.contentDocument || iframeVideo.contentWindow.document;
    }
    
    //Get the most updated video
    iVideo = innerDoc.querySelector("video");
}

function UpdateVideo() {
    requestAnimationFrame(UpdateVideo);
    
    GetInnerVideo();
    
    if (iVideo == null) {
        return;
    }
    
    if (iVideo.ended && prevVid != iVideo) {
        NextVideo();
        prevVid = iVideo;
    }
}