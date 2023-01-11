<template>
    <main class="level">
        <div class="level__wrapper">
            <div class="level__field">
                <div class="level__card">
                    <img :src="'/images/'+level.image+'.jpeg'" alt=""
                        class="level__image">
                    <img src="/images/iconLevel.png" alt=""
                        class="level__icon level__icon_right">
                    <img src="/images/iconLevel.png" alt=""
                        class="level__icon level__icon_left">
                </div>
            </div>
            <div class="level__info">
                <h2 class="level__title">{{ level.name }}</h2>
                <p class="level__description">{{ level.description }}</p>
                <div class="level__details">
                    <p class="level__category">Награда: <span class="level__coins">{{ level.cost }}</span></p>
                    <p class="level__category">Сложность: <span class="level__difficulty">{{ level.difficulty }}</span></p>
                </div>
                <div class="level__actions">
                    <button @click="editLevel" class="level__button level__button_edit">Редактировать</button>
                    <button @click="deleteLevel" class="level__button level__button_delete">Удалить</button>
                </div>
                <form v-if="activeForm" class="level__form" @submit.prevent>
                    <div class="level__field">
                        <label for="inputLevelName">Придумайте название уровня</label>
                        <input type="text" id="inputLevelName" v-model="name" class="level__input" placeholder="Название уровня">
                    </div>
                    <div class="level__field">
                        <label for="inputLevelDescription">Придумайте описание уровня</label>
                        <textarea id="inputLevelDescription" v-model="description" class="level__input" placeholder="Описание уровня"></textarea>
                    </div>
                    <div class="level__field level__field_row">
                        <label for="inputLevelCoins">Награда пользователю</label>
                        <input type="number" id="inputLevelCoins" v-model="cost" class="level__input" placeholder="Количество очков">
                    </div>
                    <div class="level__field">
                        <label for="dropdownLevelsDifficulty">Сложность уровня</label>
                        <select class="level__select" v-model="difficulty" name="difficultyLevel" id="dropdownLevelsDifficulty">
                            <option value="easy">Легкий</option>
                            <option value="normal">Средний</option>
                            <option value="hard">Сложный</option>
                        </select>
                    </div>
                    <button @click="saveLevel" class="level__button level__button_save">Сохранить изменения</button>
                </form>
            </div>

        </div>
    </main>
</template>

<script>
import levelsFile from "@/assets/main.json";
import {mapMutations } from 'vuex'

export default {
    name: "ItemLevelPage",
    data() {
        return {
            level: {},
            activeForm: false,
            name: '',
            description: '',
            cost: '',
            difficulty: '',
        }
    },
    methods: {
        ...mapMutations([
        'updateLevel'
    ]),
        editLevel(){
            console.log('edit');
            this.activeForm = true;
            this.name = this.level.name;
            this.description = this.level.description;
            this.cost = this.level.cost;
            this.difficulty = this.level.difficulty;
        },
        saveLevel(){
            console.log('save')
            this.updateLevel({
                id: this.level.id,
                name: this.name,
                description: this.description,
                cost: this.cost,
                difficulty: this.difficulty,
            })
        },
        deleteLevel(){
            console.log('delete')
        }
    },
    mounted() {
        this.level = levelsFile[this.$route.params.id - 1];
    }
};
</script>
<style  scoped>
</style>

