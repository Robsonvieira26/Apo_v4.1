<template>
  <div class="formgrid grid px-2">
    <div class="field col-8">
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
      <InputText
        id="qLabels[i - 1]"
        type="text"
        v-model.trim="qLabels[i - 1]"
        :class="{ 'p-invalid': submitted && !qLabels[i - 1] }"
      />
      <small class="p-invalid" v-if="submitted && !qLabels[i - 1]"
        >A alternativa deve ser informada
      </small>
    </div>
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
  name: "QUniquecheckbox",
  emits: ["saveQuestion"],
  data() {
    return {
      qTittle: "",
      qNumQuestions: 2,
      qLabels: [],
      qRequiered: false,
      submitted: false,
    };
  },
  methods: {
    saveQuestion() {
      this.submitted = true;
      // console.log("salvando pergunta");
      if (this.qTittle.trim() && this.qLabels.length >= 2) {
        this.$emit("saveQuestion", {
          question: {
            tittle: this.qTittle,
            type: "Uniquecheckbox",
            values: this.qLabels,
            requiered: this.qRequiered,
          },
        });
      }
    },
  },
};
</script>
