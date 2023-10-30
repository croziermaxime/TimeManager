<template>
    <div>
      <WorkingTimeVue :userId="1" />
    </div>
  </template>
  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import WorkingTimeVue from '@/components/WorkingTime.vue';
  
  export default defineComponent({
    name: 'WorkingTimeView',
    components: {
      WorkingTimeVue,
    },
  });
  </script>
  