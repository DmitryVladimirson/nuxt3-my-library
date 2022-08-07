<script setup lang="ts">
import {BtnType, Book, useBooksStore} from "@/store/books";

const booksStore = useBooksStore()

interface BookCard {
  book: Book,
}

const props = defineProps<BookCard>()

const finalPrice = +props.book.price ? props.book.price + ' CZK' : (props.book.price === 0 ? "FREE" : props.book.price)


const btnText = computed(() => {
  if (!props.book.favourites) {
    return 'Add to favourites'
  } else {
    return 'Remove from favourites'
  }
})


</script>

<template>

  <div class="book-card h-full flex-center text-center transition-all pb-6 rounded-lg hover:shadow-xl"
       :class="book.favourites && 'bg-blue-200'">
    <a :href="book.infoLink" class="flex-center p-6 h-full">
      <div class="mb-3 flex-center h-44 ">
        <img class=" h-full border border-solid border-black" loading="lazy"
             :src="book.imgUrl || 'assets/img/no-cover.gif'" alt="">
      </div>
      <h4 class="mb-2 text-lg font-medium overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]">
        {{ book.title }}</h4>
      <p class="mb-2 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [overflow-wrap:anywhere]">
        {{ book.shortDescr }}</p>
      <div class=" font-bold">{{ finalPrice }}</div>
    </a>
    <div class="mt-auto flex space-x-2 xl:space-x-4 px-4">
      <UIBtn :type="BtnType.BTN" @click="booksStore.toggleFavourite(book.id)">{{ btnText }}</UIBtn>
      <UIBtn :type="BtnType.LINK" :href="book.infoLink">More</UIBtn>
    </div>


  </div>
</template>
