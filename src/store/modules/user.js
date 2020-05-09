import mutations from '@/store/mutations';
import axios from '@/plugins/axios';

const { USER } = mutations;

const userStore = {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    user: ({ user }) => user,
  },
  mutations: {
    [USER](state, obg) {
      state.user = obg;
    },
  },
  actions: {
    setUserState: {
      handler({ commit }, user) {
        // ! delete
        commit(USER, user);
        // *dispatch('getUser', user.email)
      },
      root: true,
    },
    // async getUser({ commit }, email) {
    //   try {
    //     // *await axios.get('/users/${email}');
    //     // *commit(USER, user);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async createUserInfo(context, data) {
      try {
        await axios.post('/users', data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default userStore;
