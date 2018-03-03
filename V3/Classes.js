"use strict"

///Class for new video control buttons
class VideoControlButton {
    constructor(element, id, title, imageURL) {
        
        //Set the control element
        this.element = element;
        
        //Set information about the control
        this.element.id = id;
        this.element.querySelector("div").innerHTML = title;
        this.element.querySelector("img").src = chrome.extension.getURL(imageURL);
        
        //Test when the mouse enters and exits the control
        this.element.onmouseover = this.hover;
        this.element.onmouseout = this.hoverOut;
    }
    
    hover() {
        
        let text = this.querySelector("div")
        
        //Calculate the offset of the text indicator
        let xOffset = (text.offsetWidth - 36) / 2;
        
        //If the control is the last one then double the offset
        if (this.nextElementSibling == null) {
            xOffset *= 2;
        }
        
        //Set the offset and make the text visible
        text.style.transform = "translateX(-" + xOffset + "px)";
        text.style.opacity = "1";
    }
    hoverOut() {
        //Make the text invisible
        this.querySelector("div").style.opacity = "0";
    }
}