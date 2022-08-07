<script setup>
import {useBooksStore} from "../store/books";

useHead({
  title: 'Knihovna',
})

const booksStore = useBooksStore()

const books = computed(()=>{
  return booksStore.getBooks
})

</script>

<template>

  <section class="py-10">
    <div class="container flex-center">
      <BooksSearch class="mb-10"/>
      <BooksList :books='books'/>
    </div>
  </section>

</template>
