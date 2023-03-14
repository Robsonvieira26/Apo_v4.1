<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const checked = ref(false);
const isActive = ref(true);
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!-- <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" /> -->
                        <div class="text-900 text-3xl font-medium mb-3">Bem Vindo</div>
                        <span class="text-600 font-medium">Entre para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Usuario</label>
                        <InputText id="email1" type="text" placeholder="Usuario" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Senha</label>
                        <Password id="password1" v-model="password" placeholder="Senha" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Lembrar-me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Esqueceu a senha?</a>
                        </div>
                        <router-link class="Card__link" v-bind:class="{ disabled: isActive }" to="/">
                            <Button label="Entrar" class="w-full p-3 text-xl"></Button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <AppConfig simple /> -->
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
