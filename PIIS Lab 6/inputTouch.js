const doubleClickDelay = 300;
const singleClickDelay = 150;
const minWidth = 30;
const minHeight = 30;

window.onload = function () {
    let targets = document.querySelectorAll('.target');
    targets.forEach(target => {
        let isMove = false;
        let isSecondFinger = false;
        let isDoubleTouchMove = false;
        let width = target.clientWidth + 1;
        let height = target.clientHeight + 1;
        let lastSingleTouch = 0;
        let lastDoubleTouch = 0;
        let counter = 0;
        let isResizing = false;
        let initialDistance = 0;

        target.addEventListener('touchend', function (event) {
            event.preventDefault();
            //isOneTouchMove = false;
            if (isResizing && event.touches.length < 2) {
                isResizing = false;
                width = target.clientWidth;
                height = target.clientHeight;
                return;
            }
            target.style.zIndex = '';
            target.style.width = width + 'px';
            target.style.height = height + 'px';
            isMove = false;
            const time = performance.now() - lastSingleTouch;
            if (time > singleClickDelay) {
                let counter = 0;
            } else if (time < singleClickDelay && counter == 0) {
                //single click
                isDoubleTouchMove = false;
                counter++;
                target.style.backgroundColor = 'red';
            } else if (performance.now() - lastDoubleTouch < doubleClickDelay) {
                //double touch
                isDoubleTouchMove = true;
                isMove = true;
                counter = 0;

                startSide = target.offsetLeft;
                startUp = target.offsetTop;
                side = startSide;
                up = startUp;

                target.style.backgroundColor = 'orange';
                target.style.zIndex = '5';
                target.style.width = width * 1.1 + 'px';
                target.style.height = height * 1.1 + 'px';
            }
        });

        target.addEventListener('touchstart', function (event) {
            event.preventDefault();
            if (event.touches.length > 1 && !isDoubleTouchMove) {
                isResizing = true;
                initialDistance = getDistance(event.touches);
                width = target.clientWidth + 1;
                height = target.clientHeight + 1;
                return;
            }
            lastSingleTouch = performance.now();
            isMove = true;
            if (performance.now() - lastDoubleTouch > doubleClickDelay) {
                lastDoubleTouch = lastSingleTouch;
                counter = 0;
            }

            startSide = target.offsetLeft;
            startUp = target.offsetTop;
            side = startSide;
            up = startUp;
            offsetX = event.touches[0].clientX - side;
            offsetY = event.touches[0].clientY - up;
            target.style.zIndex = '5';
            target.style.width = width * 1.1 + 'px';
            target.style.height = height * 1.1 + 'px';
        });

        target.addEventListener('touchmove', function (event) {
            event.preventDefault();

            if (isResizing) {
                // Изменение размера при касании двумя пальцами
                let currentDistance = getDistance(event.touches);
                let scale = currentDistance / initialDistance;

                // Новые размеры с учетом минимальных значений
                let newWidth = Math.max(width * scale, minWidth);
                let newHeight = Math.max(height * scale, minHeight);

                target.style.width = newWidth + 1 + 'px';
                target.style.height = newHeight + 1 + 'px';
            }
        });

        document.addEventListener('touchmove', function (event) {
            event.preventDefault();
            if ((isMove || isDoubleTouchMove) && !isResizing) {
                var x = event.touches[0].clientX - offsetX;
                var y = event.touches[0].clientY - offsetY;
                target.style.left = x + 'px';
                target.style.top = y + 'px';
            }
        });

        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) isSecondFinger = true;

            if (isDoubleTouchMove) {
                offsetX = event.touches[0].clientX - side;
                offsetY = event.touches[0].clientY - up;
            }
        });

        document.addEventListener('touchend', function (event) {
            if (isSecondFinger && (isDoubleTouchMove || isMove)) {
                isDoubleTouchMove = false;
                isMove = false;
                isSecondFinger = false;
                target.style.zIndex = '';
                target.style.width = width + 'px';
                target.style.height = height + 'px';
                target.style.backgroundColor = 'red';
                target.style.left = startSide + 'px';
                target.style.top = startUp + 'px';
            }
            if (isDoubleTouchMove) {
                side = target.offsetLeft;
                up = target.offsetTop;
            }
        });

        function getDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
    });
};