<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import axios from 'axios'
import type { User } from '../types/user'
import UsersServices from '../services/userService';

type MonObject = {
  username?: string,
  email?: string,
  form?: boolean,
  loading?: boolean,
  newUser?: User,
  loginAttempt?: boolean
}

const userServices = new UsersServices();

export default defineComponent({
  name: 'Login',
  props: ['user', "is"],
  components: {
  },
  data () : MonObject {

    return {
      username: undefined,
      email: undefined,
      form: false,
      loading: false,
      newUser: {data: null},
      loginAttempt: false
    }
  },
  methods: {
      async onSubmit () {
        if (!this.form) return
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
        // this.newUser = await this.getUser();
        this.newUser = await userServices.getUser(this.username, this.email);
        if (this.newUser.data == null) {
          this.is.LoggedIn = false
          this.loginAttempt = true;
        } else {

          this.user.id = this.newUser.data?.id
          this.user.email = this.newUser.data?.email
          this.user.username = this.newUser.data?.username
          this.is.LoggedIn = true
          sessionStorage.setItem("userId", this.user.id);
        }
      },
      required (v: string) {
        return !!v || 'Field is required'
      }
    },
})
</script>

<template>
    <v-card class="mx-auto px-6 py-8" max-width="400">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable label="Email"></v-text-field>
        <v-text-field v-model="username" :readonly="loading" :rules="[required]" clearable label="Username" placeholder="Enter your username"></v-text-field>
        <br>
        <v-btn v-if="!loginAttempt" :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">Sign In</v-btn>
        <v-btn v-else :disabled="!form" :loading="loading" block color="error" size="large" type="submit" variant="elevated">Sign In</v-btn>

      </v-form>
    </v-card>
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
