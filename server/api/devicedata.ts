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
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    const { startDate, endDate, page, itemsPerPage, deviceId, vehicleNum } = await readBody<Filter>(event)
    const resp = await $fetch(`${config.public.apiBaseURL}/api/filter`,{
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${session.token}`
        },
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