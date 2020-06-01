<template>
  <div
    :class="['custom-checkbox', { 'custom-checkbox_checked': checked }]"
    @click="$emit('change')"
  ></div>
</template>

<script>
export default {
  name: 'Custom-checkbox',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
