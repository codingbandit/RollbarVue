import Vue from 'vue'
import App from './App.vue'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Chart, ChartInstaller } from '@progress/kendo-charts-vue-wrapper'
import { Grid, GridInstaller } from '@progress/kendo-grid-vue-wrapper'
import { DataSource, DataSourceInstaller} from '@progress/kendo-datasource-vue-wrapper'
var Rollbar = require('vue-rollbar')

Vue.config.productionTip = false
Vue.component(DataSource.name, DataSource)
Vue.component(Chart.name, Chart)
Vue.component(Grid.name, Grid)
Vue.use(DataSourceInstaller)
Vue.use(ChartInstaller)
Vue.use(GridInstaller)

Vue.use(Rollbar, {
  accessToken: 'YOUR_ACCESS_KEY_HERE',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  environment: 'development',
  payload: {
    client: {
         javascript: {
            code_version: '1.0',
            source_map_enabled: true,
            guess_uncaught_frames: true
         }
    }
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
