<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand>Pokemon List</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              type="text"
              placeholder="Search"
              @input="onSearch"
            />
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container">
      <b-table hover :items="items" @filtered="onFiltered"></b-table>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { PokemonAPI, IPokemonList, IPokemonListItem } from "./pokemon-api";
import Component from "vue-class-component";

const api = new PokemonAPI();

@Component
export default class PokemonList extends Vue {
  fields: any = [
    {
      key: "Name",
      sortable: true
    },
    {
      key: "Url",
      sortable: false
    }
  ];
  search_value: string = "";
  items: IPokemonListItem[] = [];

  async mounted() {
    const response = await api.getPokemonList();
    this.items = response.list;
  }

  onSearch(event: any) {
    console.log(event);
  }

  onFiltered(filteredItems: any) {}
}
</script>


<style>
</style>
