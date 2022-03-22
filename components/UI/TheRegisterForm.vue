<template>
  <v-card class="pa-6">
    <div class="text-center text-h6">Please Sign-Up</div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field v-model="formData.first_name" :rules="firstNameRules" label="First Name" required ></v-text-field>
      <v-text-field v-model="formData.last_name" :rules="lastNameRules" label="Last Name" required ></v-text-field>
      <v-text-field v-model="formData.email" :rules="emailRules" label="E-mail" required ></v-text-field>
      <v-text-field
        :append-icon="show_icon_1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_icon_1 ? 'text' : 'password'"
        hint="Enter the password at least 6 characters"
        @click:append="show_icon_1 = !show_icon_1"
        v-model="formData.password"
        :rules="passwordRules"
        label="Password"
        required>
      </v-text-field>
      <v-text-field
        :append-icon="show_icon_2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_icon_2 ? 'text' : 'password'"
        hint="Confirm your password"
        @click:append="show_icon_2 = !show_icon_2"
        v-model="formData.password_confirmation"
        :rules="passwordConfirmRules"
        label="Password Confirmation"
        required>
      </v-text-field>
      <v-container class="mt-4">
        <v-row justify="space-between">
          <app-button type="submit">Register</app-button>
          <app-button type="button" @click="onCancel" outlined>Cancel</app-button>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      show_icon_1: false,
      show_icon_2: false,
      valid: true,
      formData: {
        first_name: 'A',
        last_name: 'A',
        email: 'e@e.net',
        password: 'eeeeee',
        password_confirmation: 'eeeeee',
        customer_id: "1"
      },
      firstNameRules: [
        v => !!v || 'Your first name is required!',
      ],
      lastNameRules: [
        v => !!v || 'Your last name is required!',
      ],
      emailRules: [
        v => !!v || 'Your email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail field must be valid',
      ],
      passwordRules: [
        v => !!v || 'Your password is required',
        v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
      ],
      passwordConfirmRules: [
        v => (!!v && v) === this.formData.password || 'Password values don\'t match'
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate()
      this.$emit('on-submit', this.formData)
    },
    onCancel() {
      this.$router.push('/')
    }
  }
}
</script>
