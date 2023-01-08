<template>
  <div id="rating">
    <section class="rating">
      <div class="rating__wrapper">
        <h1 class="rating__title">Рейтинг игроков</h1>
        <ul class="rating__list">
          <li v-for="user in sortArray()" :key="user.id" class="rating__item" v-bind:class="{rating__item_me: user.username == me.username}">
            <img :src="user.image" alt="Cover for location" class="rating__image">
            <div class="rating__info">
              <h2 class="rating__name">{{ user.username }}</h2>
              <p class="rating__scores">{{ user.scores }}</p>
              <p class="rating__levels">
                {{ user.levels }}'ый уровень
              </p>
              <p class="rating__coins">{{ user.money }}</p>
            </div>
          </li>
        </ul>
        <div class="paginate" v-if="this.users.length>0">
          <a :href="'?page='+(parseInt(currentPage)-1)" :class="(prevPage)?'paginate__active':'paginate__disable'"><p class="visually-hidden">Prev</p><svg height="24px" fill="white" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/><path d="M74.12,35.88a3,3,0,0,0-4.24,0l-26,26a3,3,0,0,0,0,4.24l26,26a3,3,0,0,0,4.24-4.24L50.24,64,74.12,40.12A3,3,0,0,0,74.12,35.88Z"/></svg></a>
          <ul class="paginate__list">
            <li v-for="item in Math.ceil(count/5)" :key="item.id" class="paginate__item">
              <a class="paginate__link" :href="'?page='+item" :class="(currentPage==item)?'paginate__link--disable':''">{{item}}</a>
            </li>
          </ul>
          <a :href="'?page='+(parseInt(currentPage)+1)" :class="(nextPage)?'paginate__active':'paginate__disable'"><p class="visually-hidden">Next</p><svg height="24px" fill="white" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/><path d="M58.12,35.88a3,3,0,0,0-4.24,4.24L77.76,64,53.88,87.88a3,3,0,1,0,4.24,4.24l26-26a3,3,0,0,0,0-4.24Z"/></svg></a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "RatingPage",
  props: {
    me: {},
    token: String,
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      count: null,
      nextPage: true,
      prevPage: false,
    };
  },
  methods: {
    GetUsers: function () {
      if(this.$route.query.page > 1){this.currentPage = this.$route.query.page}else{this.currentPage = 1}
      let api = "http://coursework.std-1725.ist.mospolytech.ru/api/users/";
      Vue.axios.get(api, { params: { page: this.currentPage } }).then((response) => {
        this.users = response.data.results;
        this.count = response.data.count;
        this.nextPage = response.data.next;
        this.prevPage = response.data.previous;
      });
      this.sort_users = this.sortArray(this.users);
    },
    sortArray: function () {
      return this.users.slice().sort(function (a, b) {
        return a.scores < b.scores ? 1 : -1;
      });
    },
  },
  mounted() {
    this.GetUsers();
  },
};
</script>

<style scoped></style>
