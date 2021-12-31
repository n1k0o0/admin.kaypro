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
            <small>пользователи</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-12">
            <BaseInput
              v-model="user.first_name"
              clearable
              :label="'Имя'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.last_name"
              clearable
              :label="'Фамилия'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.email"
              clearable
              :label="'Email'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="user.phone"
              clearable
              :label="'Телефон'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Тип</label>
              <el-select
                v-model="user.type"
                placeholder="Select"
              >
                <el-option
                  v-for="(item,key) in internalUserService.USER_TYPES"
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
          <el-button @click="$router.push({name: 'internal-users'})">
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
import usePagination from '@/composables/usePagination'
import internalUserService from '@/services/internalUserService'
import { useStore } from 'vuex'

const { pagination, setPagination, currentPage } = usePagination()
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const router = useRouter()
const route = useRoute()
const store = useStore()

let loading = ref(false)
let user = ref({
  type: '',
  phone: '',
  email: '',
  last_name: '',
  updated_at: '',
  first_name: '',
})

const auth = computed(() => store.getters['auth/GET_USER'])
const isAdmin = computed(() => store.getters['auth/IS_ADMIN'])
const isSuperAdmin = computed(() => store.getters['auth/IS_SUPER_ADMIN'])

onMounted(async () => {
  console.log(route.params, 1)
  if (!isAdmin.value || !((+auth.value.id === +route.params.id || route.params.type === internalUserService.MODERATOR) || (isSuperAdmin.value && route.params.type===internalUserService.ADMIN))) {
    ElNotification.warning('Нет доступа')
    await router.push({ name: 'dashboard' })
  }
  const { data: userData } = await internalUserService.getUser(10)
  user.value = userData
})

const updateUser = async () => {
  const {} = await internalUserService.updateUser(route.params.id, user.value)
  await router.push({ name: 'internal-users' })
}

</script>


<style scoped>

</style>
