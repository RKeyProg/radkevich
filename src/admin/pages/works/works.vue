<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container" v-if="this.works">
        <div class="page-header">
          <div class="page-title">
            Блок "Работы"
          </div>
        </div>
        <div class="form" v-if="formVisible || Object.keys(this.currentWork).length !== 0">
          <app-form @hide-form="hideForm" :edit-work-data="currentWork" />
        </div>
        <ul class="cards">
          <li class="item create-item">
            <button class="create-item-btn" @click="showForm" >
              <span>Добавить работу</span>
            </button>
          </li>
          <li class="item" v-for="work in works" :key="work.id">
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
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import { mapState, mapActions } from "vuex";
export default {
  components: { appForm, workCard },
  data() {
    return {
      formVisible: false,
      currentWork: {},
    }
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
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
    },
    editWork(work) {
      this.currentWork = work;
    }
  },
  mounted() {
    this.fetchWorks();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>