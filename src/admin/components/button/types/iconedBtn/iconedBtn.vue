<template>
  <button 
    v-on="$listeners"
    :class="['button-component', {'big-size' : bigSize}]"
  >{{title}}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Добавить группу"
    },
    bigSize: Boolean
  }
};
</script>


<style lang="postcss" scoped src="./iconedBtn.pcss"></style>