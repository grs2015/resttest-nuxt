<template>
  <div>
    <div>
      <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" :exact="item.exact">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    </div>
    <customer-table :customers="loadedCustomers"></customer-table>
  </div>
</template>

<script>
import CustomerTable from '@/components/tables/CustomerTable.vue'
import { customersBreadcrumbs } from '@/utils/shared/breadcrumbs.js'

export default {
  layout: 'admin',
  middleware: ['auth'],
  components: {
    CustomerTable
  },
  data() {
    return {
      items: customersBreadcrumbs
    }
  },
  asyncData( context ) {

    return context.app.$axios.$get('/api/admin/customers')
      .then(response => {
        let { data, ...metaData } = response
        context.store.dispatch('customers/setMetaLinksCustomer', metaData)
        return response
      })
      .then(response => {
        return {
          renderedOn: process.client ? 'client' : 'server',
          loadedCustomers: { ...response.data }
        }
      })
      .catch(e => context.error(e.message))
  }

}
</script>
