import Vue from 'vue'
import Vuex from 'vuex'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
    // actions:{
    //     async fetchComments(ctx){
    //         const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
    //         const comments = await res.json();
    //         ctx.commit('updateComments',comments);
    //     }
    // },
    // mutations:{
    //     updateComments(state,comments){
    //         state.comments = comments;
    //     }
    // },
    // state:{
    //     comments: [],
    // },
    // getters: {
    //     allComments(state){
    //         return state.comments;
    //     }
    // },
    modules: {comments},
})