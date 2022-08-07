<script setup="" lang="ts">
import {Book} from '@/store/books'

interface BooksList {
  books: Book[]
}


const props = defineProps<BooksList>()
</script>
<template>
  <ul class="grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
    <li v-for="book in books" :key="book.id">
      <BooksCard :book="book" />
    </li>
  </ul>
</template>
