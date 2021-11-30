<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Создание
            <small>Менеджер</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-3">
            <BaseInput
              v-model="news.title"
              clearable
              :label="'Заголовок'"
            />
          </div>
          <div class="col-3">
            <div class="form-group">
              <label>Тип</label>
              <el-select
                v-model="news.visibility"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in newsService.TRAINING_VISIBILITY"
                  :key="key"
                  :label="item"
                  :value="key"
                />
              </el-select>
            </div>
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <div class="form-group">
              <label>Дата и время публикации</label>
              <el-date-picker
                v-model="news.published_at"
                format="DD-MM-YYYY HH:mm"
                value-format="YYYY-MM-DD HH:mm"
                clearable
                type="datetime"
                :label="'Дата и время проведения'"
              />
            </div>
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <div class="form-group">
              <label>Фото</label>
              <single-image-uploader
                :hide-upload-icon="!!news.logo"
                :image="news.logo"
                :on-change="handleLogoChanged"
                :on-remove="handleLogoRemoved"
              />
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <label>Описание</label>
              <editor
                v-model="news.text"
                maxlength="4096"
                rows="4"
                placeholder="Не больше 4096 символов"
                api-key="no-api-key"
                :init="{
                  language: 'ru',
                  height: 500,
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
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <el-button-group>
          <el-button @click="$router.push({name: 'internal-users'})">
            Отменить
          </el-button>
          <el-button
            type="primary"
            @click="createInternalUser"
          >
            Создать
          </el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor              from '@tinymce/tinymce-vue'
import BaseInput           from '@/components/base/BaseInput.vue'
import newsService         from '@/services/newsService'
import SingleImageUploader from '@/components/base/SingleImageUploader.vue'
import { useStore }        from 'vuex'

import { ref }       from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store  = useStore()

let loading = ref(false)
let news    = ref({
  title       : '',
  visibility  : '',
  text        : '',
  published_at: '',
  logo        : '',
})

const createInternalUser = async () => {
  const {} = await newsService.createNews(news.value)
  await router.push({ name: 'news' })
}

const handleLogoChanged = (file) => {
  news.value.logo = file.raw
}
const handleLogoRemoved = async () => {
  news.value.logo = null
}
</script>


<style scoped>

</style>
