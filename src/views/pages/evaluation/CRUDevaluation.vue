<script>
// import EvaluationService from '../service/EvaluationService';
// import LinkertService from '../service/LinkertService';

// import QuestionCard from '@/components/CRUD/QuestionCard.vue';
// import QMultiplecheckbox from '@/components/CRUD/question-choices/QMultiplecheckbox.vue';
// import QUniquecheckbox from '@/components/CRUD/question-choices/QUniquecheckbox.vue';
// import QText from '@/components/CRUD/question-choices/QText.vue';
// import QLinkert from '@/components/CRUD/question-choices/QLinkert.vue';
// import QLinkertCustom from '@/components/CRUD/question-choices/QLinkertCustom.vue';
// import QMultipleLinkertVue from '@/components/CRUD/question-choices/QMultipleLinkert.vue';
// export default {
//     name: 'CRUDevaluation',
//     components: {
//         QuestionCard,
//         QMultiplecheckbox,
//         QUniquecheckbox,
//         QText,
//         QLinkert,
//         QLinkertCustom,
//         QMultipleLinkertVue
//     },
//     data() {
//         return {
//             activeIndex: 0,
//             LinkertService: null,
//             linkertServiceLabels: null,
//             tittle: '',
//             labels: [],
//             numberSections: 1,
//             numQuestions: 2,
//             selectedQuestionOption: null,
//             editTittleVisible: false,
//             evaluationTittle: 'Titulo Padrão',
//             evaluationService: null,
//             questions: null,
//             question: {},
//             selectedMultipleLikert: null,
//             multipleLikert: [
//                 { name: '1-5', code: '1-5' },
//                 { name: 'Pessimo - Otimo', code: 'Pessimo - Otimo' },
//                 {
//                     name: 'Muito Escuros - Bem Iluminados',
//                     code: 'Muito Escuros - Bem Iluminados'
//                 }
//             ],
//             createEditVisible: false,

//             cascadeOptions: [
//                 { name: 'Multipla Escolha', value: 0 },
//                 { name: 'Escolha Unica', value: 1 },
//                 { name: 'Texto Livre', value: 2 },
//                 {
//                     name: 'Escala Likert',
//                     types: [
//                         { name: '1-5', value: 3 },
//                         { name: 'Pessimo - Otimo', value: 4 },
//                         { name: 'Muito Escuros - Bem Iluminados', value: 5 },
//                         { name: 'Personalizar...', value: 6 }
//                     ]
//                 },
//                 { name: 'Multiplas Escalas Likert' }
//             ],

//             // Likret Options
//             selectLikertChoice: null,
//             selectLikert1Options: [
//                 { name: '1', value: '1' },
//                 { name: '2', value: '2' },
//                 { name: '3', value: '3' },
//                 { name: '4', value: '4' },
//                 { name: '5', value: '5' }
//             ],
//             selectLikert2Options: [
//                 // Facilidade de mobiliar:	Ótimo	Bom	Regular	Ruim	Péssimo
//                 { name: 'Ótimo', value: '1' },
//                 { name: 'Bom', value: '2' },
//                 { name: 'Regular', value: '3' },
//                 { name: 'Ruim', value: '4' },
//                 { name: 'Péssimo', value: '5' }
//             ],
//             selectLikert3Options: [
//                 // Iluminação:	Bem iluminadas	Iluminadas	Regular	Escuras	Muito escuras
//                 { name: 'Bem iluminadas', value: '1' },
//                 { name: 'Iluminadas', value: '2' },
//                 { name: 'Regular', value: '3' },
//                 { name: 'Escuras', value: '4' },
//                 { name: 'Muito escuras', value: '5' }
//             ]
//         };
//     },
//     created() {
//         // this.evaluationService = new EvaluationService();
//         // this.linkertService = new LinkertService();
//     },
//     mounted() {
//         this.evaluationService.getQuestions().then((data) => (this.questions = data));
//         this.linkertService.getTypes().then((data) => (this.linkertServiceLabels = data));
//         // for (let i in this.linkertServiceLabels) {
//         //   this.cascadeOptions[3].types.push({
//         //     name: this.linkertServiceLabels[i].name,
//         //     value: this.linkertServiceLabels[i].id,
//         //   });
//         //   console.log(this.linkertServiceLabels);
//         // }
//         // console.log(this.linkertServiceLabels);
//         // if (this.questions == null) {
//         //   console.log("Nulo");
//         // } else {
//         //   console.log("Não nulo");
//         // console.log(this.questions.lenght);
//         //   // console.log(this.questions.length);
//         // }
//     },
//     methods: {
//         showEditTitle() {
//             this.editTittleVisible = true;
//         },
//         hideEditTitle() {
//             this.editTittleVisible = false;
//         },
//         addCategory() {
//             this.activeIndex++;
//             this.numberSections++;
//         },
//         hideDialog() {
//             this.createEditVisible = false;
//             this.clearInputs();
//         },
//         showDialog() {
//             this.createEditVisible = true;
//             console.log(Object.keys(this.linkertServiceLabels.escalas));
//             // console.log("Clicou");
//         },
//         saveQuestion(event) {
//             console.log(event);
//             this.question = [
//                 {
//                     //TODO: Gerar ID
//                     id: '0003',
//                     tittle: event.question['tittle'],
//                     type: event.question['type'],
//                     requiered: event.question['requiered'],
//                     values: []
//                 }
//             ];
//             // console.log(event.question["type"]);
//             if (event.question['type'] == 'Table') {
//                 // console.log(event.question);
//                 for (let i in event.question['values']) {
//                     this.question[0].values.push(event.question['values'][i]);
//                 }
//                 // console.log(this.question[0].values);
//             } else if (event.question['type'] == 'Linkert') {
//                 for (let i in event.question['values']) {
//                     this.question[0].values.push(event.question['values'][i]);
//                 }
//             } else {
//                 for (let i in event.question['values']) {
//                     this.question[0].values.push({ name: event.question['values'][i] });
//                 }
//             }
//             this.questions.push(this.question[0]);
//             // console.log(this.questions);
//             this.hideDialog();
//         },

//         clearInputs() {
//             this.question = [];
//         },
//         titulo(i) {
//             return 'Seção ' + i;
//         }
//     }
// };
</script>
<template>
    <div>
        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <div class="flex align-items-center justify-content-center font-bold text-4xl">Titulo Teste</div>
                </div>
            </template>
            <template v-slot:end>
                <div class="my-2">
                    <Button label="Editar Titulo" icon="pi pi-pencil" class="p-button-primary mr-2" />
                </div>
            </template>
        </Toolbar>
        <div class="card">PERGUNTAS</div>
    </div>
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
