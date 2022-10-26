<template>
  <div class="blog-card">
    <div class="info">
      <h4>Title: {{ post.title }}</h4>
      <h6>ID: {{ post.id }}</h6>
    </div>
    <form @submit.prevent="handleFormSubmit" class="form">
      <input type="text" placeholder="Comment" v-model="comment" />
      <button type="submit">Comment</button>
    </form>
    <h4>Comments</h4>
    <div class="comments">
      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <p>
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// Getting API URL
const VITE_COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL;

// Defining Props
const props = defineProps({
  post: Object,
});

// Computed
const comments = ref([]);
const comment = ref(null);

const fetchComments = () => {
  comments.value = props.post.comments;
};

const handleFormSubmit = () => {
  const data = { content: comment.value };
  comment.value = null;

  axios
    .post(`${VITE_COMMENTS_URL}/posts/${props.post.id}/comments`, data)
    .then((response) => {
      if (response.status === 201) {
        comments.value = response.data;
      } else {
        console.log("Error in retrieving data");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  fetchComments();
});
</script>

<style scoped lang="scss">
.blog-card {
  border-radius: 5px;
  text-align: center;
  min-width: 550px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .info {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }

  .form {
    display: flex;
    flex-direction: row;
    padding: 10px;

    input {
      width: 100%;
      border: none;
      background-color: #f2f7f6;
      padding: 4px 4px 4px 30px;
      height: 15px;

      &:focus {
        outline: none;
      }
    }

    button {
      transition: 500ms ease all;
      cursor: pointer;
      padding: 4px 8px;
      background-color: #303030;
      color: white;
      border-radius: 15px;
      text-transform: uppercase;
      font-size: xx-small;

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: rgba(48, 48, 48, 0.7);
      }
    }
  }

  .comments {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;

    .comment {
      width: 100%;
      padding: 1px;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    }
  }
}
</style>
