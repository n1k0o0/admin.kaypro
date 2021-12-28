<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Каталог
        </h3>
      </div>
    </div>
    <div class="card-body">
      <div class="row ">
        <!--Блок Баннер 1-->
        <div class="col-12 my-4">
          <h3>Баннер 1</h3>
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner1.title"
            clearable
            :label="'Заголовок'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner1.description"
            clearable
            type="textarea"
            :label="'Описание'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner1.link"
            clearable
            :label="'Ссылка'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner1.button_text"
            clearable
            :label="'Название кнопки'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Изображения</label>
            <single-image-uploader
              :hide-upload-icon="!!catalogs.banner"
              :image="catalogs.banner"
              :on-change="handleBannerChanged"
              :on-remove="handleBannerRemoved"
              tip="рек. размер -982х328"
            />
          </div>
        </div>

        <!--Популярные-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Популярные</h3>
        </div>
        <div class="col-4">
          <label>Продукты</label>
          <el-select
            v-model="catalogs.content.popular"
            placeholder="Select"
            filterable
            multiple
            value-key="id"
          >
            <el-option
              v-for="item in products"
              :key="item"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">
                Id
              </th>
              <th scope="col">
                Наименование
              </th>
              <th scope="col">
                Артикул
              </th>
              <th scope="col">
                Управление
              </th>
            </tr>
          </thead>
          <VueDraggable
            v-model="catalogs.content.popular"
            tag="tbody"
            item-key="id"
          >
            <template #item="{ element }">
              <tr>
                <td>
                  {{ element.id }}
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.vendor_code }}</td>
                <td>
                  <el-button
                    :icon="Delete"
                    type="danger"
                    @click="deletePopularProduct(element)"
                  />
                </td>
              </tr>
            </template>
          </VueDraggable>
        </table>

        <!--Линейка товара-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Линейка товара</h3>
        </div>
        <div class="col-6 row">
          <div class="col-12">
            <BaseInput
              v-model="catalogs.content.line[0].title"
              clearable
              :label="'Заголовок'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="catalogs.content.line[0].link"
              clearable
              :label="'Ссылка'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото продукции</label>
              <single-image-uploader
                :hide-upload-icon="!!catalogs.content_image1"
                :image="catalogs.content_image1"
                :on-change="handleLine2Image1Changed"
                :on-remove="handleLine2Image1Removed"
                tip="рек. размер 643х395"
              />
            </div>
          </div>
        </div>
        <div class="col-6 row">
          <div class="col-12">
            <BaseInput
              v-model="catalogs.content.line[1].title"
              clearable
              :label="'Заголовок'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="catalogs.content.line[1 ].link"
              clearable
              :label="'Ссылка'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото продукции</label>
              <single-image-uploader
                :hide-upload-icon="!!catalogs.content_image2"
                :image="catalogs.content_image2"
                :on-change="handleLine2Image2Changed"
                :on-remove="handleLine2Image2Removed"
                tip="рек. размер 643х395"
              />
            </div>
          </div>
        </div>

        <!--Блок Баннер 2-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Баннер 2</h3>
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner2.title"
            clearable
            :label="'Заголовок'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner2.description"
            clearable
            type="textarea"
            :label="'Описание'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner2.link"
            clearable
            :label="'Ссылка'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.content.banner2.button_text"
            clearable
            :label="'Название кнопки'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Изображения</label>
            <single-image-uploader
              :hide-upload-icon="!!catalogs.banner2"
              :image="catalogs.banner2"
              :on-change="handleBanner2Changed"
              :on-remove="handleBanner2Removed"
              tip="рек. размер -982х300"
            />
          </div>
        </div>


        <!--Хиты продаж-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Хиты продаж</h3>
        </div>
        <div class="col-4">
          <label>Продукты</label>
          <el-select
            v-model="catalogs.content.bestsellers"
            placeholder="Select"
            filterable
            multiple
            value-key="id"
          >
            <el-option
              v-for="item in products"
              :key="item"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">
                Id
              </th>
              <th scope="col">
                Наименование
              </th>
              <th scope="col">
                Артикул
              </th>
              <th scope="col">
                Управление
              </th>
            </tr>
          </thead>
          <VueDraggable
            v-model="catalogs.content.bestsellers"
            tag="tbody"
            item-key="id"
          >
            <template #item="{ element }">
              <tr>
                <td>
                  {{ element.id }}
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.vendor_code }}</td>
                <td>
                  <el-button
                    :icon="Delete"
                    type="danger"
                    @click="deleteBestSellerProduct(element)"
                  />
                </td>
              </tr>
            </template>
          </VueDraggable>
        </table>




        <!--Meta-->
        <el-divider />
        <div class="col-12">
          <BaseInput
            v-model="catalogs.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="catalogs.meta_keywords"
            clearable
            :label="'SEO keywords'"
          />
        </div>

        <!--Dialog image preview        -->
        <el-dialog v-model="dialogVisible">
          <img
            style="width:100%;"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <el-button-group>
        <el-button @click="$router.push({name: 'news'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="updateCatalog"
        >
          Обновить
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue'
import SingleImageUploader from '@/components/base/SingleImageUploader.vue'
import { Delete } from '@element-plus/icons'
import VueDraggable from 'vuedraggable'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import pagesService from '@/services/pagesService'
import productService from '@/services/productService'

