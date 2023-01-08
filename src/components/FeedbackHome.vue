<template>
    <div class="feedback">
        <div class="feedback__wrapper">
            <p class="feedback__subtitle">Ваша рецензия</p>
            <h2 class="feedback__title">Поделитесь своим мнением<br>о Magical Misadventures</h2>
            <form class="feedback__form" onsubmit="event.preventDefault()">
                <div class="feedback__field">
                    <label for="feedbackName" class="feedback__label">Ваше имя</label>
                    <input v-model="name" type="text" id="feedbackName" class="feedback__input" required>
                </div>
                <div class="feedback__field">
                    <label for="feedbackComment" class="feedback__label">Ваш комментарий</label>
                    <textarea v-model="comment" id="feedbackComment" style="resize: vertical" rows="6"
                        class="feedback__input" required></textarea>
                </div>
                <button class="feedback__button" @click="SendComment()">Отправить</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "FeedbackComponent",
    data() {
        return {
            name: '',
            comment: '',
        };
    },
    methods: {
        SendComment() {
            (this.name != '' & this.comment != '') ? this.newComment() : console.log('не прошло валидацию')
        },
        newComment() {
            this.$emit('send-comment', { 'name': this.name, 'comment': this.comment });
            this.name = '';
            this.comment = '';
        }
    },
};
</script>
  
<style scoped>

</style>
  