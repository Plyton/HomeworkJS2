<template>
  <div class="products">
    <Item v-for="item of items" :key="item.id_product" :item="item" />
  </div>
</template>

<script>
import Item from "../components/list_item.vue";
export default {
  components: { Item },
  props: {
    temp: Object
  },
  data() {
    return {
      items: [],
      url: "./src/public/database/catalogData.json"
    };
  },
  methods: {
    addItem(item) {
      this.$parent.trace(
        "./src/public/database/addToBasket.json",
        item,
        "catalog"
      );
    }
  },
  watch: {
    temp() {
      this.temp.id_product = this.items.length;
      this.items.push(this.temp);
    }
  },

  mounted() {
    this.$parent.get(this.url).then(data => (this.items = data.contents));
  }
};
</script>

<style>
</style>