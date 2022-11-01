<template>
  <div class="field">
    <InputText
      type="text"
      placeholder="Titulo da pergunta"
      v-model="qTittle"
    ></InputText>
  </div>
  <div class="formgrid grid px-2">
    <div v-for="i in 5" :key="i" class="field col-6">
      <label :for="labelsLikert[i - 1]">Alternativa {{ i }}</label>
      <InputText
        :id="labelsLikert[i - 1]"
        type="text"
        v-model="labelsLikert[i - 1]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "QLinkertCustom",
  emits: ["saveQuestion"],
  data() {
    return {
      qTittle: "",
      qRequiered: false,
      labelsLikert: [],
    };
  },
  methods: {
    saveQuestion() {
      console.log("salvando pergunta");
      // this.$emit("saveQuestion", {
      //   question: {
      //     tittle: this.qTittle,
      //     type: "Linkert",
      //     values: this.qLabels,
      //     requiered: this.qRequiered,
      //   },
      // });
    },
  },
};
</script>
