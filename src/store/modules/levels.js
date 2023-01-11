// import axios from "axios";
import levelsFile from "../../assets/main.json"

export default {
    actions:{
        async fetchLevels({ commit }){
            const res = levelsFile;
            commit('updateLevels',res);
        },
        async editLevels({ commit }, level){
            commit('updateLevel', level)
        }
    },
    mutations:{
        updateLevels(state,levels){
            state.levels = levels;
        },
        updateLevel(state, old){
            const { id, name, description, cost, difficulty } = old
            let level = state.levels.find(level => level.id === id)
            level.name = name
            level.description = description
            level.cost = cost
            level.difficulty = difficulty
        }
    },
    state:{
        levels: [],
    },
    getters: {
        allLevels(state){
            return state.levels;
        }
    },
}