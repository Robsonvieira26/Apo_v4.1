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
  <div class="px-2">
    <div v-for="i in qNumQuestions" :key="i" class="field col">
      <div class="formgrid grid">
        <div class="field col-6">
          <label for="qLabels[i-1]">Sub pergunta {{ i }}</label>
          <InputText
            id="qLabels[i - 1]"
            type="text"
            v-model.trim="qLabels[i - 1]"
            placeholder="Subtitulo"
            required="true"
            :class="{ 'p-invalid': submitted && !qLabels[i - 1] }"
          />
          <small class="p-invalid" v-if="submitted && !qLabels[i - 1]"
            >O subtitulo é obrigatorio
          </small>
        </div>
        <div class="field col-6">
          <label for="escolha[i-1]">Escala Escolhida</label>
          <Dropdown
            id="escolha[i-1]"
            v-model="selectedScale[i - 1]"
            :options="options"
            optionLabel="name"
            placeholder="Selecione a Escala"
          />
        </div>
        <!-- Escalas Padronizadas -->
        <!-- {{options.indexOf(selectedScale[i - 1])}} -->
        <div
          v-show="
            selectedScale.length >= i &&
            options.indexOf(selectedScale[i - 1]) != 3
          "
          class="field px-2"
        >
          <SelectButton
            :options="linkertOptions[options.indexOf(selectedScale[i - 1])]"
            optionLabel="name"
            :disabled="true"
          />
        </div>
        <!-- Escala Personalizada -->
        <div
          v-show="
            selectedScale.length >= i &&
            options.indexOf(selectedScale[i - 1]) == 3
          "
          class="field px-2"
        >
          <div class="formgrid grid">
            <div v-for="i in 5" :key="i" class="field col-6">
              <label :for="labelsLikert[i - 1]">Alternativa {{ i }}</label>
              <InputText
                :id="labelsLikert[i - 1]"
                type="text"
                v-model.trim="labelsLikert[i - 1]"
                required="true"
                :class="{ 'p-invalid': submitted && !labelsLikert[i - 1] }"
              />
              <small class="p-invalid" v-if="submitted && !labelsLikert[i - 1]"
                >A alternativa deve ser informada
              </small>
            </div>
          </div>
        </div>
        <Divider></Divider>
      </div>
      <!-- <label for="qLabels[i]">Alternativa {{ i }}</label>
      <InputText id="qLabels[i - 1]" type="text" v-model="qLabels[i - 1]" />
      <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" /> -->
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
  name: "QMultipleLinkert",

  emits: ["saveQuestion"],
  data() {
    return {
      qTittle: "",
      qNumQuestions: 2,
      qLabels: [],
      qRequiered: false,
      selectedScale: [],
      labelsLikert: [],
      submitted: false,
      options: [
        { name: "1-5", value: 0 },
        { name: "Pessimo - Otimo", value: 1 },
        { name: "Muito Escuros - Bem Iluminados", value: 2 },
        // { name: "Personalizar...", value: 3 },
      ],
      linkertOptions: [
        [
          { name: "1", value: "1" },
          { name: "2", value: "2" },
          { name: "3", value: "3" },
          { name: "4", value: "4" },
          { name: "5", value: "5" },
        ],
        [
          // Facilidade de mobiliar:	Ótimo	Bom	Regular	Ruim	Péssimo
          { name: "Ótimo", value: "1" },
          { name: "Bom", value: "2" },
          { name: "Regular", value: "3" },
          { name: "Ruim", value: "4" },
          { name: "Péssimo", value: "5" },
        ],
        [
          // Iluminação:	Bem iluminadas	Iluminadas	Regular	Escuras	Muito escuras
          { name: "Bem iluminadas", value: "1" },
          { name: "Iluminadas", value: "2" },
          { name: "Regular", value: "3" },
          { name: "Escuras", value: "4" },
          { name: "Muito escuras", value: "5" },
        ],
      ],
      dataSend: {},
    };
  },
  methods: {
    saveQuestion() {
      this.submitted = true;
      this.formatData();
      // console.log("salvando pergunta");
      if (
        this.qTittle.trim()
        //&& this.qLabels.length > 0 &&
        // this.selectedScale.length > 0
      ) {
        console.log("salvando pergunta");
        this.$emit("saveQuestion", {
          question: {
            tittle: this.qTittle,
            type: "Table",
            values: this.dataSend,
            requiered: this.qRequiered,
          },
        });
      }
    },
    formatData() {
      // const obj = {
      //   name: this.qLabels[0],
      //   scale: [this.selectedScale[0].name],
      // }
      // this.dataSend.push(this.qLabels[0])
      // this.dataSend.push(this.qLabels[0])
      // this.dataSend.push(this.qLabels[0])

      for (let i = 0; i < this.qNumQuestions; i++) {
        // console.log(this.qLabels[i]);
        // console.log(this.selectedScale[i]);
        this.dataSend[i] = {
          name: this.qLabels[i],
          scale: this.selectedScale[i].name,
        };
      }
      // console.log("Data Send");
      // console.log(this.dataSend);
      // console.log("----");
    },
  },
};
</script>
