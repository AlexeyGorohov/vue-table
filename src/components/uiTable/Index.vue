<template>
  <div class="container">
    <div class="container__heading">Table UI</div>
    <div class="settings">
      <div class="settings__top">
        <div class="settings__col">
          <sort-column
            :disabled="loading"
            :items="keysForSortColumn"
            :sort-column.sync="sortColumn"
          />
        </div>

        <div class="settings__col">
          <div class="settings__filter settings__filter_button">
            <button
              type="submit"
              :class="[
                'button',
                {
                  button_disabled: loading || this.checkedRowsId.length < 1,
                },
              ]"
              :disabled="loading || this.checkedRowsId.length < 1"
              @click="$emit('delete-items', checkedRowsId)"
            >
              {{ btnDeleteTitle }}
            </button>
          </div>

          <div class="settings__filter settings__filter_per-page">
            <dropdown-per-page
              :disabled="loading"
              :active-item="perPage"
              :items="ARRAY_PARE_PAGE"
              @change="(perPage = $event), (page = 1), (checkedRowsId = [])"
            />
          </div>

          <div
            v-if="items.length > 0"
            class="settings__filter settings__filter_pagination"
          >
            <pagination
              :disabled-prev="itemsSliceFrom === 0 || loading"
              :disabled-next="itemsSliceTo === items.length || loading"
              @next="(page = page + 1), (checkedRowsId = [])"
              @prev="(page = page - 1), (checkedRowsId = [])"
            >
              <template>
                {{ itemsSliceFrom + 1 }} - {{ itemsSliceTo }} of
                {{ items.length }}
              </template>
            </pagination>
          </div>

          <div class="settings__filter settings__filter_column-select">
            <dropdown-keys
              :disabled="loading"
              :items="prepareKeys"
              :keys-dropdown-hidden.sync="keysDropdownHidden"
            />
          </div>
        </div>
      </div>
    </div>
    <table :class="['table', { table_loading: loading }]">
      <table-thead
        :items="keysForThead"
        :is-all-checked="isAllChecked"
        :sort-by="sortBy"
        :sort-key="sortKey"
        @toggle-all-checked="toggleAllChecked"
        @change-sort="(sortKey = $event.key), (sortBy = $event.by)"
      />

      <tbody class="table__tbody">
        <table-tbody-row
          v-for="(item, index) in itemsSort"
          :key="`tbody_tr_${index}`"
          :item="item"
          :keys="keysForThead"
          @toggle-checked="toggleChecked(item.id)"
          @deleted-item="$emit('delete-items', [item.id])"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import orderBy from 'lodash.orderby';

import SortColumn from './SortColumn';
import Pagination from './Pagination';
import DropdownKeys from './DropdownKeys';
import DropdownPerPage from './DropdownPerPage';
import TableThead from './Thead';
import TableTbodyRow from './TbodyRow';

import { DELETED, CHECKED } from './_constants';

export default {
  name: 'Table',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    keys: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    DELETED,
    CHECKED,

    checkedRowsId: [],

    ARRAY_PARE_PAGE: [10, 15, 20],
    perPage: 10,
    page: 1,

    keysDropdownHidden: [],

    sortBy: null,
    sortKey: null,

    sortColumn: null,
  }),
  components: {
    SortColumn,
    TableThead,
    Pagination,
    DropdownKeys,
    TableTbodyRow,
    DropdownPerPage,
  },
  watch: {
    itemsSlice(items) {
      this.checkedRowsId = this.checkedRowsId.filter((_id) =>
        items.map(({ id }) => id).includes(_id)
      );
    },
  },
  computed: {
    itemsSliceFrom() {
      return (this.page - 1) * this.perPage;
    },

    itemsSliceTo() {
      return this.page * this.perPage > this.items.length
        ? this.items.length
        : this.page * this.perPage;
    },

    itemsSlice() {
      return this.items.slice(this.itemsSliceFrom, this.itemsSliceTo);
    },

    itemsChecked() {
      return this.itemsSlice.map((item) => ({
        [this.CHECKED]: this.checkedRowsId.includes(item.id),
        ...item,
      }));
    },

    itemsSort() {
      return orderBy(this.itemsChecked, [this.sortKey], [this.sortBy]);
    },

    btnDeleteTitle() {
      return this.checkedRowsId.length < 1
        ? 'Delete'
        : `Delete (${this.checkedRowsId.length})`;
    },

    prepareKeys() {
      return this.keys.length > 0
        ? this.keys
        : Object.keys(this.items[0]).map((item) => ({
            title: item,
            key: item,
          }));
    },

    sortKeys() {
      return [...this.prepareKeys].sort((a, b) => {
        return (a.key !== this.sortColumn) - (b.key !== this.sortColumn);
      });
    },

    keysForThead() {
      if (
        this.sortKeys.length < 1 ||
        this.sortKeys.every(({ key }) => this.keysDropdownHidden.includes(key))
      ) {
        return [];
      }

      return [
        { key: this.CHECKED },
        ...this.sortKeys,
        { key: this.DELETED },
      ].filter(({ key }) => !this.keysDropdownHidden.includes(key));
    },

    keysForSortColumn() {
      return this.prepareKeys.filter(
        ({ key }) => !this.keysDropdownHidden.includes(key)
      );
    },

    isAllChecked() {
      return this.itemsChecked.every(({ id }) =>
        this.checkedRowsId.includes(id)
      );
    },
  },
  methods: {
    toggleChecked(id) {
      if (this.checkedRowsId.includes(id)) {
        this.checkedRowsId = this.checkedRowsId.filter((_id) => _id !== id);

        return;
      }

      this.checkedRowsId.push(id);
    },

    toggleAllChecked() {
      if (this.isAllChecked) {
        this.checkedRowsId = [];

        return;
      }

      this.checkedRowsId = this.itemsChecked.map(({ id }) => id);
    },
  },
};
</script>
