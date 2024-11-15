<template>
  <main
    :class="cn('flex justify-center flex-col items-center h-full', props.class)"
  >
    <slot />
  </main>
</template>

<script setup lang="ts">
import { HtmlHTMLAttributes } from 'vue';
import { cn } from '../../../lib/utils';

const props = defineProps<{
  class?: HtmlHTMLAttributes['class'];
}>();
</script>
