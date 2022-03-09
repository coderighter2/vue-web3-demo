<template>
  <div class="greetings">
    <h1 class="green">WiV Technology</h1>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" v-if="!isUserConnected" @click="connectWeb3Modal">Connect your wallet</a>
        <a class="nav-link" href="#" v-if="isUserConnected" @click="disconnectWeb3Modal">Disconnect {{getActiveAccount.substring(0, 7)}}...</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters("contracts", ["nfts", "contract"]),
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getWeb3Modal"])
  },
  methods: {
    ...mapActions('contracts', ['fetchNfts', 'fetchContracts']),
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"])
  },
  async created() {
    await this.$store.dispatch("accounts/initWeb3Modal");
    await this.$store.dispatch("accounts/ethereumListener");
    await this.fetchContracts()

    console.log('fetched nfts', this.contract)
  }
}
</script>
