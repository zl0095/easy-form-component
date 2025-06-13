import './assets/main.less'
import 'virtual:svg-icons-register'

import {createApp, watch} from 'vue'
import {createPinia} from 'pinia'
import {useDarkStore} from "@/stores/dark";
import Vue3Signature from "vue3-signature"
// import gloablComponent from '@/components/SvgIcon/index'
// import { SvgIcon } from "easy-form-component";
import App from './App.vue'
import router from './router'
// import Survey from 'dist'
// import '../dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Signature)
// app.use(SvgIcon)
// app.use(Survey)

const darkStore = useDarkStore()
const content = document.getElementsByTagName('body')[0] as HTMLElement
watch(() => darkStore.isDark, function (newValue, oldValue) {
    if (newValue) {
        content.setAttribute('class', 'dark')
    } else {
        content.setAttribute('class', '')
    }
})

app.mount('#app')
