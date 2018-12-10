<template>
  <div>
    <!-- Nav -->
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand>Pokemon List</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-form-input size="sm" type="text" placeholder="Search" v-model="filter"/>
      </b-navbar-nav>
    </b-navbar>

    <!-- Table -->
    <b-container>
      <b-table
        show-empty
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template slot="name" slot-scope="row">{{row.value}}</template>
        <template slot="details" slot-scope="row">
          <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)">Details</b-button>
        </template>
      </b-table>

      <!-- Pagination -->
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        align="center"
      />

      <!-- Info modal -->
      <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
        <pre>{{ modalInfo.content }}</pre>
      </b-modal>
    </b-container>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { PokemonAPI, IPokemonList, IPokemonListItem } from "./pokemon-api";
import { Button } from 'bootstrap-vue';

const api = new PokemonAPI();

@Component
export default class PokemonList extends Vue {
  fields: any = [
    {
      key: "name",
      label: "Name",
      sortable: true
    },
    {
      key: "details",
      label: "Details"
    }
  ];
  items: IPokemonListItem[] = [];
  filter = null;

  totalRows: number = 0;
  perPage: number = 10;
  currentPage: number = 1;

  sortBy = null;
  sortDesc = false;
  sortDirection = "asc";

  modalInfo = { title: "", content: "" };

  async mounted() {
    const response = await api.getPokemonList();
    this.items = response.list;
    this.totalRows = response.list.length;
  }

  onSearch(event: any) {
    console.log(event);
  }

  onFiltered(filteredItems: IPokemonListItem[]) {
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  }

  resetModal() {
    this.modalInfo.title = "";
    this.modalInfo.content = "";
  }

  info(item: IPokemonListItem, index: number, button: Button) {
    this.modalInfo.title = `Row index: ${index}`;
    this.modalInfo.content = JSON.stringify(item, null, 2);
    this.$root.$emit("bv::show::modal", "modalInfo", button);
  }
}
</script>


<style>
</style>
