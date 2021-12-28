<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Главная
        </h3>
      </div>
    </div>
    <div class="card-body">
      <div class="row ">
        <!--Слайдер-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Слайдер</h3>
        </div>
        <div class="col-12">
          <el-button
            size="small"
            type="primary"
            :icon="Plus"
            @click="addNewSlide"
          >
            Добавить
          </el-button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">
                Id
              </th>
              <th scope="col">
                Заголовок
              </th>
              <th scope="col">
                Подзаголовок
              </th>
              <th scope="col">
                Ссылка
              </th>
              <th scope="col">
                Кнопка
              </th>
              <th scope="col">
                Управление
              </th>
            </tr>
          </thead>
          <VueDraggable
            v-model="homes.slider"
            tag="tbody"
            item-key="id"
            @change="onMove"
          >
            <template #item="{ element }">
              <tr>
                <td scope="row">
                  {{ element.id }}
                </td>
                <td>{{ element.title }}</td>
                <td>{{ element.subtitle }}</td>
                <td>{{ element.link }}</td>
                <td>{{ element.button_text }}</td>
                <td>
                  <el-button
                    :icon="Edit"
                    type="primary"
                    @click="showSlideDialog(element)"
                  />
                  <el-popconfirm
                    cancel-button-text="Отмена"
                    confirm-button-text="Да"
                    :title="`Вы действительно хотите удалить слайд?`"
                    @confirm="deleteSlide(element)"
                  >
                    <template #reference>
                      <el-button
                        :icon="Delete"
                        type="danger"
                      />
                    </template>
                  </el-popconfirm>
                </td>
              </tr>
            </template>
          </VueDraggable>
        </table>
        <el-dialog
          v-model="dialogSlideVisible"
          title="Shipping address"
        >
          <el-form>
            <el-form-item
              label="Заголовок"
              label-width="120px"
            >
              <el-input
                v-model="slide.title"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="Подаголовок"
              label-width="120px"
            >
              <el-input
                v-model="slide.subtitle"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="Ссылка"
              label-width="120px"
            >
              <el-input
                v-model="slide.link"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="Кнопка"
              label-width="120px"
            >
              <el-input
                v-model="slide.button_text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="Изображение"
              label-width="120px"
            >
              <single-image-uploader
                :hide-upload-icon="!!slide.image "
                :image="slide.image"
                :on-change="handleSlideChanged"
                :on-remove="handleSlideRemoved"
                tip="рек. размер - 1440х770"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogSlideVisible = false">Отмена</el-button>
              <el-button
                type="primary"
                @click="saveSlide"
              >Сохранить</el-button>
            </span>
          </template>
        </el-dialog>

        <!--Новинки-->
        <div class="col-12 my-4">
          <h3>Новинки</h3>
        </div>
        <div class="col-12">
          <label>Продукты</label>
          <el-select
            v-model="homes.content.new_products"
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
            v-model="homes.content.new_products"
            tag="tbody"
            item-key="id"
            @change="onMoveNewProduct"
          >
            <template #item="{ element }">
              <tr>
                <td scope="row">
                  {{ element.id }}
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.vendor_code }}</td>
                <td>
                  <el-button
                    :icon="Delete"
                    type="danger"
                    @click="deleteNewProduct(element)"
                  />
                </td>
              </tr>
            </template>
          </VueDraggable>
        </table>

        <!--Линейка-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Линейка</h3>
        </div>
        <div class="col-12">
          <BaseInput
            v-model="homes.content.line.title"
            clearable
            :label="'Заголовок'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="homes.content.line.description"
            clearable
            :label="'Описание'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Фото продукции</label>
            <single-image-uploader
              :hide-upload-icon="!!homes.line_image"
              :image="homes.line_image"
              :on-change="handleLineImageChanged"
              :on-remove="handleLineImageRemoved"
              tip="рек. размер -720х600"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Фото или видео</label>
            <single-media-uploader
              :hide-upload-icon="!!homes.line_media"
              :image="homes.line_media"
              :on-change="handleMediaChanged"
              :on-remove="handleMediaRemoved"
              tip="рек.размер -720х600"
            />
          </div>
        </div>

        <!--Хиты продаж-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Хиты продаж</h3>
        </div>
        <div class="col-12">
          <label>Продукты</label>
          <el-select
            v-model="homes.content.bestsellers"
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
            v-model="homes.content.bestsellers"
            tag="tbody"
            item-key="id"
            @change="onMoveBestSellerProduct"
          >
            <template #item="{ element }">
              <tr>
                <td scope="row">
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

        <!--Товар-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Товар</h3>
        </div>
        <div class="col-12">
          <label>Продукты</label>
          <el-select
            v-model="homes.content.product"
            placeholder="Select"
            filterable
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
          <tbody>
            <tr>
              <td v-show="Object.keys(homes.content.product).length === 0">
                Нет данных
              </td>
              <td>
                {{ homes.content.product.id }}
              </td>
              <td>
                {{ homes.content.product.name }}
              </td>
              <td>
                {{ homes.content.product.vendor_code }}
              </td>
              <td>
                <el-popconfirm
                  v-if="Object.keys(homes.content.product).length !== 0"
                  cancel-button-text="Отмена"
                  confirm-button-text="Да"
                  :title="`Вы действительно хотите удалить слайд?`"
                  @confirm="homes.content.product={}"
                >
                  <template #reference>
                    <el-button
                      :icon="Delete"
                      type="danger"
                    />
                  </template>
                </el-popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="col-12">
          <div class="form-group">
            <label>Цвет</label>
            <el-color-picker
              v-model="homes.content.product.color"
              class="ml-4 d-block"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Цвет фона</label>
            <el-color-picker
              v-model="homes.content.product.background_color"
              class="ml-4 d-block"
            />
          </div>
        </div>
        <div class="col-12">
          <BaseInput
            v-model="homes.content.product.title"
            clearable
            :label="'Заголовок'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="homes.content.product.description"
            clearable
            :label="'Описание'"
          />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Фото продукции</label>
            <single-image-uploader
              :hide-upload-icon="!!homes.banner"
              :image="homes.banner"
              :on-change="handleBannerChanged"
              :on-remove="handleBannerRemoved"
              tip="рек. размер 720*615"
            />
          </div>
        </div>

        <!--Популярные-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Популярные</h3>
        </div>
        <div class="col-12">
          <label>Продукты</label>
          <el-select
            v-model="homes.content.popular"
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
            v-model="homes.content.popular"
            tag="tbody"
            item-key="id"
            @change="onMoveNewProduct"
          >
            <template #item="{ element }">
              <tr>
                <td scope="row">
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
              v-model="homes.content.line_2[0].title"
              clearable
              :label="'Заголовок'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="homes.content.line_2[0].link"
              clearable
              :label="'Ссылка'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото продукции</label>
              <single-image-uploader
                :hide-upload-icon="!!homes.content_image1"
                :image="homes.content_image1"
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
              v-model="homes.content.line_2[1].title"
              clearable
              :label="'Заголовок'"
            />
          </div>
          <div class="col-12">
            <BaseInput
              v-model="homes.content.line_2[1 ].link"
              clearable
              :label="'Ссылка'"
            />
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Фото продукции</label>
              <single-image-uploader
                :hide-upload-icon="!!homes.content_image2"
                :image="homes.content_image2"
                :on-change="handleLine2Image2Changed"
                :on-remove="handleLine2Image2Removed"
                tip="рек. размер 643х395"
              />
            </div>
          </div>
        </div>

        <!--Instagram-->
        <el-divider />
        <div class="col-12 my-4">
          <h3>Instagram</h3>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>Фото</label>
            <multiple-image-uploader
              :images="homes.instagram"
              :max="8"
              :on-change="handleInstagramChanged"
              :on-remove="handleInstagramRemoved"
              tip="рек. размер - 420х420"
            />
          </div>
        </div>

        <!--Meta-->
        <el-divider />
        <div class="col-12">
          <BaseInput
            v-model="homes.meta_title"
            clearable
            :label="'SEO Title'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="homes.meta_description"
            clearable
            :label="'SEO Description'"
          />
        </div>
        <div class="col-12">
          <BaseInput
            v-model="homes.meta_keywords"
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
          @click="updateHome"
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
import SingleMediaUploader from '@/components/base/SingleMediaUploader.vue'
import MultipleImageUploader from '@/components/base/MultipleImageUploader.vue'
import { Plus, Delete, Edit } from '@element-plus/icons'
import VueDraggable from 'vuedraggable'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import pagesService from '@/services/pagesService'
import sliderService from '@/services/sliderService'
import productService from '@/services/productService'
import { ElNotification } from 'element-plus'

