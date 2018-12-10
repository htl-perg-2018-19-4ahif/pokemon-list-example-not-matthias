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
          <b-button size="sm" @click.stop="openModal(row.item, row.index, $event.target)">Details</b-button>
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
      <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.name" ok-only>
        <!-- Image -->
        <b-img thumbnail center :src="modalInfo.image" alt="Image"/>

        <hr>

        <!-- Name -->
        <b-btn v-b-toggle.name class="m-1 btn-block">Name</b-btn>

        <b-collapse id="name">
          <b-card>{{ modalInfo.name }}</b-card>
        </b-collapse>

        <!-- Weight -->
        <b-btn v-b-toggle.weight class="m-1 btn-block">Weight</b-btn>

        <b-collapse id="weight">
          <b-card>{{ modalInfo.weight }}</b-card>
        </b-collapse>

        <hr>

        <b-btn v-b-toggle.ablities class="m-1 btn-block">Abilities</b-btn>

        <!-- Ability -->
        <b-collapse id="ablities">
          <b-card
            v-for="(ability, key) in modalInfo.abilities"
            :key="key"
          >{{ `Name: ${ability.ability.name}` }}</b-card>
        </b-collapse>
      </b-modal>
    </b-container>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  PokemonAPI,
  IPokemonList,
  IPokemonListItem,
  IPokemon
} from "./pokemon-api";
import { Button } from "bootstrap-vue";

const api = new PokemonAPI();

// @ts-ignore
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

  modalInfo: IPokemon = {
    name: "",
    weight: 0,
    image: "",
    abilities: []
  };

  /**
   * Initializes the list
   */
  async mounted() {
    const response = await api.getPokemonList();
    this.items = response.list;
    this.totalRows = response.list.length;
  }

  /**
   * Filters a specific item
   */
  onFiltered(filteredItems: IPokemonListItem[]) {
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  }

  /**
   * Resets the modal
   */
  resetModal() {
    this.modalInfo = {
      name: "",
      weight: 0,
      image: "",
      abilities: []
    };
  }

  /**
   * Opens the modal
   */
  async openModal(item: IPokemonListItem, index: number, button: Button) {
    const response = await api.getPokemonById(index + 1);
    this.modalInfo = response;

    this.$root.$emit("bv::show::modal", "modalInfo", button);
  }
}
</script>

<style>
</style>
