<template>
  <div>
    <div class="text-900 text-3xl font-medium mb-3 align-items-center">
      <Button label="Nova Pergunta" class="p-button-raised p-button-rounded p-button-lg" v-on:click="showDialog()" />
    </div>
  </div>
  <Dialog v-model:visible="createEditVisible" header="Criar/Editar Pergunta" :style="{width: '600px'}" :modal="true"
    class="p-fluid">
    <div class="field col-8">
      <label for="multiselect">Selecione o Tipo de Pergunta</label>
      <span class="p-float-label">
        <CascadeSelect id="cascadeSelect" v-model="selectedQuestionOption" :options="cascadeOptions" optionLabel="name"
          optionGroupLabel="name" :optionGroupChildren="['types']" tyle="minWidth: 14rem" />
      </span>
    </div>
    <div v-if="selectedQuestionOption!=null">
      <!-- <div v-if="selectedQuestionOption.name=='Multipla Escolha'">
      Multiple Choice
    </div>
    <div v-if="selectedQuestionOption.name=='Escolha Unica'">
      Escolha Unica
    </div>
    <div v-if="selectedQuestionOption.name=='Texto Livre'">
      Texto Livre
    </div> -->
      <!-- Escala Likert -->
      <div v-if="selectedQuestionOption.name=='1-5'">
        Escala Likert: 1-5
        <SelectButton v-model="selectLikertChoice" :options="selectLikert1Options" optionLabel="name" />

      </div>
      <div v-if="selectedQuestionOption.name=='Pessimo - Otimo'">
        <!-- Escala Likert: Pessimo - Otimo -->
        <div class="field">
          <InputText type="text" placeholder="Titulo da pergunta"></InputText>
        </div>

        <SelectButton v-model="selectLikertChoice" :options="selectLikert2Options" optionLabel="name" />



        <h5>Questão Obrigatoria?</h5>
        <InputSwitch inputId="switch1" v-model="requieredQuestion" />
        <br>
        <Button label="Salvar pergunta?" class="p-button-raised p-button-rounded" @click="hideDialog()" />


      </div>
      <div v-if="selectedQuestionOption.name=='Muito Escuros - Bem Iluminados'">
        Escala Likert: Pouco Iluminado - Muito Iluminado
        <SelectButton v-model="selectLikertChoice" :options="selectLikert3Options" optionLabel="name" />

      </div>
      <!-- Escala Likert -->
    </div>
  </Dialog>
</template>
<script>
export default {
  name: 'CRUDevaluation',
  data() {
    return {
      createEditVisible: false,
      selectedQuestionOption: null,
      requieredQuestion: false,
      cascadeOptions: [
        { name: "Multipla Escolha" },
        { name: "Escolha Unica" },
        { name: "Texto Livre" },
        {
          name: "Escala Likert", types: [
            { name: "1-5" },
            { name: "Pessimo - Otimo" },
            { name: "Muito Escuros - Bem Iluminados" },
          ]
        },

      ],
      selectLikertChoice: null,
      selectLikert1Options: [
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
      ],
      selectLikert2Options: [
        // Facilidade de mobiliar:	Ótimo	Bom	Regular	Ruim	Péssimo
        { name: "Ótimo", value: "1" },
        { name: "Bom", value: "2" },
        { name: "Regular", value: "3" },
        { name: "Ruim", value: "4" },
        { name: "Péssimo", value: "5" },
      ],
      selectLikert3Options: [
        // Iluminação:	Bem iluminadas	Iluminadas	Regular	Escuras	Muito escuras
        { name: "Bem iluminadas", value: "1" },
        { name: "Iluminadas", value: "2" },
        { name: "Regular", value: "3" },
        { name: "Escuras", value: "4" },
        { name: "Muito escuras", value: "5" },
      ],


    };
  },
  methods: {
    hideDialog() {
      this.createEditVisible = false;
    },
    showDialog() {
      this.createEditVisible = true;
      console.log("Clicou");
    },
  },
};
</script>
