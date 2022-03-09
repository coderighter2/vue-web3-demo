<script setup>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters("contracts", ["nfts"])
  },
  methods: {
    ...mapActions('contracts', ['fetchNfts'])
  },
  async created() {
    await this.fetchNfts()
    console.log('fetched nfts', this.nfts)
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">WiV Technology</h1>
  </div>
</template>
