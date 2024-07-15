import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'

import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import App from './App.vue'
import router from './router'

import AllRules from '@vee-validate/rules'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
defineRule('phoneStartingWith09', (value) => {
  if (!value.startsWith('09')) {
    return '電話號碼必須以 09 開頭！'
  }
  return true
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})

setLocale('zh_TW')

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.mount('#app')
