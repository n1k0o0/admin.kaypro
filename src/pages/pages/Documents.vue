<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Документы
        </h3>
      </div>
    </div>
    <div class="card-body">
      <div class="row ">
        <template
          v-for="(context,index) in documents.content.context"
          :key="index"
        >
          <div class="col-12">
            <BaseInput
              v-model="context.title"
              clearable
              :label="'Название раздела'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Описание</label>
              <editor
                v-model="context.description"
                maxlength="4096"
                rows="4"
                placeholder="Не больше 4096 символов"
                :api-key="$tinyKey"
                :init="{
                  language: 'ru',
                  height: 250,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code documents wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | documents'
                }"
              />
            </div>
          </div>
          <div class="col-12">
            <BaseInput
              v-model="context.meta_title"
              clearable
              :label="'SEO Title'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="context.meta_description"
              clearable
              :label="'SEO Description'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="context.meta_keywords"
              clearable
              :label="'SEO keywords'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="context.meta_image"
              clearable
              :label="'SEO image'"
            />
          </div>
          <div class="col-12 mb-4">
            <el-button
              :icon="Delete"
              type="warning"
              @click="deleteContext(index)"
            >
              Удалить раздел
            </el-button>
          </div>
          <el-divider />
        </template>
        <div class="col-12 mb-8">
          <el-button
            :icon="Plus"
            type="primary"
            @click="addContext"
          >
            Добавить раздел
          </el-button>
        </div>

        <div class="col-12">
          <BaseInput
            v-model="documents.meta_h1"
            clearable
            :label="'SEO H1'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="documents.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="documents.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="documents.meta_keywords"
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
          @click="updateDocument"
        >
          Обновить
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue'
import Editor from '@tinymce/tinymce-vue'
import { Plus, Delete } from '@element-plus/icons'

import { ref, watch } from 'vue'

const store = useStore()
import { useStore } from 'vuex'
import pagesService from '@/services/pagesService'
import { ElNotification } from 'element-plus'

const props = defineProps({
  document: {
    type: Object,
    required: true
  },
})
let loading = ref(false)
let activeName = ref('documents')
let documents = ref({
  name: '',
  logo: '',
  text_image_1: '',
  text_image_2: '',
  content: {
    context:[
      {
        title: '',
        description: '',
      }
    ]
  },
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.document, () => {
  documents.value = props.document
})

const handleLogoChanged = (file) => {
  documents.value.logo_upload = file.raw
}
const handleLogoRemoved = () => {
  documents.value.logo_upload = ''
  documents.value.logo = ''
}
const addContext = () => {
  documents.value.content.context.push({
    title: '',
    description: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    meta_url: '',
    meta_image: '',
  })
}
const deleteContext = (index) => {
  documents.value.content.context.splice(index, 1)
}

const updateDocument = async () => {
  let check = documents.value.content.context.filter((el) => {
    return (el.title === '' || el.description === '')
  })
  if (check.length) {
    ElNotification.error(  'Название и описание обязательны для заполнения' )
    return
  }
  await pagesService.update(documents.value.name, documents.value)
}
</script>

<style scoped>

</style>
