(function () {
  const colTwoImgs = document.querySelectorAll('.nile-col-two-animation');
  if (colTwoImgs.length > 0) {
    const handleScrollingVideoBackgrounds = function () {
      colTwoImgs.forEach((element) => {
        const video = element.querySelector('video');
        const items = element.querySelectorAll('.col-two-img__item');
        if (video) {
          const topOfElement = element.getBoundingClientRect().top;
          const bottomOfElement = element.getBoundingClientRect().bottom;
          const startPoint = topOfElement;
          const endPoint = bottomOfElement - window.innerHeight;
          const animateDistance = endPoint - startPoint;
          let animateRatio = (-1 * startPoint) / animateDistance;
          if (animateRatio > 1) {
            animateRatio = 1;
          } else if (animateRatio < 0) {
            animateRatio = 0;
          }
          const contentFadeDuration = 300;
          if (768 > window.innerWidth) {
            jQuery(items[0]).fadeIn(1);
            items[0].classList.remove('fade-out');
            items[0].classList.remove('down');
            jQuery(items[1]).fadeIn(1);
            items[1].classList.remove('faded-out');
            items[1].classList.remove('down');
            jQuery(items[2]).fadeIn(1);
            items[2].classList.remove('faded-out');
            items[2].classList.remove('down');
          } else {
            if (animateRatio <= 0.33) {
              jQuery(items[0]).fadeIn(contentFadeDuration);
              items[0].classList.remove('faded-out');
              items[0].classList.remove('down');
              jQuery(items[1]).fadeOut(contentFadeDuration);
              items[1].classList.add('faded-out');
              items[1].classList.add('down');
              jQuery(items[2]).fadeOut(contentFadeDuration);
              items[2].classList.add('faded-out');
              items[2].classList.add('down');
            } else if (animateRatio <= 0.67) {
              jQuery(items[0]).fadeOut(contentFadeDuration);
              items[0].classList.add('faded-out');
              items[0].classList.remove('down');
              jQuery(items[1]).fadeIn(contentFadeDuration);
              items[1].classList.remove('faded-out');
              items[1].classList.remove('down');
              jQuery(items[2]).fadeOut(contentFadeDuration);
              items[2].classList.add('faded-out');
              items[2].classList.add('down');
            } else {
              jQuery(items[0]).fadeOut(contentFadeDuration);
              items[0].classList.add('faded-out');
              items[0].classList.remove('down');
              jQuery(items[1]).fadeOut(contentFadeDuration);
              items[1].classList.add('faded-out');
              items[1].classList.remove('down');
              jQuery(items[2]).fadeIn(contentFadeDuration);
              items[2].classList.remove('faded-out');
              items[2].classList.remove('down');
            }
          }
          if (isNaN(video.duration)) {
            video.currentTime = 0;
          } else {
            video.currentTime = video.duration * animateRatio;
          }
        }
      });
    };
    window.addEventListener('scroll', handleScrollingVideoBackgrounds);
    window.addEventListener('resize', handleScrollingVideoBackgrounds);
    window.addEventListener('DOMContentLoaded', handleScrollingVideoBackgrounds);
  }
})();
