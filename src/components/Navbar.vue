<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="p-2">
    <b-navbar-brand href="#">WiV Technology</b-navbar-brand>
    <b-navbar-nav>
      <a class="nav-link" href="#" v-if="!isUserConnected" @click="connectWeb3Modal">Connect your wallet</a>
      <a class="nav-link" href="#" v-if="isUserConnected" @click="disconnectWeb3Modal">Disconnect {{getActiveAccount.substring(0, 7)}}...</a>
    </b-navbar-nav>
    <b-navbar-nav>
      <a class="nav-link" href="#" @click="fectchNfts">Fetch NFTs</a>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected"]),
  },
  created() {
    this.$store.dispatch("accounts/initWeb3Modal");
    this.$store.dispatch("accounts/ethereumListener");
  },
  methods: {
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    fectchNfts() {
      this.$store.dispatch("contracts/fetchNfts");
    }
  }
}
</script>
