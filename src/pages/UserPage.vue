<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
        v-focus
    />
    <div class="app__btns">
      <my-button
          @click="showDialogue"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialogue v-model:show="dialogueVisible">
      <post-form
          @create="createPost"
      />
    </my-dialogue>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка..</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--   <div class="page__wrapper">
         <div
             v-for="pageNumber in totalPages"
             :key="pageNumber"
             class="page"
             :class="{
           'current-page': page === pageNumber
         }"
             @click="page = pageNumber"
         >
           {{ pageNumber }}
         </div>
       </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialogue from "@/components/UI/MyDialogue.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialogue,
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogueVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'},
      ]
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      } catch (e) {
        alert('ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('ошибка')
      }
    }
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);
  //   const options = {
  //   rootMargin: '0px',
  //   threshold: 1.0
  // }
  // const callback = (entries, observer) => {
  //   if (entries[0].isIntersecting && this.page < this.totalPages) {
  //     this.loadMorePosts()
  //   }
  // };
  // const observer = new IntersectionObserver(callback, options);
  // observer.observe(this.$refs.observer);
},
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px
}

.current-page {
  border: 2px solid teal;
}

.observer {

}
</style>
