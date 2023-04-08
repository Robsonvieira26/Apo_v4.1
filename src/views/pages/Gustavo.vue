<template>
    <h:form>
    <div class="grid">
    <div class="col-fixed" style="width:20px"></div>
    <div class="card">
      <h5>Nome</h5>
      <div class="ui-fluid">
          <div class="flex flex-column gap-2">
              <label for="Nome">Nome</label>
              <InputText id="Nome" v-model="value" aria-describedby="username-help" />
              <p:inputText id="Nome"/>
          </div>
          <div class="field">
              <div class="flex flex-column gap-2">
              <label for="Sobrenome">Sobrenome</label>
              <InputText id="Sobrenome" v-model="value" aria-describedby="username-help" />
          </div>
          </div>
      </div>
  </div>
  
  <div class="col-fixed" style="width:50px"></div>
  <div class="card">
      <h5>Local</h5>
      <div class="ui-fluid formgrid grid">
          <div class="flex flex-column gap-2">
              <label for="Endereço">Endereço</label>
              <InputText id="Endereço" v-model="value" aria-describedby="username-help" />
          </div>
          <div class="flex flex-column gap-2">
              <label for="CEP">CEP</label>
              <InputText id="CEP" v-model="value" aria-describedby="username-help" />
          </div>
      </div>
  </div>

  <div class="col-fixed" style="width:50px"></div>
  <div class="card">
      <h5>Dados Pessoais</h5>
      <div class="flex flex-column gap-2">
          <label for="Idade">Idade</label>
          <div class="col">
          <InputText id="Idade" v-model="value" aria-describedby="username-help" />
          </div>
      </div>
      <div class="flex flex-column gap-2">
          <label for="País">País</label>
          <div class="col">
              <InputText id="País" v-model="value" aria-describedby="username-help" />
          </div>
      </div>
  </div>

  <div class="col-fixed" style="width:50px"></div>
  <div class="card">
      <h5>Parentesco</h5>
      <div class="formgroup-inline">
          <div class="field">
              <label for="Mãe">Mãe</label>
              <inputText id="Mãe" placeholder="Mãe"/>
          </div>
          <div class="field">
              <label for="Pai">Pai</label>
              <inputText id="Pai" placeholder="Pai"/>
          </div>
          <Button type="Enviar" label="Enviar" />
      </div>
  </div>
 
  <div class="col-fixed" style="width:110px"></div>
  <div class="card">
      <h5>Estado</h5>
      <div class="field-checkbox">
          <Checkbox v-model="checked" :binary="true" />
          <label for="Solteiro" value="Solteiro">Solteiro</label>
      </div>
      <div class="field-checkbox">
          <Checkbox v-model="checked" :binary="true" />
          <label for="Casado" value="Casado">Casado</label>
      </div>
  
      <h5>Filhos</h5>
      <div class="formgroup-inline">
          <div class="field-checkbox">
              <Checkbox v-model="checked" :binary="true" />
              <label for="Sim" value="Sim">Sim</label>
          </div>
          <div class="field-checkbox">
              <Checkbox v-model="checked" :binary="true" />
              <label for="Não" value="Não">Não</label>
          </div>
      </div>
  </div>

  <div class="col-fixed" style="width:110px"></div>
  <div class="card">
      <h5>Escolaridade</h5>
      <div class="ui-fluid formgrid grid">
          <div class="flex flex-column gap-2">
              <label for="Escola">Escola</label>
              <inputText id="Escola" placeholder="Escola"/>
          </div>
          <div class="flex flex-column gap-2">
              <label for="Graduação">Graduação</label>
              <inputText id="Graduação" placeholder="Graduação"/>
          </div>
          <div class="flex flex-column gap-2">
              <label for="Pós Graduação">Pós Graduação</label>
              <inputText id="Pós Graduação" placeholder="Pós Graduação"/>
          </div>
      </div>
  </div>
</div>

  </h:form>
  </template>