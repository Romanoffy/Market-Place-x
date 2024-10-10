let listCart = []
let products = [
    {
        id: 1,
        product_name : 'Nike Alphafly 3',
        price: 500000,
        img_url : 'product/product-1.png',
        qty : 10
    },

    {
        id: 2,
        product_name : 'Nike Air Max Dn',
        price: 300000,
        img_url : 'product/product-2.png',
        qty : 10
    },

    {
        id: 3,
        product_name : 'Nike Air VaporMax',
        price: 200000,
        img_url : 'product/product-3.png',
        qty : 10
    },
]
let cartInit = 0

const listProducts = document.getElementById('list-product')
const cartTotal = document.getElementById('cart-total')
const cartList = document.getElementById('list-cart-product')
const listCartShow = document.getElementById('list-cart-show')

cartTotal.innerHTML = cartInit
const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style : "currency",
        currency : "IDR",
    }).format(Number);
}
const productView = (p) => {
    return p.map(product => `<div class="col-lg-4 col-12">
                <div class="card" style="width: 18rem; ">
                    <img src="${product.img_url}" class="card-img-top" alt="product-1">
                    <div class="card-body">
                      <h5 class="card-title">${product.product_name}</h5>
                      <p class="card-text">Harga : <span> ${rupiah(product.price)}</span></p>
                      <p class="card-text">Qty : <span>${product.qty}</span></p>
                      <button type="button" class="btn btn-dark" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-shopping text-light"></i>
                    add to cart
                </button>
                    </div>
                  </div>
            </div>
            `).join(",").replaceAll(",", " ")
    }

const showListCart = () => {
    listProducts.classList.add("d-none")
    cartList.classList.remove("d-none")
}
const backToProduct = () => {
    listProducts.classList.remove("d-none")
    cartList.classList.add("d-none")
}

window.onload = showDetailCart(listCart)

function showDetailCart(listCart) {
    let total = 0
    return (listCartShow.innerHTML = listCart.length === 0 ? 
    `<h2 class="text-danger text-center my-4">
     Barang belum ditambahkan kedalam ranjang
    </h2>` :  `<div class="table table-resposive">
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>List Product</th>
                    <th>Price</th>
                    <th>qty</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
            ${listCart.map((produk, index) => {
                total += produk.qty * produk.price
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${produk.product_name}</td>
                    <td>
                        <img src="${produk.img_url}" alt="images" class="img-thumbnail" width="100"/>                
                    </td>
                    <td>${produk.qty}</td>
                    <td>${rupiah(produk.qty * produk.price)}</td>
                </tr>
                ${index === listCart.length - 1 && `<tr>
                <td colspan="5">Total</td> 
                <td>${rupiah(total)}</td> 
                </tr>`} 
                ` 
            })}
            </tbody>

        </table>
    </div> `) }

            listProducts.innerHTML = productView(products)


            function addToCart(id) {

                let newStock = products
                let selectedProduct = newStock.find(produk => produk.id === id)
                if(selectedProduct.qty === 0){
                    alert("Stok Habis")
                    return
                }

                let pushToCart = newStock.filter(produk => produk.id === id).map(newProduk => ({
                    ...newProduk,
                    qty : 1
                })) 
                if(listCart.length === 0){
                    listCart = pushToCart
                    // console.log(`JIKA CARTNYA 0: ${JSON.stringtify(listCart)}`)
                } 
                else if(listCart.length > 0){
                    let adaGak = listCart.some(ada => ada.id === id)
                    if(adaGak){
                        listCart?.map(l => l.id === id ? ({
                            ...l,
                            qty: l.qty++
                        }) : ({ ...l}))
                        // console.log(`LIST CART BARU : ${JSON.stringtify(listCart)}`)
                    }
                    if (!adaGak){
                        listCart.push({...selectedProduct, qty: 1})
                        // console.log(`LIST CART & ID BARU : ${JSON.stringtify(listCart)}`)
                    }

                }
                

                
                // if (newStock.some(ns => ns.qty)){}

                let newQty = newStock.map(p => {
                    if (p.id === id) {
                        return {
                            ...p,
                            qty: p.qty - 1
                        }
                    }
                    return p
                })
            
            
                products = newQty
                cartInit++
                cartTotal.innerHTML = cartInit
                listProducts.innerHTML = productView(products)
                showDetailCart(listCart)
            }