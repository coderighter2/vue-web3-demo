<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Description</th>
        <th>Price</th>
        <th>Attributes</th>
      </tr>
    </thead>
    <NFTTableItem v-for="(nft, index) in nfts" :key="index" :nft="nft" />
  </table>
</template>

<script>
import NFTTableItem from './NFTTableItem.vue';

export default {
  name: "NFTTable",
  components: {
    NFTTableItem
  },
  props: {
    nfts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  tr {
    border: 0.64px solid #dbdbdb;
    height: 48px;
    th {
      padding: 16px;
      font-size: 16px;
      font-weight: 700;
    }
    td {
      padding: 16px;
      img {
        width: 120px;
      }
    }
  }

}
</style>