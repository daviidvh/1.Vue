<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router'; 
import { onBeforeMount, ref } from 'vue';

const router = useRouter();  // Desestructurar el hook useRouter

const userEmail = ref('');
const userPassword = ref('');
const lista = ref([]);
const errorLogin = ref(false);

async function leerApi() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    lista.value = response.data;
}

function atajo(event) {
    if (event.ctrlKey && event.altKey && event.key === 'Enter') {
        // Lógica que se ejecutará al presionar Ctrl+Alt+Enter
        console.log('Ctrl+Alt+Enter presionado');
        // Aquí puedes llamar a la función de autenticación u otra lógica que necesites
        click();
    }
}

function click() {
    // Acceder a los valores actuales de userEmail y userPassword
    const email = userEmail.value;

    // Verificar si el email se encuentra en la lista de usuarios
    const usuarioEncontrado = lista.value.some(user => user.email === email);

    if (usuarioEncontrado) {
        console.log('ENCONTRADO');
        errorLogin.value = false;
        router.push('/posts');  
    } else {
        errorLogin.value = true;
    }
    leerApi();
}

onBeforeMount(leerApi);
</script>

<template>
  <v-container style="height: 100%;">
      <v-row class="justify-center align-center" style="height: 100%;">
      <v-col lg="4">
        <v-card >
          <v-card-title class="text-h5 text-center">Inicio de Sesión</v-card-title>

          <v-card-text>
            <v-form @keydown="atajo">
              <v-text-field 
                v-model="userEmail"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="userPassword"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>

              <v-alert
                v-if="errorLogin"
                type="error"

              >
                Credenciales incorrectas. Por favor, inténtalo de nuevo.
              </v-alert>

              <v-btn @click="click" color="primary" block>Iniciar Sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col> 
      </v-row> 
  </v-container>
</template>
<style>
html, body{
  height: 100%;
}
#app{
  height: 100%;
}
</style>
