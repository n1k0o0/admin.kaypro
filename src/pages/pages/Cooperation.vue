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
        <div class="col-12">
          <BaseInput
            v-model="collaborations.content.title"
            clearable
            :label="'Заголовок'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Описание</label>
            <editor
              v-model="collaborations.content.description"
              maxlength="4096"
              rows="4"
              placeholder="Не больше 4096 символов"
              api-key="no-api-key"
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
        <el-divider />

        <div class="col-12">
          <BaseInput
            v-model="collaborations.meta_h1"
            clearable
            :label="'SEO H1'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="collaborations.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="collaborations.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="collaborations.meta_keywords"
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

import { ref, watch } from 'vue'

const store = useStore()
import { useStore } from 'vuex'
import pagesService from '@/services/pagesService'
import { ElNotification } from 'element-plus'

const props = defineProps({
  cooperation: {
    type: Array,
    required: true
  },
})
let loading = ref(false)

let collaborations = ref({
  logo: '',
  text_image_1: '',
  text_image_2: '',
  content: [{
    title: '',
    description: '',
  }],
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.cooperation, () => {
  collaborations.value = props.cooperation
})

const handleLogoChanged = (file) => {
  collaborations.value.logo_upload = file.raw
}
const handleLogoRemoved = () => {
  collaborations.value.logo_upload = ''
  collaborations.value.logo = ''
}
const addContext = () => {
  collaborations.value.content.push({
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
  collaborations.value.content.splice(index, 1)
}

const updateDocument = async () => {

  if (collaborations.value.content.title==='' || collaborations.value.content.description ==='') {
    ElNotification({ type: 'error', title: 'Ошибка', message: 'Заголовок и описание обязательны для заполнения' })
    return
  }
  await pagesService.update(collaborations.value.name, collaborations.value)
}
</script>

<style scoped>

</style>
