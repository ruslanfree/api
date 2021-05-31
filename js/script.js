'use strict'



const menuBtn = document.querySelector('.menu-btn');
let mobMenu = document.querySelector('.mob-menu');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }

    if (menuBtn.classList.contains('open')) {
        mobMenu.classList.add('active');



    } else {
        mobMenu.classList.remove('active');

    }


});


function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;

    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";

    this.nodes = document.querySelectorAll("[data-da]");

    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);


    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};


DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();


// const navLink = document.querySelectorAll('.nav-menu__list li a');

// navLink.forEach(item => {
//     item.addEventListener('click', function (e) {
//         e.preventDefault()
//         if (menuBtn.classList.contains('open') && mobMenu.classList.contains('active')) {
//             mobMenu.classList.remove('active');
//             menuBtn.classList.remove('open');
//         }
//         const blockId = item.getAttribute('href').substr(1)
//         document.getElementById(blockId).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         })
//     })


// })
;

window.addEventListener("load", windowLoadHandler, false);

//for debug messages
var Debugger = function () { };
Debugger.log = function (message) {
    try {
        console.log(message);
    }
    catch (exception) {
        return;
    }
}

function windowLoadHandler() {
    canvasApp();
}

// function canvasSupport() {
// 	return Modernizr.canvas;
// }


function canvasApp() {
    // if (!canvasSupport()) {
    // 	return;
    // }

    var theCanvas = document.querySelector(".canvas-circle");
    var context = theCanvas.getContext("2d");

    var displayWidth;
    var displayHeight;
    var timer;
    var wait;
    var count;
    var numToAddEachFrame;
    var particleList;
    var recycleBin;
    var particleAlpha;
    var r, g, b;
    var fLen;
    var m;
    var projCenterX;
    var projCenterY;
    var zMax;
    var turnAngle;
    var turnSpeed;
    var sphereRad, sphereCenterX, sphereCenterY, sphereCenterZ;
    var particleRad;
    var zeroAlphaDepth;
    var randAccelX, randAccelY, randAccelZ;
    var gravity;
    var rgbString;

    var p;
    var outsideTest;
    var nextParticle;
    var sinAngle;
    var cosAngle;
    var rotX, rotZ;
    var depthAlphaFactor;
    var i;
    var theta, phi;
    var x0, y0, z0;

    init();

    function init() {
        wait = 1;
        count = wait - 1;
        numToAddEachFrame = 10;


        r = 65;
        g = 173;
        b = 14;

        rgbString = "rgba(" + r + "," + g + "," + b + ",";
        particleAlpha = 1;

        displayWidth = theCanvas.width;
        displayHeight = theCanvas.height;

        fLen = 50; //represents the distance from the viewer to z=0 depth.


        projCenterX = displayWidth / 2;
        projCenterY = displayHeight / 2;

        //we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
        zMax = fLen;

        particleList = {};
        recycleBin = {};

        //random acceleration factors - causes some random motion
        randAccelX = 0.1;
        randAccelY = 0.1;
        randAccelZ = 0.1;

        gravity = 0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

        particleRad = 2.5;
        sphereRad = 180;
        sphereCenterX = 0;
        sphereCenterY = 0;
        sphereCenterZ = -100 - sphereRad;

        //alpha values will lessen as particles move further back, causing depth-based darkening:
        zeroAlphaDepth = -1150;

        turnSpeed = 5 * Math.PI / 1600; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
        turnAngle = 0; //initial angle

        timer = setInterval(onTimer, 1000 / 200);
    }

    function onTimer() {
        //if enough time has elapsed, we will add new particles.		
        count++;
        if (count >= wait) {

            count = 0;
            for (i = 0; i < numToAddEachFrame; i++) {
                theta = Math.random() * 2 * Math.PI;
                phi = Math.acos(Math.random() * 2 - 1);
                x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
                y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
                z0 = sphereRad * Math.cos(phi);


                var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);


                p.attack = 50;
                p.hold = 50;
                p.decay = 200;
                p.initValue = 0;
                p.holdValue = particleAlpha;
                p.lastValue = 0;

                //the particle will be stuck in one place until this time has elapsed:
                p.stuckTime = 80 + Math.random() * 20;

                p.accelX = 0;
                p.accelY = gravity;
                p.accelZ = 0;
            }
        }

        //update viewing angle
        turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
        sinAngle = Math.sin(turnAngle);
        cosAngle = Math.cos(turnAngle) * 2;

        //background fill
        context.fillStyle = "#110514f8";
        context.fillRect(0, 0, displayWidth, displayHeight);

        //update and draw particles
        p = particleList.first;
        while (p != null) {
            //before list is altered record next particle
            nextParticle = p.next;

            //update age
            p.age++;

            //if the particle is past its "stuck" time, it will begin to move.
            if (p.age > p.stuckTime) {
                p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
                p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
                p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

                p.x += p.velX;
                p.y += p.velY;
                p.z += p.velZ;
            }


            rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
            rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
            m = fLen / (fLen - rotZ);
            p.projX = rotX * m + projCenterX;
            p.projY = p.y * m + projCenterY;

            //update alpha according to envelope parameters.
            if (p.age < p.attack + p.hold + p.decay) {
                if (p.age < p.attack) {
                    p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
                }
                else if (p.age < p.attack + p.hold) {
                    p.alpha = p.holdValue;
                }
                else if (p.age < p.attack + p.hold + p.decay) {
                    p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
                }
            }
            else {
                p.dead = true;
            }

            //see if the particle is still within the viewable range.
            if ((p.projX > displayWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > displayHeight) || (rotZ > zMax)) {
                outsideTest = true;
            }
            else {
                outsideTest = false;
            }

            if (outsideTest || p.dead) {
                recycle(p);
            }

            else {
                //depth-dependent darkening
                depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
                depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
                context.fillStyle = rgbString + depthAlphaFactor * p.alpha + ")";

                //draw
                context.beginPath();
                context.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false);
                context.closePath();
                context.fill();
            }

            p = nextParticle;
        }
    }

    function addParticle(x0, y0, z0, vx0, vy0, vz0) {
        var newParticle;
        var color;

        //check recycle bin for available drop:
        if (recycleBin.first != null) {
            newParticle = recycleBin.first;
            //remove from bin
            if (newParticle.next != null) {
                recycleBin.first = newParticle.next;
                newParticle.next.prev = null;
            }
            else {
                recycleBin.first = null;
            }
        }
        //if the recycle bin is empty, create a new particle (a new ampty object):
        else {
            newParticle = {};
        }

        //add to beginning of particle list
        if (particleList.first == null) {
            particleList.first = newParticle;
            newParticle.prev = null;
            newParticle.next = null;
        }
        else {
            newParticle.next = particleList.first;
            particleList.first.prev = newParticle;
            particleList.first = newParticle;
            newParticle.prev = null;
        }

        //initialize
        newParticle.x = x0;
        newParticle.y = y0;
        newParticle.z = z0;
        newParticle.velX = vx0;
        newParticle.velY = vy0;
        newParticle.velZ = vz0;
        newParticle.age = 0;
        newParticle.dead = false;
        if (Math.random() < 0.5) {
            newParticle.right = true;
        }
        else {
            newParticle.right = false;
        }
        return newParticle;
    }

    function recycle(p) {
        //remove from particleList
        if (particleList.first == p) {
            if (p.next != null) {
                p.next.prev = null;
                particleList.first = p.next;
            }
            else {
                particleList.first = null;
            }
        }
        else {
            if (p.next == null) {
                p.prev.next = null;
            }
            else {
                p.prev.next = p.next;
                p.next.prev = p.prev;
            }
        }
        //add to recycle bin
        if (recycleBin.first == null) {
            recycleBin.first = p;
            p.prev = null;
            p.next = null;
        }
        else {
            p.next = recycleBin.first;
            recycleBin.first.prev = p;
            recycleBin.first = p;
            p.prev = null;
        }
    }
}

