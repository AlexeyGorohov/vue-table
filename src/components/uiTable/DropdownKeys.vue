<template>
  <div
    v-click-outside="hide"
    :class="[
      'dropdown dropdown_multi',
      { dropdown_active: show, dropdown_loading: disabled },
    ]"
  >
    <div class="dropdown__title" @click="show = !show">{{ title }}</div>
    <div v-if="show" :class="['dropdown__container']">
      <div
        :class="['dropdown__item', { 'dropdown__item-active': isAllChecked }]"
      >
        <custom-checkbox :checked="isAllChecked" @change="changeAll" />
        <div class="dropdown__text">
          Select All
        </div>
      </div>
      <div
        v-for="({ key, title }, index) in items"
        :key="`dropdown__${index}`"
        :class="[
          'dropdown__item',
          { 'dropdown__item-active': isCheckedItem(key) },
        ]"
      >
        <custom-checkbox
          :checked="isCheckedItem(key)"
          @change="changeItem(key)"
        />
        <div class="dropdown__text">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

import CustomCheckbox from './CustomCheckbox';

export default {
  name: 'KeysDropdown',
  directives: {
    ClickOutside,
  },
  props: {
    keysDropdownHidden: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CustomCheckbox,
  },
  data: () => ({
    show: false,
  }),
  computed: {
    title() {
      return `${this.items.length -
        this.keysDropdownHidden.length} columns selected`;
    },

    isAllChecked() {
      return this.items.every(
        ({ key }) => !this.keysDropdownHidden.includes(key)
      );
    },

    isCheckedItem() {
      return (key) => {
        return !this.keysDropdownHidden.includes(key);
      };
    },
  },
  methods: {
    hide() {
      if (this.show) {
        this.show = false;
      }
    },

    changeAll() {
      const arr = this.isAllChecked ? this.items.map(({ key }) => key) : [];

      this.$emit('update:keys-dropdown-hidden', arr);
    },

    changeItem(item) {
      const arr = this.keysDropdownHidden.includes(item)
        ? this.keysDropdownHidden.filter((_item) => _item !== item)
        : [...this.keysDropdownHidden, item];

      this.$emit('update:keys-dropdown-hidden', arr);
    },
  },
};
</script>

<style lang="scss"></style>
