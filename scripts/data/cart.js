export const cart = [];

export function addToCart(productId){
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);
    matchingItem ? matchingItem.quantitiy++ : cart.push({
        productId,
        quantitiy: 1
    });
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantitiy
    });

    return cartQuantity;
}
