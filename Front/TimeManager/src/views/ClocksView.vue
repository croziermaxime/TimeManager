<template>
    <ClocksCard :userId="1"/>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ClocksCard from '@/components/ClocksCard.vue';
  export default defineComponent({
    name: 'ClocksView',
    components: { ClocksCard }
});
  </script>
  