// no jQuery here, please.

// Viewport sizes

var updateViewport = function() {
    var viewport;
    var meta = document.querySelector("meta[name=viewport]");
    if (meta && meta.getAttribute('content') == "width=device-width, user-scalable=no") {
        if (window.innerWidth <= 500) {
            // phone
            viewport = 'width=400, user-scalable=no';
        } else if (window.innerWidth <= 800) {
            // tablet
            viewport = 'width=990';
        } else {
            viewport = 'width=device-width, user-scalable=no';
        }
            
        meta.setAttribute('content', viewport);
    }
};

updateViewport();
window.addEventListener('resize', updateViewport);

// Media format auxiliary attribute on <body>

var setMediaFormat = function() {
    var format;
    if (window.innerWidth <= 768) {
        format = 'mobile';
    } else if (window.innerWidth <= 992) {
        format = 'tablet'
    } else if (window.innerWidth <= 1260) {
        format = 'small-desktop';
    } else {
        format = 'large-desktop';
    }
    var body = document.querySelector("body");
    if (body) {
        body.setAttribute('data-format', format);
    }
};

window.addEventListener('DOMContentLoaded', setMediaFormat);
window.addEventListener('resize', setMediaFormat);