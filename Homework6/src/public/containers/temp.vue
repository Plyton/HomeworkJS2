<template>
  <div class="products">
    <Item :item="item" :type="'temp'" />
  </div>
</template>

<script>
import Item from "../components/list_item.vue";
export default {
  components: { Item },
  data() {
    return {
      item: {}
    };
  },
  methods: {
    addItem(item) {
      this.$parent.trace(
        "./src/public/database/addToBasket.json",
        item,
        "temp"
      );
    }
  }
};
</script>

<style>
</style>