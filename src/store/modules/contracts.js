const state = {
  nfts: null
}

const getters = {
  nfts(state) {
    return state.nfts;
  }
}

const actions = {
  async fetchNfts({ commit }) {
    commit("setNfts", []);
  }
}

const mutations = {
  setNfts(state, nft) {
    state.nfts = nft;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

