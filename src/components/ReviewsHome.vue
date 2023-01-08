<template>
    <section class="reviews">
        <div class="reviews__wrapper">
            <p class="reviews__subtitle">Рецензии игроков</p>
            <h2 class="reviews__title">Комментарии наших пользователей</h2>
            <ul class="reviews__list">
                <li class="reviews__item" v-for="(item,index) in reviews" :key="index">
                    <h3 class="reviews__name">{{ item.name }}</h3>
                    <p class="reviews__comment">{{ item.comment }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import reviewsFile from "@/assets/reviews.json";

    export default {
        name: "ReviewsComponent",
        data() {
            return {
                reviews: [],
            };
        },
        mounted() {
            this.reviews = reviewsFile;
        },
    };
</script>

