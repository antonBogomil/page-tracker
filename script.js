const CONFIG = {
    /*TODO:  ALLOWED_DEVIATION_PERCENT*/
    ALLOWED_DEVIATION_PX: 100,
    FOCUS_TIME_MS: 700,
    SCROLL_FREQUENCY: 200,
    TRACKED_ELEMENTS: ['#elem1', '#elem3', '#elem4'],
};

window.onload = function () {
    TrackerModule(CONFIG);
};

var TrackerModule = function TrackerModule(config) {
    const elements = _getElementsBySelectors(config.TRACKED_ELEMENTS);
    _init();
    function _init() {
        let timer;
        window.onscroll = _throttle(function () {
            clearTimeout(timer);
            const result = _getViewportElements();
            timer = setTimeout(() => {
                _handleResult(result)
            }, config.FOCUS_TIME_MS)
        }, config.SCROLL_FREQUENCY);
    }

    function _getElementsBySelectors(selectors) {
        const selector = selectors.join(',');
        return document.querySelectorAll(selector);
    }

    function _getViewportElements() {
        const inView = [];
        elements.forEach(function (elem) {
            var bounding = elem.getBoundingClientRect();
            var viewWidth = window.innerWidth || document.documentElement.clientWidth;
            var viewHeight = window.innerHeight || document.documentElement.clientHeight;
            if (
                bounding.top + config.ALLOWED_DEVIATION_PX >= 0 &&
                bounding.left >= 0 &&
                bounding.right <= viewWidth &&
                bounding.bottom - config.ALLOWED_DEVIATION_PX <= viewHeight
            ) {
                inView.push(elem.id);
            }
        });
        return inView;
    }

    function _handleResult(data) {
        console.log('Elements: ' + data + ' send!');
        alert('Elements: ' + data + ' send!')
    }


    function _throttle(fn, delay, scope) {
        delay || (delay = 250);
        let last,
            deferTimer;
        return function () {
            const context = scope || this;
            const now = +new Date,
                args = arguments;
            if (last && now < last + delay) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, delay);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
};

