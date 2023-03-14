<template>
  <div class="px-2">
    <div class="field">
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
    <div class="formgrid grid px-2">
      <div v-for="i in 5" :key="i" class="field col-6">
        <label :for="labelsLikert[i - 1]">Alternativa {{ i }}</label>
        <InputText
          :id="labelsLikert[i - 1]"
          type="text"
          v-model.trim="labelsLikert[i - 1]"
          :class="{ 'p-invalid': submitted && !labelsLikert[i - 1] }"
          required="true"
        />
        <small class="p-invalid" v-if="submitted && !labelsLikert[i - 1]"
          >A alternativa deve ser informada
        </small>
      </div>
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
  name: "QLinkertCustom",
  emits: ["saveQuestion"],
  data() {
    return {
      qTittle: "",
      qRequiered: false,
      labelsLikert: [],
      dataSend: [],
      submitted: false,
    };
  },
  methods: {
    saveQuestion() {
      this.submitted = true;
      this.formatData();
      // console.log("salvando pergunta");
      if (this.qTittle.trim()) {
        this.$emit("saveQuestion", {
          question: {
            tittle: this.qTittle,
            type: "Linkert",
            values: this.dataSend,
            requiered: this.qRequiered,
          },
        });
      }
    },
    formatData() {
      for (let i = 0; i < 5; i++) {
        this.dataSend.push({
          name: this.labelsLikert[i],
        });
      }
    },
  },
};
</script>