const store = useStore()
const props = defineProps({
  home: {
    type: Array,
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
let homes = ref({
  banner: '',
  text_image1: '',
  text_image2: '',
  line_image: '',
  line_media: '',
  content_image1: '',
  content_image2: '',
  instagram: [],
  deleted_files: [],
  slider: [],
  content: {
    banners: {},
    product: {},
    line: {},
    line_2: [{},{}],
    new_products: [],
    popular: [],
    bestsellers: [],
  },
  meta_description: '',
  meta_title: '',
  meta_h1: '',
  meta_keywords: '',
})

watch(() => props.home, () => {
  homes.value = props.home
})
onMounted(async () => {
  const { data: { data: data } } = await productService.load()
  products.value = data
  homes.value.deleted_files=[]
})

const updateHome = async () => {
  if (homes.value.instagram.length<4 || homes.value.instagram.length>8){
    ElNotification.warning('Instagram изображения должен быть минумиум 4, максимум 8')
    return
  }
  homes.value.content.new_products=homes.value.content.new_products.map(product=>({id:product.id, name:product.name,logo:product.logo??'',vendor_code:product.vendor_code}))
  homes.value.content.bestsellers=homes.value.content.bestsellers.map(product=>({id:product.id, name:product.name,logo:product.logo??'',vendor_code:product.vendor_code}))
  homes.value.content.popular=homes.value.content.popular.map(product=>({id:product.id, name:product.name,logo:product.logo??'',vendor_code:product.vendor_code}))
  homes.value.content.product=({
    id:homes.value.content.product.id,
    name:homes.value.content.product.name,
    title:homes.value.content.product.title,
    description:homes.value.content.product.description,
    color:homes.value.content.product.color,
    background_color:homes.value.content.product.background_color,
  })
  await pagesService.update(homes.value.name, homes.value)
}

// Line 1
const handleLineImageChanged = (file) => {
  homes.value.lineImage = file.raw
}
const handleLineImageRemoved = async () => {
  homes.value.lineImage = ''
  homes.value.line_image = ''
}
const handleMediaChanged = (file) => {
  homes.value.lineMedia = file.raw
}
const handleMediaRemoved = async () => {
  homes.value.lineMedia = ''
}

// Slider
const deleteSlide = async (slide) => {
  await sliderService.remove(slide.id)
  homes.value.slider = homes.value.slider.filter(el => el.id !== slide.id)
}
const showSlideDialog = async (row) => {
  newSlide.value = false
  slide.value = row
  dialogSlideVisible.value = true
}
const addNewSlide = async () => {
  newSlide.value = true
  slide.value={model_id:homes.value.id,model_type: "App\\Models\\Page"}
  dialogSlideVisible.value = true
}
const handleSlideChanged = (file) => {
  slide.value.image_upload = file.raw
  slide.value.image = file
}
const handleSlideRemoved = async () => {
  slide.value.image_upload = ''
  slide.value.image = ''
}
const onMove = () => {
  for (let [index, item] of homes.value.slider.entries()) {
    item.order = index
  }
  sliderService.updateOrder(homes.value.slider)
}
const saveSlide = async () => {
  // Create
  if (newSlide.value) {
    const {data:data}=await sliderService.create(slide.value)
    homes.value.slider.push(data)
  } else {
    // Update
    await sliderService.update(slide.value.id, slide.value)
    slide.value = []
  }
  dialogSlideVisible.value = false
}

// NEW Product
const deleteNewProduct = (newProduct) => {
  homes.value.content.new_products = homes.value.content.new_products.filter(el =>
      el.id !== newProduct.id
  )
}
const onMoveNewProduct = () => {
  for (let [index, item] of homes.value.content.new_products.entries()) {
    item.order = index
  }
}

// Popular Product
const deletePopularProduct = (newProduct) => {
  homes.value.content.popular = homes.value.content.popular.filter(el =>
      el.id !== newProduct.id
  )
}
const onMovePopularProduct = () => {
  for (let [index, item] of homes.value.content.popular.entries()) {
    item.order = index
  }
}

// BestSeller Product
const deleteBestSellerProduct = (newProduct) => {
  homes.value.content.bestsellers = homes.value.content.bestsellers.filter(el =>
      el.id !== newProduct.id
  )
}
const onMoveBestSellerProduct = () => {
  for (let [index, item] of homes.value.content.bestsellers.entries()) {
    item.order = index
  }
}

// Line 2
const handleLine2Image1Changed = (file) => {
  homes.value.contentImage1 = file.raw
  homes.value.content_image_1 = file
}
const handleLine2Image1Removed = async () => {
  homes.value.contentImage1 = ''
  homes.value.content_image1 = ''
}
const handleLine2Image2Changed = (file) => {
  homes.value.contentImage2 = file.raw
  homes.value.content_image_2 = file
}
const handleLine2Image2Removed = async () => {
  homes.value.contentImage2 = ''
  homes.value.content_image2 = ''
}

// Продукт
const handleBannerChanged = (file) => {
  homes.value.banner_upload = file.raw
  homes.value.banner = file
}
const handleBannerRemoved = async () => {
  homes.value.banner_upload = ''
  homes.value.banner = ''
}
/*const handlePictureCardPreview=(file) => {
  dialogImageUrl.value=file.url
  dialogVisible.value=true
}*/

// Instagram
const handleInstagramChanged = (file,fileList) => {
  homes.value.instagram = fileList
}
const handleInstagramRemoved = async (file,fileList) => {
  homes.value.instagram = []
  homes.value.instagram = fileList
  if (file.id) {
    homes.value.deleted_files.push(file.id)
  }
}

</script>

<style scoped>

</style>
