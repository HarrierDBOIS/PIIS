const elements = document.querySelectorAll('.target');

elements.forEach((element) => {
    let isDragging = false;
    let isStuck = false;
    let offsetX = 0;
    let offsetY = 0;
    let initialX = element.offsetLeft;
    let initialY = element.offsetTop;
    const constY = element.offsetTop;
    const constX = element.offsetLeft;

    element.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            offsetX = e.touches[0].clientX - element.offsetLeft;
            offsetY = e.touches[0].clientY - element.offsetTop;
        }
    });

    element.addEventListener('touchmove', (e) => {
        if (isDragging || isStuck) {
            element.style.top = e.touches[0].clientY - offsetY + 'px';
            element.style.left = e.touches[0].clientX - offsetX + 'px';
        }
    });

    element.addEventListener('touchend', () => {
        if (!isStuck) {
            isDragging = false;
            initialY = element.style.top;
            initialX = element.style.left;
        }
    });

    element.addEventListener('touchcancel', () => {
        if (isDragging || isStuck) {
            isDragging = false;
            isStuck = false;
            element.style.backgroundColor = '';
            element.style.top = constY + 'px';
            element.style.left = constX + 'px';
        }
    });


    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            isDragging = false;
            isStuck = false;
            element.style.backgroundColor = '';
            element.style.top = constY + 'px';
            element.style.left = constX + 'px';
        }
    });
});