<template>
  <div id="app">
    <ui-table
      :items="items"
      :keys="[
        { key: 'product', title: 'Product (100g serving)' },
        { key: 'calories', title: 'Calories' },
        { key: 'fat', title: 'Fat (g)' },
        { key: 'carbs', title: 'Carbs (g)' },
        { key: 'protein', title: 'Protein (g)' },
        { key: 'iron', title: 'Iron (%)' },
      ]"
      :loading="loading"
      @delete-items="deleteItems"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import uiTable from './components/uiTable/Index';

export default {
  name: 'App',
  computed: {
    ...mapState(['items', 'loading']),
  },
  components: {
    uiTable,
  },
  async mounted() {
    await this.fetchItems();
  },
  methods: {
    ...mapActions(['fetchItems', 'deleteItem']),

    async deleteItems(items) {
      for (const item of items) {
        await this.deleteItem(item);
      }
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
