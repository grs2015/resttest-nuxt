<template>
  <div>
    <v-data-table
      :headers="usersHeader"
      :items="usersFiltered"
      :options.sync="options"
      :loading="loading"
      :server-items-length="getMetaData.total"
      :search="search"
      sort-by="user_id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by any column"
            single-line
            hide-details
            clearable
            @change="searchString"
            @click:clear="restoreData"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add user
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form
                    ref="form"
                    v-model="validForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.user_first_name"
                          label="User First Name"
                          clearable
                          counter="50"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.user_last_name"
                          label="User Last Name"
                          clearable
                          counter="50"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.user_email"
                          label="Customer email"
                          :rules="emailRules"
                          counter="30"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-checkbox
                          hide-details
                          v-model="editedItem.user_purchase"
                          label="Check if a user has purchasing role">
                        </v-checkbox>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-select
                          :items="getCustomerList"
                          label="User company"
                          v-model="editedItem.user_company"
                          item-text="title"
                          dense
                          :rules="selectObjectRules"
                         >
                        </v-select>
                      </v-col>
                    </v-row>

                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn :disabled="!validForm" color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.user_verified="{ item }">
        <v-simple-checkbox
          v-model="item.user_verified"
          disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.user_purchase="{ item }">
        <v-simple-checkbox
          v-model="item.user_purchase"
          disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="green"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectObjectRules, nameRules, emailRules } from '@/utils/shared/validationRules.js'

export default {
  props: {
    users: {
      type: Object,
      required: true
    }
  },
  fetch() {
    return this.$axios.$get('/api/admin/customers')
      .then(response => {
        let { data } = response
        this.$store.dispatch('customers/setCustomerList', data)
      })
  },
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      usersFiltered: [],
      usersHeader: [
        {
          text: "User First Name",
          value: "user_first_name",
        },
        {
          text: "User Last Name",
          value: "user_last_name",
        },
        {
          text: "User Email",
          value: "user_email",
          sortable: false
        },
        {
          text: "Verified User",
          value: "user_verified",
          sortable: false
        },
        {
          text: "Purchasing",
          value: "user_purchase",
          sortable: false
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      editedIndex: -1,
      // NOTE - editedItem/defaultItem испоьлзуются в полях ввода нового пользователя
      editedItem: {
        user_first_name: '',
        user_last_name: '',
        user_email: '',
        user_company: '',
        user_purchase: false
      },
      defaultItem: {
        user_first_name: '',
        user_last_name: '',
        user_email: '',
        user_company: '',
        user_purchase: false
      },
      selectObjectRules,
      nameRules,
      emailRules,
      validForm: true,

      loading: false,
      options: {},
    }
  },
  computed: {
    formTitle() {
      return 'New User'
    },
    ...mapGetters('users', ['getMetaData', 'getLinksData']),
    ...mapGetters('customers', ['getCustomerList'])
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    options: {
      handler() { this.getBackendData() },
      deep: true
    }
  },
  created() {
    this.initialize(this.users)
  },
  methods: {
    searchString() {
      if (this.search) {
        this.loading = true
        this.$store.dispatch('users/getSearchData', this.search)
          .then(data => {
            this.usersFiltered = []
            this.initialize({...data.data})
            this.loading = false
          })
          .catch(e => {
            this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
          })
      }
    },
    restoreData() {
      this.getBackendData()
    },
    getBackendData() {
      this.loading = true
      this.$store.dispatch('users/getPaginatedData', this.options )
        .then(response => {
          const { data, ...metaData } = response
          this.$store.dispatch('users/setMetaLinksUser', metaData)
          this.usersFiltered = []
          this.initialize({...data})
          this.loading = false
        })
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
        })
    },
    initialize(userList) {
      for (let k of Object.keys(userList)) {
        this.usersFiltered[k] = {
          user_id: userList[k].id,
          user_full_name: userList[k].fullName,
          user_first_name: userList[k].firstName,
          user_last_name: userList[k].lastName,
          user_email: userList[k].email,
          user_verified: !!Number(userList[k].isVerified),
          user_purchase: !!Number(userList[k].purchaseRole),
          customer_id: userList[k].customerId
        };
      }
    },
    editItem(item) {
      this.editedIndex = item.user_id
      console.log(item, this.editedIndex)
      // this.$store.dispatch('customers/setCurrentUser', item)
      this.editedItem = {...item}
      // this.$router.push({ path: `/admin/users/edit/${this.editedIndex}` })
    },
    deleteItem(item) {
      this.editedIndex = item.user_id
      this.editedItem = {...item}
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.$store.dispatch('users/deleteUser', { ...this.editedItem })
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The customer has been deleted!', status: 'success'}))
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
        })
    this.closeDelete()
    this.getBackendData()
    },
    close() {
      this.dialog = false
      // console.log(this.dialog)
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      let customerIdentifier = (this.getCustomerList.find(customer => customer.title === this.editedItem.user_company)).id
      const userData = {
        commonData: {
          first_name: this.editedItem.user_first_name,
          last_name: this.editedItem.user_last_name,
          email: this.editedItem.user_email,
          purchase_role: this.editedItem.user_purchase,
          password: 'password',
          password_confirmation: 'password'
        },
        routeData: {
          customerIdentifier
        }
      }
      this.$store.dispatch('users/storeUser', userData)
        .then(() => {
          this.$store.dispatch('showSnackBar', { message: 'The user has been stored!', status: 'success'})
          })
        .then(() => {
          this.dialog = false
          this.getBackendData() })
        .catch(e => {
          console.log(e)
          this.$store.dispatch('showSnackBar', { message: `The use can\'t be saved. ${e.response.data.error.email[0]}`, status: 'error'})
          })

    }
  },
}
</script>
