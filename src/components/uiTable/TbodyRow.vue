<template>
  <tr
    class="table__tr"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <td
      v-for="({ key }, index) in keys"
      :key="`tbody_tr_${index}`"
      :class="[
        `table__td table__td_${index}`,
        {
          table__td_checkbox: key === CHECKED,
          table__td_deleted: key === DELETED,
        },
      ]"
    >
      <div v-if="key === CHECKED">
        <custom-checkbox
          :checked="item[key]"
          @change="$emit('toggle-checked')"
        />
      </div>
      <div v-else-if="key === DELETED">
        <popover-deleted-item v-if="isHover" @ok="$emit('deleted-item')">
          <delete-icon /><span class="mx-d-inline-block mx-ml-5">Delete</span>
        </popover-deleted-item>
      </div>
      <div v-else>
        {{ item[key] }}
      </div>
    </td>
  </tr>
</template>

<script>
import { DELETED, CHECKED } from './_constants';

import PopoverDeletedItem from './PopoverDeletedItem';
import CustomCheckbox from './CustomCheckbox';

import DeleteIcon from '../../assets/svg/delete.svg';

export default {
  name: 'Table-tbody-row',
  props: {
    keys: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    DELETED,
    CHECKED,
    isHover: false,
  }),
  components: {
    DeleteIcon,
    PopoverDeletedItem,
    CustomCheckbox,
  },
};
</script>

<style></style>
