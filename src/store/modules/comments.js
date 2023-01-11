import axios from "axios";
// import file from "../../assets/reviews.json"

export default {
    actions:{
        async fetchComments({ commit }){
            // const res = file;
            const res = await fetch('https://63be6180e348cb07620d8be7.mockapi.io/comments');
            const comments = await res.json();
            commit('updateComments',comments);
        },
        async addComments({ commit }, comment){
            try {
                const response = await axios.post('https://63be6180e348cb07620d8be7.mockapi.io/comments', comment)
                commit('newComment', response.data)
              } catch (error) {
                console.log(error)
              }
            // commit('newComment', comment)
        }
    },
    mutations:{
        updateComments(state,comments){
            state.comments = comments;
        },
        newComment: (state, comment) => state.comments.push(comment)
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