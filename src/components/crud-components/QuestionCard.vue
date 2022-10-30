<template>
  <div
    class="card border-primary border-round surface-overlay border-1 border-round"
  >
    <div class="text-900 py-2 text-3xl font-medium mb-3 align-items-center">
      <div class="flex justify-content-between flex-wrap">
        <div
          class="flex align-items-center justify-content-center font-bold text-white"
        >
          <QuestionTittle :qTittle="qTittle" />
        </div>
        <div
          class="flex align-items-center justify-content-center font-bold text-white"
        >
          <SplitButton
            label="Editar"
            icon="pi pi-pencil"
            class="p-button-text"
            v-on:click="editarPergunta()"
            :model="items"
          ></SplitButton>
        </div>
      </div>
    </div>
    <Divider />

    <QuestionChoice :qType="qType" :qValues="qValues" />
  </div>
</template>

<script>
import QuestionTittle from "@/components/crud-components/QuestionTittle.vue";
import QuestionChoice from "@/components/crud-components/QuestionChoice.vue";
export default {
  name: "QuestionCard",
  components: {
    QuestionTittle,
    QuestionChoice,
  },
  props: {
    qType: {
      type: String,
      required: true,
    },
    qValues: {
      type: Array,
      required: true,
    },
    qTittle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items: [
        {
          label: "Remover",
          icon: "pi pi-trash",
          command: () => {
            console.log("Remover");
          },
        },
        {
          label: "Ver Respostas",
          icon: "pi pi-chart-bar",
          command: () => {
            console.log("Ver Respostas");
          },
        },
      ],
    };
  },
};
</script>
