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
  fetchContracts({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let contract = new web3.eth.Contract(ContractsAbi, process.env.VUE_APP_CONTRACT_ADDRESS);
    commit("setContract", contract);
  },

  async fetchNftCount({ state, commit }) {
    const tokenCount = await state.contract.methods.totalSupply().call()
    commit("setTokenCount", tokenCount);
  },

  async fetchNfts({ commit }, { startIndex, endIndex}) {
    try {
      const nfts = []
      for (let i = startIndex; i < endIndex; i++) {
        const tokenId = await state.contract.methods.tokenByIndex(i).call()
        const tokenUri = await state.contract.methods.tokenURI(tokenId).call()
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
  async getLWINPrice(_, value) {
    try {
      const rest = axios.create({
        baseURL: 'https://sandbox-api.liv-ex.com/data/v2',
        headers: {
          'CONTENT-TYPE': 'application/json',
          'ACCEPT': 'application/json',
          'CLIENT_KEY': process.env.VUE_APP_LIVEX_CLIENT_KEY,
          'CLIENT_SECRET': process.env.VUE_APP_LIVEX_CLIENT_SECRET
        }
      });
      const res = await rest.post('priceData', {
        lwin: [value.toString()],
        priceType: ['A'],
        currency: 'usd'
      })
      const lwinDetail = res && res.data && res.data.lwinDetail
      if (lwinDetail && lwinDetail.length > 0) {
        const dataDetail = lwinDetail[0].dataDetail
        if (dataDetail && dataDetail.length > 0 ) {
          return dataDetail[0].priceData
        }
      } 
      return ''  
    } catch(e) {
      console.error(e)
      return ''
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

