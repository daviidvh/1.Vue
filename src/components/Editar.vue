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
    <h2>Editar Post</h2>
    <p>ID del Post: {{ postId }}</p>
    <!-- Muestra los detalles del post, por ejemplo: -->
    <p>Título: {{ lista.title }}</p>
    <p>Cuerpo: {{ lista.body }}</p>
    <!-- Agrega formularios u otras lógicas según tus necesidades -->
  </div>
</template>
