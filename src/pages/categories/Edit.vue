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
            <small>категория</small>
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
              v-model="category.parent.title"
              disabled
              clearable
              :label="'Родительская категория'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="category.title"
              disabled
              clearable
              :label="'Заголовок'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="category.subtitle"
              clearable
              :label="'Подзаголовок'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="category.order"
              type="number"
              :label="'Приоритет (Чем больше число, тем выше приоритет категории)'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Признак видимости в МП</label>
              <el-select
                v-model="category.mobile_visibility"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in categoryService.MOBILE_VISIBILITY"
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
                :hide-upload-icon="!!category.logo"
                :image="category.logo"
                :on-change="handleLogoChanged"
                :on-remove="handleLogoRemoved"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Баннер</label>
              <single-image-uploader
                :hide-upload-icon="!!category.banner"
                :image="category.banner"
                :on-change="handleBannerChanged"
                :on-remove="handleBannerRemoved"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Баннер для меню</label>
              <single-image-uploader
                :hide-upload-icon="!!category.banner_menu"
                :image="category.banner_menu"
                :on-change="handleBannerMenuChanged"
                :on-remove="handleBannerMenuRemoved"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Баннер для МП</label>
              <single-image-uploader
                :hide-upload-icon="!!category.banner_mobile"
                :image="category.banner_mobile"
                :on-change="handleBannerMobileChanged"
                :on-remove="handleBannerMobileRemoved"
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
              v-model="category.meta_title"
              clearable
              :label="'SEO Title'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="category.meta_description"
              clearable
              :label="'SEO Description'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="category.meta_keywords"
              clearable
              :label="'SEO keywords'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="category.meta_image"
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
import categoryService from '@/services/categoryService'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()

let loading = ref(false)
let category = ref({
  parent:{
    title:''
  },
  title: '',
  subtitle: '',
  logo: '',
  mobile_visibility: '',
  order: '',
  meta_description: '',
  meta_title: '',
  meta_keywords: '',
  meta_image: '',
  banner: '',
  banner_menu: '',
  banner_mobile: '',
})

onMounted(async () => {
  const { data: userData } = await categoryService.get(route.params.id)
  category.value = userData
  category.value.parent = category.value.parent||[]
})

const updateUser = async () => {
  const {} = await categoryService.update(route.params.id, category.value)
  await router.push({ name: 'categories' })
}

const handleLogoChanged = (file) => {
  category.value.logo_upload = file.raw
}
const handleLogoRemoved = async () => {
  category.value.logo_upload = ''
  category.value.logo = ''
}

const handleBannerChanged = (file) => {
  category.value.banner_upload = file.raw
}
const handleBannerRemoved = async () => {
  category.value.banner_upload = ''
  category.value.banner = ''
}

const handleBannerMobileChanged = (file) => {
  category.value.banner_mobile_upload = file.raw
}
const handleBannerMobileRemoved = async () => {
  category.value.banner_mobile_upload = ''
  category.value.banner_mobile = ''
}

const handleBannerMenuChanged = (file) => {
  category.value.banner_menu_upload = file.raw
}
const handleBannerMenuRemoved = async () => {
  category.value.banner_menu_upload = ''
  category.value.banner_menu = ''
}

</script>

<style scoped>

</style>
