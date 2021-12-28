<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Страницы
          </h3>
        </div>
      </div>
      <div class="card-body">
        <el-tabs
          v-model="activeName"
        >
          <el-tab-pane
            label="Главная"
            name="home"
          >
            <Home :home="homes" />
          </el-tab-pane>
          <el-tab-pane
            label="Каталог"
            name="catalog"
          >
            <Catalog :catalog="catalogs" />
          </el-tab-pane>
          <el-tab-pane
            label="О компании"
            name="about"
          >
            <About
              :about="abouts"
            />
          </el-tab-pane>
          <el-tab-pane
            label="Контакты"
            name="contacts"
          >
            <Contacts :contact="contacts" />
          </el-tab-pane>
          <el-tab-pane
            label="Помощь"
            name="help"
          >
            <Help :help="helps" />
          </el-tab-pane>
          <el-tab-pane
            label="Документы"
            name="documents"
          >
            <Documents :document="documents" />
          </el-tab-pane>
          <el-tab-pane
            label="Сотрудничество"
            name="cooperation"
          >
            <Cooperation :cooperation="collaborations" />
          </el-tab-pane>
          <el-tab-pane
            label="Аренда Студии"
            name="studioRent"
          >
            <StudioRent :studio="studios" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import About from '@/pages/pages/About.vue'
import Contacts from '@/pages/pages/Contacts.vue'
import Help from '@/pages/pages/Help.vue'
import Documents from '@/pages/pages/Documents.vue'
import Cooperation from '@/pages/pages/Cooperation.vue'
import Home from '@/pages/pages/Home.vue'
import Catalog from '@/pages/pages/Catalog.vue'
import StudioRent from '@/pages/pages/StudioRent.vue'
import pagesService from '@/services/pagesService'

import { onMounted, ref } from 'vue'

const store = useStore()
import { useStore } from 'vuex'

let loading = ref(false)
let activeName = ref('home')
let abouts = ref({})
let contacts = ref({})
let documents = ref({})
let helps = ref({})
let collaborations = ref({})
let homes = ref({})
let catalogs = ref({})
let studios = ref({})
onMounted(async () => {
  const { data: dataPages } = await pagesService.loadPages()
  abouts.value = dataPages.filter(el => el.name === 'about')[0]
  contacts.value = dataPages.filter(el => el.name === 'contact')[0]
  helps.value = dataPages.filter(el => el.name === 'help')[0]
  documents.value = dataPages.filter(el => el.name === 'document')[0]
  collaborations.value = dataPages.filter(el => el.name === 'cooperation')[0]
  homes.value = dataPages.filter(el => el.name === 'home')[0]
  catalogs.value = dataPages.filter(el => el.name === 'catalog')[0]
  studios.value = dataPages.filter(el => el.name === 'studio_rent')[0]
})

</script>

<style>
.el-tabs__content {
  overflow: inherit !important;
}
</style>
