<script setup>
import {BtnType, useBooksStore} from "../store/books";

const booksStore = useBooksStore()


const favNum = computed(() => {
  if (booksStore.getSavedBooks) {
    return booksStore.getSavedBooks.length
  }
})
</script>


<template>
  <header class="header py-5 border-b-2 border-solid border-black ">
    <div class="container flex flex-col md:flex-row justify-between items-center">
      <h1 class="text-4xl mb-6 md:mb-0">
        <NuxtLink to="/">My Library</NuxtLink>
      </h1>
      <UIBtn :type="BtnType.NUXT_LINK" href="/favourites" class="relative">
        Favourites
        <span
            class="absolute p-2 w-8  justify-center flex-center text-center h-8 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white border border-sky-400 border-solid">
        {{ favNum }}
        </span>
      </UIBtn>
    </div>
  </header>
</template>
