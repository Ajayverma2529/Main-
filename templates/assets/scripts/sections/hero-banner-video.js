(function () {
    let videoOverlay = document.querySelector(".hero-banner .banner-video-overlay");
    let playButton = document.querySelector(".hero-banner .play-icon");
    let closeButton = document.querySelector(".hero-banner .banner-video-overlay .close-btn");
    let iframe = document.querySelector(".hero-banner .banner-video-overlay iframe");
    let overlay = document.querySelector(".hero-banner .banner-video-overlay .overlay");

    if (iframe) {
        let url = document.querySelector(".play-icon").getAttribute("data-src");
        let videoSrc = url + "?autoplay=1";

        playButton.addEventListener("click", () => {
            videoOverlay.classList.add("active");
            setAttributes(iframe, { src: videoSrc });
        });

        closeButton.addEventListener("click", () => {
            videoOverlay.classList.toggle("active");

            if (iframe.hasAttribute("src")) {
                iframe.removeAttribute("src");
            }
        });

        overlay.addEventListener("click", () => {
            videoOverlay.classList.remove("active");

            if (iframe.hasAttribute("src")) {
                iframe.removeAttribute("src");
            }
        });
    }

    //Multiple Attribute Function
    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    window.scrollTo(0,0);

})();
