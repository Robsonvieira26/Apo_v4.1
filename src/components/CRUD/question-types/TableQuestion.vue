<template>
  <div v-for="(option, index) in values" :key="option" class="field col">
    <!-- {{ option }} - Index: {{ index }} - Escala {{ option.scale }}<br /> -->
    <!-- Index Escala: {{}}<br /> -->
    <div class="field grid">
      <label for="Table1" class="col-fixed" style="width: 100px">{{
        option.name
      }}</label>
      <div class="col">
        <SelectButton
          id="Table1"
          v-model="choice[index]"
          :options="linkertOptions[options.indexOf(option.scale)]"
          optionLabel="name"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "MultipleCheckbox",
  data() {
    return {
      choice: [],

      options: [
        "1-5",
        "Pessimo - Otimo",
        "Muito Escuros - Bem Iluminados",
        "Personalizar...",
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
    };
  },
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>
