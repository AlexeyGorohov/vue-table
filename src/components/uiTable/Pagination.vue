<template>
  <div class="pagination">
    <button
      type="submit"
      :class="[
        'pagination__button pagination__button_prev',
        { pagination__button_disabled: disabledPrev },
      ]"
      :disabled="disabledPrev"
      @click="$emit('prev')"
    >
      <prev-icon />
    </button>
    <div class="pagination__state">
      <slot />
    </div>
    <button
      type="submit"
      :class="[
        'pagination__button pagination__button_next',
        { pagination__button_disabled: disabledNext },
      ]"
      :disabled="disabledNext"
      @click="$emit('next')"
    >
      <next-icon />
    </button>
  </div>
</template>

<script>
import NextIcon from '../../assets/svg/next.svg';
import PrevIcon from '../../assets/svg/prev.svg';

export default {
  name: 'Pagination',
  props: {
    disabledNext: {
      type: Boolean,
      default: false,
    },
    disabledPrev: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    NextIcon,
    PrevIcon,
  },
};
</script>
