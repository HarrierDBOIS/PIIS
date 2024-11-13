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

    element.addEventListener('mousedown', (e) => {
        if (e.buttons === 1) {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
        }
    });

    element.addEventListener('dblclick', () => {
        isStuck = true;
        element.style.backgroundColor = 'green'; // изменяем цвет элемента
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging || isStuck) {
            element.style.top = e.clientY - offsetY + 'px';
            element.style.left = e.clientX - offsetX + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (!isStuck) {
            isDragging = false;
            initialY = element.style.top;
            initialX = element.style.left;
        }
    });

    document.addEventListener('click', () => {
        if (isStuck) {
            isStuck = false;
            isDragging = false;
            element.style.backgroundColor = '';
            element.style.top = initialY + 'px';
            element.style.left = initialX + 'px';
            // восстанавливаем исходный цвет элемента
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isDragging || isStuck) {
            isDragging = false;
            isStuck = false;
            element.style.backgroundColor = '';
            element.style.top = constY + 'px';
            element.style.left =  + constX + 'px';
        }
    });
});
