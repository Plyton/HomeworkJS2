const API = './src/database';

class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.items = [];
        this._init();
    }
    _init() {
        this.getData(API + this.url)
            .then(d => d.json())
            .then(data => this.items = data.contents)
            .finally(() => {
                this._render();
                this._eventHandler();
            })
    }
    getData(url) {
        return fetch(url);
    }

    _render() {
        let block = document.querySelector(this.container);
        let htmlStr = '';
        this.items.forEach(item => {
            let newProd = new dependencies[this.constructor.name](item)
            htmlStr += newProd.render();
        })
        block.innerHTML = htmlStr;
    }
}

class ListItem {
    constructor(obj) {
        this.item = obj;
    }
    render() {
        return `
    <div class="product-item">
        <!--img src="https://placehold.it/300x200" alt="${this.item.product_name}"-->
        <img src="${this.item.img}" width="300" height="200" alt="${this.item.product_name}">
        <div class="desc">
            <h1>${this.item.product_name}</h1>
            <p>${this.item.price}</p>
            <button 
            class="buy-btn" 
            name="buy-btn"
            data-name="${this.item.product_name}"
            data-price="${this.item.price}"
            data-id="${this.item.id_product}"
            data-img="${this.item.img}"
            >Купить</button>
        </div>
    </div>
`
    }
}

class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container);
    }

    _eventHandler() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.removeProduct(evt.target)
            }
        })
    }

    addProduct(item) {
        fetch(API + '/addToBasket.json')
            .then(d => d.json())
            .then(data => {
                if (data.result) {
                    let find = this.items.find(product => product.id_product == item.dataset.id)
                    if (find) {
                        find.price = Number(find.price) + Number(item.dataset.price)
                        find.quantity++

                    } else {
                        return {
                            id_product: item.dataset['id'],
                            product_name: item.dataset['name'],
                            price: item.dataset['price'],
                            img: item.dataset['img'],
                            quantity: 1
                        }
                    }
                }
            })
            .then(obj => {
                if (obj) {
                    this.items.push(obj)

                }
            })
            .finally(() => {
                this._render()
            })
    }

    removeProduct(item) {
        fetch(API + '/deleteFromBasket.json')
            .then(d => d.json())
            .then(data => {
                debugger
                if (data.result) {
                    let find = this.items.find(product => product.id_product == item.dataset.id)
                    if (find.quantity > 1) {
                        find.price = Number(find.price) - Number(find.price) / Number(find.quantity)
                        find.quantity--
                    } else {
                        this.items.splice(this.items.indexOf(find), 1)
                    }
                }
            })
            .finally(() => {
                this._render()
            })
    }
}

class Catalog extends List {
    constructor(cart, url = '/catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
    }

    _eventHandler() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct(evt.target)
            }
        })
    }

}
class CartItem extends ListItem {
    constructor(obj) {
        super(obj);
    }
    render() {
        return `<div class="cart-item" data-id="${this.item.id_product}">
        <!--img src="https://placehold.it/100x80" alt=""-->
        <img src="${this.item.img}"  width="100" height="80" alt="${this.item.id_product}">
        <div class="product-desc">
            <p class="product-title">${this.item.product_name}</p>
            <p class="product-quantity">${this.item.quantity}</p>
            <p class="product-single-price">${this.item.price}</p>
        </div>
        <div class="right-block">
            <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
        </div>
    </div>`
    }
}
class CatalogItem extends ListItem { }

let dependencies = {
    Catalog: CatalogItem,
    Cart: CartItem
}

export default () => {
    let cart = new Cart();
    let catalog = new Catalog(cart);
}