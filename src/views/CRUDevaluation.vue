<template>
  <div>
    <div class="text-900 text-3xl font-medium mb-3 align-items-center">
      <Button
        label="Nova Pergunta"
        class="p-button-raised p-button-rounded p-button-lg"
        v-on:click="showDialog()"
      />
    </div>
  </div>
  <Dialog
    v-model:visible="createEditVisible"
    header="Criar/Editar Pergunta"
    :style="{ width: '600px' }"
    :modal="true"
    class="p-fluid"
  >
    <div class="field col-8">
      <label for="multiselect">Selecione o Tipo de Pergunta</label>
      <span class="p-float-label">
        <CascadeSelect
          id="cascadeSelect"
          v-model="selectedQuestionOption"
          :options="cascadeOptions"
          optionLabel="name"
          optionGroupLabel="name"
          :optionGroupChildren="['types']"
          tyle="minWidth: 14rem"
        />
      </span>
    </div>
    <div v-if="selectedQuestionOption != null">
      <div v-if="selectedQuestionOption.name == 'Multipla Escolha'">
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>
        <div class="formgrid grid px-2">
          <div class="field col-6">
            <label for="labelsMultiple[0]">Alternativa 1</label>
            <InputText
              id="labelsMultiple[0]"
              type="text"
              v-model="labelsMultiple[0]"
            />
          </div>
          <div class="field col-6">
            <label for="labelsMultiple[1]">Alternativa 2</label>
            <InputText
              id="labelsMultiple[1]"
              type="text"
              v-model="labelsMultiple[1]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsMultiple[2]">Alternativa 3</label>
            <InputText
              id="labelsMultiple[2]"
              type="text"
              v-model="labelsMultiple[2]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsMultiple[3]">Alternativa 4</label>
            <InputText
              id="labelsMultiple[3]"
              type="text"
              v-model="labelsMultiple[3]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsMultiple[4]">Alternativa 5</label>
            <InputText
              id="labelsMultiple[4]"
              type="text"
              v-model="labelsMultiple[4]"
            />
          </div>
        </div>
      </div>
      <div v-if="selectedQuestionOption.name == 'Escolha Unica'">
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>
        <div class="formgrid grid px-2">
          <div class="field col-6">
            <label for="labelsMultiple[0]">Alternativa 1</label>
            <InputText
              id="labelsMultiple[0]"
              type="text"
              v-model="labelsUnique[0]"
            />
          </div>
          <div class="field col-6">
            <label for="labelsUnique[1]">Alternativa 2</label>
            <InputText
              id="labelsUnique[1]"
              type="text"
              v-model="labelsUnique[1]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsUnique[2]">Alternativa 3</label>
            <InputText
              id="labelsUnique[2]"
              type="text"
              v-model="labelsUnique[2]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsUnique[3]">Alternativa 4</label>
            <InputText
              id="labelsUnique[3]"
              type="text"
              v-model="labelsUnique[3]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsUnique[4]">Alternativa 5</label>
            <InputText
              id="labelsUnique[4]"
              type="text"
              v-model="labelsUnique[4]"
            />
          </div>
        </div>
      </div>
      <div v-if="selectedQuestionOption.name == 'Texto Livre'">
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>
      </div>
      <!-- Escala Likert -->
      <div v-if="selectedQuestionOption.name == '1-5'">
        <!-- Escala Likert: 1-5 -->
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>
        <SelectButton
          v-model="selectLikertChoice"
          :options="selectLikert1Options"
          optionLabel="name"
          :disabled="true"
        />
      </div>
      <div v-if="selectedQuestionOption.name == 'Pessimo - Otimo'">
        <!-- Escala Likert: Pessimo - Otimo -->
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>

        <SelectButton
          v-model="selectLikertChoice"
          :options="selectLikert2Options"
          optionLabel="name"
          :disabled="true"
        />
      </div>
      <div
        v-if="selectedQuestionOption.name == 'Muito Escuros - Bem Iluminados'"
      >
        <!-- Escala Likert: Pouco Iluminado - Muito Iluminado -->
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>
        <SelectButton
          v-model="selectLikertChoice"
          :options="selectLikert3Options"
          optionLabel="name"
          :disabled="true"
        />
      </div>
      <div v-if="selectedQuestionOption.name == 'Personalizar...'">
        <!-- Personalizar Escala Likert -->
        <div class="field">
          <InputText
            type="text"
            placeholder="Titulo da pergunta"
            v-model="questionTittle"
          ></InputText>
        </div>
        <div class="formgrid grid px-2">
          <div class="field col-6">
            <label for="labelsLikert[0]">Alternativa 1</label>
            <InputText
              id="labelsLikert[0]"
              type="text"
              v-model="labelsLikert[0]"
            />
          </div>
          <div class="field col-6">
            <label for="labelsLikert[1]">Alternativa 2</label>
            <InputText
              id="labelsLikert[1]"
              type="text"
              v-model="labelsLikert[1]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsLikert[2]">Alternativa 3</label>
            <InputText
              id="labelsLikert[2]"
              type="text"
              v-model="labelsLikert[2]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsLikert[3]">Alternativa 4</label>
            <InputText
              id="labelsLikert[3]"
              type="text"
              v-model="labelsLikert[3]"
            />
          </div>
          <div class="field col-4">
            <label for="labelsLikert[4]">Alternativa 5</label>
            <InputText
              id="labelsLikert[4]"
              type="text"
              v-model="labelsLikert[4]"
            />
          </div>
        </div>
      </div>
      <!-- Escala Likert -->
      <div class="p-2">
        <h5>Questão Obrigatoria?</h5>
        <InputSwitch inputId="switch1" v-model="requieredQuestion" />
        <br />
        <div class="pt-2 px-2">
          <Button
            label="Salvar pergunta?"
            class="p-button-raised p-button-rounded"
            @click="saveQuestion()"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script>