;

const sliderBody = document.querySelector('.slider__body');
const slide = document.querySelectorAll('.slide');
const btnNext = document.querySelector('.slider__button--next');
const btnPrev = document.querySelector('.slider__button--prev');
let slideWidth = sliderBody.clientWidth;
btnNext.addEventListener('click', slideMoveLeft);
btnPrev.addEventListener('click', slideMoveRight);
sliderBody.addEventListener('touchstart', touch);
sliderBody.addEventListener('touchmove', touchHend);

let x1 = null;
let y1 = null;
let counter = 0;
function touchHend(e) {
    if (!x1 || !y1) {
        return false;
    }
    let x2 = e.touches[0].clientX;
    let y2 = e.touches[0].clientY;
    let xMove = x2 - x1;
    let yMove = y2 - y1;
    if (Math.abs(xMove) > Math.abs(yMove)) {
        if (xMove < 0) {
            slideMoveLeft()
        }
        else {
            slideMoveRight()
        }
    }
    x1 = null;
    y1 = null;
}
function touch(e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    x1 = x;
    y1 = y;
}
function slideMoveLeft() {
    if (counter === slide.length - 1) {
        sliderBody.style.transform = 'translate(0)';
        btnNext.style.opacity = '.3';
    } else {
        counter += 1
        sliderBody.style.transition = '.3s';
        btnPrev.style.opacity = '1';
    }
    sliderBody.style.transform = `translate(${-slideWidth * counter}px)`;
}
function slideMoveRight() {
    if (counter > 0) {
        counter -= 1;
        btnNext.style.opacity = '1';
        sliderBody.style.transition = '.3s';
    } else {
        btnPrev.style.opacity = '.3';
    }
    sliderBody.style.transform = `translate(${-slideWidth * counter}px)`;
}
let head = document.querySelector('.fullscreen');
const footerArrow = document.querySelector('.footer__arrow');
footerArrow.addEventListener('click', function () {

    head.scrollIntoView({
        behavior: 'smooth'
    })

})
const headerSearch = document.querySelector('.header__search');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__content');
const popupClose = document.querySelector('.popup__close');
headerSearch.addEventListener('click', function () {
    popup.classList.add('active');
});
popup.addEventListener('click', function (e) {

    if (e.target == popupForm || e.target == popupClose) {
        popup.classList.remove('active')
    }
})