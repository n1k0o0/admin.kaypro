<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-training-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Создание
            <small>Курсы</small>
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
              v-model="training.name"
              clearable
              :label="'Наименование'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.city"
              clearable
              :label="'Город'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Дата проведения</label>
              <el-date-picker
                v-model="training.date"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                clearable
                :label="'Дата проведения'"
              />
            </div>
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.duration"
              clearable
              :label="'Длительность'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.price"
              clearable
              :label="'Стоимость'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото</label>
              <single-image-uploader
                :hide-upload-icon="!!training.logo"
                :image="training.logo"
                :on-change="handleLogoChanged"
                :on-remove="handleLogoRemoved"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Баннер</label>
              <single-image-uploader
                :hide-upload-icon="!!training.banner"
                :image="training.banner"
                :on-change="handleBannerChanged"
                :on-remove="handleBannerRemoved"
              />
            </div>
          </div>

          <el-divider />
          <div class="col-12">
            <h3>Программа</h3>
          </div>
          <el-divider />
          <div class="col-12">
            <div class="form-group">
              <label>Описание</label>
              <el-input
                v-model="training.description"
                :autosize="{ minRows: 3 }"
                type="textarea"
                placeholder="Не больше 4096 символов"
              />
            </div>
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.location"
              clearable
              :label="'Место проведения (полный адрес)'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.seats"
              clearable
              :label="'Количество мест всего'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Статус</label>
              <el-select
                v-model="training.status"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in trainingService.TRAINING_STATUSES"
                  :key="key"
                  :label="item"
                  :value="key"
                />
              </el-select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Признак видимости</label>
              <el-select
                v-model="training.is_visible"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in trainingService.TRAINING_VISIBILITY"
                  :key="key"
                  :label="item"
                  :value="key"
                />
              </el-select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Формар мероприятия</label>
              <el-select
                v-model="training.is_online"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in trainingService.TRAINING_ONLINE_STATUS"
                  :key="+key"
                  :label="item"
                  :value="+key"
                />
              </el-select>
            </div>
          </div>

          <el-divider />
          <div class="col-12">
            <h3>Дни обучения</h3>
          </div>
          <el-divider />
          <div class="col-12 mb-4">
            <el-button
              type="primary"
              :icon="Plus"
              @click="addDay"
            >
              Добавить
            </el-button>
          </div>
          <div
            v-for="(day,index) in training.days"
            :key="day.desc"
            class="row col-12 align-items-center"
          >
            <div class="col-4">
              <BaseInput
                v-model="day.name"
                clearable
                :label="'Название'"
              />
            </div>
            <div class="col-6">
              <BaseInput
                v-model="day.content"
                type="textarea"
                clearable
                :label="'Описание'"
              />
            </div>
            <div class="col-2">
              <el-button
                :icon="Delete"
                type="danger"
                @click="deleteDay(index)"
              />
            </div>
          </div>

          <el-divider />
          <div class="col-12">
            <h3>Спикер</h3>
          </div>
          <el-divider />
          <div class="col-12">
            <BaseInput
              v-model="training.lecturer"
              clearable
              :label="'ФИО лектора'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.lecturer_position"
              clearable
              :label="'Должность лектора'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.lecturer_description"
              type="textarea"
              clearable
              :label="'Описание лектора'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото</label>
              <single-image-uploader
                :hide-upload-icon="!!training.lecturer_avatar"
                :image="training.lecturer_avatar"
                :on-change="handleLecturerAvatarChanged"
                :on-remove="handleLecturerAvatarRemoved"
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
              v-model="training.meta_title"
              clearable
              :label="'SEO Title'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.meta_description"
              clearable
              :label="'SEO Description'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.meta_keywords"
              clearable
              :label="'SEO keywords'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="training.meta_image"
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
            @click="createTraining"
          >
            Создать
          </el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue'
import usePagination from '@/composables/usePagination'
import trainingService from '@/services/trainingService'
import { useStore } from 'vuex'
import { Plus, Delete } from '@element-plus/icons'

const { pagination, setPagination, currentPage } = usePagination()
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SingleImageUploader from '@/components/base/SingleImageUploader.vue'

const router = useRouter()
const store = useStore()

let loading = ref(false)
let training = ref({
  status: '',
  name: '',
  description: '',
  location: '',
  date: '',
  duration: '',
  price: '',
  seats: '',
  lecturer: '',
  logo: '',
  empty_seats: '',
  is_visible: '',
  is_online: '',
  lecturer_position: '',
  lecturer_avatar: '',
  lecturer_description: '',
  city: '',
  days: [],
  meta_description: '',
  meta_title: '',
  meta_keywords: '',
  meta_image: '',
  banner: '',
})

const createTraining = async () => {
  const {} = await trainingService.createTraining(training.value)
  await router.push({ name: 'trainings' })
}

const handleLogoChanged = (file) => {
  training.value.logo_upload = file.raw
}
const handleLogoRemoved = async () => {
  training.value.logo_upload = ''
  training.value.logo = ''
}

const handleLecturerAvatarChanged = (file) => {
  training.value.lecturer_avatar_upload = file.raw
}
const handleLecturerAvatarRemoved = async () => {
  training.value.lecturer_avatar_upload = ''
  training.value.lecturer_avatar = ''
}

const handleBannerChanged = (file) => {
  training.value.banner_upload = file.raw
}
const handleBannerRemoved = async () => {
  training.value.banner_upload = ''
  training.value.banner = ''
}

const addDay = async () => {
  training.value.days.push({ name: '', content: '' })
}

const deleteDay = (index) => {
  training.value.days.splice(index, 1)
}
</script>

<style scoped>

</style>
