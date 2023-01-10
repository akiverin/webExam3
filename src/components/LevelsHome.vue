<template>
    <section class="levels-list">
        <div class="levels-list__wrapper">
            <p class="levels-list__subtitle">Коллекция уровней</p>
            <h2 class="levels-list__title">Узнайте подробнее о&nbsp;локациях в&nbsp;игре</h2>
            <form class="levels-list__form" @submit.prevent>
                <button @click="reloadLevels()" class="levels-list__update" title="Обновить окно заказов">
                    <p class="levels-list__button-name visually-hidden">Обновить список уровней</p>
                    <svg class="levels-list__icon" enable-background="new 0 0 91 91" height="91px" id="Layer_1" version="1.1" viewBox="0 0 91 91" width="91px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M90.426,7.596c1.145-1.698-1.151-3.291-2.352-3.612c-0.698-0.187-1.424-0.188-2.141-0.238   c-2.22-0.155-16.505-0.35-21.322-0.922c-1.828-0.219-3.512,1.452-4.01,3.052c-1.131,3.633-1.12,19.573-0.78,23.363   c0.55,6.111,10.238,6.036,9.529,0c-0.428-3.66-0.269-12.627-0.291-13.348C79.174,25.75,84.9,41.395,81.358,54.949   c-3.524,13.487-13.427,23.408-27.395,25.637c-15.229,2.43-31.085-2.995-39.766-16.064C7.826,54.929,5.357,43.6,9.984,32.702   c3.134-7.38,9.174-13.125,15.846-17.364c3.169-2.016,6.449-3.882,9.705-5.755c3.169-1.825,5.523-3.325,9.256-3.741   c0.78-0.086,0.789-1.319,0-1.234c-6.875,0.766-13.522,0.529-19.978,3.542c-7.591,3.544-14.223,9.222-18.72,16.305   C-2.022,37.236-1.172,52.48,5.972,65.359c8.646,15.581,25.037,23.84,42.66,23.325C66.74,88.158,81.545,77.92,87.7,60.84   c6.274-17.418,0.163-37.427-12.435-50.671C77.324,10.104,88.763,10.071,90.426,7.596z"/></g></svg>
                </button>
                <div class="levels-list__field">
                    <label for="inputLevelsTitle">Поиск уровня</label>
                    <input type="text" id="inputLevelsTitle" v-model="search" class="levels-list__input" placeholder="Название или описание уровня">
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
                <div class="levels-list__field levels-list__field_row">
                    <p class="levels-list__filter">Фильтрация по локации</p>
                    <div class="levels-list__checkboxs">
                        <label for="SkylandLocationCheckbox" class="levels-list__label">Skyland
                            <input type="checkbox" class="levels-list__checkbox" id="SkylandLocationCheckbox"
                                value="Skyland" v-model="locations"></label>
                        <label for="MountainVillageLocationCheckbox" class="levels-list__label">Mountain village
                            <input type="checkbox" class="levels-list__checkbox" id="MountainVillageLocationCheckbox"
                                value="Mountain village" v-model="locations"></label>
                        <label for="DesertBlissLocationCheckbox" class="levels-list__label">The Desert of Bliss
                            <input type="checkbox" class="levels-list__checkbox" id="DesertBlissLocationCheckbox"
                                value="The Desert of Bliss" v-model="locations"></label>
                        <label for="TowerRockLocationCheckbox" class="levels-list__label">The tower on the rock
                            <input type="checkbox" class="levels-list__checkbox" id="TowerRockLocationCheckbox"
                                value="The tower on the rock" v-model="locations"></label>
                        <label for="SorcererrRockLocationCheckbox" class="levels-list__label">Sorcerer's Rock
                            <input type="checkbox" class="levels-list__checkbox" id="SorcererRockLocationCheckbox"
                                value="Sorcerer's Rock" v-model="locations"></label>
                    </div>
                </div>
            </form>
            <ul class="levels-list__list">
                <li class="levels-list__item levelsItem" v-for="(item, index) in listLevels()" :key="index"
                    v-bind:class="{
                        levelsItem_easy: item.difficulty == 'easy',
                        levelsItem_norm: item.difficulty == 'normal',
                        levelsItem_hard: item.difficulty == 'hard',
                    }">
                    <h3 class="levels-list__name">{{ item.name }}</h3>
                    <p class="levels-list__comment">{{ item.description }}</p>
                    <div class="levels-list__details">
                        <p class="levels-list__coins">{{ item.cost }}</p>
                        <router-link class="levels-list__button" :to="'/levels/'+item.id">Подробнее</router-link>
                    </div>
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
            locations: ['Skyland','Mountain village','The Desert of Bliss','The tower on the rock',"Sorcerer's Rock"],
        }
    },
    methods: {
        reloadLevels(){
            this.$emit('reload-levels');
        },
        listLevels() {
            if (this.sort == 'difficulty') { return this.sortByDifficulty(this.searchLevels()) }
            if (this.sort == 'coins') { return this.sortByCoins(this.searchLevels()) }
            if (this.sort == 'words') { return this.sortByName(this.searchLevels()) }
            return this.searchLevels()
        },
        sortByCoins(list) {
            return list.sort((a, b) => {
                return a.coins - b.coins;
            });
        },
        filterByLocations(list){
            return list.filter(level => {
                return this.locations.some(phrase => level.name.includes(phrase))
            })
        },
        sortByName(list) {
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
            let list = this.filterByLocations(this.levels);
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

