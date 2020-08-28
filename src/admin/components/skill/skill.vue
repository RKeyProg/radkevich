<template>
  <div class="skill-component" v-if="currentSkill.editmode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percent">{{skill.percent}}</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" @click="currentSkill.editmode = true" grayscale />
      <icon symbol="trash" class="btn" @click="$emit('remove', currentSkill)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input 
        v-model="currentSkill.title" 
        :errorMessage="validation.firstError('currentSkill.title')"
        noSidePaddings 
      />
    </div>
    <div class="percent">
      <app-input 
        :errorMessage="validation.firstError('currentSkill.percent')"
        v-model="currentSkill.percent" 
        percent 
        type="number" 
        min="0" 
        max="100" 
        maxlength="3" 
      />
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="handleClick" />
      <icon symbol="cross" class="btn" @click="currentSkill.editmode = false" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import icon from "../icon";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": (value) => {
      return Validator.value(value).required("Заполните поле");
    },
    "currentSkill.percent": (value) => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение")
        .required("Заполните поле");
    },
  },
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false,
      },
    };
  },
  components: {
    icon,
    appInput: input,
  },
  methods: {
    async handleClick() {
      if (await this.$validate() === false) return;
      this.$emit('approve', this.currentSkill)
    },
  }
};
</script>

<style lang="postcss" src="./skill.pcss" scoped></style>