// 1. canvas - это контейнер, в котором рисуются фигуры.
// 2. ctx - это контекст, который позволяет рисовать на canvas.
// 3. circleCountElem и rectangleCountElem - это элементы, которые
//    отображают количество нарисованных фигур.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const circleCountElem = document.getElementById('circleCount');
const rectangleCountElem = document.getElementById('rectangleCount');

// 4. isDrawing - флаг, который указывает, происходит ли
//    рисование в данный момент.
// 5. startX, startY - координаты начала рисования.
// 6. currentShape - тип фигуры, которую рисуют.
// 7. circleCount и rectangleCount - количество нарисованных
//    фигур.
let isDrawing = false;
let startX, startY;
let currentShape;
let circleCount = 0;
let rectangleCount = 0;

// 8. shapes - массив, который хранит нарисованные фигуры.
let shapes = [];

// 9. Обработчик события mousedown.
//    Он начинает рисование.
canvas.addEventListener('mousedown', event => {
	isDrawing = true;
	startX = event.offsetX;
	startY = event.offsetY;

	// 10. Определение типа фигуры, которую
	//    рисуют.
	const shapeSelector = document.getElementsByName('shape');
	let selectedValue;
	for (const shape of shapeSelector) {
		if (shape.checked) {
			selectedValue = shape.value;
			break;
		}
	}

	currentShape = selectedValue;
});

// 11. Обработчик события mousemove.
//    Он рисует фигуру.
canvas.addEventListener('mousemove', event => {
	if (!isDrawing) return;

	const currentX = event.offsetX;
	const currentY = event.offsetY;

	// 12. Очистка canvas.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 13. Рисование всех нарисованных ранее
	//    фигур.
	for (const shape of shapes) {
		if (shape.type === 'circle') {
			// 14. Рисование круга.
			ctx.beginPath();
			ctx.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(0, 0, 255, 1)';
			ctx.fill();
			ctx.closePath();
		} else if (shape.type === 'rectangle') {
			// 15. Рисование прямоугольника.
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
			ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
		}
	}

	// 16. Рисование текущей фигуры.
	if (currentShape === 'circle') {
		const radius = Math.sqrt(
			Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
		);
		ctx.beginPath();
		ctx.arc(startX, startY, radius, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(0, 0, 255, 1)';
		ctx.fill();
		ctx.closePath();
	} else if (currentShape === 'rectangle') {
		const width = currentX - startX;
		const height = currentY - startY;
		ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		ctx.fillRect(startX, startY, width, height);
	}
});

// 17. Обработчик события mouseup.
//    Он прекращает рисование.
canvas.addEventListener('mouseup', event => {
	isDrawing = false;

	const currentX = event.offsetX;
	const currentY = event.offsetY;

	// 18. Сохранение нарисованной
	//    фигуры в массив.
	if (currentShape === 'circle') {
		const radius = Math.sqrt(
			Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
		);
		shapes.push({
			type: 'circle',
			startX: startX,
			startY: startY,
			radius: radius,
		});
		circleCount++;
		circleCountElem.textContent = circleCount;
	} else if (currentShape === 'rectangle') {
		const width = currentX - startX;
		const height = currentY - startY;
		shapes.push({
			type: 'rectangle',
			startX: startX,
			startY: startY,
			width: width,
			height: height,
		});
		rectangleCount++;
		rectangleCountElem.textContent = rectangleCount;
	}

	currentShape = null;
});

