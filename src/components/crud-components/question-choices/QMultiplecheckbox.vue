<template>
  <div class="formgrid grid px-2">
    <div class="field col-8">
      <InputText
        type="text"
        placeholder="Titulo da pergunta"
        v-model="qTittle"
      ></InputText>
    </div>
    <!-- {{qNumQuestions}} -->
    <div class="field col-4">
      <InputNumber
        inputId="horizontal"
        v-model="qNumQuestions"
        showButtons
        buttonLayout="horizontal"
        :step="1"
        :min="2"
        :max="15"
        decrementButtonClass="p-button-danger"
        incrementButtonClass="p-button-success"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
      />
    </div>
  </div>
  <div class="formgrid grid px-2">
    <div v-for="i in qNumQuestions" :key="i" class="field col-6">
      <label for="qLabels[i]">Alternativa {{ i }}</label>
      <InputText id="qLabels[i - 1]" type="text" v-model="qLabels[i - 1]" />
    </div>
  </div>

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
  name: "QMultiplecheckbox",
  emits: ["saveQuestion"],
  data() {
    return {
      qTittle: "",
      qNumQuestions: 2,
      qLabels: [],
      qRequiered: false,
    };
  },
  methods: {
    saveQuestion() {
      // console.log("salvando pergunta");
      this.$emit("saveQuestion", {
        question: {
          tittle: this.qTittle,
          type: "Multiplecheckbox",
          values: this.qLabels,
          requiered: this.qRequiered,
        },
      });
    },
  },
};
</script>
