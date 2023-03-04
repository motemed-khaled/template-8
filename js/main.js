// start scroll bar
document.addEventListener("scroll", () => {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    document.querySelector(".scroll-bar").style.width = `${(scrollTop / height) * 100}%`;

    // start scrolltop button
    let scrollTopButton = document.querySelector(".scroll-top");
    if (localStorage.getItem("scroll")) {
        if (localStorage.getItem("scroll") === "yes") {
            if (scrollTop >=600) {
                scrollTopButton.style.display = "flex";
            } else {
                scrollTopButton.style.display = "none";
            }
        } else {
            scrollTopButton.style.display = "none";
        }
    } else {
        if (scrollTop >=600) {
            scrollTopButton.style.display = "flex";
        } else {
            scrollTopButton.style.display = "none";
        }
    }
    
    scrollTopButton.addEventListener("click", () => {
            document.documentElement.scrollTop = 0;
    })
})
// end scroll bar
// start toggle menu
let toggle = document.querySelector(".toggle-menu");
let linksUl = document.querySelector(".links");
toggle.addEventListener("click", () => {
    if (linksUl.classList.contains("show")) {
        linksUl.classList.remove("show");
    } else {
        linksUl.classList.add("show");
    }
})
// end toggle menu

// start arrow button
document.querySelector(".arrow").addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.class).scrollIntoView({ behavior: "smooth" });
 })

// end arrow button

// start option box
// show and hide option box
let iconButton = document.querySelector(".icon");
let optionBox = document.querySelector(".option");
iconButton.addEventListener("click", () => {
    optionBox.classList.toggle("active");
});

// color option
let allColor = document.querySelectorAll(".color-option ul li");
let mainColor = localStorage.getItem("color");
if (mainColor) {
    document.documentElement.style.setProperty("--main-color",mainColor);
    allColor.forEach(color => {
        color.classList.remove("active");
        if (color.dataset.color === mainColor) {
            color.classList.add("active");
        }
    })
}
// change color and active class to the target
allColor.forEach((color) => {
    color.addEventListener("click", (e) => {
        activeHandle(e);
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        window.localStorage.setItem("color", e.target.dataset.color);
    })
})

// start bullets option
let twoOption = document.querySelectorAll(".bullets-option span");
let storageBullet = localStorage.getItem("bullet-option");
if (storageBullet) {
    twoOption.forEach(option => {
        option.classList.remove("active");
        if (option.classList.contains(storageBullet)) {
            option.classList.add("active");
        }
    })
    if (storageBullet === "yes") {
        document.querySelector(".bullets").style.display = "block";
    } else {
        document.querySelector(".bullets").style.display = "none";
    }
}
// change when user check
twoOption.forEach(option => {
    option.addEventListener("click", (e) => {
        activeHandle(e);
        if (e.target.innerHTML === "Enable") {
            document.querySelector(".bullets").style.display = "block";
            localStorage.setItem("bullet-option", "yes");
        } else if (e.target.innerHTML === "Disapled") {
            document.querySelector(".bullets").style.display = "none";
            localStorage.setItem("bullet-option", "no");
        }
    });
});
// end bullets option

// start scroll top option
let scrollOption = document.querySelectorAll(".scrolltop-option span");
if (localStorage.getItem("scroll")) {
    scrollOption.forEach(option => {
        option.classList.remove("active");
        if (option.classList.contains(localStorage.getItem("scroll"))) {
            option.classList.add("active");
        }
    })
    if (localStorage.getItem("scroll") === "yes") {
        if (document.documentElement.scrollTop >=600) {
            document.querySelector(".scroll-top").style.display = "flex";
        } else {
            document.querySelector(".scroll-top").style.display = "none";
        }
    } else {
        document.querySelector(".scroll-top").style.display = "none";
    }
}
scrollOption.forEach(option => {
    option.addEventListener("click", (e) => {
        activeHandle(e);
        if (e.target.innerHTML === "Enable") {
            if (document.documentElement.scrollTop >=600) {
                document.querySelector(".scroll-top").style.display = "flex";
                localStorage.setItem("scroll", "yes");
            } else {
                document.querySelector(".scroll-top").style.display = "none";
                localStorage.setItem("scroll", "yes");
            }
        } else if (e.target.innerHTML === "Disapled") {
            document.querySelector(".scroll-top").style.display = "none";
            localStorage.setItem("scroll", "no");
        }
    })
})
// end scroll top option

