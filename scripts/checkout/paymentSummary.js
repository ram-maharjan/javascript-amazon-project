import { calculateCartPriceCents, calculateCartQuantity } from "../data/cart.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    const cartPriceCents = calculateCartPriceCents();
    const shippingPriceCents = 499;
    const totalBeforeTaxCents = cartPriceCents + shippingPriceCents;
    const taxCents = 0.1 * totalBeforeTaxCents;
    const totalPriceCents = totalBeforeTaxCents + taxCents;
  
    const html = `
            <div class="payment-summary-title">
              Payment Summary
            </div>
  
            <div class="payment-summary-row">
              <div>Items (${calculateCartQuantity()}):</div>
              <div class="payment-summary-money">$${formatCurrency(cartPriceCents)}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
            </div>
  
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
            </div>
  
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
            </div>
  
            <button class="place-order-button button-primary">
              Place your order
            </button>
    `;
  
    document.querySelector('.js-payment-summary').innerHTML = html;
  }
