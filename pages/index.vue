<template>
    <v-app>
      <v-container>
        <!-- <v-card> -->
          <!-- <v-row>
            <v-col><v-date-input label="Start Date" variant="solo-inverted"></v-date-input>    
            </v-col>
            <v-col><v-date-input label="End Date" variant="solo-inverted"></v-date-input>    
            </v-col>
          </v-row> -->
          <!-- <v-date-input label="Date input" variant="solo-inverted"></v-date-input> -->
        <!-- </v-card> -->
      </v-container>
      <!-- <v-spacer></v-spacer> -->
      <v-container>
        <!-- <v-card>
          <v-date-input label="Date input" variant="solo-inverted" max-width="200"></v-date-input>
        </v-card> -->
        <v-card>
          <!-- <v-date-input label="Date input" variant="solo-inverted" max-width="200"></v-date-input> -->
          <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
            :items-length="totalItems" :loading="loading" :search="search" item-value="name"
            @update:options="loadItems">
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
                {{ item.data_readings[3].value/10}}
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
                {{ item.data_readings[5].value/100}}
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
  </template>
  
  <script>
  
  //   const { data, error } = await useAsyncData('fetchData', () => $fetch('/api/deviceData'));
  
  // console.log('server API resp : ', data)
  
  //const API = {
    
  //}
  
  export default {
    data: () => ({
      itemsPerPage: 40,
      totalItems: 40,
      headers: [
        {
          title: 'Date',
          align: 'start',
          sortable: false,
          // key: 'date',
          value: 'date'
        },
        {
          title: 'Device Type',
          align: 'center',
          sortable: false,
          key: 'device.device_type.type',
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
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 40,
      dialog: false,
      selectedItem: {}
    }),
    methods: {
      async fetchDeviceData({ page, itemsPerPage, sortBy }) {
      const { data } = await useFetch('/api/deviceData')
      // console.log('resp data : ', data.value)
      console.log('resp data : ', data)
      console.log('resp data.value : ', data.value)
      console.log('resp data.value.data : ', data.value.data)
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage - 1
          //       console.log('actual data : ', data.data)
          const items = data.value.data.slice()
  
          //     //   if (sortBy.length) {
          //     //     const sortKey = sortBy[0].key
          //     //     const sortOrder = sortBy[0].order
          //     //     items.sort((a, b) => {
          //     //       const aValue = a[sortKey]
          //     //       const bValue = b[sortKey]
          //     //       return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          //     //     })
          //     //   }
  
          const paginated = items.slice(start, end)
  
          resolve({ items: paginated, total: items.length })
        }, 500)
      })
    },
      async loadItems({ page, itemsPerPage, sortBy }) {
        this.loading = true
        const data = await this.fetchDeviceData({ page, itemsPerPage, sortBy })
        console.log('data : ', data)
        console.log('data.items : ', data.items)
        console.log('data.value : ', data.value)
        console.log('data.data : ', data.data)
        // { //.then(({ items, total }) => {
        //   console.log("Items : ", items)
          this.serverItems = data.items
          // this.totalItems = total
          this.loading = false
        // }
      },
  
      viewItem(item) {
        console.log('View item : ', item)
        console.log('View item.id : ', item.id)
        // Logic to edit the item
      },
  
      showDetails(item) {
        console.log('Selected Item: ', item)
        selectedItem.value = item
        dialog = true
      }
    },
  }
  </script>
  <!-- </template> -->