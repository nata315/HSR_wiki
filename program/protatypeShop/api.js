let allProducts = [];

async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  allProducts = data;
  renderProducts(data);

}

function renderProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach(product => {
    const card = `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <a href="#" target="_blank">
          <button>Перейти в магазин</button>
        </a>
      </div>
    `;
    container.innerHTML += card;
  });
}

document.getElementById('category').addEventListener('change', function() {
  const category = this.value;

  if (category === 'all') {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
});

loadProducts();