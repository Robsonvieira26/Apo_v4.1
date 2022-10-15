<template>
  <div class="p-3">
    <div class="py-2">
      <div class="py-2">
        <SelectButton v-model="choice" :options="values" optionLabel="name" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "MultipleCheckbox",
  data() {
    return {
      choice: null,
    };
  },
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>
