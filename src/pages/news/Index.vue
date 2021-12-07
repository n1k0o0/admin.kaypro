<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
            <i class="flaticon2-user-outline-symbol text-primary" />
          </span>
          <h3 class="card-label">
            Новости
            <small>управление новости</small>
          </h3>
        </div>
        <div
          class="card-toolbar"
        >
          <a
            href="#"
            class="btn btn-sm btn-success font-weight-bold"
            @click="$router.push({name: 'news-create'})"
          >
            <i class="flaticon2-add-square" /> Добавить
          </a>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <div class="col-xs-6 col-md-6 col-lg-3">
            <BaseInput
              v-model="data.title"
              clearable
              :label="'Имя'"
              @input="searchNews"
            />
          </div>
          <div class="col-xs-6 col-md-6 col-lg-3">
            <div class="form-group">
              <label>Дата проведения</label>
              <el-date-picker
                v-model="data.published_at"
                format="DD-MM-YYYY"
                value-format="YYYY-MM-DD"
                clearable
                :label="'Дата и время проведения'"
                @change="searchNews"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <el-table
          v-loading="loading"
          :data="news"
          :empty-text="'Нет данных'"
          @sort-change="sorUsers"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            sortable="custom"
          />
          <el-table-column
            prop="title"
            label="Заголовок"
            sortable="custom"
          />
          <el-table-column
            prop="published_at"
            label="Дата и время публикации"
            sortable="custom"
          />
          <el-table-column
            prop="author.first_name"
            label="Автор"
            sortable="custom"
          />
          <el-table-column
            label="Видимость"
            sortable="custom"
            prop="visibility"
          >
            <template #default="scope">
              {{ newsService.getNewsVisibility(scope.row.visibility) }}
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
                @click="$router.push({name: 'news-edit', params: {id: scope.row.id}})"
              />
              <el-popconfirm
                cancel-button-text="Отмена"
                confirm-button-text="Да"
                title="Вы действительно хотите удалить новость?"
                @confirm="deleteNews(scope.row)"
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
import newsService                  from '@/services/newsService'
import { useStore }                 from 'vuex'

let loading = ref(false)
let news    = ref([])

let data = reactive({
  title       : '',
  text        : '',
  author      : '',
  published_at: '',
  visibility  : '',
  sort        : 'id',
  sort_type   : 'desc',
})

onMounted(async () => {
  await searchNews()
})
const onCurrentPageUpdated = async (page) => {
  currentPage.value = page
  await searchNews()
}
const searchNews           = async () => {
  try {
    loading.value                            = true
    const { data: { data: newsData, meta } } = await newsService.loadNews(data, currentPage.value, 10)
    news.value                               = newsData
    setPagination(meta)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const sorUsers   = async (obj) => {
  data.sort      = obj.prop
  data.sort_type = obj.order === 'ascending' ? 'asc' : obj.order === 'descending' ? 'desc' : ''
  await searchNews()
}
const deleteNews = async (news) => {
  const {} = await newsService.removeNews(news.id)
  await searchNews()
}

</script>


<style scoped>

</style>
