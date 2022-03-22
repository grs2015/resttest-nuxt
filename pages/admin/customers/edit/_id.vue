<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          :exact="item.exact"
          :disabled="item.disabled"
          nuxt>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <!-- <div class="text-h6">Customer Edit</div> -->

    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-text-field
        label="Customer name"
        v-model="editedItem.customer_title"
        counter="50"
        :rules="titleRules"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-select
          :items="getBranchList"
          v-model="editedItem.customer_branch.branch"
          label="Customer branch"
          dense>
        </v-select>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-select
          :items="getRegionList"
          v-model="editedItem.customer_region.region"
          label="Customer region"
          dense>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          label="Customer Email"
          v-model="editedItem.customer_detail.email"
          :rules="emailRules"
          counter="50"
          prepend-icon="mdi-email">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          label="Customer Phone"
          v-model="editedItem.customer_detail.phone"
          :rules="phoneRules"
          counter="30"
          prepend-icon="mdi-phone">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          label="Customer Website"
          prepend-icon="mdi-web"
          v-model="editedItem.customer_detail.website"
          counter="50"
          hint="Put the website without www prefix"
          :rules="webRules">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          label="Customer Description"
          v-model="editedItem.customer_detail.description"
          no-resize
          prepend-icon="mdi-card-text-outline">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
          <v-file-input @change="onImageSelected"
            v-model="selectedImages"
            :loading="uploadAction"
            show-size
            :counter="addAction"
            persistent-placeholder
            multiple
            accept="image/*"
            label="Customer company Image"
            prepend-icon="mdi-camera"
            :rules="imageRules"
            hint="Size of each file can't exceed 2MB"
            persistent-hint
            >
              <template v-slot:selection="{ text, index }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small>
                  {{ text }}
                </v-chip>
                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2">
                    + {{ selectedImages.length - 2 }} File(s)
                </span>
              </template>
          </v-file-input>
      </v-col>

    </v-row>
    <v-row v-if="imageCustomerArray">
      <v-col v-for="image in imageCustomer" :key="image" cols="4">
        <v-img
          class="text-right pa-2"
          :src="getBackEndURL(image)">
          <v-btn
            fab
            @click="deleteURL(image)"
            dark
            color="indigo">
            <v-icon dark>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-img>
      </v-col>
    </v-row>
    <v-row justify="center">

      <v-btn class="mr-2" color="primary" @click="onSubmit">Save</v-btn>
      <v-btn @click="onCancel">Back</v-btn>
    </v-row>
  </div>

</template>

<script>

import { customerEditBreadcrumbs } from '@/utils/shared/breadcrumbs.js'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { titleRules, emailRules, phoneRules, webRules, imageRules } from '@/utils/shared/validationRules'

export default {
  layout: 'admin',
  middleware: ['auth'],
  data() {
    return {
      items: customerEditBreadcrumbs,
      selectedImages: [],
      uploadAction: false,
      addAction: false,
      imageCustomer: [],
      backEndURL: process.env.BACKEND_APP_URL,
      deleteImage: '',
      titleRules,
      emailRules,
      phoneRules,
      webRules,
      imageRules
    }
  },

  asyncData(context) {
    return context.app.$axios.$get('/api/admin/customers/' + (context.params.id))
      .then(res => {
        console.log(res.data)
        return {
          editedItem: {
            customer_title: res.data.title,
            customer_branch: res.data.customer_branch,
            customer_region: res.data.customer_region,
            customer_detail: res.data.customer_detail,
            customer_id: res.data.identifier,
            customer_slug: res.data.slug }
        }
      })
      .catch(e => context.error(e))
  },
  computed: {
    imageCustomerArray() {
      return this.imageCustomer.length
    },
    ...mapGetters('customers', ['getRegionList', 'getBranchList', 'getCurrentCustomer'])
  },
  created() {
    //NOTE - Так не работает, так как объект содержит вложенные объекты и нужно глубокое клонирование, через Lodash с рекурсией
    // this.editedItem = {...this.getCurrentCustomer}
    // this.editedItem = _.cloneDeep(this.getCurrentCustomer)

    if (this.editedItem.customer_detail.image) {
      this.imageCustomer = (this.editedItem.customer_detail.image).split(',')
    }


  },
  methods: {
    getBackEndURL(image) {
      return this.backEndURL + image
    },
    deleteURL(image) {
      const fb = new FormData()
      fb.append('deletedImage', image)
      fb.append('_method', 'PUT')
      this.$axios.$post(`/api/admin/customers/${this.editedItem.customer_id}`, fb)
        .then((res) => {
          this.imageCustomer = res.data

        })
        .catch(e => console.log(e.response.data.error))
    },
    onImageSelected(event) {
      this.addAction = true
    },
    onCancel() {
      return this.$router.push('/admin/customers')
    },
    onSubmit(image = '') {

      let branchIndex = this.getBranchList.indexOf(this.editedItem.customer_branch.branch) + 1
      let regionIndex = this.getRegionList.indexOf(this.editedItem.customer_region.region) + 1
      this.uploadAction = true


      const fb = new FormData();

      if (this.selectedImages.length > 0) {
        this.selectedImages.forEach(imageFile => {
          fb.append('images[]', imageFile)
        });
      }

      fb.append('title', this.editedItem.customer_title)
      fb.append('email', this.editedItem.customer_detail.email)
      fb.append('website', this.editedItem.customer_detail.website)
      fb.append('phone', this.editedItem.customer_detail.phone)
      fb.append('description', this.editedItem.customer_detail.description )
      fb.append('region_id', regionIndex)
      fb.append('branch_id', branchIndex)
      fb.append('_method', 'PUT')


      this.$axios.$post(`/api/admin/customers/${this.editedItem.customer_id}`, fb)
        .then((res) => {
          this.$store.dispatch('showSnackBar', { message: 'Customer data successfully saved!', status: 'success' })
          this.selectedImages.length = 0
          this.uploadAction = false
          this.addAction = false
          if (res.data.customer_detail.image) {
          this.imageCustomer =(res.data.customer_detail.image).split(',')
          }


          // this.$refs.fileInput.value = null
          })
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error' })
          this.uploadAction = false
          this.addAction = false

          }
        )
    }
  }
}
</script>
