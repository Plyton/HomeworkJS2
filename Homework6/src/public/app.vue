<template>
  <div>
    <header>
      <div class="logo">E-shop</div>
      
      <div class="cart">
        <form action="#" class="search-form">
          <input type="text" class="search-field" />
          <button class="btn-search">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button class="btn-cart" @click="show = !show">Cart</button>
        <div><button @click="development = !development">P</button></div>
        <Cart :add="addItem" :rem="delItem" />
      </div>
    </header>
    <main v-show="development">
      <Catalog :temp="tempItem"/>
    </main>
    <main v-show="!development">
      <Temp />
    </main>
  </div>
</template>

<script>
import Cart from "./containers/cart.vue";
import Catalog from "./containers/catalog.vue";
import Temp from "./containers/temp.vue";
export default {
  components: {
    Cart,
    Catalog,
    Temp
  },
  data() {
    return {
      development: true,
      show: true,
      addItem: null,
      delItem: null,
      tempItem: null
    };
  },
  methods: {
    get(url) {
      return fetch(url).then(d => d.json());
    },
    trace(url, item, type) {
      fetch(url)
        .then(d => d.json())
        .then(data => {
          if (data.result && type === "catalog") {
            this.addItem = {
              id_product: item.id_product,
              product_name: item.product_name,
              price: item.price,
              img: item.img,
              quantity: 1
            };
          }
          if (data.result && type === "cart") {
            this.delItem = {
              id_product: item.id_product,
              product_name: item.product_name,
              price: item.price,
              img: item.img,
              quantity: 1
            };
          }
           if (data.result && type === "temp") {
            this.tempItem = {
              id_product: null,
              product_name: item.product_name,
              price: Number(item.price),
              img: "https://placehold.it/300x200",
              quantity: 1
            };
          }
        });
    }
  }
};
</script>

<style lang="sass">

</style>
