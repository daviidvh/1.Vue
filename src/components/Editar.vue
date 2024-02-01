<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router'; 
import { onBeforeMount, ref } from 'vue';

const route = useRoute();
const postId = ref(null);
const lista = ref({});

async function leerApi() {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId.value}`);
  lista.value = response.data;
}
onBeforeMount(() => {
  // Obtenemos el id de la URL utilizando useRoute
  postId.value = route.params.id;
  // Llamamos a leerApi para obtener detalles del post
  leerApi();
});
console.log(lista)

</script>

<template>
  <div>
    <h2>Editar Post {{ postId }}</h2>
    <form @submit.prevent="guardarCambios">
      <div class="mb-3">
        <label for="titulo" class="form-label">Título:</label>
        <input type="text" v-model="lista.title" class="form-control" id="titulo" required>
      </div>
      <div class="mb-3">
        <label for="cuerpo" class="form-label">Cuerpo:</label>
        <textarea v-model="lista.body" class="form-control" id="cuerpo" rows="4" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
  </div>
</template>


