import tag from "./tag.vue";

export default {
  title: "tag",
  components: {tag}
}

export const defaultView = () => ({
  components: { tag },
  template: `
    <tag title="tag" />
  `
});

defaultView.story = {
  name: "Стандартный вид",
};

export const tagWithCross = () => ({
  components: { tag },
  template: `
    <tag title="tag" interactive />
  `
});

tagWithCross.story = {
  name: "С крестиком",
};
