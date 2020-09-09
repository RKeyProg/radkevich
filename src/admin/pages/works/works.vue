<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container" v-if="this.works">
        <div class="page-header">
          <div class="page-title">
            Блок "Работы"
          </div>
        </div>
        <transition name="form" >
          <div class="form" v-if="formVisible || Object.keys(this.currentWork).length !== 0">
            <app-form @hide-form="hideForm" :form-name="formName" :edit-work-data="currentWork" />
          </div>
        </transition>
        <ul class="cards">
          <li class="item create-item">
            <square-btn 
              type="square"
              title="Добавить работу" 
              @click="showForm" 
            />
          </li>
          <li :class="['item', {'edit-work': isCurrentWork(work)}]" v-for="work in works" :key="work.id">
            <work-card
              :work="work"
              @edit-work="editWork(work)"
            />
          </li>
        </ul>
      </div>
      <div class="container" v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/worksForm";
import squareBtn from "../../components/button";
import workCard from "../../components/workCard";
import { mapState, mapActions } from "vuex";
export default {
  components: { appForm, workCard, squareBtn },
  data() {
    return {
      formVisible: false,
      currentWork: {},
      formName: "Добавление работы",
    }
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    })
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch"
    }),
    showForm() {
      this.formVisible = !this.formVisible;
    },
    hideForm() {
      this.formVisible = false;
      this.currentWork = {};
      this.formName = "Добавление работы";
    },
    editWork(work) {
      this.currentWork = work;
      this.formName = "Редактирование работы";
    },
    isCurrentWork(work) {
      return work.id === this.currentWork.id;
    },
  },
  mounted() {
    this.fetchWorks();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>