<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Модераторы
            <small>пользователи</small>
          </h3>
        </div>
        <div
          v-if="auth.type==='admin'"
          class="card-toolbar"
        >
          <a
            href="#"
            class="btn btn-sm btn-success font-weight-bold"
            @click="$router.push({name: 'internal-users-create'})"
          >
            <i class="flaticon2-add-square" /> Добавить
          </a>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-2">
            <BaseInput
              v-model="data.first_name"
              clearable
              :label="'Имя'"
              @input="searchInternalUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.last_name"
              clearable
              :label="'Фамилия'"
              @input="searchInternalUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.email"
              clearable
              :label="'Email'"
              @input="searchInternalUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.phone"
              clearable
              :label="'Телефон'"
              @input="searchInternalUsers"
            />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <el-row>
          <el-col :span="4">
            <label>Количество строк на странице</label>
            <el-select
              v-model="perPage"
              placeholder="Select"
              @change="searchInternalUsers"
            >
              <el-option
                v-for="item in perPageCounts"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-table
          v-loading="loading"
          :data="users"
          :empty-text="'Нет данных'"
          @sort-change="sortUser"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="60"
            sortable="custom"
          />
          <el-table-column
            prop="first_name"
            label="Имя"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="last_name"
            label="Фамилия"
            min-width="110"
            sortable="custom"
          />
          <el-table-column
            prop="phone"
            label="Номер"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="email"
            label="Почта"
            min-width="100"
            width="120"
            sortable="custom"
          />
          <el-table-column
            label="Тип"
            sortable="custom"
            min-width="100"
            prop="type"
          >
            <template #default="scope">
              {{ internalUserService.getUserType(scope.row.type) }}
            </template>
          </el-table-column>
          <el-table-column
            label="Дата изменения"
            min-width="155"
            sortable="custom"
            prop="updated_at"
          >
            <template #default="scope">
              {{ $moment(scope.row.updated_at).format('DD-MM-YYYY HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column
            label="Управление"
            width="140"
            class-name="actions"
          >
            <template #default="scope">
              <el-button
                v-if="auth.type==='admin'"
                :icon="Edit"
                type="primary"
                @click="$router.push({name: 'internal-users-edit', params: {id: scope.row.id}})"
              />
              <el-popconfirm
                v-if="scope.row.type==='moderator'"
                cancel-button-text="Отмена"
                confirm-button-text="Да"
                :title="`Вы действительно хотите удалить ${internalUserService.getUserType(scope.row.type)}а?`"
                @confirm="deleteUser(scope.row)"
              >
                <template #reference>
                  <el-button
                    :icon="Delete"
                    type="danger"
                  />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-row justify="center">
          <el-pagination
            :hide-on-single-page="true"
            layout="prev, pager, next"
            v-bind="pagination"
            sortable="custom"
            @update:current-page="onCurrentPageUpdated"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons'
import BaseInput from '@/components/base/BaseInput.vue'
import usePagination from '@/composables/usePagination'

const { pagination, setPagination, currentPage, perPage, perPageCounts } = usePagination()
import { computed, onMounted, reactive, ref } from 'vue'

const store = useStore()
import internalUserService from '@/services/internalUserService'
import { useStore } from 'vuex'

let loading = ref(false)
let users = ref([])

let data = reactive({
  phone: '',
  email: '',
  last_name: '',
  first_name: '',
  updated_at: '',
  type: '',
  patronymic: '',
  address: '',
})

onMounted(async () => {
  await searchInternalUsers()
})
const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await searchInternalUsers()
}
const searchInternalUsers = async () => {
  try {
    loading.value = true
    const { data: { data: usersData, meta } } = await internalUserService.loadUsers(data, currentPage.value, perPage.value)
    users.value = usersData
    setPagination(meta)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const sortUser = async (obj) => {
  data.sort = obj.prop
  data.sort_type = obj.order === 'ascending' ? 'asc' : obj.order === 'descending' ? 'desc' : ''
  await searchInternalUsers()
}
const deleteUser = async (user) => {
  const {} = await internalUserService.removeUser(user.id)
  await searchInternalUsers()
}

const auth = computed(() => store.getters['auth/GET_USER'])

</script>


<style scoped>

</style>
