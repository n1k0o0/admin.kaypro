<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Категории
            <small>управление товарами</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-3">
            <BaseInput
              v-model="data.title"
              clearable
              :label="'Заголовок'"
              @input="search"
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
              @change="search"
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
          :data="categories"
          :empty-text="'Нет данных'"
          :default-sort="{ prop: 'order', order: 'descending' }"
          @sort-change="sortTable"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="60"
            sortable="custom"
          />
          <el-table-column
            prop="title"
            min-width="130"
            label="Заголовок"
            sortable="custom"
          />
          <el-table-column
            prop="subtitle"
            label="Подзаголовок"
            min-width="150"
            sortable="custom"
          />
          <el-table-column
            label="Видимость в МП"
            min-width="160"
            sortable="mobile_visibility"
            prop="status"
          >
            <template #default="scope">
              {{ categoryService.getMobileVisibility(scope.row.mobile_visibility) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="order"
            label="Приоритет"
            min-width="130"
            sortable="custom"
          />
          <el-table-column
            label="Управление"
            width="140"
            class-name="actions"
          >
            <template #default="scope">
              <el-button
                :icon="Edit"
                type="primary"
                @click="$router.push({name: 'categories-edit', params: {id: scope.row.meta_slug}})"
              />
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
import { Edit } from '@element-plus/icons'

import BaseInput from '@/components/base/BaseInput.vue'
import usePagination from '@/composables/usePagination'

const { pagination, setPagination, currentPage, perPage, perPageCounts } = usePagination()
import { onMounted, reactive, ref } from 'vue'

const store = useStore()
import categoryService from '@/services/categoryService'
import { useStore } from 'vuex'

let loading = ref(false)
let categories = ref([])

let data = reactive({
  date: '',
  title: '',
  sort: 'order',
  sort_type: 'desc',
})

onMounted(async () => {
  await search()
})

const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await search()
}
const search = async () => {
  try {
    loading.value = true
    const { data: { data: applicationData, meta } } = await categoryService.load(data, currentPage.value, perPage.value)
    categories.value = applicationData
    setPagination(meta)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const sortTable = async (obj) => {
  data.sort = obj.prop
  data.sort_type = obj.order === 'ascending' ? 'asc' : obj.order === 'descending' ? 'desc' : ''
  await search()
}
</script>

