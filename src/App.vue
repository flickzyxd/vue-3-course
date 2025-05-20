<template>
  <div class="app">
    <h1>Страница с постами</h1>
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
    />
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialogue from "@/components/UI/MyDialogue.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {
    MyButton,
    MyDialogue,
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'VueJs', body: 'Описание 1'},
        {id: 2, title: 'VueJs', body: 'Описание 2'},
        {id: 3, title: 'VueJs', body: 'Описание 3'},
        {id: 4, title: 'VueJs', body: 'Описание 4'},
      ],
      dialogueVisible: false,
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
    }
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
