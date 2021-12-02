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
              :label="'Почта'"
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
          <div class="col-12">
            <BaseInput
              v-model="user.password"
              clearable
              :label="'Пароль'"
            />
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
import BaseInput                    from '@/components/base/BaseInput.vue'
import usePagination                from '@/composables/usePagination'
import internalUserService          from '@/services/internalUserService'
import { useStore }                 from 'vuex'

const { pagination, setPagination, currentPage } = usePagination()
import { computed, onMounted, ref } from 'vue'
import { useRouter }                from 'vue-router'

const router = useRouter()
const store  = useStore()

let loading = ref(false)
let user    = ref({
  password  : '',
  type      : '',
  phone     : '',
  email     : '',
  last_name : '',
  first_name: '',
})

const createInternalUser = async () => {
  console.log(user.value)
  const {} = await internalUserService.createUser(user.value)
  await router.push({ name: 'internal-users' })
}
const auth               = computed(() => store.getters['auth/GET_USER'])

onMounted(async () => {
  if (auth.value.type !== 'admin') {
    await router.push({ name: 'dashboard' })
  }
})
</script>


<style scoped>

</style>
