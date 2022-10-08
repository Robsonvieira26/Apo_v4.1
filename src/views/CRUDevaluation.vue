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
  <div class="card">
    <div v-if="perguntaFake != null">
      <div v-if="perguntaFake[0].type == 'Multiplecheckbox'">
        <QuestionTittle :questionTittle="perguntaFake[0].tittle" />
        <QuestionChoice :question="perguntaFake" />
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="createEditVisible"
    header="Criar/Editar Pergunta"
    :style="{ width: '600px' }"
    :modal="true"
    class="p-fluid"
  >
    <ScrollPanel style="width: 100%; height: 250px" class="custombar1">
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
          <div class="formgrid grid px-2">
            <div class="field col-8">
              <InputText
                type="text"
                placeholder="Titulo da pergunta"
                v-model="questionTittle"
              ></InputText>
            </div>
            <div class="field col-4">
              <InputNumber
                inputId="horizontal"
                v-model="numQuestionsMultiple"
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
            <div v-for="i in numQuestionsMultiple" :key="i" class="field col-6">
              <label for="labelsMultiple[i]">Alternativa {{ i }}</label>
              <InputText
                id="labelsMultiple[i]"
                type="text"
                v-model="labelsMultiple[i]"
              />
            </div>
          </div>
        </div>
        <div v-if="selectedQuestionOption.name == 'Escolha Unica'">
          <div class="formgrid grid px-2">
            <div class="field col-8">
              <InputText
                type="text"
                placeholder="Titulo da pergunta"
                v-model="questionTittle"
              ></InputText>
            </div>
            <div class="field col-4">
              <InputNumber
                inputId="horizontal"
                v-model="numQuestionsUnique"
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
            <div v-for="i in numQuestionsUnique" :key="i" class="field col-6">
              <label for="labelsUnique[i]">Alternativa {{ i }}</label>
              <InputText
                id="labelsUnique[i]"
                type="text"
                v-model="labelsUnique[i]"
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
            <div v-for="i in 5" :key="i" class="field col-6">
              <label for="labelsLikert[0]">Alternativa {{ i }}</label>
              <InputText
                id="labelsLikert[0]"
                type="text"
                v-model="labelsLikert[0]"
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
    </ScrollPanel>
  </Dialog>
</template>
<script>
import QuestionTittle from "@/components/crud-components/QuestionTittle.vue";
import QuestionChoice from "@/components/crud-components/QuestionChoice.vue";

export default {
  name: "CRUDevaluation",
  components: {
    QuestionTittle,
    QuestionChoice,
  },
  data() {
    return {
      //Dados pergunta fake
      perguntaFake: [
        {
          tittle: "Titulo Exemplo",
          type: "Multiplecheckbox",
          requiered: this.requieredQuestion,
          values: [
            { name: "opcao teste" },
            { name: "opcao teste" },
            { name: "opcao teste" },
            { name: "opcao teste" },
            { name: "opcao teste" },
          ],
        },
      ],
      //Dados pergunta fake

      createEditVisible: false,
      numQuestionsMultiple: 2,
      numQuestionsUnique: 2,
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
            ],
          },
        ];
        for (let i = 2; i < this.labelsMultiple.length; i++) {
          this.options[0].values.push({ name: this.labelsMultiple[i] });
        }
        //  console.log(this.options);
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
      // this.options[0].values.forEach((element) => {
      //   console.log(element.name);
      // });
      console.log(this.options[0].values);
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
<style lang="scss" scoped>
::v-deep(.p-scrollpanel) {
  p {
    padding: 0.5rem;
    line-height: 1.5;
    margin: 0;
  }

  &.custombar1 {
    .p-scrollpanel-wrapper {
      border-right: 9px solid var(--surface-ground);
    }

    .p-scrollpanel-bar {
      background-color: var(--primary-color);
      opacity: 1;
      transition: background-color 0.2s;

      &:hover {
        background-color: #007ad9;
      }
    }
  }

  &.custombar2 {
    .p-scrollpanel-wrapper {
      border-right: 9px solid var(--surface-border);
      border-bottom: 9px solid var(--surface-border);
    }

    .p-scrollpanel-bar {
      background-color: var(--surface-ground);
      border-radius: 0;
      opacity: 1;
      transition: background-color 0.2s;
    }
  }
}
</style>
