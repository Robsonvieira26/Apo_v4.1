<template>
  <div class="p-3">
    <div class="py-2" v-for="(valueQuestion, index) in values" :key="index">
      <div class="field-checkbox mb-0">
        <Checkbox name="choices" :value="index" v-model="choices" />
        <label :for="type">{{ valueQuestion.name }}</label>
        {{ valueQuestion.name }} {{ choices }} {{ index }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "MultipleCheckbox",
  data() {
    return {
      choices: [],
    };
  },
  props: {
    type: {
      type: String,
      default: "Multiplecheckbox",
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>
