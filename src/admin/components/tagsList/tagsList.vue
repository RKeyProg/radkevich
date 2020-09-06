<template>
  <ul class="tags-list-component">
    <li class="item" v-for="tag in tagsArray" :key="tag">
      <tag :title="tag" />
    </li>
  </ul>
</template>

<script>
  import tag from "../tag";
  export default {
    components: {tag},
    props: {
      tags: String
    },
    computed: {
      tagsArray() {
        const tagsAfterSplit = this.tags.split(",");
        
        return tagsAfterSplit.filter(tag => {
          return tag !== ' ' && tag !== '';
        })
      }
    }
  }
</script>

<style scoped lang="postcss">
  .tags-list-component {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
  }

  li {
    margin-right: 10px;
  }
</style>