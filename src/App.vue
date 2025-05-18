<template>
  <div class="app">
    <post-form></post-form>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'VueJs', body: 'Описание 1'},
        {id: 1, title: 'VueJs', body: 'Описание 2'},
        {id: 1, title: 'VueJs', body: 'Описание 3'},
        {id: 1, title: 'VueJs', body: 'Описание 4'},
      ],
      title: '',
      body: '',
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      }
      this.posts.push(newPost);
      this.title = '';
      this.body = '';
    },
    inputTitle(event) {
      this.title = event.target.value;
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
