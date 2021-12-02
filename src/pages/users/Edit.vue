<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label text-dark">
            Редактирование
            <small>внутренний пользователь</small>
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
              v-model="user.patronymic"
              clearable
              :label="'Отчество'"
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
            <BaseInput
              v-model="user.address"
              clearable
              :label="'Адрес'"
            />
          </div>
          <template v-if="user.entity">
            <div class="col-12">
              <BaseInput
                v-model="user.entity_name"
                clearable
                :label="'Наименование компании'"
              />
            </div>
            <div class="col-12">
              <BaseInput
                v-model="user.itn"
                clearable
                :label="'ИНН'"
              />
            </div>
            <div class="col-12">
              <BaseInput
                v-model="user.psrn"
                clearable
                :label="'ОГРН'"
              />
            </div>
            <div class="col-12">
              <BaseInput
                v-model="user.entity_address"
                clearable
                :label="'Юридический адрес'"
              />
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Юридический статус</label>
                <el-select
                  v-model="user.entity_status"
                  placeholder="Select"
                >
                  <el-option
                    v-for="(item,key) in userService.ENTITY_STATUSES"
                    :key="key"
                    :label="item"
                    :value="key"
                  />
                </el-select>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Статус</label>
                <el-select
                  v-model="user.status"
                  placeholder="Select"
                >
                  <el-option
                    v-for="(item,key) in userService.USER_STATUSES"
                    :key="key"
                    :label="item"
                    :value="key"
                  />
                </el-select>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <el-button-group>
          <el-button @click="$router.push({name: 'users'})">
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
import BaseInput                    from '@/components/base/BaseInput.vue'
import { computed, onMounted, ref } from 'vue'

import userService             from '@/services/userService'
import { useRoute, useRouter } from 'vue-router'

const route  = useRoute()
const router = useRouter()
let loading  = ref(false)
let user     = ref({
  status        : '',
  entity_status : '',
  entity_address: '',
  psrn          : '',
  itn           : '',
  entity_name   : '',
  entity        : '',
  address       : '',
  phone         : '',
  email         : '',
  patronymic    : '',
  last_name     : '',
  first_name    : '',
})

const auth = computed(() => store.getters['auth/GET_USER'])

onMounted(async () => {
  const { data: userData } = await userService.getUser(route.params.id)
  user.value               = userData
})

const updateUser = async () => {
  const {} = await userService.updateUser(route.params.id, user.value)
  await router.push({ name: 'users' })
}

</script>

<style scoped>

</style>
