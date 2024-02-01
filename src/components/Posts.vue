<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router'; 
import { onBeforeMount, ref } from 'vue';
import EditarVue from './Editar.vue';

const router = useRouter();
const lista = ref([]);
const favoritos = ref([]);
const mostrarFavoritos = ref(false);

async function leerApi() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  lista.value = response.data;
}

function irFavoritos() {
  mostrarFavoritos.value = true;
}

function irEditar(id) {
  router.push(`/editar/${id}`);
}

function agregarFavorito(post) {
  if (!favoritos.value.find((fav) => fav.id === post.id)) {
    favoritos.value.push(post);
  }
}

function quitarFavorito(post) {
  favoritos.value = favoritos.value.filter((fav) => fav.id !== post.id);
}

onBeforeMount(leerApi);
</script>

<template>
  <div class="container">
    <div class="row mt-4" v-if="!mostrarFavoritos">
      <div class="col">
        <h3>Favoritos</h3>
        <button @click="irFavoritos" class="btn btn-primary">Ver Favoritos</button>
      </div>
    </div>
    <div class="row">
      <div v-if="!mostrarFavoritos" v-for="post in lista" :key="post.id" class="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div class="card border-info" style="width: 100%;">
          <div class="card-body">
            <h5 class="card-title">{{ post.id }}. {{ post.title }}</h5>
            <p class="card-text">{{ post.body }}</p>
            <a @click="() => irEditar(post.id)" class="btn btn-primary">Editar</a>
            <button @click="() => agregarFavorito(post)" type="button" class="btn btn-outline-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-4" v-if="mostrarFavoritos">
      <div class="col">
        <button @click="mostrarFavoritos = false" class="btn btn-primary">Ver Posts</button>
      </div>
    </div>
      <div v-if="mostrarFavoritos" class="col">
        <h3>Mis Favoritos</h3>
        <div v-for="fav in favoritos" :key="fav.id" class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">{{ fav.id }}. {{ fav.title }}</h5>
            <p class="card-text">{{ fav.body }}</p>
            <button @click="quitarFavorito(fav)" type="button" class="btn btn-danger">Quitar de Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
