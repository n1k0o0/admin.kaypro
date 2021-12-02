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
          <div class="col-12">
            <BaseInput
              v-model="application.user_name"
              clearable
              :label="'ФИО'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="application.email"
              clearable
              :label="'Email'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="application.phone"
              clearable
              :label="'Phone'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Статус</label>
              <el-select
                v-model="application.status"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in applicationService.APPLICATION_STATUSES"
                  :key="key"
                  :label="item"
                  :value="key"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <el-button-group>
          <el-button @click="$router.push({name: 'applications'})">
            Отменить
          </el-button>
          <el-button
            type="primary"
            @click="updateApplication"
          >
            Обновить
          </el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput                    from '@/components/base/BaseInput.vue'
import usePagination                from '@/composables/usePagination'
import applicationService           from '@/services/applicationService'
import { useStore }                 from 'vuex'

const { pagination, setPagination, currentPage } = usePagination()
import { onMounted, ref } from 'vue'
import { useRoute, useRouter }      from 'vue-router'

const router = useRouter()
const route  = useRoute()
const store  = useStore()

let loading     = ref(false)
let application = ref({
  status    : '',
  user_name : '',
  email     : '',
  phone: '',
})

onMounted(async () => {
  const { data: userData } = await applicationService.getApplication(route.params.id)
  application.value        = userData
})

const updateApplication = async () => {
  const {} = await applicationService.updateApplication(route.params.id, application.value)
  await router.push({ name: 'applications' })
}

const handleLogoChanged = (file) => {
  application.value.logo = file.raw
}
const handleLogoRemoved = async () => {
  application.value.logo = null
}
</script>


<style scoped>

</style>
