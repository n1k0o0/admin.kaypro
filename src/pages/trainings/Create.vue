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
              v-model="user.name"
              clearable
              :label="'Наименование'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.city"
              clearable
              :label="'Город'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Дата проведения</label>
              <el-date-picker
                v-model="user.date"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                clearable
                :label="'Дата проведения'"
              />
            </div>
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.duration"
              clearable
              :label="'Длительность'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.price"
              clearable
              :label="'Стоимость'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото</label>
              <single-image-uploader
                :hide-upload-icon="!!user.logo"
                :image="user.logo"
                :on-change="handleLogoChanged"
                :on-remove="handleLogoRemoved"
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
                v-model="user.description"
                :autosize="{ minRows: 3 }"
                type="textarea"
                placeholder="Не больше 4096 символов"
              />
            </div>
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.location"
              clearable
              :label="'Место проведения (полный адрес)'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.seats"
              clearable
              :label="'Количество мест всего'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Статус</label>
              <el-select
                v-model="user.status"
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
                v-model="user.is_visible"
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
            v-for="(day,index) in user.days"
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
              v-model="user.lecturer"
              clearable
              :label="'ФИО лектора'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.lecturer_position"
              clearable
              :label="'Должность лектора'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.lecturer_description"
              type="textarea"
              clearable
              :label="'Описание лектора'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото</label>
              <single-image-uploader
                :hide-upload-icon="!!user.lecturer_avatar"
                :image="user.lecturer_avatar"
                :on-change="handleLecturerAvatarChanged"
                :on-remove="handleLecturerAvatarRemoved"
              />
            </div>
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
let user = ref({
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
  lecturer_position: '',
  lecturer_avatar: '',
  lecturer_description: '',
  city: '',
  days: [],
})

const createTraining = async () => {
  const {} = await trainingService.createTraining(user.value)
  await router.push({ name: 'trainings' })
}

const handleLogoChanged = (file) => {
  user.value.logo_upload = file.raw
}
const handleLogoRemoved = async () => {
  user.value.logo_upload = ''
  user.value.logo = ''
}

const handleLecturerAvatarChanged = (file) => {
  user.value.lecturer_avatar_upload = file.raw
}
const handleLecturerAvatarRemoved = async () => {
  user.value.lecturer_avatar_upload = ''
  user.value.lecturer_avatar = ''
}
const addDay = async () => {
  user.value.days.push({ name: '', content: '' })
}

const deleteDay = (index) => {
  user.value.days.splice(index, 1)
}
</script>


<style scoped>

</style>