const store = useStore()
const props = defineProps({
  catalog: {
    type: Object,
    required: true
  },
})
let loading = ref(false)
let dialogSlideVisible = ref(false)
let newSlide = ref(false)
let dialogVisible = ref(false)
let dialogImageUrl = ref('')
let slide = ref({})
let bestsellers = ref([])
let products = ref([])

let newProducts = ref([])
let catalogs = ref({
  name: '',
  banner: '',
  banner2: '',
  text_image1: '',
  text_image2: '',
  content_image1: '',
  content_image2: '',
  deleted_files: [],
  content: {
    banner1: {
      description:'',
      title:'',
      link:'',
      button_text:''
    },
    banner2: {
      description:'',
      title:'',
      link:'',
      button_text:''
    },
    line: [{
      link:'',
      title:''
    },{
      link:'',
      title:''
    }],
    popular: [],
    bestsellers: [],
  },
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.catalog, () => {
  catalogs.value = props.catalog
})
onMounted(async () => {
  const { data: { data: data } } = await productService.load()
  products.value = data
  catalogs.value.deleted_files=[]
})

const updateCatalog = async () => {
  catalogs.value.content.bestsellers=catalogs.value.content.bestsellers.map(product=>({id:product.id, name:product.name,logo:product.logo??'',vendor_code:product.vendor_code}))
  catalogs.value.content.popular=catalogs.value.content.popular.map(product=>({id:product.id, name:product.name,logo:product.logo??'',vendor_code:product.vendor_code}))
  await pagesService.update(catalogs.value.name, catalogs.value)
}

// Popular Product
const deletePopularProduct = (newProduct) => {
  catalogs.value.content.popular = catalogs.value.content.popular.filter(el =>
      el.id !== newProduct.id
  )
}
// const onMovePopularProduct = () => {
//   for (let [index, item] of catalogs.value.content.popular.entries()) {
//     item.order = index
//   }
// }

// BestSeller Product
const deleteBestSellerProduct = (newProduct) => {
  catalogs.value.content.bestsellers = catalogs.value.content.bestsellers.filter(el =>
      el.id !== newProduct.id
  )
}

// Line
const handleLine2Image1Changed = (file) => {
  catalogs.value.contentImage1 = file.raw
  catalogs.value.content_image_1 = file
}
const handleLine2Image1Removed = async () => {
  catalogs.value.contentImage1 = ''
  catalogs.value.content_image1 = ''
}
const handleLine2Image2Changed = (file) => {
  catalogs.value.contentImage2 = file.raw
  catalogs.value.content_image_2 = file
}
const handleLine2Image2Removed = async () => {
  catalogs.value.contentImage2 = ''
  catalogs.value.content_image2 = ''
}

// Banner 1
const handleBannerChanged = (file) => {
  catalogs.value.banner_upload = file.raw
  catalogs.value.banner = file
}
const handleBannerRemoved = async () => {
  catalogs.value.banner_upload = ''
  catalogs.value.banner = ''
}
// Banner 2
const handleBanner2Changed = (file) => {
  catalogs.value.banner2_upload = file.raw
  catalogs.value.banner2 = file
}
const handleBanner2Removed = async () => {
  catalogs.value.banner2_upload = ''
  catalogs.value.banner2 = ''
}
</script>

