<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <input type="text" v-model="modificatorValue">
    <my-button
        @click="showDialogue"
        style="margin: 15px 0;"
    >
      Создать пост
    </my-button>
    <my-dialogue v-model:show="dialogueVisible">
      <post-form
          @create="createPost"
      />
    </my-dialogue>
    <post-list
        :posts="posts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка..</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialogue from "@/components/UI/MyDialogue.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: {
    MyButton,
    MyDialogue,
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogueVisible: false,
      isPostsLoading: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogueVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialogue() {
      this.dialogueVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
      } catch (e) {
        alert('ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
