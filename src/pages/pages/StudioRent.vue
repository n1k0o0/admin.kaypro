<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Аренда Студии
        </h3>
      </div>
    </div>
    <div class="card-body">
      <div class="row ">
        <div class="col-12">
          <BaseInput
            v-model="studios.content.title"
            clearable
            :label="'Название раздела'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Описание</label>
            <editor
              v-model="studios.content.description"
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
                  'insertdatetime media table paste code studio wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | studio'
              }"
            />
          </div>
        </div>
        <el-divider />

        <div class="col-12">
          <BaseInput
            v-model="studios.meta_h1"
            clearable
            :label="'SEO H1'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="studios.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="studios.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="studios.meta_keywords"
            clearable
            :label="'SEO keywords'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Изображения</label>
            <single-image-uploader
              :hide-upload-icon="!!studios.banner"
              :image="studios.banner"
              :on-change="handleBannerChanged"
              :on-remove="handleBannerRemoved"
              tip="рек. размер 1440х406"
            />
          </div>
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
          @click="updateHelp"
        >
          Обновить
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue'
import SingleImageUploader from '@/components/base/SingleImageUploader.vue'
import Editor from '@tinymce/tinymce-vue'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import pagesService from '@/services/pagesService'

const store = useStore()
const props = defineProps({
  studio: {
    type: Object,
    required: true
  },
})
let loading = ref(false)
let activeName = ref('studio')
let studios = ref({
  name:'',
  banner: '',
  content: {
    title: '',
    description: '',
  },
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.studio, () => {
  studios.value = props.studio
})

const handleBannerChanged = (file) => {
  studios.value.banner_upload = file.raw
  studios.value.banner = file
}
const handleBannerRemoved = async () => {
  studios.value.banner_upload = ''
  studios.value.banner = ''
}
const updateHelp = async () => {
  await pagesService.update(studios.value.name, studios.value)
}
</script>

