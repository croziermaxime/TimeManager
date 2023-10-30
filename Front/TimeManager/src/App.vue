<script lang="ts">
import { defineComponent, reactive } from 'vue'
import UserComponent from './components/User.vue'
import Login from './components/Login.vue'
import UsersServices from './services/userService';
import type UserServices from './services/userService';
import type { User } from './types/user'

const userTest: User = { data: { email: "a@a.a", username: "a" } }

type AppData = {
  user: { id: string, username: string, email: string },
  is: { LoggedIn: boolean },
  userServices: UserServices,
  userTest: User
}

export const store = reactive({
  userId : 0,
});

export default defineComponent({
  name: 'App',

  components: {
    UserComponent,
    Login
  },
  data () : AppData {
    return {
      user: { id: "", username: "", email: "" },
      is: { LoggedIn: false },
      userServices: new UsersServices(),
      userTest
    }
  },
})
</script>

<style>
.v-app-bar-title__content{
  width: 200px !important;
}
</style>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <img class="mx-2" src="./assets/handIcon.png" width="40" height="40" /> 
      <div>
        <nav class="text-rigth">
          <v-btn @click="userServices.createUser(userTest)">CREATEUSER</v-btn>
          <v-btn @click="$router.push('/')">HOME</v-btn>
          <v-divider inset vertical></v-divider>
          <v-btn @click="$router.push('/clocks')">BADGEAGES</v-btn>
          <v-divider inset vertical></v-divider>
          <v-btn @click="$router.push('/workingtime')">WorkingTime</v-btn>
          <v-btn @click="userServices.createUser(userTest)">CREATEUSER</v-btn>
        </nav>
      </div>
      <v-spacer></v-spacer>
      <User v-if="is.LoggedIn" :user="user"/>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <Login :user="user" :is="is" v-if="!is.LoggedIn">
        <v-btn @click="userServices.createUser(userTest)">CREATEUSER</v-btn>
      </Login>
      <div v-else>
        <RouterView />
        <div>Id: {{ user.id }}</div>
        <div>Email: {{ user.email }}</div>
        <div>Username: {{ user.username }}</div>
    </div>
    </v-main>
  </v-layout>
</template>
