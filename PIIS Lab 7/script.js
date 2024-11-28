const svg = document.getElementById('canvas');
const circleCountElem = document.getElementById('circleCount');
const rectangleCountElem = document.getElementById('rectangleCount');

// flag, который указывает, происходит ли
//    рисование в данный момент.
let isDrawing = false;

// Координаты начала рисования.
let startX, startY;

// Тип фигуры, которую рисуют.
let currentShape;

// количество нарисованных фигур.
let circleCount = 0;
let rectangleCount = 0;

// 3. Обработчик события mousedown.
//    Он начинает рисование.
svg.addEventListener('mousedown', event => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;

    // 4. Определение типа фигуры, которую
    //    рисуют.
    const shapeSelector = document.getElementsByName('shape');
    let selectedValue;
    for (const shape of shapeSelector) {
        if (shape.checked) {
            selectedValue = shape.value;
            break;
        }
    }

    // 5. Создание элемента circle или rect,
    //    в зависимости от выбранного типа.
    if (selectedValue === 'circle') {
        currentShape = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
        );
        currentShape.setAttribute('cx', startX);
        currentShape.setAttribute('cy', startY);
        currentShape.setAttribute('r', 0);
        currentShape.setAttribute('fill', 'rgba(0, 0, 255, 1)');
        svg.appendChild(currentShape);
    } else if (selectedValue === 'rectangle') {
        currentShape = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
        );
        currentShape.setAttribute('x', startX);
        currentShape.setAttribute('y', startY);
        currentShape.setAttribute('width', 0);
        currentShape.setAttribute('height', 0);
        currentShape.setAttribute('fill', 'rgba(255, 0, 0, 1)');
        svg.appendChild(currentShape);
    }
});

// 6. Обработчик события mousemove.
//    Он рисует фигуру.
svg.addEventListener('mousemove', event => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    if (currentShape) {
        // 7. изменение размера фигуры,
        //    в зависимости от типа.
        if (currentShape.tagName === 'circle') {
            const radius = Math.sqrt(
                Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
            );
            currentShape.setAttribute('r', radius);
        } else if (currentShape.tagName === 'rect') {
            const width = currentX - startX;
            const height = currentY - startY;

            currentShape.setAttribute('x', Math.min(startX, currentX));
            currentShape.setAttribute('y', Math.min(startY, currentY));
            currentShape.setAttribute('width', Math.abs(width));
            currentShape.setAttribute('height', Math.abs(height));
        }
    }
});

// 8. Обработчик события mouseup.
//    Он прекращает рисование.
svg.addEventListener('mouseup', () => {
    isDrawing = false;
    if (currentShape) {
        // 9. 保存 нарисованной
        //    фигуры.
        if (currentShape.tagName === 'circle') {
            circleCount++;
            circleCountElem.textContent = circleCount;
        } else if (currentShape.tagName === 'rect') {
            rectangleCount++;
            rectangleCountElem.textContent = rectangleCount;
        }
    }

    // 10. обнуление
    currentShape = null;
});

