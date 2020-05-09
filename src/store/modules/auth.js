import mutations from '@/store/mutations';
import {
  firebaseLogin, firebaseLogout, firebaseResetPassword, firebaseSignUp,
} from '@/services/firebase/auth.service';

const {
  IS_LOGGED_IN,
  LOGIN_LOADER,
  SIGNUP_LOADER,
  RESET_PASSWORD_LOADER,
  IS_FIRST_LOGIN,
} = mutations;

const authStore = {
  namespaced: true,
  state: {
    isLoggedIn: Boolean(localStorage.getItem('vue_app_token')),
    loginInProgress: false,
    signUpInProgress: false,
    resetPasswordInProgress: false,
    isFirstLogin: false,
  },
  getters: {
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
    signUpInProgress: ({ signUpInProgress }) => signUpInProgress,
    isFirstLogin: ({ isFirstLogin }) => isFirstLogin,
  },
  mutations: {
    [IS_LOGGED_IN](state, bool) {
      state.isLoggedIn = bool;
    },
    [LOGIN_LOADER](state, bool) {
      state.loginInProgress = bool;
    },
    [SIGNUP_LOADER](state, bool) {
      state.signUpInProgress = bool;
    },
    [RESET_PASSWORD_LOADER](state, bool) {
      state.resetPasswordInProgress = bool;
    },
    [IS_FIRST_LOGIN](state, bool) {
      state.isFirstLogin = bool;
    },
  },
  actions: {
    setIsLoggedInState: {
      handler({ commit }, bool) {
        commit(IS_LOGGED_IN, bool);
      },
      root: true,
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGIN_LOADER, true);
        await firebaseLogin(email, password);
      } catch (err) {
        dispatch(
          'loadMessage',
          { type: 'error', message: err.message },
          { root: true },
        );
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },
    async logout() {
      try {
        await firebaseLogout();
      } catch (err) {
        console.log(err);
      }
    },
    async signUp({ commit, dispatch }, { email, password }) {
      try {
        commit(SIGNUP_LOADER, true);
        const data = await firebaseSignUp(email, password);
        commit(IS_FIRST_LOGIN, data.additionalUserInfo.isNewUser);
      } catch (err) {
        dispatch(
          'loadMessage',
          { type: 'error', message: err.message },
          { root: true },
        );
      } finally {
        commit(SIGNUP_LOADER, false);
      }
    },
    async resetPassword({ commit, dispatch }, { email }) {
      try {
        commit(RESET_PASSWORD_LOADER, true);
        await firebaseResetPassword(email);
        dispatch(
          'loadMessage',
          { type: 'info', message: 'Password reset instructions were sent to your email address.' },
          { root: true },
        );
      } catch (err) {
        dispatch(
          'loadMessage',
          { type: 'error', message: err.message },
          { root: true },
        );
      } finally {
        commit(RESET_PASSWORD_LOADER, false);
      }
    },
  },
};

export default authStore;
