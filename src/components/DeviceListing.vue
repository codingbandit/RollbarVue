<template>
    <table>
        <tr><th>Device ID</th></tr>
        <tr v-for="device in devices" :key="device.id">
            <td><a href="#" @click="deviceSelected(device.id)">{{device.id}}</a></td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'DeviceListing',
    props: {
        devices: Array
    },
    methods: {
        deviceSelected(id){
            this.$emit('device-selected', id)
        }
    }
}
</script>

<style scoped>
</style>