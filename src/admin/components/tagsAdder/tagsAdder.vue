<template>
  <div class="tags-adder-component">
    <app-input
      title="Добавление тега"
      v-model="currentTags"
      @input="$emit('change', currentTags)"
    />
    <ul class="tags">
      <li class="tags-item"
        v-for="(tag, index) in tagsArray"
        :key="`$(tag)${index}`"
      >
        <tag
          interactive 
          :title="tag"
          @click="removeTag(tag)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import appInput from "../input";
import tag from "../tag";

export default {
  components: {
    appInput,
    tag,
  },
  props: {
    tags: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "tags",
    event: "change"
  },
  data() {
    return {
      currentTags: this.tags,
    }
  },
  computed: {
    tagsArray() {
      return this.currentTags.trim().split(',').filter(item => ((item !== "") && (item !== " ")));
    }
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagNdx = tags.indexOf(tag);

      if (tagNdx < 0) return;
      
      tags.splice(tagNdx, 1);
      this.currentTags = tags.join(', ');

      this.$emit("change", this.currentTags);
    }
  },
  watch: {
    tags: function() {
      this.currentTags = this.tags;
    }
  }
}
</script>

<style lang="postcss" scoped src="./tagsAdder.pcss"></style>