// import axios from "axios";
import file from "../../assets/reviews.json"

export default {
    actions:{
        async fetchComments({ commit }){
            const res = file;
            // const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
            // const comments = await res.json();
            commit('updateComments',res);
        },
        async addComments({ commit }, comment){
            // try {
            //     const response = await axios.post('https://jsonplaceholder.typicode.com/comments?_limit=5', comment)
            //     ctx.commit('newComment', response.data)
            //   } catch (error) {
            //     console.log(error)
            //   }
            commit('newComment', comment)
        }
    },
    mutations:{
        updateComments(state,comments){
            state.comments = comments;
        },
        newComment: (state, comment) => state.comments.unshift(comment)
    },
    state:{
        comments: [
            {name: 'Test', comment: 'Test'}
        ],
    },
    getters: {
        allComments(state){
            return state.comments;
        }
    },
}