<template>
  <div
    v-click-outside="hide"
    :class="['dropdown', { dropdown_active: show, dropdown_loading: disabled }]"
  >
    <div class="dropdown__title" @click="show = !show">{{ title }}</div>
    <div v-if="show" class="dropdown__container dropdown__container_auto">
      <div
        v-for="(item, index) in items"
        :key="`dropdown__${index}`"
        :class="[
          'dropdown__item',
          { 'dropdown__item-active': activeItem === item },
        ]"
        @click="$emit('change', item), (show = false)"
      >
        {{ item }} per Page
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'DropdownPerPage',
  directives: {
    ClickOutside,
  },
  props: {
    activeItem: null,
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      return `${this.activeItem} Per page`;
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    hide() {
      if (this.show) {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="scss"></style>
