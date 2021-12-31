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
            <small>товар</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-12">
            <h3>Общее</h3>
          </div>
          <el-divider />


          <div class="col-12">
            <div class="form-group">
              <label>Описание</label>
              <editor
                v-model="data.full_description"
                maxlength="2048"
                rows="4"
                placeholder="Не больше 2048 символов"
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
            <div class="form-group">
              <label>Характеристики</label>
              <editor
                v-model="data.characteristic"
                maxlength="512"
                rows="4"
                placeholder="Не больше 512 символов"
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
            <div class="form-group">
              <label>Состав</label>
              <editor
                v-model="data.composition"
                maxlength="512"
                rows="4"
                placeholder="Не больше 512 символов"
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
              v-model="data.country"
              clearable
              :label="'Страна производитель'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.volume"
              clearable
              :label="'Объем'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Статус</label>
              <el-switch
                v-model="data.status"
                :active-value="1"
                :inactive-value="0"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото</label>
              <multiple-image-uploader
                :images="data.logo"
                :on-change="handleLogoChanged"
                :on-remove="handleLogoRemoved"
                tip="первое фото выводится для списка товаров"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Видео</label>
              <video-uploader
                :video="data.video"
                :on-change="handleVideoChanged"
                :on-remove="handleVideoRemoved"
                tip="рек. размер 600х618"
              />
            </div>
          </div>

          <el-divider />
          <div class="col-12">
            <h3>SEO</h3>
          </div>
          <el-divider />
          <div class="col-12">
            <BaseInput
              v-model="data.meta_title"
              clearable
              :label="'SEO Title'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.meta_description"
              clearable
              :label="'SEO Description'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.meta_keywords"
              clearable
              :label="'SEO keywords'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.meta_image"
              clearable
              :label="'SEO image'"
            />
          </div>

          <el-divider />
          <div class="col-12">
            <h3>1C</h3>
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.name"
              clearable
              disabled
              :label="'Наименование'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.id_1c"
              clearable
              disabled
              :label="'Идентификатор в 1С'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.barcode"
              clearable
              disabled
              :label="'Штрихкод'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.category"
              clearable
              disabled
              :label="'Вид номенклатуры'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.vendor_code"
              clearable
              disabled
              :label="'Артикул'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.unit"
              clearable
              disabled
              :label="'Базовая единица'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.count"
              clearable
              disabled
              :label="'Остаток'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.price"
              clearable
              disabled
              :label="'набор цен'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.dimension"
              clearable
              disabled
              :label="'Габарит'"
            />
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <el-button-group>
          <el-button @click="$router.push({name: 'trainings'})">
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
import BaseInput from '@/components/base/BaseInput.vue'
import MultipleImageUploader from '@/components/base/MultipleImageUploader.vue'
import VideoUploader from '@/components/base/VideoUploader.vue'
import productService from '@/services/productService'
import Editor from '@tinymce/tinymce-vue'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()

let loading = ref(false)
let data = ref({
  name: '',
  id_1c: '',
  barcode: '',
  category: '',
  vendor_code: '',
  unit: '',
  count: '',
  price: '',
  logo: [],
  deleted_files: [],
  full_description: '',
  characteristic: '',
  composition: '',
  status: '',
  country: '',
  volume: '',
  dimension: '',
  meta_title: '',
  meta_keywords: '',
  meta_description: '',
  meta_image: '',
  video: '',
})

onMounted(async () => {
  const { data: userData } = await productService.get(route.params.id)
  data.value = userData
  data.value.deleted_files=[]
})

const updateUser = async () => {
  const {} = await productService.update(route.params.id, data.value)
  await router.push({ name: 'products' })
}

const handleLogoChanged = (file,fileList) => {
  data.value.logo_upload = fileList
}
const handleLogoRemoved = async (file,fileList) => {
  data.value.logo_upload = fileList
  if (file.id) {
    data.value.deleted_files.push(file.id)
  }
}
const handleVideoChanged = (file) => {
  data.value.video_upload = file.raw
}
const handleVideoRemoved = async () => {
  data.value.video_upload = ''
  data.value.video = ''
}

</script>

<style scoped>

</style>
