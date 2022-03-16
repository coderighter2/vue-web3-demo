<template>
  <div class="overflow-auto">
    <div v-if="nfts && nfts.length">
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
    <div v-else>
      <div v-if="!isUserConnected">
        <b-alert class="mt-2" show>Please connect to your wallet(You need to add poloygon mainnet in metamask)</b-alert>
        <b-button variant="outline-primary" @click="connectWeb3Modal">Conntect your wallet</b-button>
      </div>
      <div v-else>
        <b-alert class="mt-2" show>Connected to your wallet. Please click the follwoing Get NFTs button!</b-alert>
        <b-button variant="outline-primary" @click="handlePage(1)">Get NFTs</b-button>

      </div>
    </div>
    <loading :active="isLoading" is-full-page/>
  </div>
</template>

<script setup>
import { mapGetters, mapActions } from "vuex";
import NFTTable from '../components/NFTTable.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'HomeView',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    NFTTable,
    Loading
  },
  computed: {
    ...mapGetters('contracts', ['nfts', 'contract', 'tokenCount']),
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getWeb3Modal"])
  },
  watch: {
    isUserConnected(val) {
      if (val) {
        this.fetchContracts()
      }
    }
  },
  methods: {
    ...mapActions('contracts', ['fetchNfts', 'fetchNftCount', 'fetchContracts']),
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    async handlePage(page) {
      this.isLoading = true
      if (!this.tokenCount) {
        await this.fetchNftCount()
      }
      await this.fetchNfts({startIndex: this.perPage * (page - 1), endIndex: (this.perPage * page) - 1})
      this.isLoading = false
    }
  },
  async created() {
  }
}
</script>
