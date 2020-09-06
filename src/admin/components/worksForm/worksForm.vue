<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card :title='formName'>
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${preview})`}"
                :class="[ 'uploader', {active: preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input v-model="newWork.title" title="Название" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="form-row">
                <tags-adder v-model="newWork.techs" />
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
    editWorkData: Object,
    formName: String,
  },
  data() {
    return {
      hovered: false,
      preview: "",
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
      },
    };
  },
  watch: {
    editWorkData() {
      this.newWork = {...this.editWorkData};
      if (Object.keys(this.newWork).length !== 0) {
        this.preview = `https://webdev-api.loftschool.com/${this.newWork.photo}`;
      }
    }
  },
  created() {
    this.newWork = {...this.editWorkData};

    if (Object.keys(this.newWork).length !== 0) {
      this.preview = `https://webdev-api.loftschool.com/${this.newWork.photo}`;
    }
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
      editWork: "works/edit",
      showTooltip: "tooltips/show",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (Object.keys(this.editWorkData).length === 0) {
        try {
          await this.addNewWork(this.newWork);
          this.showTooltip({
            text: "Работа успешно добавлена",
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
          await this.editWork(this.newWork);
          this.showTooltip({
            text: "Работа успешно изменена",
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
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];
      this.newWork.photo = file;
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

<style src="./worksForm.pcss" lang="postcss" scoped></style>