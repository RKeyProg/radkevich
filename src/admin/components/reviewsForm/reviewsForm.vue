<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Новый отзыв" v-if="Object.keys(this.editReviewData).length === 0">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label>
                <div
                  :style="{backgroundImage: `url(${newReview.preview})`}"
                  :class="[ 'uploader', {active: newReview.preview}, {hovered: hovered}]"
                  @dragover="handleDragOver"
                  @dragleave="hovered = false"
                  @drop="handleChange"
                >
                  <div class="uploader-user-icon" v-if="this.newReview.preview === ''"></div>
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
      <card title="Редактирвоать отзыв" v-else>
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label>
                <div
                  :style="{backgroundImage: `url(${newReview.preview})`}"
                  :class="[ 'uploader', {active: newReview.preview}, {hovered: hovered}]"
                  @dragover="handleDragOver"
                  @dragleave="hovered = false"
                  @drop="handleChange"
                >
                  <div class="uploader-user-icon" v-if="this.newReview.preview === ''"></div>
                </div>
                <div class="uploader-btn">
                  <app-button plain title="Добавить фото" typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col from-col-text">
              <div class="form-row">
                <app-input v-model="editReviewData.author" title="Имя автора" />
                <app-input v-model="editReviewData.occ" title="Титул автора" />
              </div>
              <div class="form-row">
                <app-input v-model="editReviewData.text" field-type="textarea" title="Отзыв" />
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
  },
  data() {
    return {
      hovered: false,
      newReview: {
        author: "",
        occ: "",
        text: "",
        photo: {},
        preview: "",
      },
    };
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
          await this.editReview(this.editReviewData);
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
      if (Object.keys(this.editReviewData).length === 0) {
        event.preventDefault();
        const file = event.dataTransfer 
          ? event.dataTransfer.files[0] 
          : event.target.files[0];
        this.newReview.photo = file;
        this.renderPhoto(file);
        this.hovered = false;
      } else {
        event.preventDefault();
        const file = event.dataTransfer 
          ? event.dataTransfer.files[0] 
          : event.target.files[0];
        this.editReviewData.photo = file;
        this.renderPhoto(file);
        this.hovered = false;
      }
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./reviewsForm.pcss" lang="postcss" scoped></style>