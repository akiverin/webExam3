<template>
  <div id="levels">
    <section class="levels">
      <div class="levels__wrapper">
        <h1 class="levels__title">Игровые уровни и локации</h1>
        <h2 class="levels__subtitle" v-if="this.token.length<2">
          Чтобы видеть прогресс пройденных уровней, нужно пройти
          <router-link :to="'/login'" class="levels__link">авторизацию</router-link> на сайте.
        </h2>
        <ul class="levels__list" v-if="this.token">
          <li
            v-for="level in levels"
            :key="level.id"
            class="levels__item"
            v-bind:class="{
              levels__item_easy: level.difficulty == 'easy',
              levels__item_norm: level.difficulty == 'normal',
              levels__item_hard: level.difficulty == 'hard',
            }"
          >
          <div class="levels__avatar" v-if="level.id < me.levels + 2">
            <img
              :src="level.image"
              alt="Cover for location"
              class="levels__image"
            />
          </div>
            <div v-if="level.id < me.levels + 2" class="levels__info">
              <h2 class="levels__name">{{ level.name }}</h2>
              <p class="levels__description">
                {{ level.description }}
              </p>
              <div class="levels__other">
                <p class="levels__coins">Награда: {{ level.reward }}</p>
                <p class="levels__best">Лучший: {{ BestUser(level.best_user)}}</p>
              </div>
            </div>
            <div class="levels__empty" v-if="level.id >= me.levels + 2">
              <h2 class="levels__name">Уровень #{{ level.id }}</h2>
              <p class="levels__alert">
                Не доступно! <br />Новая локация откроется при успешном
                прохождении предыдушего уровня.
              </p>
            </div>
          </li>
        </ul>
        <div class="paginate" v-if="Object.keys(this.me).length">
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
import axios from 'axios'

export default {
  name: "LevelsPage",
  props: {
    me: {},
    token: String,
  },
  data() {
    return {
      levels: [],
      users: [],
      currentPage: 1,
      count: null,
      nextPage: true,
      prevPage: false,
    };
  },
  methods: {
    GetLevels() {
      if(this.$route.query.page > 1){this.currentPage = this.$route.query.page}else{this.currentPage = 1}
      let api = "http://coursework.std-1725.ist.mospolytech.ru/api/levels/";
      axios.get(api, { params: { page: this.currentPage } }).then((response) => {
        this.levels = response.data.results;
        this.count = response.data.count;
        this.nextPage = response.data.next;
        this.prevPage = response.data.previous;
      });
    },
    GetUsers() {
        let api = '/api/users/';
        axios.get(api).then((response) => {
            this.users = response.data.results;
        });
    },
    BestUser(idBest){
         for (let i = 0; i < this.users.length; i++){
            if (this.users[i].id == idBest){
                return this.users[i].username
            }
        }
        return 'None'
    }
  },
  mounted() {
    this.GetLevels();
    this.GetUsers();
  },
};
</script>

<style scoped></style>
