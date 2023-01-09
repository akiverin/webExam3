<template>
    <section class="levels-list">
        <div class="levels-list__wrapper">
            <p class="levels-list__subtitle">Коллекция уровней</p>
            <h2 class="levels-list__title">Узнайте подробнее о&nbsp;локациях в&nbsp;игре</h2>
            <form class="levels-list__form">
                <div class="levels-list__field">
                    <label for="inputLevelsTitle">Введите название или описание</label>
                    <input type="text" id="inputLevelsTitle" v-model="search" class="levels-list__input">
                </div>
                <div class="levels-list__field">
                    <label for="dropdownLevelsSort">Сортировка списка</label>
                    <select class="levels-list__select" v-model="sort" name="sortLeevels" id="dropdownLevelsSort">
                        <option value="number">По порядку</option>
                        <option value="words">По алфавиту</option>
                        <option value="difficulty">По сложности</option>
                        <option value="coins">По очкам</option>
                    </select>
                </div>
            </form>
            <ul class="levels-list__list">
                <li 
                class="levels-list__item levelsItem" 
                v-for="(item, index) in listLevels()" 
                :key="index" 
                v-bind:class="{
                    levelsItem_easy: item.difficulty == 'easy',
                    levelsItem_norm: item.difficulty == 'normal',
                    levelsItem_hard: item.difficulty == 'hard',
                }"
            >
                    <h3 class="levels-list__name">{{ item.name }}</h3>
                    <p class="levels-list__comment">{{ item.description }}</p>
                    <p class="levels-list__comment">{{ item.difficulty }}</p>
                    <router-link to="/">Подробнее</router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: "LevelsListComponent",
    props: ['levels'],
    data() {
        return {
            search: '',
            sort: 'number',
        }
    },
    methods: {
        listLevels() {
            if (this.sort == 'difficulty') {return this.sortByDifficulty(this.searchLevels())}
            if (this.sort == 'coins') {return this.sortByCoins(this.searchLevels())}
            if (this.sort == 'words') {return this.sortByName(this.searchLevels())}
            return this.searchLevels()
        },
        sortByCoins(list) {
            return list.sort((a, b) => {
                return a.coins - b.coins;
            });
        },
        sortByName(list){
            return list.sort((a, b) => {
                if (a.name < b.name) {
                return -1;
                }
                if (a.name > b.name) {
                return 1;
                }
                return 0;
            });
        },
        searchLevels() {
            let list = this.levels;
            let search = this.search;
            return list.filter(function (item) {
                return (item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()));
            });
        },
        sortByDifficulty(list) {
            return list.sort((a, b) => {
                if (a.difficulty === b.difficulty) {
                    return 0;
                }
                if (a.difficulty === 'easy') {
                    return -1;
                }
                if (b.difficulty === 'easy') {
                    return 1;
                }
                if (a.difficulty === 'normal') {
                    return -1;
                }
                if (b.difficulty === 'normal') {
                    return 1;
                }
                return 0;
            });
        },
    }

};
</script>

