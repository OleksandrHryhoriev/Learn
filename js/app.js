(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("resize", (() => {
        if (document.documentElement.classList.contains("menu-open")) functions_menuClose();
    }));
    window.addEventListener("click", (e => {
        let target = e.target;
        if (document.documentElement.classList.contains("menu-open") && !target.closest(".header__content") && !target.closest(".icon-menu")) functions_menuClose();
    }));
    const transformAvatars = () => {
        const students = document.querySelectorAll(".students-intro__item");
        for (let i = 0; i < students.length; i++) students[i].style.left = `${i * 28}px`;
    };
    setTimeout(transformAvatars, 4500);
    const courseCards = document.querySelectorAll(".courseCard");
    for (let i = 0; i < courseCards.length; i++) courseCards[i].style.transitionDelay = `${i * .1}s`;
    const faqs = document.querySelectorAll(".spoller-faq");
    for (let i = 0; i < faqs.length; i++) faqs[i].style.transitionDelay = `${i * .1}s`;
    let script_slideUp = (target, duration = 500) => {
        if (!target.classList.contains("_slide")) {
            target.style.transitionProperty = "height";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = `0px`;
            window.setTimeout((() => {
                target.hidden = true;
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
            }), duration);
        }
    };
    let script_slideDown = (target, duration = 500) => {
        if (!target.classList.contains("_slide")) {
            target.hidden = target.hidden ? false : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = `0px`;
            target.offsetHeight;
            target.style.transitionProperty = "height";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
            }), duration);
        }
    };
    let script_slideToggle = (target, duration = 500) => {
        if (target.hidden) return script_slideDown(target, duration); else return script_slideUp(target, duration);
    };
    const spollerTitles = document.querySelectorAll(".spoller-faq__title");
    spollerTitles.forEach((item => item.nextElementSibling.hidden = true));
    const activateSpoller = () => {
        const spollers = document.querySelector(".faq__spollers");
        spollers.addEventListener("click", (e => {
            if (e.target.closest(".spoller-faq__title")) {
                let target = e.target.closest(".spoller-faq__title");
                let spollerText = target.nextElementSibling;
                if (!target.classList.contains("_active")) {
                    const activeSpoller = spollers.querySelector(".spoller-faq__title._active");
                    if (activeSpoller) {
                        activeSpoller.classList.remove("_active");
                        script_slideToggle(activeSpoller.nextElementSibling);
                    }
                    target.classList.add("_active");
                    script_slideToggle(spollerText);
                } else {
                    target.classList.remove("_active");
                    script_slideToggle(spollerText);
                }
            }
        }));
    };
    activateSpoller();
    const animateAbout = () => {
        const buttons = document.querySelectorAll(".about__button");
        buttons.forEach((button => button.addEventListener("click", (() => {
            let buttonId = button.dataset.id;
            const targetCard = document.querySelector(`.card-about[data-target="${buttonId}"]`);
            const visibleCard = document.querySelector(".card-about[data-target='visible']");
            const visibleButton = document.querySelector(".about__button[data-id='visible']");
            visibleCard.dataset.target = `${buttonId}`;
            visibleButton.dataset.id = `${buttonId}`;
            targetCard.dataset.target = "visible";
            button.dataset.id = "visible";
        }))));
    };
    animateAbout();
    const addTransitionDelay = () => {
        const buttons = document.querySelectorAll(".about__button");
        for (let i = 0; i < buttons.length; i++) buttons[i].style.transitionDelay = `${i * .2 + 2}s`;
    };
    addTransitionDelay();
    let scrollAnimation = function() {
        const animationBlocks = document.querySelectorAll("._anim-block");
        if (animationBlocks.length > 0) {
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let i = 0; i < animationBlocks.length; i++) {
                    const animItem = animationBlocks[i], animItemHeight = animItem.offsetHeight, animItemOffset = offset(animItem).top, animStart = 2;
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;
                    if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_anim-active");
                    if (animItem.classList.contains("_anim-active")) window.setTimeout((() => {
                        animItem.style.removeProperty("transition-delay");
                    }), 4e3);
                }
            }
            function offset(el) {
                const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                };
            }
            setTimeout((() => {
                animOnScroll();
            }), 1e3);
        }
    };
    scrollAnimation();
    isWebp();
    menuInit();
})();