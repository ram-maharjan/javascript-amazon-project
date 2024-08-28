import { addToCart, calculateCartQuantity } from "./data/cart.js";
import { getMonthAndDay, orders } from "./data/orders.js";
import { getProduct } from "./data/products.js";
import { formatCurrency } from "./utils/money.js";

function updateOrdersHeaderCartQuantity(){
    document.querySelector('.js-cart-quantity').innerText = calculateCartQuantity();
}

function renderOrders(){
    let html = '';

    orders.forEach(order => {        
        html += `
        <div class="order-container">          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getMonthAndDay(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${getOrderDetailsHtml(order)}
          </div>       
        </div>            
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = html;
    attachEventListeners();
}

function getOrderDetailsHtml(order){    
    let html = '';

    order.products.forEach(orderProduct => {
        const product = getProduct(orderProduct.productId);

        html += `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${getMonthAndDay(orderProduct.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.id}" data-order-id="${order.id}">
                <img class="buy-again-icon js-buy-again-icon-${product.id}-${order.id}" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again-message-${product.id}-${order.id}">Buy it again</span>
                <div class="added-again js-added-again-${product.id}-${order.id}">
                  &#x2713; Added
                </div>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `;
    });

    return html;
}

function attachEventListeners(){
    document.querySelectorAll('.js-buy-again-button').forEach(button => {
        let readdedMessageTimeoutId;

        button.addEventListener('click', () => {
            const {productId, orderId} = button.dataset;
            addToCart(productId, 1);
            updateOrdersHeaderCartQuantity();

            const buyAgainIcon = document.querySelector(`.js-buy-again-icon-${productId}-${orderId}`);
            const buyAgainMesage = document.querySelector(`.js-buy-again-message-${productId}-${orderId}`);
            const addedAgain = document.querySelector(`.js-added-again-${productId}-${orderId}`);            
            
            buyAgainIcon.classList.add('make-invisible');
            buyAgainMesage.classList.add('make-invisible');
            addedAgain.classList.add('make-visible');

            if(readdedMessageTimeoutId){
                clearTimeout(readdedMessageTimeoutId);
            }

            readdedMessageTimeoutId = setTimeout(() => {
                buyAgainIcon.classList.remove('make-invisible');
                buyAgainMesage.classList.remove('make-invisible');
                addedAgain.classList.remove('make-visible');
            }, 1000);
        });
    });
}

function loadPage(){
    updateOrdersHeaderCartQuantity();
    renderOrders();
}

loadPage();