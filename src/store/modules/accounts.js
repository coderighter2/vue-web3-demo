import Web3Modal from "web3modal";
import Web3 from "web3";

const state = {
  activeAccount: null,
  web3: null,
  isConnected: false,
  providerW3m: null,
  web3Modal: null
};

const getters = {
  getActiveAccount(state) {
    if (!state.activeAccount) {
      return window.ethereum.selectedAddress;
    }

    return state.activeAccount;
  },
  getActiveBalanceWei(state) {
    return state.activeBalance;
  },
  getActiveBalanceEth(state) {
    return state.web3.utils.fromWei(state.activeBalance, "ether");
  },
  getChainId(state) {
    return state.chainId;
  },
  getChainName(state) {
    return state.chainName;
  },
  getWeb3(state) {
    if (state.web3) {
      return state.web3;
    } else {
      return new Web3(Web3.givenProvider);
    }
  },
  getWeb3Modal(state) {
    return state.web3Modal;
  },
  isUserConnected(state) {
    return state.isConnected;
  }
};

const actions = {

  async initWeb3Modal({ commit }) {
    const providerOptions = {
    };
    
    const w3mObject = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });

    // This will get deprecated soon. Setting it to false removes a warning from the console.
    window.ethereum.autoRefreshOnNetworkChange = false;

    // if the user is flagged as already connected, automatically connect back to Web3Modal
    // if (localStorage.getItem('isConnected') === "true") {
    //   let providerW3m = await w3mObject.connect();
    //   commit("setIsConnected", true);

    //   commit("setActiveAccount", window.ethereum.selectedAddress);
    //   commit("setWeb3Provider", providerW3m);
    // }

    commit("setWeb3ModalInstance", w3mObject);
  },

  async connectWeb3Modal({ commit }) {
    let providerW3m = await state.web3Modal.connect();
    commit("setIsConnected", true);

    commit("setActiveAccount", window.ethereum.selectedAddress);
    commit("setWeb3Provider", providerW3m);
  },

  async disconnectWeb3Modal({ commit }) {
    commit("disconnectWallet");
    commit("setIsConnected", false);
  },

  async ethereumListener({ commit }) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (state.isConnected) {
        commit("setActiveAccount", accounts[0]);
        commit("setWeb3Provider", state.providerW3m);
      }
    });
  }
};

const mutations = {

  async disconnectWallet(state) {
    state.activeAccount = null;
    state.activeBalance = 0;
    state.web3 = null;
    if (state.providerW3m.close && state.providerW3m !== null) {
      await state.providerW3m.close();
    }
    state.providerW3m = null;
    await state.web3Modal.clearCachedProvider();
    window.location.href = '../'; // redirect to the Main page
  },

  setActiveAccount(state, selectedAddress) {
    state.activeAccount = selectedAddress;
  },

  async setWeb3Provider(state, providerW3m) {
    state.providerW3m = providerW3m;
    state.web3 = new Web3(providerW3m);
  },

  setIsConnected(state, isConnected) {
    state.isConnected = isConnected;
    localStorage.setItem('isConnected', isConnected);
  },

  setWeb3ModalInstance(state, w3mObject) {
    state.web3Modal = w3mObject;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
