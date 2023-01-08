<template>
    <section class="feedback">
            <div class="feedback__wrapper">
                <p class="feedback__subtitle">Ваша рецензия</p>
                <h2 class="feedback__title">Поделитесь своим мнением о Magical Misadventures</h2>
                <form class="feedback__form" action="/">
                    <div class="feedback__field">
                        <label for="feedbackName" class="feedback__label">Ваше имя</label>
                        <input type="text" id="feedbackName" class="feedback__name">
                    </div>
                    <div class="feedback__field">
                        <label for="feedbackComment" class="feedback__label">Ваше имя</label>
                        <textarea id="feedbackComment" class="feedback__comment"></textarea>
                    </div>
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
  