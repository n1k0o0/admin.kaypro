<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Обновление
            <small>Новость</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-12">
            <BaseInput
              v-model="news.title"
              clearable
              :label="'Наименование'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Дата и время проведения</label>
              <el-date-picker
                v-model="news.published_at"
                format="DD-MM-YYYY HH:mm"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm"
                clearable
                :label="'Дата и время проведения'"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Признак видимости</label>
              <el-select
                v-model="news.visibility"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in newsService.TRAINING_VISIBILITY"
                  :key="+key"
                  :label="item"
                  :value="+key"
                />
              </el-select>
            </div>
          </div>

          <div class="col-12">
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
          <el-button @click="$router.push({name: 'news'})">
            Отменить
          </el-button>
          <el-button
            type="primary"
            @click="updateUser"
          >
            Обновить
          </el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput           from '@/components/base/BaseInput.vue'
import SingleImageUploader from '@/components/base/SingleImageUploader.vue'
import newsService         from '@/services/newsService'
import { useStore }        from 'vuex'

import { onMounted, ref }      from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Editor                  from '@tinymce/tinymce-vue'

const router = useRouter()
const route  = useRoute()
const store  = useStore()

let loading = ref(false)
let news    = ref({
  title       : '',
  text        : '',
  published_at: '',
  visibility  : '',
  logo        : '',
})

onMounted(async () => {
  const { data: userData } = await newsService.getNews(route.params.id)
  news.value               = userData
})

const updateUser = async () => {
  const {} = await newsService.updateNews(route.params.id, news.value)
  await router.push({ name: 'news' })
}

const handleLogoChanged = (file) => {
  news.value.logo_upload = file.raw
}
const handleLogoRemoved = async () => {
  news.value.logo_upload = ''
  news.value.logo = ''
}
</script>


<style scoped>

</style>
