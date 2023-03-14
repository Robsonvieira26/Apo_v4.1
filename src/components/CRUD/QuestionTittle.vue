<template>
  <label :for="qTittle"
    ><b
      ><h4>{{ qTittle }}</h4></b
    ></label
  >
</template>
<script>
export default {
  // name: "QuestionTittle",
  props: {
    qTittle: {
      type: String,
      required: true,
    },
  },
};
</script>
