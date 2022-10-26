<template>
  <div class="blog-card-wrap">
    <div class="form">
      <form @submit.prevent="handleFormSubmit">
        <h1>Create a new Post</h1>
        <input type="text" placeholder="Title" v-model="title" />
        <button type="submit">Create new Post</button>
      </form>
    </div>
    <h1>Posts</h1>
    <div class="blog-cards container">
      <Post
        v-for="[post, index] in Object.entries(posts)"
        :key="index"
        :post="posts[post]"
      />
      <h1 v-if="posts === {}">No Posts</h1>
    </div>
  </div>
</template>

<script setup>
import Post from "../components/Post.vue";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

// Getting API URL
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_POSTS_URL = import.meta.env.VITE_POSTS_URL;

const store = useStore();

// Refs
const title = ref(null);

// Computed
const posts = computed({
  get() {
    return store.state.posts;
  },
});

const fetchData = () => {
  axios
    .get(`${VITE_API_URL}/posts`)
    .then((response) => {
      if (response.status === 200) {
        store.commit("savePostsData", response.data);
      } else {
        console.log("Error in retrieving data");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const handleFormSubmit = () => {
  const data = { title: title.value };
  title.value = null;

  axios
    .post(`${VITE_POSTS_URL}/posts`, data)
    .then((response) => {
      console.log("response.status :>> ", response.status);
      if (response.status === 201) {
        store.commit("addPostData", response.data);
      } else {
        console.log("Error in sending data");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;

    input {
      width: 100%;
      border: none;
      background-color: #f2f7f6;
      padding: 4px 4px 4px 30px;
      height: 50px;

      &:focus {
        outline: none;
      }
    }

    button {
      transition: 500ms ease all;
      cursor: pointer;
      margin-top: 24px;
      padding: 12px 24px;
      background-color: #303030;
      color: white;
      border-radius: 20px;
      text-transform: uppercase;

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: rgba(48, 48, 48, 0.7);
      }
    }
  }

  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
}
</style>