// start reset all settings
let restButton = document.querySelector(".reset");
restButton.addEventListener("click", () => {
    // first color
    document.querySelectorAll(".color-option li").forEach(li => {
        li.classList.remove("active");
        if (li.classList.contains("main")) {
            li.classList.add("active");
            localStorage.setItem("color", "#03a9f4");
            document.documentElement.style.setProperty("--main-color", "#03a9f4");
        }
    });
    // second background option
    document.querySelectorAll(".background-option span").forEach(option => {
        option.classList.remove("active");
        if (option.classList.contains("yes")) {
            option.classList.add("active");
            localStorage.setItem("backOption", "yes");
            optionStat = true;
            randomBackGround(optionStat);
        }
    });
    // three bullets option
    document.querySelectorAll(".bullets-option span").forEach(bullet => {
        bullet.classList.remove("active");
        if (bullet.classList.contains("yes")) {
            bullet.classList.add("active");
            document.querySelector(".bullets").style.display = "block";
            localStorage.setItem("bullet-option", "yes");
        }
    })
    // four scroll top option
    document.querySelectorAll(".scrolltop-option span").forEach(option => {
        option.classList.remove("active");
        if (option.classList.contains("yes")) {
            option.classList.add("active");
            if (document.documentElement.scrollTop >=600) {
                document.querySelector(".scroll-top").style.display = "flex";
                localStorage.setItem("scroll", "yes");
            } else {
                document.querySelector(".scroll-top").style.display = "none";
                localStorage.setItem("scroll", "yes");
            }
        }
    })
})
// end reset all settings
// end option box

// start bullets and navbarlinks
let allNavLinks = document.querySelectorAll(".links a");
let allBullets = document.querySelectorAll(".bullets .bullet");
scrollToMainSection(allNavLinks);
scrollToMainSection(allBullets);
// end bullets and navbarlinks

// start landing section and background option
let landing = document.querySelector(".landing-page");
let backOption = document.querySelectorAll(".background-option span");
let optionStat = true;
let backgroundIntervel;
// get option from localstorage
let optionlocal = localStorage.getItem("backOption");
if (optionlocal) {
    // add active class to the option
    backOption.forEach(span => {
        span.classList.remove("active");
        if (span.classList.contains(optionlocal)) {
            span.classList.add("active");
        }
    })
    // trigger function if the optin in local storage equal yes
    if (optionlocal == "yes") {
        optionStat = true;
        randomBackGround(optionStat);
    }
}
// change state when user click
backOption.forEach(span => {
    span.addEventListener("click", (e) => {
        activeHandle(e);
        if (e.target.classList.contains("no")) {
            localStorage.setItem("backOption", "no");
            optionStat = false;
            clearInterval(backgroundIntervel);
        } else {
            localStorage.setItem("backOption", "yes");
            optionStat = true;
            randomBackGround(optionStat);
        }
    })
})

// end landing section and background option

// start progress
let ourSkill = document.querySelector(".our-skills");
let allSpan = document.querySelectorAll(".progress span");
let allPrecent = document.querySelectorAll(".precent");
window.onscroll = () => {
    if (window.scrollY >= ourSkill.offsetTop) {
        allSpan.forEach((skill, index) => {
            skill.style.width = skill.dataset.width;
            allPrecent[index].innerHTML = skill.dataset.width;
        })
    }
}
// end progress

// start gallary
let allImage = document.querySelectorAll(".box .image");
allImage.forEach(image => {
    image.addEventListener("click", (e) => {
        // create popup overlay
        let popupDev = document.createElement("div");
        popupDev.classList.add("popup-overlay");
        document.body.appendChild(popupDev);
        // create popup box
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        // create imge
        let myImage = document.createElement("div");
        myImage.classList.add("popup-image");
        let popupImage = document.createElement("img");
        popupImage.src = e.target.firstChild.src;
        myImage.appendChild(popupImage);
        popupBox.appendChild(myImage);
        document.body.appendChild(popupBox);
        //create close button
        let closeSpan = document.createElement("span");
        closeSpan.classList.add("close-span");
        closeSpan.innerHTML = "<i class='fa-solid fa-xmark'></i>"
        popupBox.appendChild(closeSpan);
    })
})

// close button click
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-span")) {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    }
})
// end gallary

// function to make random background
function randomBackGround(state) {
    if (state === true) {
        let myimage = ["../image/landing\ 2.webp", "../image/landing\ 3.jfif", "../image/landing4.jfif", "../image/landing5.jpg"];
        let count = 0;
        backgroundIntervel = setInterval(() => {
            landing.style.backgroundImage = `url("${myimage[count]}")`;
            count += 1;
            if (count === myimage.length) {
                count = 0;
            };
        }, 9000);
        };
};
    // function to scroll to the main section
function scrollToMainSection(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" });
        });
    });
}

// function handel active class
function activeHandle(ev) {
        ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");
    })
    ev.target.classList.add("active");
}
