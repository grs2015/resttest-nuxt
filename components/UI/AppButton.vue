<template>
  <v-btn
    elevation="2"
    color="primary"
    class="ma-2"
    v-bind="$attrs"
    v-on="$listeners">
    <slot/>
  </v-btn>
</template>

<script>
export default {

}
</script>
