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
  <div @keydown="atajo">
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Introduce tu email"
          v-model="userEmail"
        >
        <small id="emailHelp" class="form-text text-muted">
          Su privacidad es importante para nosotros. No compartiremos su correo electrónico con nadie.
        </small>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Tu contraseña" v-model="userPassword">
      </div>

      <div v-show="errorLogin" class="alert alert-danger" role="alert">
        Credenciales incorrectas. Por favor, inténtalo de nuevo.
      </div>

      <button type="button" @click="click" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
