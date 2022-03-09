import ContractsAbi from "../../contracts/contracts.json";
import axios from 'axios';

const state = {
  contract: null,
  tokenCount: 0,
  nfts: null
}

const getters = {
  nfts(state) {
    return state.nfts;
  },
  contract(state) {
    return state.contract;
  },
  tokenCount(state) {
    return state.tokenCount;
  }
}

const actions = {
  async fetchContracts({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let contract = new web3.eth.Contract(ContractsAbi, '0x57a8d59eff06381a9b0d709271871187ee1b418c');
    commit("setContract", contract);
  },
  async fetchNfts({ commit, rootState }) {
    try {
      let web3 = rootState.accounts.web3;
      let contract = new web3.eth.Contract(ContractsAbi, '0x57a8d59eff06381a9b0d709271871187ee1b418c');
      const tokenCount = await contract.methods.totalSupply().call()
      commit("setTokenCount", tokenCount);
      const nfts = []
      for (let i = 0; i < 10; i++) {
        const tokenId = await contract.methods.tokenByIndex(i).call()
        const tokenUri = await contract.methods.tokenURI(tokenId).call()
        const rest = axios.create({
          baseURL: tokenUri,
          headers: { 'Content-Type': 'application/json'}
        });
        const res = await rest.get()
        nfts.push(res.data)
      }
      commit("setNfts", nfts);
    } catch (e) {
      console.error(e);
    }
  }
}

const mutations = {
  setNfts(state, nfts) {
    state.nfts = nfts;
  },
  setContract(state, contract) {
    state.contract = contract;
  },
  setTokenCount(state, tokenCount) {
    state.tokenCount = tokenCount
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

