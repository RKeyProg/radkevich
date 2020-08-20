<template>
  <card slim>
    <edit-line slot="title" v-model="title" editModeByDefault/>
    <ul class="skills" slot="content">
      <li class="item" v-for="skill in skills" :key="skill.id">
        <skill :skill="skill" />
      </li>
    </ul>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";

const skills = [
  {id: 0, title: "HTML", percent: 80},
  {id: 1, title: "CSS", percent: 20},
  {id: 2, title: "Javascript", percent: 50},
]
export default {
  components: {
    card, 
    editLine, 
    skill
  },
  data() {
    return {
      title: "",
      skills
    }
  }
}
</script>

<style lang="postcss" scoped>
.skills {
  flex-direction: column;
}

.item {
  width: 100%;
}
</style>