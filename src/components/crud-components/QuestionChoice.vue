<template>
  <div>
    <div v-if="qType == 'Multiplecheckbox'">
      <Multiplecheckbox :values="qValues" :type="qType" />
    </div>
    <div v-if="qType == 'Uniquecheckbox'">
      <Uniquecheckbox :values="qValues" :type="qType" />
    </div>
  </div>
</template>
<script>
import Multiplecheckbox from "@/components/crud-components/question-types/Multiplecheckbox.vue";
import Uniquecheckbox from "@/components/crud-components/question-types/Uniquecheckbox.vue";

export default {
  name: "QuestionChoice",
  components: {
    Multiplecheckbox,
    Uniquecheckbox,
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
