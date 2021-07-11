let app = new Vue({
    el: '#app',
    data: {
        catalogItems: [],
        cartItems: [],
        show: true,
        url: './src/database'
    },
    methods: {
        getCatalogData() {
            return fetch(this.url + '/catalogData.json').then(d => d.json()).then(data => data.contents);
        },
        getCartData() {
            return fetch(this.url + '/getBasket.json').then(d => d.json()).then(data => data.contents);
        }
    },
    async mounted() {
        this.catalogItems = await this.getCatalogData();
        this.cartItems = await this.getCartData();
    }
})



