<script  setup="">
useHead({
  title: '404',
})
import {BtnType} from "../store/books";
</script>

<template>

  <section class="flex-center py-10">
    <h2 class="text-2xl mb-5">Page not found</h2>
    <UIBtn :type="BtnType.NUXT_LINK" href="/">Go Home</UIBtn>
  </section>
</template>