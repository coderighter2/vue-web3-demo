<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="tokenCount"
      :per-page="perPage"
      aria-controls="my-table"
      @change="handlePage"
      class="mt-2"
    ></b-pagination>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <NFTTable
      v-if="nfts"
      :nfts="nfts"
    ></NFTTable>
  </div>
</template>

<script setup>
import { mapGetters, mapActions } from "vuex";
import NFTTable from '../components/NFTTable.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      perPage: 10,
      currentPage: 1
    }
  },
  components: {
    NFTTable
  },
  computed: {
    ...mapGetters('contracts', ['nfts', 'contract', 'tokenCount']),
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getWeb3Modal"])
  },
  methods: {
    ...mapActions('contracts', ['fetchNfts', 'fetchContracts']),
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    handlePage(page) {
      console.log({startIndex: this.perPage * (page - 1), endIndex: (this.perPage * page) - 1})
      this.fetchNfts({startIndex: this.perPage * (page - 1), endIndex: (this.perPage * page) - 1})
    }
  },
  async created() {
  }
}
</script>
