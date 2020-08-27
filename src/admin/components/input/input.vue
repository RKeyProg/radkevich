<template>
  <label
    class="input"
    v-if="fieldType === 'input'"
    :class="[{'input_labeled' : !!title, 'no-side-paddings' : noSidePaddings}, iconClass, {'error' : !!validation.firstError('name')}]"
  >
    <div class="title" v-if="title">{{title}}</div>
    <input
      v-if="!percent"
      class="input__elem field__elem"
      v-bind="$attrs"
      :value="value"
      v-model="name"
      @input="$emit('input', checkLength($event))"
    />
    <input
      v-if="percent"
      class="input__elem field__elem"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', checkLength($event))"
    />
    <div class="input-number-percent" v-if="percent">%</div>
    <div class="input__error-tooltip">
      <tooltip :text="validation.firstError('name')"></tooltip>
    </div>
  </label>
  <label
    class="textarea"
    v-else-if="fieldType === 'textarea'"
    v-bind="$attrs"
    :class="{'error': !!validation.firstError('name')}"
  >
    <div class="title" v-if="title">{{title}}</div>
    <textarea
      class="textarea__elem field__elem"
      :value="value"
      :class="{'error' : !!validation.firstError('name')}"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <div class="input__error-tooltip">
      <tooltip :text="validation.firstError('name')"></tooltip>
    </div>
  </label>
</template>

<script>
import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);

export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: String,
      default: ""
    },
    noSidePaddings: Boolean,
    fieldType: {
      type: String,
      default: "input"
    },
    value: String | Number,
    icon: {
      type: String,
      default: "",
      validator: value => ["", "user", "key"].includes(value)
    },
    percent: {
      type: Boolean
    }
  },
  data() {
    return {
      maxlength: 3,
      name: ''
    }
  },
  validators: {
    name: function (value) {
      return Validator.value(value).required().regex('^[A-Za-z]*$', 'Only letters')
    }
  },
  computed: {
    iconClass() {
      const iconName = this.icon;
      return iconName.length ? ` input_iconed input_icon-${iconName}` : "";
    }
  },
  components: {
    tooltip: () => import("components/tooltip")
  },
  methods: {
    checkLength(event) {
      if (event.target.type != "number") return event.target.value;
      console.log(event);

      const inputValueArray = event.target.value.split(""); 

      if ((event.data == 'e') || (event.data == '-') || (event.data == '+')) {
        let znach = '';
        for (let i = 0; i < inputValueArray.length-1; i++) {
          znach+=inputValueArray[i];
        }
        return event.target.value = znach;
      }

      if (inputValueArray[0] == '0') return event.target.value = '0';
      if (inputValueArray.length >= this.maxlength) return event.target.value = '100';
    }
  }
};
</script>

<style lang="postcss" scoped src="./input.pcss"></style>