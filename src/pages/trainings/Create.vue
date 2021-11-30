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
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="user.name"
              clearable
              :label="'Наименование'"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="user.location"
              clearable
              :label="'Место проведения'"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <div class="form-group">
              <label>Дата и время проведения</label>
              <el-date-picker
                v-model="user.date"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                clearable
                :label="'Дата и время проведения'"
              />
            </div>
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="user.duration"
              clearable
              :label="'Длительность'"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="user.price"
              clearable
              :label="'Стоимость'"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="user.lecturer"
              clearable
              :label="'ФИО лектора'"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="user.seats"
              clearable
              :label="'Количество мест всего'"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
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
          <div class="col-xs-6 col-md-6 col-lg-3">
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

          <div class="col-xs-6 col-md-6 col-lg-3">
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

          <div class="col-12">
            <div class="form-group">
              <label>Описание</label>
              <editor
                v-model="user.description"
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
import BaseInput                    from '@/components/base/BaseInput.vue'
import usePagination                from '@/composables/usePagination'
import trainingService              from '@/services/trainingService'
import { useStore }                 from 'vuex'
import Editor                       from '@tinymce/tinymce-vue'

const { pagination, setPagination, currentPage } = usePagination()
import { ref } from 'vue'
import { useRouter }                from 'vue-router'
import SingleImageUploader          from '@/components/base/SingleImageUploader.vue'

const router = useRouter()
const store  = useStore()

let loading = ref(false)
let user    = ref({
  status     : '',
  name       : '',
  description: '',
  location   : '',
  date       : '',
  duration   : '',
  price      : '',
  seats      : '',
  lecturer   : '',
  logo       : '',
  empty_seats: '',
  is_visible : '',
})

const createTraining = async () => {
  const {} = await trainingService.createTraining(user.value)
  await router.push({ name: 'trainings' })
}

const handleLogoChanged = (file) => {
  user.value.logo = file.raw
}
const handleLogoRemoved = async () => {
  user.value.logo = null
}
</script>


<style scoped>

</style>
