const ALLOWED_DISTANCE_PX = 100;

function send(data) {
    console.log( 'Elements: ' + data + ' send!');
    alert('Elements: ' + data + ' send!')
}
window.onload = function () {
    let tracked;
    let timer;
    window.onscroll = throttle(function () {
        clearInterval(timer);
        tracked = getViewportElement();
        console.log(tracked);
        timer = setTimeout(() => {
            if (tracked) send(tracked)
        },1000)
    }, 200);

    function getViewportElement() {
        const container = document.querySelector('.container');
        const elems = container.querySelectorAll('div');
        const inView = [];
        elems.forEach(function (elem, i) {
            var bounding = elem.getBoundingClientRect();
            var viewWidth = window.innerWidth || document.documentElement.clientWidth;
            var viewHeight = window.innerHeight || document.documentElement.clientHeight;
            if (
                bounding.top + ALLOWED_DISTANCE_PX >= 0 &&
                bounding.left >= 0 &&
                bounding.right <= viewWidth &&
                bounding.bottom - ALLOWED_DISTANCE_PX <= viewHeight
            ) {
                inView.push(elem.id);
            }
        });
        return inView;
    }
};
function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;
        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}