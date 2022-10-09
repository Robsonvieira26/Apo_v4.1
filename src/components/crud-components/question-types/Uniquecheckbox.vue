<template>
  <div class="p-3">
    <div class="py-2" v-for="(valueQuestion, index) in values" :key="index">
      <div class="field-checkbox mb-0">
        <RadioButton
          name="choices"
          :value="index"
          v-model="choices"
          :binary="true"
        />
        <label :for="type">{{ valueQuestion.name }} </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      choices: [],
    };
  },
  props: {
    type: {
      type: String,
      default: "Uniquecheckbox",
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>
