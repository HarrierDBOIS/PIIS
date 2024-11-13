window.onload = renderShirts();
function renderShirts() {
    shirts.forEach(element => {
        let shirtsArray = new Map();
        shirtsArray.set(element.name, element);

        const product = document.createElement('div');
        product.classList.add('product-box');

        const image = document.createElement('img');
        image.classList.add('product-img');
        try {
            image.src = element.colors.white.front;
        } catch (error) {
            image.src = element.default.front;
        }
        image.alt = element.name;
        image.style.width = '400px';
        image.style.height = '500px';

        const name = document.createElement('h2');
        try {
            name.textContent = element.name;
        } catch (error) {
            name.textContent = "Undefined name";
        }
        name.classList.add('product-title');
        name.style.marginTop = '10px';
        name.style.marginBottom = '10px';
        name.style.marginLeft = '6px';
        name.style.fontFamily = 'Arial, Helvetica, sans-serif';
        
        const available = document.createElement('span');
        available.classList.add('available');
        available.style.fontFamily = 'Arial, Helvetica, sans-serif';
        available.style.fontStyle = 'italic';
        available.style.marginLeft = '6px';
        available.style.color = 'grey';
        if (element.colors) {
            available.textContent = 'Available in ' + Object.keys(element.colors).length + ' colors';
        } else {
            available.textContent = 'Not available';
        }

        const quickView_button = document.createElement('button');
        quickView_button.classList.add('quick-view');
        quickView_button.textContent = 'Quick View';
        quickView_button.style.width = '150px';
        quickView_button.style.height = '40px';
        quickView_button.style.backgroundColor = 'grey';
        quickView_button.style.borderRadius = '10px';

        const view_button = document.createElement('button');
        view_button.classList.add('view');
        view_button.textContent = 'See page';
        view_button.style.width = '150px';
        view_button.style.height = '40px';
        view_button.style.backgroundColor = 'grey';
        view_button.style.borderRadius = '10px';
        view_button.name = element.name;

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        buttons.appendChild(quickView_button);
        buttons.appendChild(view_button);
        buttons.style.display = 'flex';
        buttons.style.justifyContent = 'space-between';
        buttons.style.marginLeft = '20px';
        buttons.style.marginRight = '20px';
        buttons.style.marginTop = '10px';

        product.appendChild(image);
        product.appendChild(name);
        product.appendChild(available);
        product.appendChild(buttons);
        product.style.width = '400px';
        product.style.height = '640px'; 
        product.style.border = '5px solid black';
        product.style.borderRadius = '4px';

        document.getElementById('shop_grid').appendChild(product);
        document.getElementById('shop_grid').style.display = 'grid';
        document.getElementById('shop_grid').style.gridTemplateColumns = 'repeat(3, 1fr)';
        document.getElementById('shop_grid').style.gap = '30px';
        document.getElementById('shop_grid').style.padding = '30px';
        

        quickView_button.onclick = function () {
            try {
                Array.from(document.getElementsByClassName('quick-view-display')).forEach(element => {
                    element.style.display = 'none';
                });
            } catch (error) {
                alert(error);
            }
            const quickView = document.createElement('div');
            quickView.className = 'quick-view-display';
            quickView.classList.add('quick-view');
            quickView.style.position = 'fixed';
            quickView.style.bottom = '0px';
            quickView.style.left = '0px';
            quickView.style.width = '100%';
            quickView.style.height = '200px';
            quickView.style.backgroundColor = 'rgba(0,0,0,0.5)';
            quickView.style.display = 'flex';
            quickView.style.justifyContent = 'center';
            quickView.style.alignItems = 'center';

            const text_wrapper = document.createElement('div');
            text_wrapper.classList.add('text-wrapper');

            const quickView_text = document.createElement('p');
            quickView_text.classList.add('quick-view-text');
            quickView_text.textContent = element.name;
            quickView_text.style.color = 'white';
            quickView_text.style.fontFamily = 'Arial, Helvetica, sans-serif';
            quickView_text.style.fontSize = '30px';
            quickView_text.style.marginLeft = '30px';
            quickView_text.style.padding = '0px';

            const quickView_price = document.createElement('p');
            quickView_price.classList.add('quick-view-text');
            quickView_price.textContent = element.price;
            quickView_price.style.color = 'white';
            quickView_price.style.fontFamily = 'Arial, Helvetica, sans-serif';
            quickView_price.style.fontSize = '30px';
            quickView_price.style.marginLeft = '30px';
            quickView_price.style.padding = '0px';

            text_wrapper.appendChild(quickView_text);
            text_wrapper.appendChild(quickView_price);

            const quickView_image_front = document.createElement('img');
            quickView_image_front.classList.add('quick-view-image');
            quickView_image_front.src = element.colors.white.front;
            quickView_image_front.alt = element.name;
            quickView_image_front.style.width = '150px';
            quickView_image_front.style.height = '180px';
            quickView_image_front.style.border = '2px solid black';
            quickView_image_front.style.borderRadius = '4px';
            quickView_image_front.style.marginRight = '30px';

            const quickView_image_back = document.createElement('img');
            quickView_image_back.classList.add('quick-view-image');
            quickView_image_back.src = element.colors.white.back;
            quickView_image_back.alt = element.name;
            quickView_image_back.style.width = '150px';
            quickView_image_back.style.height = '180px';
            quickView_image_back.style.border = '2px solid black';
            quickView_image_back.style.borderRadius = '4px';

            const close_button = document.createElement('button');
            close_button.classList.add('close-button');
            close_button.textContent = 'X';
            close_button.style.position = 'absolute';
            close_button.style.top = '10px';
            close_button.style.right = '10px';
            close_button.style.backgroundColor = 'transparent';
            close_button.style.border = 'none';
            close_button.style.color = 'white';
            close_button.style.fontSize = '20px';
            close_button.onclick = function() {
                quickView.style.display = 'none';
            }

            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');
            wrapper.style.display = 'flex';
            wrapper.appendChild(quickView_image_front);
            wrapper.appendChild(quickView_image_back);
            wrapper.appendChild(text_wrapper);
            
            quickView.appendChild(wrapper);
            quickView.appendChild(close_button);

            document.body.appendChild(quickView);
        }

        view_button.onclick = function () {
            // Store the element's information in localStorage
            sessionStorage.setItem('tShirtInfo', JSON.stringify({
                name: shirtsArray.get(view_button.name).name,
                description: shirtsArray.get(view_button.name).description,
                price: shirtsArray.get(view_button.name).price,
                colors: shirtsArray.get(view_button.name).colors,
                default: shirtsArray.get(view_button.name).default
                // Add other properties as needed
            }));
            // Redirect to details.html
            location.replace('details.html');
        }
    })
 }
;