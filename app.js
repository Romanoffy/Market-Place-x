const products = [
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

const listProducts = document.getElementById('list-product')
const productView = products.map(product =>`<div class="col-lg-4 col-12 ">
                <div class="card" style="width: 18rem; ">
                    <img src="${product.img_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${product.product_name}</h5>
                      <p class="card-text">Harga : <span>${product.price}</span></p>
                      <p class="card-text">Qty : <span>${product.qty}</span></p>
                      <a href="#" class="btn btn-dark">BUY</a>
                    </div>
                  </div>
            </div>
            `).join(",").replaceAll(",", "")
            listProducts.innerHTML = productView