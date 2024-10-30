<template>
    <NuxtLayout name="main">
      <v-app>
        <v-container>
          <!-- <v-row>
              <v-col md="2"><v-date-input label="Start Date" v-model="startDt" variant="solo-inverted"></v-date-input>    
              </v-col>
              <v-col md="2"><v-date-input label="End Date" variant="solo-inverted"></v-date-input>    
              </v-col>
              <v-col md="2"><v-btn @click="retrieveData">Click</v-btn>    
              </v-col>
            </v-row> -->
          <v-row>
            <v-col md="4"><v-row>
              <v-col md="6"><v-date-input label="Start Date" v-model="startDate"
                    variant="solo-inverted"></v-date-input></v-col>
              <v-col md="6"><v-date-input label="End Date" v-model="endDate"
                    variant="solo-inverted"></v-date-input></v-col></v-row>
            </v-col>
            <!-- <v-col md="2"><v-date-input label="End Date" variant="solo-inverted"></v-date-input>
              </v-col> -->
            <v-col md="2"><v-text-field label="Device ID" v-model="deviceId"></v-text-field></v-col>
            <v-col md="2"><v-text-field label="Vehicle #" v-model="vehicleNo"></v-text-field></v-col>
            <v-col md="2"><v-btn @click="retrieveData" color="#5865f2">Search</v-btn>
            </v-col>
          </v-row>
          <!-- <v-date-input label="Date input" variant="solo-inverted"></v-date-input> -->
        </v-container>
        <v-container>
          <v-card>
            <!-- <h3>Aggregate Amount: {{ aggrAmount }}</h3>
            <h3>Aggregate Litres: {{ aggrLitres }}</h3> -->
            <v-row>
              <v-col md="2"><v-text-field label="Aggregate Litres" v-model="aggrLitres" readonly></v-text-field></v-col>
              <v-col md="2"><v-text-field label="Aggregate Amount" v-model="aggrAmount" readonly></v-text-field></v-col>
            </v-row>
          </v-card>
          <v-card>
            <!-- <v-date-input label="Date input" variant="solo-inverted" max-width="200"></v-date-input> -->
            <v-data-table-server v-model:items-per-page="_itemsPerPage" :headers="headers" :items="serverItems"
              :items-length="totalItems" item-value="name"
              @update:options="retrieveData">
              
              <!-- <template v-slot:item.actions="{ item }">
                <v-icon small @click="viewItem(item)">mdi-eye</v-icon>
    
              </template> -->
              <template v-slot:item.date="{ item }">
                <!-- <v-icon small @click="viewItem(item)">mdi-eye</v-icon> -->
                 <!-- <p>{{item.data_readings}}</p> -->
                  <v-row>
                 <!-- <li v-for="reading in item.data_readings"> -->
                  <v-col outline>
                  <b>{{ item.date.split('T')[0]}} {{item.date.split('T')[1]}}</b>
                  </v-col>
                  
                 <!-- </li> -->
                </v-row>
              </template>
              <template v-slot:item.operators="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ item.data_readings[0].value}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.vehicles="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ item.data_readings[1].value}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.fuel="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ item.data_readings[2].value}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.litres="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ (item.data_readings[3].value/100).toFixed(2)}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.amount="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ item.data_readings[4].value}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.rate="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ (item.data_readings[5].value/100).toFixed(2)}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.totalLitres="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ item.data_readings[6].value}}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.totalAmount="{ item }">
                  <v-row>
                  <v-col outline>
                  {{ item.data_readings[7].value}}
                  </v-col>
                </v-row>
              </template>
            </v-data-table-server>
          </v-card>
        </v-container>
      </v-app>
    </NuxtLayout>
    </template>
    
    <script setup lang="ts">
    definePageMeta({
      layout: 'main'
  })
  
  import { ref } from 'vue';
  // import AppBar from '~/components/AppBar.vue';
  
  const startDate = ref<Date>(new Date(new Date().getTime()));
  const endDate = ref<Date>(new Date(new Date().getTime()));
  // const operatorId = ref<string>('');
  const deviceId = ref<string>('');
  
  const vehicleNo = ref<string>('');
  const serverItems = ref([]);
  const totalItems = ref<number>(0);
  const aggrLitres = ref<number>(0);
  const aggrAmount = ref<number>(0);
  const _itemsPerPage = ref(50);
  const _page = ref(1);
  
  const headers= [
          {
            title: 'Date',
            align: 'start',
            sortable: false,
            key: 'date',
          },
          {
            title: 'Device ID',
            align: 'center',
            sortable: false,
            key: 'device.id',
          },
          {
            title: 'Station',
            align: 'center',
            sortable: false,
            key: 'device.station.name',
          },
          // {
          //   title: 'TTL',
          //   key: 'ttl',
          //   align: 'center'
          // },
          // {
          //   title: 'Actions',
          //   value: 'actions',
          //   align: 'center',
          // }
          {
            title: 'Operator ID',
            value: 'operators',
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Vehicle #',
            value: 'vehicles',
            sortable: true,
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Fuel Type',
            value: 'fuel',
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Litres',
            value: 'litres',
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Amount',
            value: 'amount',
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Rate',
            value: 'rate',
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Total\nLitres',
            value: 'totalLitres',
            // key: 'device.station.name',
            align: 'center',
          },
          {
            title: 'Total\nAmount',
            value: 'totalAmount',
            // key: 'device.station.name',
            align: 'center',
          }
    
          // { title: 'Fat (g)', key: 'fat', align: 'end' },
          // { title: 'Carbs (g)', key: 'carbs', align: 'end' },
          // { title: 'Protein (g)', key: 'protein', align: 'end' },
          // { title: 'Iron (%)', key: 'iron', align: 'end' },
        ];
  
  const retrieveData = async ({ page, itemsPerPage }) => {
    console.log("fetchData invoked : ")
    console.log("==== itemsPerPage : ", itemsPerPage)
    if (!itemsPerPage)
    {
      itemsPerPage = _itemsPerPage.value
      console.log("==== setting itemsPerPage = _itemsPerPage.value : ", itemsPerPage)
    }
  
    if (!page)
    {
      page = _page.value
      console.log("==== setting page = _page.value : ", page)
    }
    // console.log("==== page : ", page)
    // console.log("Operator ID : ", operatorId)
    const { data } = await useFetch('/api/devicedata', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            itemsPerPage: itemsPerPage,
            startDate: startDate.value.getTime(), // + 5 * 60 * 60 * 1000, // _startDate.value,
            endDate: endDate.value.getTime(), //+ 5 * 60 * 60 * 1000, // _endDate.value
            deviceId: deviceId.value.length === 0 ? null : parseInt(deviceId.value),
            vehicleNum: vehicleNo.value.length === 0 ? null: parseInt(vehicleNo.value) // _endDate.value
  
          })
          // params: {
          //     email: email.value,
          //     password: password.value
          // }
      });
    const res = "response";
    serverItems.value = data.value.data;
    totalItems.value = data.value.total;
    aggrLitres.value = data.value.aggr_litres
    aggrAmount.value = data.value.aggr_amount
    if(page)
    {
      _page.value = page
    }
  
    if(itemsPerPage)
    {
      console.log('if itemsPerPage : ', itemsPerPage)
      _itemsPerPage.value = itemsPerPage
    }
  };
  
  </script>