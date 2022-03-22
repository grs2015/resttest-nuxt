<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          :link="item.link"
          :disabled="item.disabled"
          nuxt>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
import { dashboardBreadcrumbs } from '@/utils/shared/breadcrumbs.js'
export default {
  layout: 'admin',
  data() {
    return {
      items: dashboardBreadcrumbs
    }
  }
}
</script>
