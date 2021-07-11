<template>
  <div class="cart-block">
    <div class="d-flex">
      <strong class="d-block">Всего товаров:</strong>
      <div id="quantity">{{ calcTotal() }}</div>
    </div>
    <hr />

    <div class="cart-items" v-show="$parent.show">
      <Item v-for="item of items" :key="item.id_product" :item="item" :type="'cart'" />
    </div>

    <hr />
    <div class="d-flex">
      <strong class="d-block">Общая ст-ть:</strong>
      <div id="price">{{ calcSum() }}</div>
    </div>
  </div>
</template>

<script>
import Item from "../components/list_item.vue";
export default {
  components: { Item },
  props: {
    add: Object,
    rem: Object
  },

  data() {
    return {
      items: [],
      url: "./src/public/database/getBasket.json"
    };
  },
  methods: {
    remItem(item) {
      this.$parent.trace(
        "./src/public/database/deleteFromBasket.json",
        item,
        "cart"
      );
    },
    calcTotal() {
      let total = 0;
      this.items.forEach(el => {
        total += el.quantity;
      });
      return total;
    },
    calcSum() {
      let sum = 0;
      this.items.forEach(el => {
        sum += el.price;
      });
      return sum;
    }
  },
  watch: {
    add() {
      let find = this.items.find(
        item => item.id_product === this.add.id_product
      );
      if (find) {
        find.quantity++;
        find.price += this.add.price;
      } else {
        this.items.push(this.add);
      }
    },
    rem() {
      let find = this.items.find(
        item => item.id_product === this.rem.id_product
      );
      if (find.quantity > 1) {
        find.price -= find.price / find.quantity;
        find.quantity--;
      } else {
        this.items.splice(this.items.indexOf(find), 1);
      }
    }
  },
  mounted() {
    this.$parent.get(this.url).then(data => (this.items = data.contents));
  }
};
</script>

<style>
</style>