<template>
  <div :class="calcWrapClass">
    <template v-if="type === 'catalog'">
      <img v-bind:src="item.img" width="300" height="200" v-bind:alt="item.product_name" />
      <div class="desc">
        <h1>{{ item.product_name }}</h1>
        <p>{{ item.price }}</p>
        <button class="buy-btn" name="buy-btn" @click="$parent.addItem(item)">Купить</button>
      </div>
    </template>
    <template v-else-if="type === 'cart'">
      <img v-bind:src="item.img" width="100" height="80" v-bind:alt="item.id_product" />
      <div class="product-desc">
        <p class="product-title">{{ item.product_name }}</p>
        <p class="product-quantity">{{ item.quantity }}</p>
        <p class="product-single-price">{{ item.price }}</p>
      </div>
      <div class="right-block">
        <button name="del-btn" class="del-btn" @click="$parent.remItem(item)">&times;</button>
      </div>
    </template>
    <template v-else-if="type === 'temp'">
      <div class="product-input">
        <h4 class="product-title">Добавьте товар</h4>
        <input type="text" placeholder="введите название" v-model.lazy="$parent.item.product_name" />
        <p></p>
        <input type="number" placeholder="введите стоимость" v-model.lazy="$parent.item.price" />
        <p></p>
      </div>
      <div>
        <button name="add-btn" class="add-btn" @click="$parent.addItem(item)">+</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object },
    type: { type: String, default: "catalog" }
  },
  computed: {
    calcWrapClass() {
      return this.type === "catalog" || this.type === "temp"
        ? "product-item"
        : "cart-item";
    }
  }
};
</script>

<style scoped>

.product-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
