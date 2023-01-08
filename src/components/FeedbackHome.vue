<template>
    <section class="feedback">
            <div class="feedback__wrapper">
                <p class="feedback__subtitle">Ваша рецензия</p>
                <h2 class="feedback__title">Поделитесь своим мнением<br>о Magical Misadventures</h2>
                <form class="feedback__form" action="/">
                    <div class="feedback__field">
                        <label for="feedbackName" class="feedback__label">Ваше имя</label>
                        <input v-model="name" type="text" id="feedbackName" class="feedback__input" required>
                    </div>
                    <div class="feedback__field">
                        <label for="feedbackComment" class="feedback__label">Ваш комментарий</label>
                        <textarea v-model="comment" id="feedbackComment" style="resize: vertical" rows="6" class="feedback__input" required></textarea>
                    </div>
                    <button class="feedback__button" type="submit">Отправить</button>
                </form>
            </div>
        </section>
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
      SendComment(){

      }
    },
  };
  </script>
  
  <style scoped></style>
  