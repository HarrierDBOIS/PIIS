window.onload = function () {
    let targets = document.querySelectorAll('.target');
    targets.forEach(target => {
        let isOneClickMove = false;
        let isDoubleClickMove = false;
        let width = target.clientWidth + 1;
        let height = target.clientHeight + 1;
        target.addEventListener('mousedown', function (event) {
            event.preventDefault();
            if (isDoubleClickMove) return;
            isOneClickMove = true;
            side = target.offsetLeft;
            up = target.offsetTop;
            offsetX = event.clientX - side;
            offsetY = event.clientY - up;
            target.style.zIndex = '5';
            target.style.width = width * 1.1 + 'px';
            target.style.height = height * 1.1 + 'px';
        });

        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isOneClickMove || isDoubleClickMove) {
                var x = event.clientX - offsetX;
                var y = event.clientY - offsetY;
                target.style.left = x + 'px';
                target.style.top = y + 'px';
            }
        });

        target.addEventListener('mouseup', function (event) {
            event.preventDefault();
            if (isDoubleClickMove) return;
            isOneClickMove = false;
            target.style.zIndex = '';
            target.style.width = width + 'px';
            target.style.height = height + 'px';
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && (isDoubleClickMove || isOneClickMove)) {
                isDoubleClickMove = false;
                isOneClickMove = false;
                target.style.zIndex = '';
                target.style.width = width + 'px';
                target.style.height = height + 'px';
                target.style.backgroundColor = 'red';
                target.style.left = side + 'px';
                target.style.top = up + 'px';
            }
        });

        target.addEventListener('dblclick', function (event) {
            event.preventDefault();
            isDoubleClickMove = true;
            side = target.offsetLeft;
            up = target.offsetTop;
            offsetX = event.clientX - side;
            offsetY = event.clientY - up;
            target.style.zIndex = '5';
            target.style.width = width * 1.1 + 'px';
            target.style.height = height * 1.1 + 'px';
            target.style.backgroundColor = 'orange';
        });

        target.addEventListener('click', function (event) {
            event.preventDefault();
            isDoubleClickMove = false;
            target.style.zIndex = '';
            target.style.width = width + 'px';
            target.style.height = height + 'px';
            target.style.backgroundColor = 'red';
        });
    });
};