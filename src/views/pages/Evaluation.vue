<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import ProductService from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';

const toast = useToast();
// eslint-disable-next-line no-unused-vars
const { contextPath } = useLayout();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

const productService = new ProductService();

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    productService.getProducts().then((data) => (products.value = data));
});
// eslint-disable-next-line no-unused-vars
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim()) {
        {
            product.value.id = createId();
            product.value.code = createId();
            product.value.code = createId();
            product.value.date = '01/02/2000';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Avaliação Criada', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    console.log(product);
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

// const findIndexById = (id) => {
//     let index = -1;
//     for (let i = 0; i < products.value.length; i++) {
//         if (products.value[i].id === id) {
//             index = i;
//             break;
//         }
//     }
//     return index;
// };

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

// eslint-disable-next-line no-unused-vars
const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Novo Questionario" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Apagar Questionario" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="products"
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Avaliações Disponiveis</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Busca..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Nome" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Nome</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="date" header="Data" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Data</span>
                            {{ slotProps.data.date }}
                        </template>
                    </Column>
                    <Column field="description" header="Descrição" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Descrição</span>
                            {{ slotProps.data.description }}
                        </template>
                    </Column>

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <router-link to="/CRUD">
                                <Button v-tooltip.top="'Editar Perguntas do Questionario'" icon="pi pi-sliders-h" class="p-button-rounded p-button-success mr-2 mt-2" />
                            </router-link>
                            <Button v-tooltip.top="'Editar informações do Questionario'" icon="pi pi-pencil" class="p-button-rounded p-button-secondary mr-2 mt-2" @click="editProduct(slotProps.data)" />
                            <Button v-tooltip.top="'Visualizar'" icon="pi pi-search" class="p-button-rounded p-button-primar mr-2 mt-2" @click="editProduct(slotProps.data)" />
                            <Button v-tooltip.top="'Responder'" icon="pi pi-reply" class="p-button-rounded p-button-help mr-2 mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                            <Button v-tooltip.top="'Apagar'" icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2 mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Informações do Questionario" :modal="true" class="p-fluid">
                    <!-- <img :src="contextPath + 'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
                    <div class="field">
                        <label for="name">Nome</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Nome é um campo obrigatorio</small>
                    </div>
                    <div class="field">
                        <label for="description">Descrição</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>
                    <div class="field">
                        <label for="date">Data</label>
                        <Calendar id="date" v-model="product.date" required="true" dateFormat="dd/mm/yy" />
                        <small class="p-invalid" v-if="submitted && !product.date">Data é um campo obrigatorio</small>
                    </div>

                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Salvar" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Tem certeza que deseja apagar a avaliação: <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Sim" icon="pi pi-check" class="p-button-text p-button-danger" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Tem certeza de deseja apagar as avaliações selecionadas?</span>
                    </div>
                    <template #footer>
                        <Button label="Não" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="Sim" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
