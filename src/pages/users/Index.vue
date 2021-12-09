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
        <el-table
          v-loading="loading"
          :data="users"
          :empty-text="'Нет данных'"
          @sort-change="sortUser"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            sortable="custom"
          />
          <el-table-column
            prop="first_name"
            label="Имя"
            sortable="custom"
          />
          <el-table-column
            prop="last_name"
            label="Фамилия"
            sortable="custom"
          />
          <el-table-column
            prop="address"
            label="Адресс"
          />
          <el-table-column
            prop="phone"
            label="Номер"
            sortable="custom"
          />
          <el-table-column
            prop="email"
            label="Почта"
            width="120"
            sortable="custom"
          />
          <el-table-column
            label="Ю.Л."
            width="75"
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
            width="75"
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
          />
          <el-table-column
            prop="entity_status"
            label="Статус проверки юрлица"
          >
            <template #default="scope">
              {{ userService.getUserEntityStatus(scope.row.entity_status) }}
            </template>
          </el-table-column>
          <el-table-column
            label="Статус"
            sortable="custom"
            prop="status"
          >
            <template #default="scope">
              {{ userService.getUserStatus(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="price_type"
            label="Вид цены"
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
import { Edit,  Delete} from '@element-plus/icons'
import BaseInput from "@/components/base/BaseInput.vue";
import usePagination from '@/composables/usePagination'
const {pagination, setPagination, currentPage} = usePagination()
import { onMounted, reactive, ref } from 'vue'
import userService                  from '@/services/userService'
let loading=ref(false)
let users=ref([])

let data = reactive({
  first_name: '',
  last_name  : '',
})

onMounted(async () => {
  await searchUsers()
})
const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await searchUsers()
}
const searchUsers=async ()=>{
  try {
    loading.value=true
    const {data: {data: usersData, meta}} = await userService.loadUsers(data,currentPage.value,10)
    users.value=usersData
    setPagination(meta)
  }catch (e) {

  }finally {
    loading.value=false
  }
}

const sortUser= async (obj) => {
  data.sort = obj.prop
  data.sort_type = obj.order==="ascending"?'asc':obj.order==='descending'?'desc':''
  await searchUsers()
}
const deleteUser= async (user) => {
  console.log(user)
  const {}=await userService.removeUser(user.id)
  await searchUsers()
}
</script>
