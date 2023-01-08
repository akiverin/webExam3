<template>
    <section class="products" id="products">
        <div class="products__wrapper">
            <h1 class="products__title">Магазин "Все для злоключений"</h1>
            <p class="products__error" v-if="!this.token">Чтобы приобрести товары, <router-link :to="'/login'" class="products__link">авторизуйтесь</router-link>!</p>
            <p class="products__error" v-if="this.err_money">Не хватает монет для данной покупки!</p>
            <p class="products__money" v-if="this.token">Ваш кошелек: {{this.me.money}}</p>
            <ul class="products__list">
                <li v-for="product in products" :key="product.id" class="products__item">
                    <img :src="product.image" alt="Cover for location" class="products__image">
                    <div class="products__info">
                        <h2 class="products__name">{{ product.name }}</h2>
                        <p class="products__description">
                            {{ product.description }}                       
                        </p>
                        <div class="products__other">
                            <p class="products__coins">{{ product.price }}</p>
                            <button class="products__button" v-if="!OldBuy(product.user)"  @click="Buy(product)">Купить</button>
                            <button class="products__button products__button_old" v-if="OldBuy(product.user)" disabled>Куплено</button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="products__paginate paginate" v-if="Object.keys(this.me).length">
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
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'ShopPage',
  props:{
    me: {},
    token: String,
  },
  data(){
    return {
      products: [],
      err_money: 0,
      currentPage: 1,
      count: null,
      nextPage: true,
      prevPage: false,
    }
  },
  methods: {
    GetProducts(){
        if(this.$route.query.page > 1){this.currentPage = this.$route.query.page}else{this.currentPage = 1}
        let api = 'http://coursework.std-1725.ist.mospolytech.ru/api/products/';
        axios.get(api, { params: { page: this.currentPage } }).then((response) => {
          this.products = response.data.results;
          this.count = response.data.count;
          this.nextPage = response.data.next;
          this.prevPage = response.data.previous;
          this.err_money = 0;

        });
    },
    OldBuy(arr){
        return arr.indexOf(this.me.id) != -1;
    },
    Buy(product){
        if(product.price<=this.me.money){
        let api = 'http://coursework.std-1725.ist.mospolytech.ru/api/users/'+this.me.id+'/';
        axios({
        method: "patch",
        url: api,
        data: {
          money: this.me.money - product.price,
        },
      }).then(() => {
        this.AddProduct(product)
        window.location.reload();
      })
      .catch(() => {
        console.log('err');
    })}else {this.err_money=1}},
    AddProduct(product){
        let apiAdd = 'http://coursework.std-1725.ist.mospolytech.ru/api/products/'+product.id+'/';
        let new_array = product.user;
        new_array.push(this.me.id);
        axios({
        method: "patch",
        url: apiAdd,
        data: {
          user: new_array,
        },
      })
    }
  },
  mounted (){
    this.GetProducts();
  }
}
</script>

<style scoped>
</style>
