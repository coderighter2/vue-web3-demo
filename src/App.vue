<script setup>
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch("accounts/initWeb3Modal");
    this.$store.dispatch("accounts/ethereumListener");
  }
}
</script>

<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<style>
</style>
