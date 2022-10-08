<template>
  <div>
    <!-- {{ question }} -->
    <!-- {{ question[0].values }} -->
    <div v-if="question[0].type == 'Multiplecheckbox'">
      <div class="p-3">
        <div
          class="py-2"
          v-for="(valueQuestion, index) in question[0].values"
          :key="index"
        >
          <div class="field-checkbox mb-0">
            <Checkbox name="choices" :value="index" v-model="choices" />
            <label :for="question[0].type">{{ valueQuestion.name }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "QuestionChoice",
  data() {
    return {
      choices: [],
    };
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
};
</script>
