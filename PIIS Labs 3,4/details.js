// Get the element's information from localStorage
window.onload = function () {
    
    console.log('Details.js loaded');

    const tShirtInfo = JSON.parse(sessionStorage.getItem('tShirtInfo'));
    console.log(tShirtInfo);

    const colors = Object.keys(tShirtInfo.colors);
    let image_color = tShirtInfo.colors.white.front;

    // Use the values to display the information
    document.getElementById('name').textContent = tShirtInfo.name;
    document.getElementById('description').textContent = tShirtInfo.description;
    document.getElementById('price').textContent = tShirtInfo.price;
    document.getElementById('image').src = tShirtInfo.colors.white.front;
    
    // Object.values(tShirtInfo.colors).forEach(element => {
    //     const colorButton = document.createElement('button');
    //     colorButton.textContent = JSON.stringify(element);
    //     colorButton.style.width = '40px';
    //     colorButton.style.height = '20px';
    //     colorButton.classList.add('color-button');
    //     colorButton.style.backgroundColor = element;
    //     document.getElementById('colors_buttons').appendChild(colorButton);
    //     colorButton.addEventListener('click', function () {
    //         color = element;
    //         document.getElementById('image').src = color.front;
    //     });
    // });
    colors.forEach((color) => {
        const colorButton = document.createElement('button');
        colorButton.style.borderRadius = '15%';
        colorButton.textContent = color;
        colorButton.style.width = '60px';
        colorButton.style.height = '30px';
        colorButton.classList.add('color-button');
        colorButton.style.backgroundColor = color;
        document.getElementById('colors_buttons').appendChild(colorButton);
        colorButton.addEventListener('click', function () {
            image_color = tShirtInfo.colors[color];
            document.getElementById('image').src = image_color.front;
        });
    });
    // Add event listeners to the buttons
    document.getElementById('front-button').addEventListener('click', function () {
        document.getElementById('image').src = image_color.front;
    });

    document.getElementById('back-button').addEventListener('click', function () {
        document.getElementById('image').src = image_color.back;
    });

    // Don't forget to remove the item from localStorage when you're done
    sessionStorage.removeItem('tShirtInfo');
}