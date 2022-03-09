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
    let contract = new web3.eth.Contract(ContractsAbi, process.env.VUE_APP_CONTRACT_ADDRESS);
    commit("setContract", contract);
  },
  async fetchNfts({ commit, rootState }, { startIndex, endIndex}) {
    try {
      let web3 = rootState.accounts.web3;
      let contract = new web3.eth.Contract(ContractsAbi, process.env.VUE_APP_CONTRACT_ADDRESS);
      const tokenCount = await contract.methods.totalSupply().call()
      commit("setTokenCount", tokenCount);
      const nfts = []
      for (let i = startIndex; i < endIndex; i++) {
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
  },

  async getLWINPrice(value) {
    const rest = axios.create({
      baseURL: 'https://sandbox-api.liv-ex.com/data/v2',
      headers: {
        'Content-Type': 'application/json',
        'client_key': process.env.VUE_APP_LIVEX_CLIENT_KEY,
        'client_secret': process.env.VUE_APP_LIVEX_CLIENT_SECRET
      }
    });
    const res = await rest.get('priceData')
    console.log('liv ex', value)
    return res
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

