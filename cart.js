

let products = [
    {name : 'Hydration Berries',
    tag : 'BerriesFlavour.png',
    price : 20,
    inCart : 0

},
{name : 'Hydration Original',
    tag :'OriginalBottle.png',
    price : 20,
    inCart : 0

},
{name : 'Hydration Apple',
    tag : 'AppleBottle.png',
    price : 20,
    inCart : 0

},
{name : 'Hydration Strawberries',
    tag : 'StrawberryBottle.png',
    price : 20,
    inCart : 0

},
{name : 'Hydration Watermelon',
    tag : 'watermelonbottle.png',
    price : 20,
    inCart : 0

},
{name : 'Hydration Grape',
    tag : 'GrapeBottle.png',
    price : 20,
    inCart : 0

},
{name : 'Creatine Grape',
    tag : 'GrapeCreatine.png',
    price : 100,
    inCart : 0

},
{name : 'Creatine Cookie',
    tag : 'CookieCreatine.png',
    price : 100,
    inCart : 0

},
{name : 'Creatine Blueberry',
    tag : 'BlueberryCreatine.png',
    price : 100,
    inCart : 0

},
{name : 'Protein Banana',
    tag : 'BananaProtein.png',
    price : 75,
    inCart : 0

},
{name : 'Protein Orange',
    tag : 'OrangeProtein.png',
    price : 75,
    inCart : 0

},
{name : 'Protein Chocolate',
    tag : 'ChocolateProtein.png',
    price : 75,
    inCart : 0

},
{name : 'Protein Strawberries',
    tag : 'StrawberryProtein.png',
    price : 75,
    inCart : 0

},
{name : 'Red wine',
    tag : 'SavoraRedWine.png',
    price : 45,
    inCart : 0

},
{name : 'White wine',
    tag : 'SavoraWhiteWine.png',
    price : 45,
    inCart : 0

},
{name : 'Whiskey',
    tag :'SavoraWhiskey.png',
    price : 75,
    inCart : 0

},
{name : 'Gin',
    tag : 'SavoraGin.png',
    price : 65,
    inCart : 0

},

 ];

 document.addEventListener('DOMContentLoaded', function() {
    let carts = document.querySelectorAll('.add-cart');
    for (let i = 0; i < carts.length; i++) {
      carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
      });
    }


    function displayCart() {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
      
        let productContainer = document.querySelector(".products");
        let cartCost = localStorage.getItem('totalCost');

        

        console.log(cartItems);
        if (cartItems && productContainer) {
          productContainer.innerHTML = '';
          Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline" class="remove-item" data-tag="${item.tag}"></ion-icon>
            <img src="DRINKS/${item.tag}">
            <div class="product-details">
                <div class="product-name">${item.name}</div>
                <div class="price">$${item.price}</div>
            
                <div class="quantity">
                <div class="product-details">
                    <ion-icon name="arrow-back-circle-outline" class="decrease-quantity" data-tag="${item.tag}"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="arrow-forward-circle-outline"class="increase-quantity" data-tag="${item.tag}"></ion-icon>
                </div>
                </div>

                <div class="product-details">
                $${item.inCart * item.price}
                </div>
                
            </div>
            </div>
                
            
            `
        
            
          });

          productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    BasketTotal
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                    <br>
              
                    <form action="checkoutpage.html" method="get">
                        <div>
                        <input type="submit" value="checkout" >
                        </div>
                    </form>
                </h4>
                
            `
            let removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                removeItemFromCart(button.dataset.tag);
            });
        });
        }
      }
      
displayCart();
  });

  
// Function to remove an item from the cart
function removeItemFromCart(tag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems && cartItems[tag]) {
      let itemToRemove = cartItems[tag];
      let cartCost = localStorage.getItem('totalCost');
      let cartCount = localStorage.getItem('cartNumbers');

      // Update cart total and count after removing the item
      cartCost -= itemToRemove.price * itemToRemove.inCart;
      cartCount -= itemToRemove.inCart;

      localStorage.setItem('totalCost', cartCost);
      localStorage.setItem('cartNumbers', cartCount);
      delete cartItems[tag];
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      // Refresh the cart display after removing the item
      displayCart();
      updateCartCount();
    }
  }
// Function to update cart count in the HTML
function updateCartCount() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers) || 0; // Default to 0 if the value is not a number
  
    // Update the cart count span with the new value
    document.getElementById('cart-counts').textContent = productNumbers;
  }
  
  function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers) || 0; // Default to 0 if the value is not a number
    productNumbers += 1;
    localStorage.setItem('cartNumbers', productNumbers);
    updateCartCount(); // Call the updateCartCount function to update the cart count display

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log('My items are', cartItems);

    if(cartItems != null){
        
        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1;
    }else{
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
}
  
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }

// Function to load cart count on DOM load
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    const cartCountElement = document.getElementById('cart-counts');

    if (cartCountElement) {
        cartCountElement.textContent = productNumbers || '0';
    }
    }
    document.addEventListener('DOMContentLoaded', function() {
        onLoadCartNumbers();
      
        let carts = document.querySelectorAll('.add-cart');
        for (let i = 0; i < carts.length; i++) {
          carts[i].addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default behavior of the link
           
          });
        }
      });

    function totalCost(product){
        let cartCost = localStorage.getItem('totalCost');
       
        console.log('My cart cost is',cartCost);
        console.log(typeof cartCost)

        if (cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + product.price)
        }else{
            localStorage.setItem("totalCost",product.price);
        }

        
    }

