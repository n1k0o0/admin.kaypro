<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label text-dark">
            Клиенты
            <small>внешние пользователи</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-2">
            <BaseInput
              v-model="data.first_name"
              clearable
              :label="'Имя'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.last_name"
              clearable
              :label="'Фамилия'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.email"
              clearable
              :label="'Email'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.phone"
              clearable
              :label="'Телефон'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.entity_name"
              clearable
              :label="'Наименование компании'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.itn"
              clearable
              :label="'ИНН'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.psrn"
              clearable
              :label="'ОГРН'"
              @input="searchUsers"
            />
          </div>
          <div class="col-2">
            <BaseInput
              v-model="data.entity_address"
              clearable
              :label="'Юридический адрес'"
              @input="searchUsers"
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
              @change="searchUsers"
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
            prop="address"
            min-width="100"
            label="Адресс"
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
            sortable="custom"
          />
          <el-table-column
            label="Согласие на инф-ние"
            min-width="110"
            prop="subscribe"
            align="center"
            sortable="custom"
          >
            <template #default="scope">
              {{ scope.row.subscribe?'Да':'Нет' }}
            </template>
          </el-table-column>
          <el-table-column
            label="Ю.Л."
            width="80"
            prop="entity"
            sortable="custom"
          >
            <template #default="scope">
              {{ userService.getUserEntityType(scope.row.entity) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="entity_name"
            label="Наименование компании"
            min-width="200"
          />
          <el-table-column
            prop="itn"
            label="ИНН"
            width="120"
          />
          <el-table-column
            prop="psrn"
            label="ОГРН"
            width="120"
          />
          <el-table-column
            prop="entity_address"
            label="Юридический адрес"
            min-width="170"
          />
          <el-table-column
            prop="entity_status"
            label="Статус проверки юрлица"
            min-width="200"
          >
            <template #default="scope">
              {{ userService.getUserEntityStatus(scope.row.entity_status) }}
            </template>
          </el-table-column>
          <el-table-column
            label="Статус"
            sortable="custom"
            prop="status"
            min-width="100"
          >
            <template #default="scope">
              {{ userService.getUserStatus(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="price_type"
            label="Вид цены"
            min-width="100"
          />
          <el-table-column
            label="Дата изменения"
            width="120"
            sortable="custom"
            prop="updated_at"
          >
            <template #default="scope">
              {{ $moment(scope.row.updated_at).utc().format('DD-MM-YYYY HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column
            label="Управление"
            width="140"
            class-name="actions"
          >
            <template #default="scope">
              <el-button
                :icon="Edit"
                type="primary"
                @click="$router.push({name: 'users-edit', params: {id: scope.row.id}})"
              />
              <el-popconfirm
                cancel-button-text="Отмена"
                confirm-button-text="Да"
                title="Вы действительно хотите удалить пользователя?"
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
import { onMounted, reactive, ref } from 'vue'
import userService from '@/services/userService'

let loading = ref(false)
let users = ref([])

let data = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  entity_address: '',
  psrn: '',
  itn: '',
  entity_name: '',
})

onMounted(async () => {
  await searchUsers()
})
const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await searchUsers()
}
const searchUsers = async () => {
  try {
    loading.value = true
    const { data: { data: usersData, meta } } = await userService.loadUsers(data, currentPage.value, perPage.value)
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
  await searchUsers()
}
const deleteUser = async (user) => {
  const {} = await userService.removeUser(user.id)
  await searchUsers()
}
</script>
