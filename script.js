let data = [];
let acendingOrder = true;

// fetch the data
function fetchData() {
  return fetch('https://fakestoreapi.com/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
}

//display the data
function displayData(data) {
  const dataContainer = document.getElementById('data-container');
  document.addEventListener('DOMContentLoaded', function () {
    // Your script, including the part with getElementById
    const dataContainer = document.getElementById('data-container');
    if (!dataContainer) {
      console.error('Error: dataContainer is null or undefined.');
      return;
    }
    // Rest of your script
  });
  dataContainer.innerHTML = '';
  let element = ""
  for (let i = 0; i < data.length; i++) {
    const dataId = data[i].id;
    element += `<div class="home" >
    <a href="product.html?id=${dataId}">
    <img src="${data[i].image}" width=80px; height=140px;>
    <h5 class="product-title"  id="productTitle">${data[i].title}</h3>    
     <p> ${data[i].rating.rate} <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
     <p1 class="home-price" id="productPrice">$ ${data[i].price} </p1></div>`;
    dataContainer.innerHTML = element;
  }
}

//display the individual product by the help of id 
const dataId = getParameterByName('id');
if (dataId) {
  fetch(`https://fakestoreapi.com/products/${dataId}`)
    .then(response => response.json())
    .then(product => {
      const productContainer = document.getElementById('product-container');
      productContainer.innerHTML = `<div class="items-1">
      <div class="img_part"><img src="${product.image}" width=25% height=270px></div>
      <div class="product_content" style="    display: flex;
      flex-direction: column;
      gap: 25px;">
      <h4>${product.title}</h2>
      <p class="phara">${product.description}</p>
      <p class="rate"> ${product.rating.rate} <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
      <p class="price">$ ${product.price} </p1></div>
      </div>`;

      document.getElementById('addToCartBtn').addEventListener('click', function () {
        const cartItem = {
          title: product.title,
          price: product.price,
          image: product.image
        };
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        existingCartItems.push(cartItem);

        // Store the updated cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
        // localStorage.clear();
        alert('Item added to cart!');
      });
    })
    .catch(error => console.error('Error fetching product details:', error));
}


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function sortData() {
  const sortOrder = document.getElementById('sortOrder').value;
  data.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  displayData(data);
}

fetchData()
  .then(result => {
    data = result;
    displayData(data);
  })
  .catch(error => {
    // Use console.error to log the error to the console
    console.error('Error fetching data:', error);

    // Check if dataContainer is not null before attempting to modify its innerHTML
    if (dataContainer) {
      dataContainer.innerHTML = 'Error fetching data';
    }
  });

// sorting the data based on rating

function sortRate(sortRating) {
  const sortedRate = data.slice();

  if (sortRating === 'les') {

    sortedRate.sort((a, b) => a.rating.rate - b.rating.rate);
  } else if (sortRating === 'top') {

    sortedRate.sort((a, b) => b.rating.rate - a.rating.rate);
  } else {

    console.error('Invalid sortOrder:', sortRate);
    return;
  }

  displayData(sortedRate);
}


// to search and display

const searchInput = document.getElementById('searchInput');
console.log(searchInput);
const detailsContainer = document.getElementById('details-container');


document.addEventListener('DOMContentLoaded', function () {
  // Your script, including the event listener attachment
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function () {
    searchAndDisplay();
  });
});



function searchAndDisplay() {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length === 0) {
    detailsContainer.innerHTML = '';
    return;
  }

  const results = searchData(query);

  if (results.length > 0) {
    displayMatchingTitles(results);
  } else {
    detailsContainer.innerHTML = '<p>No matching results</p>';
  }
}

// Function to search data in the array based on the entered text

function searchData(query) {
  const matchingItems = data.filter(item => item.title.toLowerCase().includes(query));
  return matchingItems;
}

function displayMatchingTitles(results) {
  detailsContainer.innerHTML = '';
  // <div class="search-drop"><h5></h5></div>
  results.forEach(item => {
    const titleElement = document.createElement('div');
    titleElement.innerHTML = `<div class="search-drop"><p>${item.title}</p></div>`;
    detailsContainer.appendChild(titleElement);
  });
}