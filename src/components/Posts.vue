<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import EditarVue from './Editar.vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHomeCircleOutline } from '@mdi/js'
const path = mdiHomeCircleOutline;
import { mdiHeartOutline } from '@mdi/js'


import { extractIdentifiers } from 'vue/compiler-sfc';
const path2 = mdiHeartOutline;
import { mdiPlus } from '@mdi/js'
const path3 = mdiPlus;
import { mdiCloseCircleOutline } from '@mdi/js'
const path4 = mdiCloseCircleOutline;

const router = useRouter();
const lista = ref([]);
const favoritos = ref([]);
const mostrarFavoritos = ref(false);
const mostrarEditar = ref(false)
const mostrarCrear = ref(false)
const crearTitulo = ref('')
const crearBody = ref('')

const post = ref({
  id: null,
  title: '',
  body: ''
});




async function leerApi() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  lista.value = response.data;
}

function irFavoritos() {
  mostrarFavoritos.value = true;
  mostrarCrear.value = false;
}


function irEditar(postSeleccionado) {
  mostrarEditar.value = true;
  post.value = { ...postSeleccionado };



}


function cerrarEditar() {
  mostrarEditar.value = false;
  console.log(mostrarEditar.value)
}


function agregarFavorito(post) {
  if (!favoritos.value.find((fav) => fav.id === post.id)) {
    favoritos.value.push(post);
  }
}

function quitarFavorito(post) {
  favoritos.value = favoritos.value.filter((fav) => fav.id !== post.id);
}

function guardarCambios(indice) {
  lista.value[indice].title = post.value.title;
  lista.value[indice].body = post.value.body;
  console.log(lista.value[indice]);
  console.log(post.value.title);
  console.log(post.value.body);
  console.log(lista.value[indice]);
  cerrarEditar();

}


function irCrear() {
  mostrarCrear.value = true

}

function cerrarCrear() {
  mostrarCrear.value = false;
  console.log(mostrarEditar.value)

  console.log(mostrarCrear.value)

}

function crearPost(){
  console.log(lista.value)
  //console.log(lista.value.length+1)
  console.log(crearBody.value, crearTitulo.value)
  lista.value.push({body: crearBody.value, id: lista.value.length+1,title: crearTitulo.value,userId: 1 })
  console.log(lista.value)

}

function eliminar(id){
  const indice = lista.value.findIndex(post => post.id === id);
  lista.value.splice(indice, 1);
}

onBeforeMount(leerApi);
</script>

<template>
  <v-toolbar density="compact">
      <v-toolbar-title>Post</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="mostrarFavoritos = false">
        <svg-icon type="mdi" :path="path"></svg-icon>
      </v-btn>

      <v-btn @click="irFavoritos">
        <svg-icon type="mdi" :path="path2"></svg-icon>
      </v-btn>

      <v-btn @click="irCrear">
        <svg-icon type="mdi" :path="path3"></svg-icon>
      </v-btn>


    </v-toolbar>
    <v-container style="height: 100%;">
      <v-row class="row">
        <v-card class="mx-auto my-9" max-width="344" elevation="16" v-if="!mostrarFavoritos && !mostrarEditar && !mostrarCrear" v-for="post in lista" :key="post.id">
          <v-row style="width: 100%;">
            <v-btn @click="eliminar(post.id)" icon="mdi-account" size="x-small" class="ml-auto mt-4" color="red">
              <svg-icon type="mdi" :path="path4"></svg-icon>
            </v-btn>
            <v-col class="card-body">
              <v-card-title>{{ post.id }}</v-card-title>
              <v-card-subtitle>{{ post.title }}</v-card-subtitle>
              <v-card-text>{{ post.body }}</v-card-text>
              <v-col>
                <v-btn block rounded="xl" @click="() => irEditar(post)" class="btn btn-primary">Editar</v-btn>
                <v-btn block rounded="xl" @click="() => agregarFavorito(post)" type="button" class="btn btn-outline-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
                    viewBox="0 0 16 16">
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15">
                    </path>
                  </svg>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-card>


        <!-- Zona de favoritos -->

        <v-container v-if="mostrarFavoritos && !mostrarCrear" class="col">
          <h3>Mis Favoritos</h3>
          <v-card v-for="fav in favoritos" :key="fav.id">
            <v-card-title>{{ fav.id }}. {{ fav.title }}</v-card-title>
            <v-card-text>{{ fav.body }}</v-card-text>
            <v-col cols="auto">
              <v-btn @click="quitarFavorito(fav)" type="button" class="btn btn-danger">Quitar de Favoritos</v-btn>
            </v-col>
          </v-card>
        </v-container>
      </v-row>


      <!-- Zona de editar -->
      <v-container v-if="mostrarEditar" class="col">
        <h2>Editar Post {{ post.id }} </h2>

        <v-col class="mb-3">
          <v-text-field label="Titulo" v-model="post.title"></v-text-field>

          <v-text-field label="Cuerpo" v-model="post.body"></v-text-field>

        </v-col>

        <v-row cols="auto">
          <v-col>
            <v-btn @click="guardarCambios(post.id)" block rounded="xl" class="btn btn-primary">Guardar Cambios</v-btn>
          </v-col>

          <v-col>
            <v-btn block rounded="xl" @click="cerrarEditar">Volver</v-btn>
          </v-col>
        </v-row>
      </v-container>


      <!-- Zona crear -->
      <v-container v-if="mostrarCrear" class="col">
        <h2>Crear</h2>

        <v-col class="mb-3">
          <v-text-field label="Titulo" v-model="crearTitulo"></v-text-field>
          <v-text-field label="Cuerpo" v-model="crearBody"></v-text-field>
        </v-col>

        <v-row cols="auto">
          <v-col>
            <v-btn @click="crearPost" block rounded="xl" class="btn btn-primary">Crear</v-btn>
          </v-col>

          <v-col>
            <v-btn block rounded="xl" @click="cerrarCrear">Volver</v-btn>
          </v-col>
        </v-row>
      </v-container>


    </v-container>
</template>
