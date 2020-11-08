import Vue from 'vue';import SimpleVueValidation from 'simple-vue-validator';


Vue.use(SimpleVueValidation, { mode: "manual" });

store.$axios = $axios;

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});