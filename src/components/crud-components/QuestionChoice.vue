<template>
  <div>
    <div v-if="qType == 'Multiplecheckbox'">
      <Multiplecheckbox :values="qValues" :type="qType" />
    </div>
    <div v-if="qType == 'Uniquecheckbox'">
      <Uniquecheckbox :values="qValues" :type="qType" />
    </div>
    <div v-if="qType == 'Text'">
      <TextQuestion :values="qValues" :type="qType" />
    </div>
  </div>
</template>
<script>
import Multiplecheckbox from "@/components/crud-components/question-types/Multiplecheckbox.vue";
import Uniquecheckbox from "@/components/crud-components/question-types/Uniquecheckbox.vue";
import TextQuestion from "@/components/crud-components/question-types/TextQuestion.vue";

export default {
  name: "QuestionChoice",
  components: {
    Multiplecheckbox,
    Uniquecheckbox,
    TextQuestion,
  },
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
  },
};
</script>
