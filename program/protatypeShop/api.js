let allProducts = [];
let currentSort = 'none'; // 'none', 'asc', 'desc'
let currentCategory = 'all';

async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Ошибка загрузки товаров');
    }
    const data = await response.json();
    allProducts = data;
    applyFiltersAndSort();
  } catch (error) {
    console.error('Ошибка:', error);
    const container = document.getElementById('products');
    container.innerHTML = '<p>Ошибка загрузки товаров. Проверьте соединение.</p>';
  }
}

function applyFiltersAndSort() {
  let result = [...allProducts];
  
  // 1. Фильтрация по категории
  if (currentCategory !== 'all') {
    result = result.filter(p => p.category === currentCategory);
  }
  
  // 2. Сортировка по цене
  if (currentSort === 'asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'desc') {
    result.sort((a, b) => b.price - a.price);
  }
  
  renderProducts(result);
}

function renderProducts(products) {
  const container = document.getElementById('products');
  if (!container) {
    console.error('Контейнер products не найден');
    return;
  }
  
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>Товары не найдены</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/150'">
      <h3>${product.title.substring(0, 50)}</h3>
      <p class="price">$${product.price}</p>
      <a href="#" target="_blank">
        <button>Перейти в магазин</button>
      </a>
    `;
    container.appendChild(card);
  });
}

// Фильтр по категориям 
const categorySelect = document.getElementById('category');
if (categorySelect) {
  categorySelect.addEventListener('change', function() {
    currentCategory = this.value;
    applyFiltersAndSort();
  });
}

// Сортировка по цене 
const sortSelect = document.getElementById('sort');
if (sortSelect) {
  sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    applyFiltersAndSort();
  });
}

// Загружаем товары
loadProducts();