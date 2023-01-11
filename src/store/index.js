import Vue from 'vue'
import Vuex from 'vuex'
import comments from './modules/comments'
import levels from './modules/levels'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {comments, levels},
})