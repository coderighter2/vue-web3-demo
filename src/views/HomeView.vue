<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="tokenCount"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-table
      id="my-table"
      :items="nfts"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>

<script setup>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'HomeView',
  data() {
    return {
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters('contracts', ['nfts', 'contract', 'tokenCount']),
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getWeb3Modal"])
  },
  methods: {
    ...mapActions('contracts', ['fetchNfts', 'fetchContracts']),
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"])
  },
  async created() {
  }
}
</script>
