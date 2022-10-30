<template>
  <div>
    <!-- Titulo -->
    <div class="text-900 text-3xl font-medium mb-3 align-items-center">
      <div
        class="flex justify-content-between py-3 px-3 flex-wrap border-round border-1 surface-border"
      >
        <div
          class="flex align-items-center justify-content-center font-bold text-white"
        >
          {{ evaluationTittle }}
        </div>
        <div
          class="flex align-items-center justify-content-center font-bold text-white"
        >
          <Button
            label="Editar Titulo"
            icon="pi pi-pencil"
            class="p-button-text"
            v-on:click="showEditTitle()"
          ></Button>
        </div>
      </div>
      <Dialog
        v-model:visible="editTittleVisible"
        header="Editar Titulo"
        :style="{ width: '600px' }"
        :modal="true"
        class="p-fluid"
      >
        <div class="formgrid grid px-2">
          <div class="field col">
            <label for="evaluationTittle">Novo Titulo</label>
            <InputText
              id="evaluationTittle"
              type="text"
              v-model="evaluationTittle"
            />
          </div>
        </div>
      </Dialog>
    </div>
    <!-- Titulo -->
    <!-- Botões -->
    <!-- <div class="grid py-4">
      <div class="col-2 px-2">
        <Button
          label="Nova Pergunta"
          class="p-button-raised p-button-outlined p-button-lg"
          v-on:click="showDialog()"
        />
      </div>
      <div class="col-2 px-2">
       
      </div>
    </div> -->
    <div class="formgroup-inline">
      <div class="field">
        <Button
          label="Nova Pergunta"
          class="p-button-raised p-button-outlined p-button-lg"
          v-on:click="showDialog()"
        />
      </div>
      <div class="field">
        <Button
          label="Nova Seção"
          class="p-button-raised p-button-outlined p-button-lg"
          v-on:click="addCategory()"
        />
      </div>
    </div>
    <!-- Botões -->
  </div>
  <div class="card">
    <TabView
      ><!--:activeIndex="activeIndex"-->
      <TabPanel header="Seção 1">
        <!-- <div class="card"> -->
        <div v-if="questions == null">
          <!-- TODO:CASO SEJA NULo SKELETON -->
        </div>

        <div v-if="questions != null">
          <div v-for="question in questions" :key="question">
            <QuestionCard
              :qTittle="question.tittle"
              :qType="question.type"
              :qValues="question.values"
            />
          </div>
        </div>
        <!-- </div> -->
      </TabPanel>
      <!-- <TabPanel v-for="i in 5" :key="i" :header="titulo(i)">
        Categoria {{ i + 1 }}
      </TabPanel> -->
    </TabView>
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
          {{numQuestions.type}}
          <QMultiplecheckbox
            :qTittle="tittle"
            :qLabels="labels"
            :qNumQuestions="numQuestions"
          />
          <!-- <div class="formgrid grid px-2">
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
                :id="labelsMultiple[i - 1]"
                type="text"
                v-model="labelsMultiple[i - 1]"
              />
            </div>
          </div> -->
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
                :id="labelsUnique[i - 1]"
                type="text"
                v-model="labelsUnique[i - 1]"
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
              <label :for="labelsLikert[i - 1]">Alternativa {{ i }}</label>
              <InputText
                :id="labelsLikert[i - 1]"
                type="text"
                v-model="labelsLikert[i - 1]"
              />
            </div>
          </div>
        </div>
        <div v-if="selectedQuestionOption.name == 'Multiplas Escalas Likert'">
          <!-- Escala Likert: 1-5 -->
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
                v-model="numQuestionsLikert"
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
            <div v-for="i in numQuestionsLikert" :key="i" class="field px-2">
              <div class="formgroup-inline">
                <div class="field">
                  <label for="firstname5" class="p-sr-only">Firstname</label>
                  <InputText
                    id="firstname5"
                    type="text"
                    placeholder="Subtitulo da pergunta"
                  />
                </div>
                <div class="field">
                  <label for="lastname5" class="p-sr-only">Lastname</label>
                  <Dropdown
                    v-model="selectedMultipleLikert"
                    :options="multipleLikert"
                    optionLabel="name"
                    placeholder="Selecione o tipo de escala"
                  />
                </div>
              </div>
              ESCALA VEM AQUI
              <Divider></Divider>
            </div>

            <!-- <div v-for="i in numQuestionsLikert" :key="i">
              <div class="field col">
                <InputText
                  :id="labelsMultiple[i - 1]"
                  type="text"
                  placeholder="Subtitulo da pergunta"
                  v-model="labelsMultiple[i - 1]"
                />
              </div>
              <div class="field col">
                <Dropdown
                  v-model="selectedMultipleLikert"
                  :options="multipleLikert"
                  optionLabel="name"
                  placeholder="Selecione o tipo de escala"
                />
              </div>
            </div> -->
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
import QuestionCard from "@/components/crud-components/QuestionCard.vue";
import EvaluationService from "../service/EvaluationService";
import QMultiplecheckbox from "../components/crud-components/question-choices/QMultiplecheckbox.vue";
export default {
  name: "CRUDevaluation",
  components: {
    QuestionCard,
    QMultiplecheckbox,
  },
  data() {
    return {
      tittle: "",
      labels: [],
      numQuestions: 2,

      editTittleVisible: false,
      evaluationTittle: "Titulo Padrão",
      evaluationService: null,
      questions: null,
      question: null,
      selectedMultipleLikert: null,
      multipleLikert: [
        { name: "1-5", code: "1-5" },
        { name: "Pessimo - Otimo", code: "Pessimo - Otimo" },
        {
          name: "Muito Escuros - Bem Iluminados",
          code: "Muito Escuros - Bem Iluminados",
        },
      ],
      createEditVisible: false,
      numQuestionsMultiple: 2,
      numQuestionsUnique: 2,
      numQuestionsLikert: 2,
      selectedQuestionOption: null,
      requieredQuestion: false,
      labelsLikert: [],
      labelsMultiple: [],
      labelsUnique: [],
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
        { name: "Multiplas Escalas Likert" },
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
  created() {
    this.evaluationService = new EvaluationService();
  },
  mounted() {
    this.evaluationService
      .getQuestions()
      .then((data) => (this.questions = data));
    if (this.questions == null) {
      console.log("Nulo");
    } else {
      console.log(this.questions);
      // console.log(this.questions.length);
    }
  },
  methods: {
    showEditTitle() {
      this.editTittleVisible = true;
    },
    hideEditTitle() {
      this.editTittleVisible = false;
    },
    addCategory() {
      console.log(this.questions[0]);
    },
    hideDialog() {
      this.createEditVisible = false;
      this.clearInputs();
    },
    showDialog() {
      this.createEditVisible = true;
      // console.log("Clicou");
    },
    saveQuestion() {
      console.log(this.tittle)
      console.log(this.labels)
      console.log(this.numQuestions)


      // console.log(this.selectedQuestionOption);
      // if (this.selectedQuestionOption.value == 0) {
      //   console.log("Multipla Escolha");
      //   this.question = [
      //     {
      //       //TODO: Gerar ID
      //       id: "0003",
      //       tittle: this.questionTittle,
      //       type: "Multiplecheckbox",
      //       requiered: this.requieredQuestion,
      //       values: [
      //         { name: this.labelsMultiple[0] },
      //         { name: this.labelsMultiple[1] },
      //       ],
      //     },
      //   ];
      //   if (this.numQuestionsMultiple > 2) {
      //     for (let i = 2; i < this.numQuestionsMultiple; i++) {
      //       console.log(i);
      //       if (this.labelsMultiple[i] != null) {
      //         console.log(this.labelsMultiple[i]);
      //         this.question[0].values.push({ name: this.labelsMultiple[i] });
      //       }
      //     }
      //   }
      //   // console.log("Saiu loop");
      //   // console.log(this.question[0]);
      //   this.questions.push(this.question[0]);
      //   //TODO:Toast de Sucesso
      // } else if (this.selectedQuestionOption.value == 1) {
      //   this.question = [
      //     {
      //       tittle: this.questionTittle,
      //       type: "Uniquecheckbox",
      //       requiered: this.requieredQuestion,
      //       values: [
      //         { name: this.labelsUnique[0] },
      //         { name: this.labelsUnique[1] },
      //       ],
      //     },
      //   ];
      //   for (let i = 2; i < this.labelsUnique.length; i++) {
      //     this.question[0].values.push({ name: this.labelsUnique[i] });
      //   }
      //   this.questions.push(this.question[0]);
      // } else if (this.selectedQuestionOption.value == 2) {
      //   this.question = [
      //     {
      //       tittle: this.questionTittle,
      //       type: "Text",
      //       requiered: this.requieredQuestion,
      //       values: [{ name: "Texto" }],
      //     },
      //   ];
      //   this.questions.push(this.question[0]);
      // } else if (this.selectedQuestionOption.value == 3) {
      //   // console.log("Escala Likert: 1-5");
      //   this.question = [
      //     {
      //       tittle: this.questionTittle,
      //       type: "Likert",
      //       requiered: this.requieredQuestion,
      //       values: [
      //         { name: this.selectLikert1Options[0].name },
      //         { name: this.selectLikert1Options[1].name },
      //         { name: this.selectLikert1Options[2].name },
      //         { name: this.selectLikert1Options[3].name },
      //         { name: this.selectLikert1Options[4].name },
      //       ],
      //     },
      //   ];
      //   this.questions.push(this.question[0]);

      //   // console.log(this.options);
      // } else if (this.selectedQuestionOption.value == 4) {
      //   // console.log("Escala Likert: Pessimo - Otimo");
      //   this.question = [
      //     {
      //       tittle: this.questionTittle,
      //       type: "Likert",
      //       requiered: this.requieredQuestion,
      //       values: [
      //         { name: this.selectLikert2Options[0].name },
      //         { name: this.selectLikert2Options[1].name },
      //         { name: this.selectLikert2Options[2].name },
      //         { name: this.selectLikert2Options[3].name },
      //         { name: this.selectLikert2Options[4].name },
      //       ],
      //     },
      //   ];
      //   // console.log(this.options);
      //   this.questions.push(this.question[0]);
      // } else if (this.selectedQuestionOption.value == 5) {
      //   // console.log("Escala Likert: Pouco Iluminado - Muito Iluminado");
      //   this.question = [
      //     {
      //       tittle: this.questionTittle,
      //       type: "Likert",
      //       requiered: this.requieredQuestion,
      //       values: [
      //         { name: this.selectLikert3Options[0].name },
      //         { name: this.selectLikert3Options[1].name },
      //         { name: this.selectLikert3Options[2].name },
      //         { name: this.selectLikert3Options[3].name },
      //         { name: this.selectLikert3Options[4].name },
      //       ],
      //     },
      //   ];
      //   this.questions.push(this.question[0]);
      // } else if (this.selectedQuestionOption.value == 6) {
      //   // console.log("Escala Likert: Personalizar...");
      //   this.question = [
      //     {
      //       tittle: this.questionTittle,
      //       type: "Likert",
      //       requiered: this.requieredQuestion,
      //       values: [
      //         { name: this.labelsLikert[0] },
      //         { name: this.labelsLikert[1] },
      //         { name: this.labelsLikert[2] },
      //         { name: this.labelsLikert[3] },
      //         { name: this.labelsLikert[4] },
      //       ],
      //     },
      //   ];
      //   this.questions.push(this.question[0]);
      // }
      this.hideDialog();
    },

    clearInputs() {
      this.selectedQuestionOption = null;
      this.requieredQuestion = false;
      this.labels = [];
      this.question = [];
      this.selectLikertChoice = null;
      this.labelsLikert = [];
      this.labelsMultiple = [];
      this.labelsUnique = [];
      this.questionTittle = "";
      this.numQuestionsMultiple = 2;
      this.numQuestionsUnique = 2;
    },
    titulo(i) {
      return "Seção " + (i + 1);
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
