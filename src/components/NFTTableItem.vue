<template>
  <tbody>
    <tr>
      <td class="cost">{{ nft.name }}</td>
      <td><img :src="nft.image" :alt="nft.name"/></td>
      <td>{{ nft.description }}</td>
      <td>${{ price }}</td>
      <td><button type="button" @click="onAttributes()">View Attributes</button>
      </td>
    </tr>
    <template v-if="view_attr">
      <tr class="">
        <td>Trait Type</td>
        <td>Value</td>
      </tr>
      <tr class="" v-for="(attribute, index) in nft.attributes" :key="index">
        <td>{{attribute.trait_type}}</td>
        <td>{{attribute.value}}</td>
      </tr>
    </template>
  </tbody>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NFTTableItem",
  data() {
    return {
      view_attr: false,
      price: 0
    }
  },
  props: {
    nft: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    ...mapActions('contracts', ['getLWINPrice']),
    onAttributes() {
      this.view_attr = !this.view_attr
    }
  },
  async created() {
    const lwin = this.nft.attributes.find(attr => attr.trait_type === 'LWIN')
    this.price = await this.getLWINPrice(lwin.value)
  }
}
</script>
<style scoped>
tr {
  border: 0.64px solid #dbdbdb;
  height: 48px;
  margin-left: 30px;
}
th {
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
}
td {
  padding: 16px;
}
img {
  width: 120px;
}
</style>