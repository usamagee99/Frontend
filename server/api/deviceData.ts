interface Filter {
    startDate: string,
    endDate: string,
    // operatorId: number | null,
    deviceId: number | null,
    vehicleNum: number | null,
    page: number,
    itemsPerPage: number
}


export default defineEventHandler(async (event) =>{
    // console.log('devicedata.post.ts > session : ', session)
    // console.log('devicedata.post.ts > session.token : ', session.token)
    const { startDate, endDate, page, itemsPerPage, deviceId, vehicleNum } = await readBody<Filter>(event)
    // const {session, user} = useUserSession()
    const resp = await $fetch('https://devices.utnt.net/utnt_fastapi_server/api/filter',{
        method: 'POST',
        body: {
            start_date: startDate,
            end_date: endDate,
            page: page,
            items_per_page: itemsPerPage,
            device_id: deviceId,
            vehicle_no: vehicleNum
          // My todo data
        }})

    const deviceData = {
        total: resp.total,
        page: resp.page,
        data: resp.data,
        aggr_amount: resp.aggr_amount,
        aggr_litres: resp.aggr_litres,
    }
    return deviceData
})