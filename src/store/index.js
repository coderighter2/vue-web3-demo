import Vue from 'vue';
import Vuex from 'vuex';
import contracts from "./modules/contracts";
import accounts from "./modules/accounts";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      accounts,
      contracts
    }
});