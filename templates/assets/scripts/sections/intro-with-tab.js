document.addEventListener("DOMContentLoaded", function () {
  const introWithTab = document.querySelector(".intro-with-tab");
  if (introWithTab) {
    const tabs = document.querySelectorAll(".intro-with-tab .tab-div .text-wrapper");
    const contents = document.querySelectorAll(".intro-with-tab .tab-text .img-wrap");
    const mobileContent = document.querySelector(".intro-with-tab .row .content");
    const dropDown = document.querySelector(".intro-with-tab button.open");
    const dropDownText = dropDown.querySelector("span");
    const contentWrap = document.querySelector(".intro-with-tab .content-wrap");
    const animationDuration = 500;
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add("active");
      contents[0].classList.add("active");
      // dropDownText = tabs[0].textContent;
      console.log(tabs)
      // Copy the first tab"s text to drop-down span and hidden content
      const tabHeading = tabs[0].querySelector(".arrow-wrap");
      const innerWrap = tabs[0].querySelector(".inner-wrapper");
      const firstTabText = tabHeading.textContent;
      const firstTabContent = innerWrap.innerHTML;
      const firstHeading = tabHeading.innerHTML
      //dropDownText.textContent = firstTabText;
      mobileContent.innerHTML = firstHeading + firstTabContent;
      innerWrap.style.height = "auto";
      innerWrap.style.display = "block";
    }
    function slideUp(element) {
      element.animate([
        { height: element.scrollHeight + "px" },
        { height: "0" }
      ], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = "0";
        element.style.display = "none"; // Hide after animation
      };
    }
    function slideDown(element) {
      element.style.display = "block"; // Show before animation
      element.animate([
        { height: "0" },
        { height: element.scrollHeight + "px" }
      ], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = element.scrollHeight + "px";
      };
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", function () {
        const target = this.querySelector(".inner-wrapper");
        document.querySelectorAll(".inner-wrapper").forEach(child => {
          if (child !== target) {
            slideUp(child);
          }
        });
        slideDown(target);
        // Remove active class from all tabs and contents
        tabs.forEach(tab => tab.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));
        // Add active class to the clicked tab and corresponding content
        tab.classList.add("active");
        contents[index].classList.add("active");
        dropDown.classList.remove("active");
        // Copy tab text to drop-down span and hidden content
        const tabHeading = tab.querySelector(".arrow-wrap");
        const headingWrap = tab.querySelector(".arrow-wrap");
        const innerWrap = tab.querySelector(".inner-wrapper");
        const tabText = tabHeading.textContent;
        //dropDownText.textContent = tabText;
        const tabContent = innerWrap.innerHTML;
        const headingContent = headingWrap.innerHTML;
        //mobileContent.innerHTML = tabContent;
        mobileContent.innerHTML = headingContent + tabContent;
        if (contentWrap.classList.contains("active")) {
          contentWrap.classList.remove("active");
        }
      });
    });
    dropDown.addEventListener("click", function () {
      contentWrap.classList.toggle("active");
      dropDown.classList.toggle("active");
    });
  }
});








document.addEventListener("DOMContentLoaded", function () {
  const introWithTab = document.querySelector(".content-with-toggle");
  if (introWithTab) {
    const tabs = document.querySelectorAll(".content-with-toggle .tab-div .text-wrapper");
    const contents = document.querySelectorAll(".content-with-toggle .tab-text .img-wrap");
    const mobileContent = document.querySelector(".content-with-toggle .row .content");
    const dropDown = document.querySelector(".content-with-toggle button.open");
    const dropDownText = dropDown.querySelector("span");
    const contentWrap = document.querySelector(".content-with-toggle .content-wrap");
    const animationDuration = 500;

    // Make the first tab and content active by default
    if (tabs.length > 0 && contents.length > 0) {
      tabs[0].classList.add("active");
      contents[0].classList.add("active");

      const tabHeading = tabs[0].querySelector(".arrow-wrap");
      const innerWrap = tabs[0].querySelector(".inner-wrapper");
      const firstTabText = tabHeading.textContent;
      const firstTabContent = innerWrap.innerHTML;
      const firstHeading = tabHeading.innerHTML;

      mobileContent.innerHTML = firstHeading + firstTabContent;
      innerWrap.style.height = "auto";
      innerWrap.style.display = "block";
    }

    // Slide up function (to hide content)
    function slideUp(element) {
      element.animate([
        { height: element.scrollHeight + "px" },
        { height: "0" }
      ], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = "0";
        element.style.display = "none"; // Hide after animation
      };
    }

    // Slide down function (to show content)
    function slideDown(element) {
      element.style.display = "block"; // Show before animation
      element.animate([
        { height: "0" },
        { height: element.scrollHeight + "px" }
      ], {
        duration: animationDuration,
        easing: "ease"
      }).onfinish = function () {
        element.style.height = element.scrollHeight + "px";
      };
    }

    tabs.forEach((tab, index) => {
      // Use mouseenter instead of mouseover for better hover control
      tab.addEventListener("mouseenter", function () {
        // Check if the tab is already active; if active, do nothing
        if (tab.classList.contains("active")) {
          return;
        }

        // Remove active class from all tabs and contents
        tabs.forEach((t, i) => {
          t.classList.remove("active");
          contents[i].classList.remove("active");

          // Slide up the previous tab content
          const previousInnerWrap = t.querySelector(".inner-wrapper");
          if (previousInnerWrap && previousInnerWrap.style.display === "block") {
            slideUp(previousInnerWrap);
          }
        });

        // Activate the current tab and content
        tab.classList.add("active");
        contents[index].classList.add("active");

        // Slide down the current tab content
        const targetInnerWrap = tab.querySelector(".inner-wrapper");
        slideDown(targetInnerWrap);

        // Copy tab text to the mobile content
        const tabHeading = tab.querySelector(".arrow-wrap");
        const innerWrap = tab.querySelector(".inner-wrapper");
        const tabContent = innerWrap.innerHTML;
        const headingContent = tabHeading.innerHTML;
        mobileContent.innerHTML = headingContent + tabContent;

        // Close the dropdown if open
        if (contentWrap.classList.contains("active")) {
          contentWrap.classList.remove("active");
        }
      });
    });

    // Toggle dropdown visibility
    dropDown.addEventListener("click", function () {
      contentWrap.classList.toggle("active");
      dropDown.classList.toggle("active");
    });
  }
});





