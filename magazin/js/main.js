// const API =
//   "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!

// функция, которая делает запросы и возвращает ответы
// url - параметр куда обращаться
// cb - функция, которая обрабатывает это событие, т.е.
// что делать, когда обращение завершится
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log("Error");
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};
// ------------------------------------------------
// класс ProductList, который описывает список товаров  - конструктор
// # - инкапсулированное свойство
// #goods хранится ответ от сервера - перевалочный пункт
// #allProducts записываем все готовые конкретные экземпляры товаров или классов
// по умолчанию отрисовываем в блок HTML .products

class ProductList {
  #goods;
  #allProducts;

  constructor(container = ".products") {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];
    this.#fetchGoods();

    // работают оба варианта
    // this.#fetchGoods(); строку выше включил - ниже 4 строки отключил

    // this.#getProducts().then((data) => {
    //   this.#goods = [...data];
    //   this.#render();
    // });
  }
  // работают оба варианта

  // (sum, { price }) => sum + price, первый параметр
  // 0 второй параметр - значение
  sum() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  // получить данные товара
  // включил блок #fetchGoods() - ниже блок #getProducts() отключил
  #fetchGoods() {
    // getRequest(`${API}catalogData.json`, (data) => {
    getRequest(`catalogData.json`, (data) => {
      this.#goods = JSON.parse(data);
      this.#render();
      // console.log(this.#goods);
    });
  }

  // #getProducts() {
  //   return fetch(`catalogData.json`)
  //     .then((response) => response.json())
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // отрисовывает данные товара
  #render() {
    const block = document.querySelector(this.container); // отрисовывает в блоке, указанном в container
    // перебираем ниже массив с товарами
    for (let product of this.#goods) {
      // и для каждого товара создаём экземпляр класса, написанного далее ProductItem
      // и передаём в него данные о товаре (product)
      const productObject = new ProductItem(product);
      // console.log(productObject);
      this.#allProducts.push(productObject); // отправляем push в  #allProducts из productObject
      block.insertAdjacentHTML("beforeend", productObject.render());
    }
  }
}

// класс, который описывает конкретный элемент - конструктор
// выбираем конкретный товар и разбираем построчно
// https://placehold.it/200x150
class ProductItem {
  constructor(product) {
    this.title = product.name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = product.img || "заглушка";
  }

  // возврат разметки товара - прорисовка
  // не понятно зачем  data-id="${this.id}
  render() {
    //     return `<div class="product-item" data-id="${this.id}">
    return `<div class="product-item"> 
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <p>id = ${this.id}</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}
const productList = new ProductList();
