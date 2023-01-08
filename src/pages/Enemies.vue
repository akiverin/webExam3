<template>
  <div id="enemies">
    <section class="enemies">
      <div class="enemies__wrapper">
        <h1 class="enemies__title">Вражеские воины и монстры</h1>
        <h2 class="enemies__subtitle" v-if="!Object.keys(this.me).length">Чтобы видеть коллекцию поверженых вами врагов, нужно пройти <router-link :to="'/login'" class="enemies__link">авторизацию</router-link> на сайте.</h2>
        <ul class="enemies__list">
          <li v-for="enemy in enemies" :key="enemy.id" class="enemies__item">
          <div class="enemy__avatar">
            <img
              v-if="showEnemy(enemy,me.levels)"
              :src="enemy.image"
              alt="Cover for location"
              class="enemies__image"
              v-bind:class="{
                enemies__image_easy: enemy.difficulty == 'easy',
                enemies__image_norm: enemy.difficulty == 'normal',
                enemies__image_hard: enemy.difficulty == 'hard',
              }"
            />
          </div>
            <div class="enemies__info" v-if="showEnemy(enemy,me.levels)">
              <h2 class="enemies__name">{{ enemy.name }}</h2>
              <p class="enemies__description">
                {{ enemy.description }}
              </p>
              <div class="enemies__other">
                <p class="enemies__coin">{{ enemy.reward }}</p>
                <p class="enemies__power">{{ enemy.power }}</p>
                <p class="enemies__heart">{{ enemy.hp }}</p>
              </div>
              <div class="enemies__levels">
                <p class="enemies__levels-head">Встречается в уровнях:</p>
                <p
                  v-for="level in enemy.levels_data"
                  :key="level.name"
                  class="enemies__levels-body"
                >
                  {{ level.name }}
                </p>
              </div>
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
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "EnemiesPage",
   props: {
    me: {},
    token: String,    
  },
  data() {
    return {
      enemies: [],
      currentPage: 1,
      count: null,
      nextPage: true,
      prevPage: false,
    };
  },
  methods: {
    GetEnemies() {
      if(this.$route.query.page > 1){this.currentPage = this.$route.query.page}else{this.currentPage = 1}
      let api = "http://coursework.std-1725.ist.mospolytech.ru/api/enemies/";
      Vue.axios.get(api, { params: { page: this.currentPage } }).then((response) => {
        this.enemies = response.data.results;
        this.count = response.data.count;
        this.nextPage = response.data.next;
        this.prevPage = response.data.previous;
      });
    },
    goToPage(page) {
      this.currentPage = page;
      this.GetEnemies();
    },
    showEnemy(enemy,count){
        let enemyLevels = enemy.levels_data;
        for (let i = 0; i < enemyLevels.length; i++){
            if (enemyLevels[i].id <= count){
                return true
                } else {
                    return false
                }
        }
        return false
    }
  },
  mounted() {
    this.GetEnemies();
  },
};
</script>

<style scoped></style>
