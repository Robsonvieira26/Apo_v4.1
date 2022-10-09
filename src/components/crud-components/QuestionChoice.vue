<template>
  <div>
    <!-- {{ question }} -->
    <!-- {{ question[0].values }} -->
    <div v-if="qType == 'Multiplecheckbox'">
      <div class="p-3">
        <div
          class="py-2"
          v-for="(valueQuestion, index) in qValues"
          :key="index"
        >
          <div class="field-checkbox mb-0">
            <Checkbox name="choices" :value="index" v-model="choices" />
            <label :for="qType">{{ valueQuestion.name }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuestionChoice",
  data() {
    return {
      choices: [],
    };
  },
  props: {
    qType: {
      type: String,
      required: true,
    },
    qValues: {
      type: Array,
      required: true,
    },
    // question: {
    //   type: Object,
    //   required: true,
    // },
  },
};
</script>
