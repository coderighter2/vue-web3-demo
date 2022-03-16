<template>
  <div>
    <WivNavBar />
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
import WivNavBar from './components/WivNavBar.vue';
export default {
  name: 'App',
  components: {
    WivNavBar
  },
  created() {
    this.$store.dispatch("accounts/initWeb3Modal");
    this.$store.dispatch("accounts/ethereumListener");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
