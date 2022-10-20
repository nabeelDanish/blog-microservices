import { createStore } from "vuex";

export default createStore({
  state: {
    posts: {},
  },
  mutations: {
    savePostsData(state, payload) {
      state.posts = payload;
    },
    addPostData(state, payload) {
      state.posts[payload.id] = payload;
    },
  },
  actions: {},
  modules: {},
});
