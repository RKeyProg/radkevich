<template>
  <card>
    <div slot="title" class="author">
      <user :size="3" :photo="review.photo" :name="review.author" :occ="review.occ" />
    </div>
    <div slot="content" class="data">
      <div class="text">
        <p>{{review.text}}</p>
      </div>
      <div class="btns">
        <icon symbol="pencil" @click="$emit('edit-review')" title="Править"></icon>
        <icon symbol="trash" @click="removeReview" title="Удалить"></icon>
      </div>
    </div>
  </card>
</template>

<script>
import user from "../../components/user";
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";
import { mapActions } from "vuex";

export default {
  components: { card, icon, tagsList, user },
  props: {
    review: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`;
    },
  },
  methods: {
    ...mapActions({
      removeReviewAction: "reviews/remove",
      showTooltip: "tooltips/show",
    }),
    async removeReview() {
      try {
        await this.removeReviewAction(this.review.id);
        this.showTooltip({
          text: "Отзыв успешно удален",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    }
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>