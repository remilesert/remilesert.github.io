$(document).ready(function () {
    var iosDevice = iOS();

    var iosOff = $('.ios-off');
    for (let index = 0; index < iosOff.length; index++) {
        const element = iosOff[index];
        if(iosDevice)
            element.classList.add("hided");
    }

    var iosOn = $('.ios-on');
    for (let index = 0; index < iosOn.length; index++) {
        const element = iosOn[index];
        if(!iosDevice)
            element.classList.add("hided");
    }
});

// Detect iOS devices : true or false
function iOS() 
{
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}