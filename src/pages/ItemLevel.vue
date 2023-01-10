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
            </div>
        </div>
    </main>
</template>

<script>
import levelsFile from "@/assets/levels.json";

export default {
    name: "ItemLevelPage",
    data() {
        return {
            level: {}
        }
    },
    mounted() {
        this.level = levelsFile[this.$route.params.id - 1];
    }
};
</script>

