<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          О компании
        </h3>
      </div>
    </div>
    <div class="card-body">
      <div class="row ">
        <div class="col-12">
          <div class="form-group">
            <label>Баннер</label>
            <single-image-uploader
              :hide-upload-icon="!!abouts.banner"
              :image="abouts.banner"
              :on-change="handleBannerChanged"
              :on-remove="handleBannerRemoved"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Описание</label>
            <editor
              v-model="abouts.content.description"
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
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
              }"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label>Изображение 1</label>
            <single-image-uploader
              :hide-upload-icon="!!abouts.content_image1"
              :image="abouts.content_image1"
              :on-change="handleContentImage1Changed"
              :on-remove="handleContentImage1Removed"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label>Изображение 2</label>
            <single-image-uploader
              :hide-upload-icon="!!abouts.content_image2"
              :image="abouts.content_image2"
              :on-change="handleContentImage2Changed"
              :on-remove="handleContentImage2Removed"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Описание 2</label>
            <editor
              v-model="abouts.content.text"
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
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
              }"
            />
          </div>
        </div>
        <div class="col-12">
          <BaseInput
            v-model="abouts.meta_h1"
            clearable
            :label="'SEO H1'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="abouts.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="abouts.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="abouts.meta_keywords"
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
          @click="updateContact()"
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
import pagesService from '@/services/pagesService'

import { ref, watch } from 'vue'

const store = useStore()
import { useStore } from 'vuex'

const props = defineProps({
  about: {
    type: Object,
    required: true
  },
})

let loading = ref(false)
let activeName = ref('about')

let abouts = ref({
  name: '',
  banner: '',
  content_image1: '',
  content_image2: '',
  content: {
    text: '',
    description: '',
  },
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.about, () => {
  // abouts.value = props.about
  Object.assign(abouts.value, props.about)
})

const handleBannerChanged = (file) => {
  abouts.value.banner_upload = file.raw
}
const handleBannerRemoved = async () => {
  abouts.value.banner_upload = ''
  abouts.value.banner = ''
}

const handleContentImage1Changed = (file) => {
  abouts.value.contentImage1 = file.raw
}
const handleContentImage1Removed = async () => {
  abouts.value.contentImage1 = ''
  abouts.value.content_image1 = ''
}
const handleContentImage2Changed = (file) => {
  abouts.value.contentImage2 = file.raw
}
const handleContentImage2Removed = async () => {
  abouts.value.contentImage2 = ''
  abouts.value.content_image2 = ''
}
const updateContact = async () => {
  await pagesService.update(abouts.value.name, abouts.value)
}
</script>
