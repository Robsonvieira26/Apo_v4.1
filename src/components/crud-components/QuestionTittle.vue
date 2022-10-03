<template>
  <label :for="questionLabel"
    ><b
      ><h4>{{ questionTittle }}</h4></b
    ></label
  >
</template>
<script>
export default {
  // name: "QuestionTittle",
  props: {
    questionTittle: {
      type: String,
      required: true,
    },
    questionLabel: {
      type: String,
      required: true,
    },
  },
};
</script>
