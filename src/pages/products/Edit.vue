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
          </div><div class="col-12">
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
              v-model="data.characteristic"
              clearable
              :label="'Характеристика'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.full_description"
              clearable
              :label="'Развернутое описание товара'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="data.composition"
              clearable
              :label="'Состав'"
            />
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
            <BaseInput
              v-model="data.dimension"
              clearable
              :label="'Габарит'"
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
              <single-image-uploader
                :hide-upload-icon="!!data.logo"
                :image="data.logo"
                :on-change="handleLogoChanged"
                :on-remove="handleLogoRemoved"
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
import SingleImageUploader from '@/components/base/SingleImageUploader.vue'
import VideoUploader from '@/components/base/VideoUploader.vue'
import productService from '@/services/productService'
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
  logo: '',
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
})

const updateUser = async () => {
  const {} = await productService.update(route.params.id, data.value)
  await router.push({ name: 'products' })
}

const handleLogoChanged = (file) => {
  data.value.logo_upload = file.raw
}
const handleLogoRemoved = async () => {
  data.value.logo_upload = ''
  data.value.logo = ''
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
