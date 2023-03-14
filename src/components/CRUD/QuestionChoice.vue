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
    <div v-if="qType == 'Linkert'">
      <Likert :values="qValues" :type="qType" />
    </div>
    <div v-if="qType == 'Table'">
      <TableQuestion :values="qValues" />
    </div>
  </div>
</template>
<script>
import Multiplecheckbox from "@/components/crud-components/question-types/Multiplecheckbox.vue";
import Uniquecheckbox from "@/components/crud-components/question-types/Uniquecheckbox.vue";
import TextQuestion from "@/components/crud-components/question-types/TextQuestion.vue";
import Likert from "@/components/crud-components/question-types/Likert.vue";
import TableQuestion from "@/components/crud-components/question-types/TableQuestion.vue";

export default {
  name: "QuestionChoice",
  components: {
    Multiplecheckbox,
    Uniquecheckbox,
    TextQuestion,
    Likert,
    TableQuestion,
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
