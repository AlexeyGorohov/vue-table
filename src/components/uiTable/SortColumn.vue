<template>
  <div :class="['sort', { sort_loading: disabled }]">
    <div class="sort__title">Sorting by:</div>
    <div class="sort__items">
      <div
        v-for="({ key, title }, index) in items"
        :key="`sort_${index}`"
        :class="['sort__item', { sort__item_active: sortColumn === key }]"
        @click="$emit('update:sort-column', sortColumn === key ? null : key)"
      >
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sort-column',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
    },
    sortColumn: null,
  },
};
</script>