export default {
  name: "CRUDevaluation",
  data() {
    return {
      createEditVisible: false,
      selectedQuestionOption: null,
      requieredQuestion: false,
      labelsLikert: [],
      labelsMultiple: [],
      labelsUnique: [],
      options: [],
      questionTittle: "",
      cascadeOptions: [
        { name: "Multipla Escolha", value: 0 },
        { name: "Escolha Unica", value: 1 },
        { name: "Texto Livre", value: 2 },
        {
          name: "Escala Likert",
          types: [
            { name: "1-5", value: 3 },
            { name: "Pessimo - Otimo", value: 4 },
            { name: "Muito Escuros - Bem Iluminados", value: 5 },
            { name: "Personalizar...", value: 6 },
          ],
        },
      ],

      // Likret Options
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
      // console.log("Clicou");
    },
    saveQuestion() {
      // console.log(this.selectedQuestionOption);
      if (this.selectedQuestionOption.value == 0) {
        // console.log("Multipla Escolha");
        this.options = [
          {
            tittle: this.questionTittle,
            type: "Multiplecheckbox",
            requiered: this.requieredQuestion,
            values: [
              { name: this.labelsMultiple[0] },
              { name: this.labelsMultiple[1] },
              { name: this.labelsMultiple[2] },
              { name: this.labelsMultiple[3] },
              { name: this.labelsMultiple[4] },
            ],
          },
        ];
      } else if (this.selectedQuestionOption.value == 1) {
        this.options = [
          {
            tittle: this.questionTittle,
            type: "Uniquecheckbox",
            requiered: this.requieredQuestion,
            values: [
              { name: this.labelsUnique[0] },
              { name: this.labelsUnique[1] },
              { name: this.labelsUnique[2] },
              { name: this.labelsUnique[3] },
              { name: this.labelsUnique[4] },
            ],
          },
        ];
      } else if (this.selectedQuestionOption.value == 2) {
        this.options = [
          {
            tittle: this.questionTittle,
            type: "text",
            requiered: this.requieredQuestion,
            values: [{ name: "Texto" }],
          },
        ];
      } else if (this.selectedQuestionOption.value == 3) {
        // console.log("Escala Likert: 1-5");
        this.options = [
          {
            tittle: this.questionTittle,
            type: "Likert",
            requiered: this.requieredQuestion,
            values: [
              { name: this.selectLikert1Options[0].name },
              { name: this.selectLikert1Options[1].name },
              { name: this.selectLikert1Options[2].name },
              { name: this.selectLikert1Options[3].name },
              { name: this.selectLikert1Options[4].name },
            ],
          },
        ];
        // console.log(this.options);
      } else if (this.selectedQuestionOption.value == 4) {
        // console.log("Escala Likert: Pessimo - Otimo");
        this.options = [
          {
            tittle: this.questionTittle,
            type: "Likert",
            requiered: this.requieredQuestion,
            values: [
              { name: this.selectLikert2Options[0].name },
              { name: this.selectLikert2Options[1].name },
              { name: this.selectLikert2Options[2].name },
              { name: this.selectLikert2Options[3].name },
              { name: this.selectLikert2Options[4].name },
            ],
          },
        ];
        // console.log(this.options);
      } else if (this.selectedQuestionOption.value == 5) {
        // console.log("Escala Likert: Pouco Iluminado - Muito Iluminado");
        this.options = [
          {
            tittle: this.questionTittle,
            type: "Likert",
            requiered: this.requieredQuestion,
            values: [
              { name: this.selectLikert3Options[0].name },
              { name: this.selectLikert3Options[1].name },
              { name: this.selectLikert3Options[2].name },
              { name: this.selectLikert3Options[3].name },
              { name: this.selectLikert3Options[4].name },
            ],
          },
        ];
        // console.log(this.options);
      } else if (this.selectedQuestionOption.value == 6) {
        // console.log("Escala Likert: Personalizar...");
        this.options = [
          {
            tittle: this.questionTittle,
            type: "Likert",
            requiered: this.requieredQuestion,
            values: [
              { name: this.labelsLikert[0] },
              { name: this.labelsLikert[1] },
              { name: this.labelsLikert[2] },
              { name: this.labelsLikert[3] },
              { name: this.labelsLikert[4] },
            ],
          },
        ];
      }
      // console.log(this.options[0]);
      console.log("Pergunta do tipo:" + this.options[0].type);
      console.log("Resposta do tipo:");
      this.options[0].values.forEach((element) => {
        console.log(element.name);
      });
      console.log("Requerido: " + this.options[0].requiered);
      this.clearInputs();
      this.hideDialog();
    },
    clearInputs() {
      this.selectedQuestionOption = null;
      this.requieredQuestion = false;
      this.labels = [];
      this.options = [];
      this.selectLikertChoice = null;
      this.labelsLikert = [];
      this.labelsMultiple = [];
      this.labelsUnique = [];
      this.questionTittle = "";
    },
  },
};
</script>
