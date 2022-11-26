<template>
  <div class="field px-2">
    <InputText
      type="text"
      placeholder="Titulo da pergunta"
      v-model.trim="qTittle"
      required="true"
      :class="{ 'p-invalid': submitted && !qTittle }"
    ></InputText>
    <small class="p-invalid" v-if="submitted && !qTittle"
      >O titulo é obrigatorio
    </small>
  </div>
  <!-- Button -->
  <div class="p-2">
    <h5>Questão Obrigatoria?</h5>
    <InputSwitch inputId="switch1" v-model="qRequiered" />
    <br />
    <div class="pt-2 px-2">
      <Button
        label="Salvar pergunta?"
        class="p-button-raised p-button-rounded"
        @click="saveQuestion()"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "QText",
  emits: ["saveQuestion"],
  data() {
    return {
      qTittle: "",
      qRequiered: false,
      qLabels: { 0: "Texto" },
      submitted: false,
    };
  },
  methods: {
    saveQuestion() {
      this.submitted = true;
      // console.log("salvando pergunta");
      if (this.qTittle.trim()) {
        this.$emit("saveQuestion", {
          question: {
            tittle: this.qTittle,
            type: "Text",
            values: this.qLabels,
            requiered: this.qRequiered,
          },
        });
      }
    },
  },
};
</script>
