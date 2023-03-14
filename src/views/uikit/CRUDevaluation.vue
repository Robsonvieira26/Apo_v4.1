<script>
import EvaluationService from '../service/EvaluationService';
import LinkertService from '../service/LinkertService';

import QuestionCard from '@/components/crud-components/QuestionCard.vue';
import QMultiplecheckbox from '../components/crud-components/question-choices/QMultiplecheckbox.vue';
import QUniquecheckbox from '../components/crud-components/question-choices/QUniquecheckbox.vue';
import QText from '../components/crud-components/question-choices/QText.vue';
import QLinkert from '../components/crud-components/question-choices/QLinkert.vue';
import QLinkertCustom from '../components/crud-components/question-choices/QLinkertCustom.vue';
import QMultipleLinkertVue from '../components/crud-components/question-choices/QMultipleLinkert.vue';
export default {
    name: 'CRUDevaluation',
    components: {
        QuestionCard,
        QMultiplecheckbox,
        QUniquecheckbox,
        QText,
        QLinkert,
        QLinkertCustom,
        QMultipleLinkertVue
    },
    data() {
        return {
            activeIndex: 0,
            LinkertService: null,
            linkertServiceLabels: null,
            tittle: '',
            labels: [],
            numberSections: 1,
            numQuestions: 2,
            selectedQuestionOption: null,
            editTittleVisible: false,
            evaluationTittle: 'Titulo Padrão',
            evaluationService: null,
            questions: null,
            question: {},
            selectedMultipleLikert: null,
            multipleLikert: [
                { name: '1-5', code: '1-5' },
                { name: 'Pessimo - Otimo', code: 'Pessimo - Otimo' },
                {
                    name: 'Muito Escuros - Bem Iluminados',
                    code: 'Muito Escuros - Bem Iluminados'
                }
            ],
            createEditVisible: false,

            cascadeOptions: [
                { name: 'Multipla Escolha', value: 0 },
                { name: 'Escolha Unica', value: 1 },
                { name: 'Texto Livre', value: 2 },
                {
                    name: 'Escala Likert',
                    types: [
                        { name: '1-5', value: 3 },
                        { name: 'Pessimo - Otimo', value: 4 },
                        { name: 'Muito Escuros - Bem Iluminados', value: 5 },
                        { name: 'Personalizar...', value: 6 }
                    ]
                },
                { name: 'Multiplas Escalas Likert' }
            ],

            // Likret Options
            selectLikertChoice: null,
            selectLikert1Options: [
                { name: '1', value: '1' },
                { name: '2', value: '2' },
                { name: '3', value: '3' },
                { name: '4', value: '4' },
                { name: '5', value: '5' }
            ],
            selectLikert2Options: [
                // Facilidade de mobiliar:	Ótimo	Bom	Regular	Ruim	Péssimo
                { name: 'Ótimo', value: '1' },
                { name: 'Bom', value: '2' },
                { name: 'Regular', value: '3' },
                { name: 'Ruim', value: '4' },
                { name: 'Péssimo', value: '5' }
            ],
            selectLikert3Options: [
                // Iluminação:	Bem iluminadas	Iluminadas	Regular	Escuras	Muito escuras
                { name: 'Bem iluminadas', value: '1' },
                { name: 'Iluminadas', value: '2' },
                { name: 'Regular', value: '3' },
                { name: 'Escuras', value: '4' },
                { name: 'Muito escuras', value: '5' }
            ]
        };
    },
    created() {
        this.evaluationService = new EvaluationService();
        this.linkertService = new LinkertService();
    },
    mounted() {
        this.evaluationService.getQuestions().then((data) => (this.questions = data));
        this.linkertService.getTypes().then((data) => (this.linkertServiceLabels = data));
        // for (let i in this.linkertServiceLabels) {
        //   this.cascadeOptions[3].types.push({
        //     name: this.linkertServiceLabels[i].name,
        //     value: this.linkertServiceLabels[i].id,
        //   });
        //   console.log(this.linkertServiceLabels);
        // }
        // console.log(this.linkertServiceLabels);
        // if (this.questions == null) {
        //   console.log("Nulo");
        // } else {
        //   console.log("Não nulo");
        // console.log(this.questions.lenght);
        //   // console.log(this.questions.length);
        // }
    },
    methods: {
        showEditTitle() {
            this.editTittleVisible = true;
        },
        hideEditTitle() {
            this.editTittleVisible = false;
        },
        addCategory() {
            this.activeIndex++;
            this.numberSections++;
        },
        hideDialog() {
            this.createEditVisible = false;
            this.clearInputs();
        },
        showDialog() {
            this.createEditVisible = true;
            console.log(Object.keys(this.linkertServiceLabels.escalas));
            // console.log("Clicou");
        },
        saveQuestion(event) {
            console.log(event);
            this.question = [
                {
                    //TODO: Gerar ID
                    id: '0003',
                    tittle: event.question['tittle'],
                    type: event.question['type'],
                    requiered: event.question['requiered'],
                    values: []
                }
            ];
            // console.log(event.question["type"]);
            if (event.question['type'] == 'Table') {
                // console.log(event.question);
                for (let i in event.question['values']) {
                    this.question[0].values.push(event.question['values'][i]);
                }
                // console.log(this.question[0].values);
            } else if (event.question['type'] == 'Linkert') {
                for (let i in event.question['values']) {
                    this.question[0].values.push(event.question['values'][i]);
                }
            } else {
                for (let i in event.question['values']) {
                    this.question[0].values.push({ name: event.question['values'][i] });
                }
            }
            this.questions.push(this.question[0]);
            // console.log(this.questions);
            this.hideDialog();
        },

        clearInputs() {
            this.question = [];
        },
        titulo(i) {
            return 'Seção ' + i;
        }
    }
};
</script>
<template>
    <div>
        <!-- Titulo -->
        <div class="text-900 text-3xl font-medium mb-3 align-items-center">
            <div class="flex justify-content-between py-3 px-3 flex-wrap border-round border-1 surface-border">
                <div class="flex align-items-center justify-content-center font-bold text-white">
                    {{ evaluationTittle }}
                </div>
                <div class="flex align-items-center justify-content-center font-bold text-white">
                    <Button label="Editar Titulo" icon="pi pi-pencil" class="p-button-text" v-on:click="showEditTitle()"></Button>
                </div>
            </div>
            <Dialog v-model:visible="editTittleVisible" header="Editar Titulo" :style="{ width: '600px' }" :modal="true" class="p-fluid">
                <div class="formgrid grid px-2">
                    <div class="field col">
                        <label for="evaluationTittle">Novo Titulo</label>
                        <InputText id="evaluationTittle" type="text" v-model="evaluationTittle" />
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
                <Button label="Nova Pergunta" class="p-button-raised p-button-outlined p-button-lg" v-on:click="showDialog()" />
            </div>
            <div class="field">
                <Button label="Nova Seção" class="p-button-raised p-button-outlined p-button-lg" v-on:click="addCategory()" />
                <!-- {{ activeIndex }} -->
            </div>
        </div>
        <!-- Botões -->
    </div>
    <div class="card">
        <TabView v-model:activeIndex="activeIndex">
            <TabPanel v-for="i in numberSections" :key="i" :header="titulo(i)">
                <!-- <div class="card"> -->

                <div v-if="questions == null || questions == []">
                    <!-- <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> -->
                    Você ainda não adicionou nenhuma pergunta
                </div>

                <div v-if="questions != null">
                    <div v-for="question in questions" :key="question">
                        <QuestionCard :qTittle="question.tittle" :qType="question.type" :qValues="question.values" />
                    </div>
                </div>
                <!-- </div> -->
            </TabPanel>
        </TabView>
    </div>

    <Dialog v-model:visible="createEditVisible" header="Criar/Editar Pergunta" :style="{ width: '600px' }" :modal="true" class="p-fluid">
        <ScrollPanel style="width: 100%; height: 250px" class="custombar1">
            <!-- {{ linkertServiceLabels }} -->
            <div class="field col-8">
                <label for="multiselect">Selecione o Tipo de Pergunta</label>
                <span class="p-float-label">
                    <CascadeSelect id="cascadeSelect" v-model="selectedQuestionOption" :options="cascadeOptions" optionLabel="name" optionGroupLabel="name" :optionGroupChildren="['types']" tyle="minWidth: 14rem" />
                </span>
            </div>
            <div v-if="selectedQuestionOption != null">
                <div v-if="selectedQuestionOption.name == 'Multipla Escolha'">
                    <QMultiplecheckbox @saveQuestion="saveQuestion($event)" />
                </div>
                <div v-if="selectedQuestionOption.name == 'Escolha Unica'">
                    <QUniquecheckbox @saveQuestion="saveQuestion($event)" />
                </div>

                <div v-if="selectedQuestionOption.name == 'Texto Livre'">
                    <QText @saveQuestion="saveQuestion($event)" />
                </div>
                <!-- Escala Likert -->
                <div v-if="selectedQuestionOption.name == '1-5'">
                    <QLinkert @saveQuestion="saveQuestion($event)" :scale="selectLikert1Options" />
                </div>
                <div v-if="selectedQuestionOption.name == 'Pessimo - Otimo'">
                    <QLinkert @saveQuestion="saveQuestion($event)" :scale="selectLikert2Options" />
                </div>
                <div v-if="selectedQuestionOption.name == 'Muito Escuros - Bem Iluminados'">
                    <QLinkert @saveQuestion="saveQuestion($event)" :scale="selectLikert3Options" />
                </div>
                <div v-if="selectedQuestionOption.name == 'Personalizar...'">
                    <QLinkertCustom @saveQuestion="saveQuestion($event)" />
                </div>
                <div v-if="selectedQuestionOption.name == 'Multiplas Escalas Likert'">
                    <QMultipleLinkertVue @saveQuestion="saveQuestion($event)" />
                    <!-- Escala Likert: 1-5 -->
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

            <div v-for="i in numQuestionsLikert" :key="i">
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
            </div>
          </div> -->
                </div>

                <!-- FIM Escala Likert -->
                <!-- <div class="p-2">
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
        </div> -->
            </div>
        </ScrollPanel>
    </Dialog>
</template>
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
