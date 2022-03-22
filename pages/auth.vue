<template>

  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <the-login-form @on-submit="loginSubmit"></the-login-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import TheLoginForm from '@/components/UI/TheLoginForm.vue'

export default {
  middleware: ['alreadyLoggedIn'],
  components: {
    TheLoginForm,
  },
  methods: {
    async loginSubmit(formData) {
      console.log('submit')
      this.$auth.loginWith('laravelSanctum', { data: formData})
        .then(() => this.$store.dispatch('showSnackBar', { message: 'You\'re successfully logged in!', status: 'success'}))
        .catch(() => {
          this.$store.dispatch('showSnackBar', { message: 'Sorry, invalid credentials', status: 'error'})
          }
          )
    }
  }
}
</script>
