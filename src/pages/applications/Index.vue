<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Заявки
            <small>обучение</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-3">
            <BaseInput
              v-model="data.name"
              clearable
              :label="'Название обучения'"
              @input="searchTrainings"
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
              @change="searchTrainings"
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
          :data="applications"
          :empty-text="'Нет данных'"
          @sort-change="sortApplications"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            sortable="custom"
          />
          <el-table-column
            prop="training.name"
            label="Название курса"
          />
          <el-table-column
            prop="user_name"
            label="Имя"
            sortable="custom"
          />
          <el-table-column
            prop="email"
            label="Почта"
            sortable="custom"
          />
          <el-table-column
            prop="phone"
            label="Номер"
            sortable="custom"
          />
          <el-table-column
            label="Статус"
            sortable="custom"
            prop="status"
          >
            <template #default="scope">
              {{ applicationService.getApplicationStatus(scope.row.status) }}
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
                @click="$router.push({name: 'applications-edit', params: {id: scope.row.id}})"
              />
              <el-popconfirm
                cancel-button-text="Отмена"
                confirm-button-text="Да"
                title="Вы действительно хотите удалить заявку?"
                @confirm="deleteTraining(scope.row)"
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
import { Edit, Delete }             from '@element-plus/icons'
import BaseInput                    from '@/components/base/BaseInput.vue'
import usePagination                from '@/composables/usePagination'

const { pagination, setPagination, currentPage, perPage,perPageCounts } = usePagination()
import { onMounted, reactive, ref } from 'vue'

const store = useStore()
import applicationService           from '@/services/applicationService'
import { useStore }                 from 'vuex'

let loading      = ref(false)
let applications = ref([])

let data = reactive({
  date      : '',
  first_name: '',
})

onMounted(async () => {
  await searchTrainings()
})

const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await searchTrainings()
}
const searchTrainings      = async () => {
  try {
    loading.value                                   = true
    const { data: { data: applicationData, meta } } = await applicationService.loadApplication(data, currentPage.value, perPage.value)
    applications.value                              = applicationData
    setPagination(meta)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const sortApplications = async (obj) => {
  data.sort      = obj.prop
  data.sort_type = obj.order === 'ascending' ? 'asc' : obj.order === 'descending' ? 'desc' : ''
  await searchTrainings()
}

const deleteTraining = async (training) => {
  const {} = await applicationService.removeApplication(training.id)
  await searchTrainings()
}

</script>

