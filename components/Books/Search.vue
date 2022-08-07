<script setup="" lang="ts">

import {BtnType, useBooksStore} from "@/store/books";

const booksStore = useBooksStore()


const searchText = ref('')

const error = ref('')

async function handleSubmit() {
  error.value = ''
  try{
    await booksStore.handleLoading(() => {
      return booksStore.loadBooks(searchText.value)
    })
  } catch (err){
    error.value = err.message
  }

}
</script>

<template>
  <div class="w-full">
    <form action="#" @submit.prevent="handleSubmit"
          class="flex flex-col w-full items-center justify-center md:flex-row">
      <input type="text"
             class="border border-solid border-black w-full md:w-1/2 mb-5 md:mb-0 md:mr-5 px-3 py-1 rounded-lg h-full"
             v-model="searchText" placeholder="Search for some books...">
      <UIBtn :type="BtnType.BTN">SUBMIT</UIBtn>
    </form>
    <div v-show="error" class="text-red-400 mt-4 text-center">{{ error }}</div>
  </div>
</template>