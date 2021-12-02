<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Курсы
            <small>обучение</small>
          </h3>
        </div>
        <div
          class="card-toolbar"
        >
          <a
            href="#"
            class="btn btn-sm btn-success font-weight-bold"
            @click="$router.push({name: 'trainings-create'})"
          >
            <i class="flaticon2-add-square" /> Добавить
          </a>
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
          <div class="col-3">
            <div class="form-group">
              <label>Дата</label>
              <el-date-picker
                v-model="data.date"
                type="date"
                placeholder="Выберите дату"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                @change="searchTrainings"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <el-table
          v-loading="loading"
          :data="trainings"
          :empty-text="'Нет данных'"
          @sort-change="sortTrainings"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            sortable="custom"
          />
          <el-table-column
            prop="name"
            label="Название"
            sortable="custom"
          />
          <el-table-column
            prop="date"
            label="Дата"
            sortable="custom"
          >
            <template #default="scope">
              {{ $moment(scope.row.date).format('DD-M-YYYY') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="lecturer"
            label="ФИО лектора"
            sortable="custom"
          />
          <el-table-column
            prop="seats"
            label="Количество мест"
            sortable="custom"
          />
          <el-table-column
            prop="empty_seats"
            label="Количество свободных мест"
            sortable="custom"
          />
          <el-table-column
            label="Статус"
            sortable="custom"
            prop="status"
          >
            <template #default="scope">
              {{ trainingService.getTrainingStatus(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="is_visible"
            label="Видимость"
            sortable="custom"
          >
            <template #default="scope">
              {{ trainingService.getTrainingVisibility(scope.row.is_visible) }}
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
                @click="$router.push({name: 'trainings-edit', params: {id: scope.row.id}})"
              />
              <el-popconfirm
                cancel-button-text="Отмена"
                confirm-button-text="Да"
                title="Вы действительно хотите удалить игру?"
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

const { pagination, setPagination, currentPage } = usePagination()
import { onMounted, reactive, ref } from 'vue'

const store = useStore()
import trainingService              from '@/services/trainingService'
import { useStore }                 from 'vuex'

let loading   = ref(false)
let trainings = ref([])

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
    loading.value                                 = true
    const { data: { data: trainingsData, meta } } = await trainingService.loadTraining(data, currentPage.value, 10)
    trainings.value                               = trainingsData
    setPagination(meta)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const sortTrainings = async (obj) => {
  data.sort      = obj.prop
  data.sort_type = obj.order === 'ascending' ? 'asc' : obj.order === 'descending' ? 'desc' : ''
  await searchTrainings()
}

const deleteTraining = async (training) => {
  const {} = await trainingService.removeTraining(training.id)
  await searchTrainings()
}

</script>

