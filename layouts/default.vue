<script setup>

import {useBooksStore} from "../store/books";

const booksStore = useBooksStore()

async function getBooks() {
  await booksStore.loadBooks('flowers')
  await booksStore.loadSavedBooks()
}


booksStore.handleLoading(getBooks)

const isLoading = computed(() => {
  return booksStore.getLoading
})

getBooks()

</script>


<template>
  <div id="site">
    <Teleport to="body">
      <UIOverlay v-show="isLoading"/>
    </Teleport>
    <Header/>

    <slot/>
  </div>

</template>

