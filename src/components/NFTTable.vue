<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Description</th>
        <th>Attributes</th>
      </tr>
    </thead>
    <tbody
      v-for="nft in nfts"
      :key="nft.name"
    >
      <tr>
        <td class="cost">{{ nft.name }}</td>
        <td><img :src="nft.image" :alt="nft.name"/></td>
        <td>{{ nft.description }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "NFTTable",
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