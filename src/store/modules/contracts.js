import ContractsAbi from "../../contracts/contracts.json";

const state = {
  contract: null,
  nfts: null
}

const getters = {
  nfts(state) {
    return state.nfts;
  },
  contract(state) {
    return state.contract;
  }
}

const actions = {
  async fetchContracts({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let contract = new web3.eth.Contract(ContractsAbi, '0x57a8d59eff06381a9b0d709271871187ee1b418c');
    commit("setContract", contract);
  },
  async fetchNfts({ commit }) {
    commit("setNfts", []);
  }
}

const mutations = {
  setNfts(state, nfts) {
    state.nfts = nfts;
  },
  setContract(state, contract) {
    state.contract = contract;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

