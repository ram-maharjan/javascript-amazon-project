import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js'

export const orders = loadFromStorage();

function loadFromStorage(){
    return JSON.parse(localStorage.getItem('order')) || [];
}

function saveToStorage(){
    localStorage.setItem('order', JSON.stringify(orders));
}

export async function placeOrder(cart){
    try {        
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart
            })
        });

        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }

        const order = await response.json();
        orders.unshift(order);
        saveToStorage(); 
    } catch (error) {
        console.log(error.message);
    }
}

export function getMonthAndDay(dateString){
    return dayjs(dateString).format('MMMM D');
}
