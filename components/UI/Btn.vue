<script lang="ts" setup>
import {BtnType} from '@/store/books';

const emit = defineEmits(['click'])

interface BtnProps {
  type: BtnType,
  href?: string,
  class?: string

}

const props = defineProps<BtnProps>()
</script>

<template>
  <a v-if="type === BtnType.LINK" :href="href" class="btn" @click="emit('click')">
    <slot/>
  </a>
  <button v-else-if="type === BtnType.BTN" class="btn" @click="emit('click')">
    <slot/>
  </button>
  <NuxtLink v-else-if="type === BtnType.NUXT_LINK" :to="href" class="btn" @click="emit('click')" :class="class">
    <slot/>
  </NuxtLink>

</template>

<style scoped>
.btn {
  @apply transition-all duration-300 py-2 px-4 bg-sky-400 rounded-lg hover:bg-white border border-sky-400 border-solid font-medium flex items-center  text-center justify-center w-fit;

}
</style>