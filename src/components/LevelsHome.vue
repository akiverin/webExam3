<template>
    <section class="levels-list">
        <div class="levels-list__wrapper">
            <p class="levels-list__subtitle">Коллекция уровней</p>
            <h2 class="levels-list__title">Узнайте подробнее о&nbsp;локациях в&nbsp;игре</h2>
            <form class="levels-list__form">
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

