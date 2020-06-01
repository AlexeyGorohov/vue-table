<template>
  <div class="popover" v-click-outside="hide">
    <div class="mx-vertical-center mx-cursor-pointer" @click="isShow = true">
      <slot />
    </div>

    <div v-if="isShow" class="popover__content">
      <div class="popover__container">
        Are you sure you want to <b>delete item ?</b>
      </div>
      <div class="popover__buttons">
        <div class="popover__button-item">
          <button
            type="submit"
            class="button button_br4 button_hide-hover"
            @click="isShow = false"
          >
            Cencel
          </button>
        </div>
        <div class="popover__button-item">
          <button
            type="submit"
            class="button button_br4 button_green"
            @click="$emit('ok'), (isShow = false)"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Popover-delete-item',
  data: () => ({
    isShow: false,
  }),
  directives: {
    ClickOutside,
  },
  methods: {
    hide() {
      if (this.isShow) {
        this.isShow = false;
      }
    },
  },
};
</script>
