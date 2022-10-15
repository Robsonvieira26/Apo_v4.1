<template>
  <!-- <div class="p-3">
    <div class="py-2">
      <div class="py-2">
        <SelectButton v-model="choice" :options="values" optionLabel="name" />
      </div>
    </div>
  </div> -->
  <div class="field grid">
    <label for="Table1" class="col-fixed" style="width: 100px">Linha1</label>
    <div class="col">
      <SelectButton
        id="Table1"
        v-model="choice"
        :options="values"
        optionLabel="name"
      />
    </div>
  </div>

  <div class="field grid">
    <label for="Table2" class="col-fixed" style="width: 100px">Linha2</label>
    <div class="col">
      <SelectButton
        id="Table2"
        v-model="choice1"
        :options="values2"
        optionLabel="name"
      />
    </div>
  </div>

  <div class="field grid">
    <label for="Table3" class="col-fixed" style="width: 100px">Linha3</label>
    <div class="col">
      <SelectButton
        id="Table3"
        v-model="choice2"
        :options="values"
        optionLabel="name"
      />
    </div>
  </div>

  <div class="field grid">
    <label for="Table4" class="col-fixed" style="width: 100px">Linha4</label>
    <div class="col">
      <SelectButton
        id="Table4"
        v-model="choice3"
        :options="values2"
        optionLabel="name"
      />
    </div>
  </div>

  <div class="field grid">
    <label for="Table5" class="col-fixed" style="width: 100px">Linha5</label>
    <div class="col">
      <SelectButton
        id="Table5"
        v-model="choice4"
        :options="values"
        optionLabel="name"
      />
    </div>
  </div>

  <div class="field grid">
    <label for="Table6" class="col-fixed" style="width: 100px">Linha6</label>
    <div class="col">
      <SelectButton
        id="Table6"
        v-model="choice5"
        :options="values2"
        optionLabel="name"
      />
    </div>
  </div>
</template>
<script>
export default {
  // name: "MultipleCheckbox",
  data() {
    return {
      choice: null,
      choice1: null,
      choice2: null,
      choice3: null,
      choice4: null,
      choice5: null,

      values: [
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
      ],
      values2: [
        { name: "Ótimo", value: "1" },
        { name: "Bom", value: "2" },
        { name: "Regular", value: "3" },
        { name: "Ruim", value: "4" },
        { name: "Péssimo", value: "5" },
      ],
    };
  },
};
</script>
