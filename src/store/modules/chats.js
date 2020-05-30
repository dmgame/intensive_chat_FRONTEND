import mutations from '@/store/mutations';
import axios from '@/plugins/axios';

const {
  PUBLIC_CHATS,
  SELECT_CHAT_ID,
  CURRENT_CHAT,
  CURRENT_CHAT_MSGS,
  NEW_MSG,
} = mutations;


const chatsStore = {
  namespaced: true,
  state: {
    publicChats: [],
    selectedChatId: '',
    currentChat: null,
    currentChatMessages: [],
  },
  getters: {
    publicChats: ({ publicChats }) => publicChats,
    selectedChatId: ({ selectedChatId }) => selectedChatId,
    currentChat: ({ currentChat }) => currentChat,
    currentChatMessages: ({ currentChatMessages }) => currentChatMessages,
  },
  mutations: {
    [PUBLIC_CHATS](state, arr) {
      state.publicChats = arr;
    },
    [SELECT_CHAT_ID](state, str) {
      state.selectedChatId = str;
    },
    [CURRENT_CHAT](state, obj) {
      state.currentChat = obj;
    },
    [CURRENT_CHAT_MSGS](state, arr) {
      state.currentChatMessages = arr;
    },
    [NEW_MSG](state, msg) {
      state.currentChatMessages.push(msg);
    },
  },
  actions: {
    async getPublicChats({ commit }) {
      try {
        const res = await axios.get('/chats/public');
        commit(PUBLIC_CHATS, res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getSelectedChat({ commit }, id) {
      try {
        const res = await axios.get(`/chats/${id}`);
        commit(CURRENT_CHAT, res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getSelectedChatMsgs({ commit }, id) {
      try {
        const res = await axios.get(`/messages/chat/${id}`);
        commit(CURRENT_CHAT_MSGS, res.data);
      } catch (err) {
        console.log(err);
        commit(CURRENT_CHAT_MSGS, []);
      }
    },
    selectChat({ commit, dispatch }, id) {
      commit(SELECT_CHAT_ID, id);
      dispatch('getSelectedChatMsgs', id);
      dispatch('getSelectedChat', id);
    },
    newMessage({ commit }, msg) {
      commit(NEW_MSG, msg);
    },
  },
};

export default chatsStore;
