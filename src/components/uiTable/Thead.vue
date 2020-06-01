<template>
  <thead class="table__thead">
    <tr class="table__tr">
      <th
        v-for="({ key, title }, index) in items"
        :key="`thead_${index}`"
        :class="[
          'table__td table__th',
          {
            table__td_checked: key === CHECKED,
          },
        ]"
        @click="onChangeSort(key)"
      >
        <div v-if="key === CHECKED">
          <custom-checkbox 
            :checked="isAllChecked"
            @change="$emit('toggle-all-checked')" 
          />
        </div>
        <div v-else-if="key === DELETED"></div>
        <div v-else class="mx-vertical-center">
          {{ title }}
          <component v-if="sortKey === key" :is="iconSort"></component>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
import UpIcon from '../../assets/svg/up.svg';
import DownIcon from '../../assets/svg/down.svg';

import CustomCheckbox from './CustomCheckbox';

import { DELETED, CHECKED, SORT_DESC, SORT_ASC } from './_constants';

export default {
  name: 'Thead',
  data: () => ({
    DELETED,
    CHECKED,
    SORT_ASC,
    SORT_DESC,
  }),
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isAllChecked: {
      type: Boolean,
      default: false,
    },
    sortBy: null,
    sortKey: null,
  },
  computed: {
    iconSort() {
      return this.sortBy === SORT_DESC ? 'DownIcon' : 'UpIcon';
    },
  },
  components: {
    UpIcon,
    DownIcon,
    CustomCheckbox,
  },
  methods: {
    onChangeSort(key) {
      if (key === CHECKED) {
        return;
      }

      if (this.sortKey === key) {
        this.$emit('change-sort', {
          key,
          by: SORT_DESC === this.sortBy ? SORT_ASC : SORT_DESC,
        });

        return;
      }

      this.$emit('change-sort', { key, by: SORT_ASC });
    },
  },
};
</script>
