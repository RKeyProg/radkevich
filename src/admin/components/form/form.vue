<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Добавление работы" v-if="Object.keys(this.editWorkData).length === 0">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[ 'uploader', {active: newWork.preview}, {
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
      <card title="Редактирование работы" v-else>
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[ 'uploader', {active: newWork.preview}, {
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
                <app-input v-model="editWorkData.title" title="Название" />
              </div>
              <div class="form-row">
                <app-input v-model="editWorkData.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input
                  v-model="editWorkData.description"
                  field-type="textarea"
                  title="Описание"
                />
              </div>
              <div class="form-row">
                <tags-adder v-model="editWorkData.techs" />
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
    editWorkData: Object
  },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
      editWork: "works/edit",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (Object.keys(this.editWorkData).length === 0) {
        await this.addNewWork(this.newWork);
      } else {
        await this.editWork(this.editWorkData);
      }
    },
    handleChange(event) {
      if (Object.keys(this.editWorkData).length === 0) {
        event.preventDefault();
        const file = event.dataTransfer 
          ? event.dataTransfer.files[0] 
          : event.target.files[0];
        this.newWork.photo = file;
        this.renderPhoto(file);
        this.hovered = false;
      } else {
        event.preventDefault();
        const file = event.dataTransfer 
          ? event.dataTransfer.files[0] 
          : event.target.files[0];
        this.editWorkData.photo = file;
        this.renderPhoto(file);
        this.hovered = false;
      }
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./form.pcss" lang="postcss" scoped></style>