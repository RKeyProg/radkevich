<template>
  <div class="about-page-component page-component">
    <div class="page-content">
      <div class="container" v-if="categories.length">
        <div class="page-header">
          <div class="page-title">Блок "Обо мне"</div>
          <iconed-button
            type="iconed"
            v-if="emptyCatIsShown === false"
            @click="emptyCatIsShown = true"
            title="Добавить гурппу"
          />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category 
              @remove-category="emptyCatIsShown = false" @approve="createCategory"
              empty 
            />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category
              :title="category.category"
              :skills="category.skills"
              @create-skill="createSkill($event, category.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
              @approve="editCategoryTitle($event, category.id)"
              @remove-category="removeCategory($event, category.id)"
            />
          </li>
        </ul>
      </div>
      <div class="container" v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import button from "../../components/button";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedButton: button,
    category: () => import('../../components/category'),
  },
  data() {
    return {
      emptyCatIsShown: false,
    };
  },
  computed: {
    ...mapState("categories", {
      categories: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      editCategoryAction: "categories/edit",
      fetchCategotyAction: "categories/fetch",
      removeCategoryAction: "categories/remove",
      addSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
      showTooltip: "tooltips/show",
    }),
    async createSkill(skill, categoryId) {
      try {
        const newSkill = {
          ...skill,
          category: categoryId,
        };
        await this.addSkillAction(newSkill);

        this.showTooltip({
          text: "Навык успешно добавлен",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    removeSkill(skill) {
      try {
        this.removeSkillAction(skill);
        this.showTooltip({
          text: "Навык успешно удален",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async editSkill(skill) {
      try {
        await this.editSkillAction(skill);
        skill.editmode = false;
        this.showTooltip({
          text: "Данные навыки изменены",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatIsShown = false;
        this.showTooltip({
          text: "Категория успешно создана",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async editCategoryTitle(categoryTitle, categoryId) {
      try {
        const newCategoryTitle = {
          categoryTitle,
          categoryId: categoryId,
        };
        await this.editCategoryAction(newCategoryTitle);
        this.showTooltip({
          text: "Имя категории изменено",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    removeCategory(event, categoryId) {
      try {
        this.removeCategoryAction(categoryId);
        this.showTooltip({
          text: "Категория успешно удалена",
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
  created() {
    this.fetchCategotyAction();
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>