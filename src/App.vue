<template>
  <body id="app">
    <TheHeader :me="this.me" :token="this.token"/>
    <router-view @get-token="getToken" @post-token="postToken" :me="this.me" :token="this.token"></router-view>
    <TheFooter :me="this.me" :token="this.token"/>
  </body>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'App',
  data(){
    return {
      token: '',
      me: {},
    }
  },
  components: {
    TheHeader,
    TheFooter
  },
  methods: {
    getToken (token){
      this.token = token;
      if (this.token != ""){
        this.getMe()
      }
    },
    postToken (){
      return this.token;
    },
    getMe(){
        let api = 'http://coursework.std-1725.ist.mospolytech.ru/api/users/me/';
        axios ({
        headers: {Authorization: `Bearer ${this.token}`},
        method: 'get',
        url: api,
      })
        .then((response) => {
            if (response.data.is_activ == true){this.me = response.data;}
        })
        .catch(()=>{
          this.me = {};
        });
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
     
    if (this.token != ""){
        this.getMe()
    }
  },
  watch: {
    token(newToken) {
      if (newToken!=""){
        localStorage.token = newToken;
        this.getMe()
        }
    }
  },
}
</script>
