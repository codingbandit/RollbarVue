<template>
  <div>
    <h1>{{deviceId}}</h1>
    <div v-if="loading">
      <div class="loader"></div>
    </div>
    <kendo-chart
      :title-text="'Telemetry Chart'"
      :legend-position="'bottom'"
      :data-source="readings"
      :series="series"
      :value-axis="axis"
      :category-axis="categoryAxis">
    </kendo-chart>
    <kendo-datasource
      ref="dsReadings"
      :data="readings"
      :page-size="10"
      :schema-model-fields="schemaModelFields"
      :schema-model-id="'timestampDisplay'">
    </kendo-datasource>
    <kendo-grid
      :data-source-ref="'dsReadings'"
      :pageable="true"
      :sortable="true"
      :auto-bind="true">
      <kendo-grid-column :field="'timestampDisplay'" :title="'Timestamp'"></kendo-grid-column>
      <kendo-grid-column :field="'sensorType'" :title="'Sensor Type'"></kendo-grid-column>
      <kendo-grid-column :field="'humidityReading'" :title="'Humidity (%)'"></kendo-grid-column>
      <kendo-grid-column :field="'temperatureReading'" :title="'Temperature (°C)'"></kendo-grid-column>
      <kendo-grid-column :field="'waterLevelReading'" :title="'Water Level'"></kendo-grid-column>
    </kendo-grid>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import _ from "underscore";

export default {
  name: "DeviceDetail",
  props: {
    deviceId: String
  },
  data: () => {
    return {
      readings: [],
      schemaModelFields: {
        deviceId: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" },
        timestampUtc: { type: "date" },
        timestampDisplay: { type: "string" },
        sensorType: { type: "string" },
        humidityReading: { type: "number" },
        temperatureReading: { type: "number" },
        waterLevelReading: { type: "number" }
      },
      series: [
        {
          name: "Humidity",
          type: "line",
          field: "humidityReading",
          axis: "humidity",
          labels: { visible: true, format: "{0}%" }
        },
        {
          name: "Temperature",
          type: "line",
          field: "temperatureReading",
          axis: "temperature",
          labels: { visible: true, format: "{0}°C" }
        },
        {
          name: "Water Level",
          type: "line",
          field: "waterLevelReading",
          axis: "waterLevel",
          labels: { visible: true, format: "{0}" }
        }
      ],
      axis: [
        { name: "humidity", labels: { format: "{0}%" } },
        { name: "temperature", labels: { format: "{0}°C" } },
        { name: "waterLevel", labels: { format: "{0}" } }
      ],
      categoryAxis: {
        field: "timestampUtc",
        baseUnit: "minutes"
      },
      loading: false,
      message: "Status"
    };
  },
  watch: {
    deviceId: {
      immediate: true,
      handler(val) {
        if (val) {
          this.loading = true;
          axios
            .get(
              "http://localhost:7071/api/TelemetryReader?deviceid=" +
                this.deviceId
            )
            .then(
              response => {
                this.loading = false;
                var result = response.data;
                result.forEach(element => {
                  var m = moment(element.timestampUtc);
                  element.timestampUtc = new Date(element.timestampUtc);
                  element.timestampDisplay = m.format("MM/DD/YYYY hh:mm:ss A");
                });
                result = _.sortBy(result, "timestampUtc");
                this.readings = result;
              },
              () => {
                this.loading = false;
              }
            );
        }
      }
    }
  }
};
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>