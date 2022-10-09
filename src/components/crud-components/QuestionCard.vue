<template>
  <div class="card border-primary border-round surface-overlay border-1 border-round">
    <QuestionTittle :qTittle="qTittle" />
    <QuestionChoice :qType="qType" :qValues="qValues" />
  </div>
</template>

<script>
import QuestionTittle from "@/components/crud-components/QuestionTittle.vue";
import QuestionChoice from "@/components/crud-components/QuestionChoice.vue";
export default {
  name: "QuestionCard",
  components: {
    QuestionTittle,
    QuestionChoice,
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
    qTittle: {
      type: String,
      required: true,
    },
  },
};
</script>
