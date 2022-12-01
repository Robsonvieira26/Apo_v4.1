<template>
  <Dialog
    v-model:visible="seeAnswers"
    header="Respostas"
    :style="{ width: '600px' }"
    :modal="true"
    class="p-fluid"
  >
    <div>
      <Accordion>
        <AccordionTab header="Gráfico de Linhas">
          <div class="card bg-blue-900">
            <h5>Linear Chart</h5>
            <Chart type="line" :data="lineData" :options="lineOptions" />
          </div>
        </AccordionTab>
        <AccordionTab header="Gráfico de Pizza">
          <div class="card flex flex-column align-items-center bg-blue-900">
            <h5 class="align-self-start">Pie Chart</h5>
            <Chart
              type="pie"
              :data="pieData"
              :options="pieOptions"
              style="width: 50%"
            />
          </div>
        </AccordionTab>
        <AccordionTab header="Gráfico Polar">
          <div class="card flex flex-column align-items-center bg-blue-900">
            <h5 class="align-self-start">Polar Area Chart</h5>
            <Chart
              type="polarArea"
              :data="polarData"
              :options="polarOptions"
              style="width: 50%"
            />
          </div>
        </AccordionTab>
        <AccordionTab header="Gráfico de Barra">
          <div class="card bg-blue-900">
            <h5>Bar Chart</h5>
            <Chart type="bar" :data="barData" :options="barOptions" />
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </Dialog>

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
      seeAnswers: false,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            tension: 0.4,
          },
          {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      //Personalização do gráfico
      lineOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "#BBC1C9",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "#BBC1C9",
            },
          },
        },
      },
      pieOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
      },
      barOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "#BBC1C9",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "#BBC1C9",
            },
          },
        },
      },

      polarOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          r: {
            grid: {
              color: "#ebedef",
            },
          },
        },
      },

      pieData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      polarData: {
        datasets: [
          {
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB",
            ],
            label: "My dataset",
          },
        ],
        labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
      },
      barData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "#2f4860",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "#00bb7e",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
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
            this.editarPergunta();
          },
        },
      ],
    };
  },
  methods: {
    editarPergunta() {
      this.seeAnswers = true;
      console.log("Editar");
    },
  },
};
</script>
