<template>
  <div>
    <v-data-table
      :headers="customersHeader"
      :items="customersFiltered"
      :options.sync="options"
      :loading="loading"
      :server-items-length="getMetaData.total"
      :search="search"
      sort-by="customer_id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Customers CRUD</v-toolbar-title>
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
                Add customer
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
                          v-model="editedItem.customer_title"
                          label="Customer name"
                          clearable
                          counter="50"
                          :rules="titleRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-select
                          :items="getRegionList"
                          label="Customer region"
                          v-model="editedItem.customer_region"
                          item-text="customer_region"
                          dense
                          :rules="selectRules">
                        </v-select>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-select
                          :items="getBranchList"
                          v-model="editedItem.customer_branch"
                          label="Customer branch"
                          dense
                          :rules="selectRules">
                        </v-select>
                      </v-col>
                    </v-row>

                    <v-row v-if="editedIndex !== -1">
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedItem.customer_detail.description"
                          label="Customer description"
                          auto-grow
                          rows="3"
                          clearable
                          >
                        </v-textarea>

                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.customer_detail.phone"
                          label="Customer phone"
                          :rules="phoneRules"
                          counter="30"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.customer_detail.email"
                          label="Customer email"
                          :rules="emailRules"
                          counter="50"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.customer_detail.website"
                          label="Customer website"
                          counter="50"
                          hint="Put the website without www prefix"
                          :rules="webRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="green"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <!-- <v-data-table
    dense
    :headers="customersHeader"
    :items="customersFiltered"
    item-key="customer_id"
    class="elevation-1"
    ></v-data-table> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectRules, titleRules, emailRules, phoneRules, webRules } from '@/utils/shared/validationRules.js'

export default {
  props: {
    customers: {
      type: Object,
      required: true
    }
  },
  emits: ["set-filters"],
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      customersFiltered: [],
      customersHeader: [
        // {
        //   text: "ID",
        //   value: "customer_id",
        // },
        {
          text: "Customer name",
          value: "customer_title",
        },
        {
          text: "Customer region",
          value: "customer_region",
        },
        {
          text: "Customer branch",
          value: "customer_branch",
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      editedIndex: -1,
      editedItem: {
        customer_title: '',
        customer_branch: '',
        customer_region: '',
        customer_detail: {}
      },
      defaultItem: {
        customer_title: '',
        customer_branch: '',
        customer_region: '',
        customer_detail: {}
      },
      selectRules,
      titleRules,
      emailRules,
      phoneRules,
      webRules,
      validForm: true,

      loading: false,
      options: {}
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
    },...mapGetters('customers', ['getRegionList', 'getBranchList', 'getMetaData', 'getLinksData'])
  },
  watch: {
    dialog(val) {
      console.log(val)
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
    this.initialize(this.customers)
  },
  // mounted() {
  //   this.$refs.form.resetValidation()
  // },
  methods: {
    searchString() {
      if (this.search) {
        this.loading = true
        this.$store.dispatch('customers/getSearchData', this.search)
          .then(data => {
            const searchData = { ...data.data }
            this.customersFiltered = []
            this.initialize(searchData)
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
      this.$store.dispatch('customers/getPaginatedData', this.options )
        .then(data => {
          const paginatedList = { ...data.data }
          this.customersFiltered = []
          this.initialize(paginatedList)
          this.loading = false
        })
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
        })
    },
    initialize(customerList) {
      for (let k of Object.keys(customerList)) {
        this.customersFiltered[k] = {
          // row_number: +k + 1 + (this.options.itemsPerPage * (this.options.page - 1)),
          customer_id: customerList[k].identifier,
          customer_title: customerList[k].title,
          customer_region: customerList[k].customer_region,
          customer_branch: customerList[k].customer_branch,
          customer_detail: customerList[k].customer_detail,
          customer_slug: customerList[k].slug
        };
      }
    },
    editItem(item) {
      this.editedIndex = item.customer_id
      // this.editedIndex = this.customersFiltered.indexOf(item) + 1
      console.log(item, this.editedIndex)
      this.$store.dispatch('customers/setCurrentCustomer', item)
      this.editedItem = {...item}
      this.$router.push({ path: `/admin/customers/edit/${this.editedIndex}` })
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
      // console.log(this.editedIndex, item, this.editedItem)
    },
    deleteItem(item) {
      this.editedIndex = this.customersFiltered.indexOf(item)
      this.editedItem = {...item}
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.$store.dispatch('customers/deleteCustomer', this.editedIndex + 1)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The customer has been deleted!', status: 'success'}))
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
        })
      this.closeDelete()
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
      let branchIndex = this.getBranchList.indexOf(this.editedItem.customer_branch) + 1
      let regionIndex = this.getRegionList.indexOf(this.editedItem.customer_region) + 1
      const customerData = {
        commonData: {
          title: this.editedItem.customer_title,
          phone: this.editedItem.customer_detail.phone,
          email: this.editedItem.customer_detail.email,
          website: this.editedItem.customer_detail.website,
        },
        routeData: {
          branchIndex,
          regionIndex
        }
      }
      this.$store.dispatch('customers/storeCustomer', customerData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The customer has been created!', status: 'success'}))
        .catch(e => console.log(e))
    }
  }
};
</script>
