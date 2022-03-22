<template>

  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <the-register-form @on-submit="registerSubmit"></the-register-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import TheRegisterForm from '@/components/UI/TheRegisterForm.vue'

export default {
  components: {
    TheRegisterForm
  },
  data() {
    return {

    }
  },
  methods: {
    async registerSubmit(formData) {
      console.log('submitRegistration')
      this.$axios.$post('/api/admin/register', formData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'You\'ve successfully registered!', status: 'success'}))
        .then(() => console.log('Successfully registered-in'));
    }
  },
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  }
}
</script>
