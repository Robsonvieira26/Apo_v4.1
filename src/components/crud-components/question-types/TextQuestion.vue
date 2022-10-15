<template>
  <div class="p-3">
    <div class="py-2">
      <div class="py-2" v-for="(valueQuestion, index) in values" :key="index">
        <div class="field-checkbox mb-0">
          <Textarea v-model="Texto" :autoResize="true" rows="5" cols="80" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "MultipleCheckbox",
  data() {
    return {
      Texto: "",
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
