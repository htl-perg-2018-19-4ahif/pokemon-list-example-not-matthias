<template>
  <div id="app">
    <PokemonList />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonList from "./components/PokemonList.vue";

@Component({
  components: {
    PokemonList
  }
})
export default class App extends Vue {}
</script>


<style>
#app {
}
</style>
