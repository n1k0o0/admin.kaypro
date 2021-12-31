<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Товары
            <small>управление товарами</small>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-3">
            <BaseInput
              v-model="data.name"
              clearable
              :label="'Название'"
              @input="search"
            />
          </div>
          <div class="col-3">
            <BaseInput
              v-model="data.vendor_code"
              clearable
              :label="'Артикул'"
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
          :default-sort="{ prop: 'name', order: 'descending' }"
          @sort-change="sortTable"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="60"
            sortable="custom"
          />
          <el-table-column
            prop="name"
            min-width="130"
            label="Название"
            sortable="custom"
          />
          <el-table-column
            prop="category"
            label="Категория"
            min-width="150"
            sortable="custom"
          />
          <el-table-column
            prop="count"
            label="Остаток"
            min-width="130"
            sortable="custom"
          />
          <el-table-column
            prop="price"
            label="Розничная цена"
            min-width="170"
            sortable="custom"
          />
          <el-table-column
            prop="weight"
            label="Вес"
            min-width="130"
            sortable="custom"
          />
          <el-table-column
            prop="vendor_code"
            label="Артикул"
            min-width="130"
            sortable="custom"
          />
          <el-table-column
            prop="status"
            label="Статус"
            min-width="130"
            sortable="custom"
          >
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="setStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="updated_at"
            label="Дата изменения"
            min-width="155"
            sortable="custom"
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
                :icon="Edit"
                type="primary"
                @click="$router.push({name: 'products-edit', params: {id: scope.row.meta_slug}})"
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
import productService from '@/services/productService'
import { useStore } from 'vuex'

let loading = ref(false)
let categories = ref([])

let data = reactive({
  date: '',
  name: '',
  vendor_code: '',
  sort: 'name',
  sort_type: 'asc',
})

onMounted(async () => {
  await search()
})

const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await search()
}
const setStatus = async (product) => {
  if (product.id){
    try {
      const {} = await productService.update(product.meta_slug, ({ status:product.status }))
    }catch (e) {
      product.status= +!product.status
    }
  }
}
const search = async () => {
  try {
    loading.value = true
    const { data: { data: applicationData, meta } } = await productService.load(data, currentPage.value, perPage.value)
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

