<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import type { User } from '../types/user'
import UsersServices from '../services/userService';

const userTest: User = { data: { email: "a@a.a", username: "a" } }

export default defineComponent({
  name: 'User',
  props: ['user'],
  data () {
    return {
      userServices: new UsersServices(),
      userTest
    }
  },
})

</script>

<template>
  <div>
    <v-chip class="mx-2">{{ user.username }}</v-chip>
    <v-chip class="mx-2">{{ user.email }}</v-chip>
    <v-btn class="ma-2" icon="mdi-information" @click="$router.push('/user')"></v-btn>
    <v-btn class="ma-2" icon="mdi-delete" @click="userServices.deleteUser(user.id)"></v-btn>
    <v-btn class="ma-2" icon="mdi-update" @click="userServices.updateUser(user.id, userTest)"></v-btn>
    <v-btn class="ma-2" icon="mdi-plus" @click="userServices.createUser(userTest)"></v-btn>
  </div>
</template>

<style scoped>
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
