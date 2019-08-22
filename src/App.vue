<template>
  <div id="app">
    <DeviceListing v-bind:devices="devices" @device-selected="deviceSelected" />
    <DeviceDetail v-if="selectedDevice" v-bind:deviceId="selectedDevice"  />
  </div>
</template>

<script>
import DeviceListing from './components/DeviceListing.vue'
import DeviceDetail from './components/DeviceDetail.vue'
export default {
  name: 'app',
  components: {
    DeviceListing, DeviceDetail
  },
  data: () => {
    return {
      selectedDevice: null,
      devices: [{
        id: 'cpi3'
      }]
    }
  },
  methods: {
    deviceSelected(id) {
      this.selectedDevice = id
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
