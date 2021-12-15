<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Контакты
        </h3>
      </div>
    </div>
    <div class="card-body">
      <div class="row ">
        <div class="col-12">
          <BaseInput
            v-model="contacts.content.phone"
            clearable
            :label="'Телефон'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.content.email"
            clearable
            :label="'Почта'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.content.address"
            clearable
            :label="'Адрес'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.content.schedule"
            clearable
            :label="'График работы'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.meta_h1"
            clearable
            :label="'SEO H1'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="contacts.meta_keywords"
            clearable
            :label="'SEO keywords'"
          />
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <el-button-group>
        <el-button @click="$router.push({name: 'news'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="updateContact"
        >
          Обновить
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue'

import { ref, watch } from 'vue'

const store = useStore()
import { useStore } from 'vuex'
import pagesService from '@/services/pagesService'

const props = defineProps({
  contact: {
    type: Array,
    required: true
  },
})
let loading = ref(false)
let activeName = ref('contacts')
let contacts = ref({
  content: {
    phone: '',
    email: '',
    address: '',
    schedule: '',
  },
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.contact, () => {
  Object.assign(contacts.value, props.contact)
})

const handleLogoChanged = (file) => {
  contacts.value.logo_upload = file.raw
}
const handleLogoRemoved = async () => {
  contacts.value.logo_upload = ''
  contacts.value.logo = ''
}
const updateContact = async () => {
  await pagesService.update(contacts.value.name, contacts.value)
}
</script>

<style scoped>

</style>
