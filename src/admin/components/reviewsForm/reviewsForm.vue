<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card :title='formName'>
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label>
                <div
                  :style="{backgroundImage: `url(${preview})`}"
                  :class="[ 'uploader', {active: preview}, {hovered: hovered}]"
                  @dragover="handleDragOver"
                  @dragleave="hovered = false"
                  @drop="handleChange"
                >
                  <div class="uploader-user-icon" v-if="Object.keys(newReview).length === 0"></div>
                </div>
                <div class="uploader-btn">
                  <app-button plain title="Добавить фото" typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col from-col-text">
              <div class="form-row">
                <app-input v-model="newReview.author" title="Имя автора" />
                <app-input v-model="newReview.occ" title="Титул автора" />
              </div>
              <div class="form-row">
                <app-input v-model="newReview.text" field-type="textarea" title="Отзыв" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" @click.prevent="$emit('hide-form')" plain></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" typeAttr="submit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import { mapActions } from "vuex";
export default {
  components: { card, appButton, appInput, tagsAdder },
  props: {
    editReviewData: Object,
    formName: String,
  },
  data() {
    return {
      hovered: false,
      preview: "",
      newReview: {
        author: "",
        occ: "",
        text: "",
        photo: {},
      },
    };
  },
  watch: {
    editReviewData() {
      this.newReview = {...this.editReviewData};
      if (Object.keys(this.newReview).length !== 0) {
        this.preview = `https://webdev-api.loftschool.com/${this.newReview.photo}`;
      }
    }
  },
  created() {
    this.newReview = {...this.editReviewData};
    if (Object.keys(this.newReview).length !== 0) {
      this.preview = `https://webdev-api.loftschool.com/${this.newReview.photo}`;
    }
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
      editReview: "reviews/edit",
      showTooltip: "tooltips/show",
    }),
    async handleSubmit() {
      if (Object.keys(this.editReviewData).length === 0) {
        try {
          await this.addNewReview(this.newReview);
          this.showTooltip({
            text: "Отзыв успешно добавлен",
            type: "success"
          })
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: "error"
          })
        }
      } else {
        try {
          await this.editReview(this.newReview);
          this.showTooltip({
            text: "Отзыв успешно изменен",
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
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];
      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./reviewsForm.pcss" lang="postcss" scoped></style>