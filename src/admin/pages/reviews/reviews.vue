<template>
	<div class="reviews-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Отзывы"
          </div>
        </div>
        <div class="form" v-if="formVisible || Object.keys(this.currentReview).length !== 0">
          <app-form @hide-form="hideForm" :edit-review-data="currentReview" />
        </div>
        <ul class="cards">
          <li class="item">
            <square-btn 
              type="square"
              title="Добавить отзыв"
              @click="showForm"
            />
          </li>
          <li :class="['item', {'edit-review': isCurrentReview(review)}]" v-for="review in reviews" :key="review.id">
            <review-card 
              :review="review" 
              @edit-review="editReview(review)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/reviewsForm";
import squareBtn from "../../components/button";
import reviewCard from "../../components/reviewCard";
import { mapState, mapActions } from "vuex";

export default {
  components: { appForm, reviewCard, squareBtn },
  data() {
    return {
      formVisible: false,
      currentReview: {},
    }
  },
	computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    })
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch"
    }),
    showForm() {
      this.formVisible = !this.formVisible;
    },
    hideForm() {
      this.formVisible = false;
      this.currentReview = {};
    },
    editReview(review) {
      this.currentReview = review;
    },
    isCurrentReview(review) {
      return review.id === this.currentReview.id;
    },
  },
  mounted() {
    this.fetchReviews();
  }
}
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>