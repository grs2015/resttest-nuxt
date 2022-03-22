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
    <user-table :users="loadedUsers"></user-table>
  </div>
</template>

<script>
import { usersBreadcrumbs } from '@/utils/shared/breadcrumbs.js'
import UserTable from '@/components/tables/UserTable.vue'

export default {
  layout: 'admin',
  middleware: ['auth'],
  components: {
    UserTable
  },
  data() {
    return {
      items: usersBreadcrumbs
    }
  },
  asyncData(context) {
    return context.app.$axios.$get('/api/admin/users')
      .then(response => {
        let { data, ...metaData } = response
        context.store.dispatch('users/setMetaLinksUser', metaData)
        return response
      })
      .then(response => {
        console.log(response.data)
        return {
          loadedUsers: { ...response.data }
        }
      })

      .catch(e => context.error({
        message: e.message,
        statusCode: e.response.status
      }))
  }

}
</script>
