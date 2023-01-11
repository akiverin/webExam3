<template>
    <div class="feedback">
        <div class="feedback__wrapper">
            <p class="feedback__subtitle">Ваша рецензия</p>
            <h2 class="feedback__title">Поделитесь своим мнением<br>о Magical Misadventures</h2>
            <form class="feedback__form" onsubmit="event.preventDefault()">
                <!-- <div class="feedback__field">
                    <label for="feedbackName" class="feedback__label">Ваше имя</label>
                    <input v-model="name" type="text" id="feedbackName" class="feedback__input" required>
                </div> -->
                <div class="feedback__field">
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Имя пользователя"
                        solo
                        required
                        append-icon="mdi-account"
                    ></v-text-field>
                </div>
                <div class="feedback__field">
                    <v-textarea
                    clearable
                    v-model="comment"
                    required
                    solo
                    name="CommentInput"
                    label="Текст комментария"
                    ></v-textarea>
                </div>
                <!-- <div class="feedback__field">
                    <label for="feedbackComment" class="feedback__label">Ваш комментарий</label>
                    <textarea v-model="comment" id="feedbackComment" style="resize: vertical" rows="6"
                        class="feedback__input" required></textarea>
                </div> -->
                <button class="feedback__button" @click="SendComment()">Отправить</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex'

export default {
    name: "FeedbackComponent",
    data() {
        return {
            name: '',
            comment: '',
        };
    },
    methods: {
        ...mapActions(['addComments']),
        SendComment() {
            (this.name != '' & this.comment != '') ? this.newComment() : console.log('не прошло валидацию')
        },
        newComment() {
            this.addComments( {
                name: this.name, 
                comment: this.comment
            })
            this.name = '';
            this.comment = '';
        },
    },
};
</script>
  
<style scoped>

</style>
  