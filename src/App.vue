<script setup>
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<style>
</style>
