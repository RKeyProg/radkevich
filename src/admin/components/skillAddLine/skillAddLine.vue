<template>
  <div 
    :class="['skillAddLine-component', {blocked: blocked}]"
  >
    <app-input class="skillAddLine-title" v-model="title" />
    <app-input class="skillAddLine-percent" percent type="number" min="0" max="100" maxlength="3" />
    <iconed-btn type="iconed" bigSize title="" />
  </div>
</template>

<script>
import button from "../button";
import input from "../input";

export default {
  props: {
    blocked: Boolean
  },
  components: {
    iconedBtn: button,
    appInput: input,

  },
  data() {
    return {
      title: "Новый навык"
    }
  }
}
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>