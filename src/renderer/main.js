import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import elementLocale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, {locale: elementLocale})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Vue.prototype.$db = db

// let initialSetup = {hasBeenSetUp: true}
// let userCredentials = {
//   defaultSystemVariables: {
//     companyName: 'Yellow Code',
//     companyAddress: 'P.O.BOX SK',
//     companyContact: '0275762217',
//     companyLogo: '',
//     defaultMeasurement: 'Foot',
//     defaultPrice: 1.2
//   }
//
// }

// db.insert(initialSetup, userCredentials, (err, newDocs) => {
//   if (!err) {
//     console.log('success')
//   }
// })
// let check = true
// db.find({hasBeenSetUp: true}, (err, docs) => {
//   if (docs !== []) {
//     check = true
//   } else {
//     check = false
//   }
//   if (err) {
//     console.log(err)
//   }
// })
//
// if (!check) {
//
// } else {
//   // skip
// }

let doc = {
  _id: 'idMain112233',
  defaultSystemVariables: {
    companyName: 'Possible X creative services',
    companyAddress: 'P.O.BOX SK',
    companyContact: '0246571014',
    companyLogo: '',
    defaultMeasurement: 'Foot',
    defaultPrice: 1.2
  }
}

db.find({hasBeenRun: { $exists: true }}, (err, docs) => {
  if (err) {
    console.log('inside main.js check docs error', err)
  } else {
    if (docs.length !== 0) {
      console.log('skipping initial entry')
    } else {
      db.insert([{hasBeenRun: true}, doc], (err, newDoc) => { // Callback is optional
        if (err) {
          console.log(err)
        } else {
          console.log('initial entry successful')
        }
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
      })
    }
  }
})
