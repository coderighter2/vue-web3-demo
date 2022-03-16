<template>
  <div class="overflow-auto">
    <div v-if="!isUserConnected">
      <b-alert class="mt-2" show>Please connect to your wallet(You need to add poloygon mainnet in metamask)</b-alert>
      <b-button variant="outline-primary" @click="connectWeb3Modal">Conntect your wallet</b-button>
    </div>
    <div v-else>
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
  watch: {
    async isUserConnected(val) {
      if (val) {
        console.log('start fetch contracts')
        await this.fetchContracts()
        await this.fetchNftCount()
        await this.fetchNfts({startIndex: 0, endIndex: 9})
      }
    }
  },
  methods: {
    ...mapActions('contracts', ['fetchNfts', 'fetchNftCount', 'fetchContracts']),
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    handlePage(page) {
      this.fetchNfts({startIndex: this.perPage * (page - 1), endIndex: (this.perPage * page) - 1})
    }
  },
  async created() {
  }
}
</script>
