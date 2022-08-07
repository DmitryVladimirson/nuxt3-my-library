<script setup>
import {BtnType,useBooksStore} from "../store/books";

useHead({
  title: 'Knihovna - Favourites',
})

const booksStore = useBooksStore()


const savedBooks = computed(() => {
  return booksStore.getSavedBooks
})


</script>
<template>
  <section class="py-10">
    <div class="container">
      <h2 class="text-2xl mb-10 text-center">
        Favourites
      </h2>
      <BooksList v-if="savedBooks.length > 0 " :books='savedBooks'/>
      <div v-else class="text-lg flex justify-center items-center gap-4">No books yet, add some books to favourites on <UIBtn :type="BtnType.NUXT_LINK" href="/">Home Page</UIBtn></div>
    </div>
  </section>
</template>