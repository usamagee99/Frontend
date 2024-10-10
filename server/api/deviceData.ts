export default defineEventHandler(async event=>{
    const resp = await $fetch('https://devices.utnt.net/utnt_fastapi_server/api/filter',{
        method: 'POST',
        body: {
          // My todo data
        }})
    console.log('response : ', resp)

    const deviceData = {
        total: resp.total,
        page: resp.page,
        data: resp.data
    }
    return deviceData
})
// import nuxtStorage from 'nuxt-storage';



// export default defineEventHandler(async event=>{
//     // nuxtStorage.localStorage.setData('key123', 'value123');
//     // console.log("setting local storage : ")
//     localStorage.setItem("ATest", "12345667")
//     // console.log('response : ', resp)

//     const deviceData = {
//         total: 0,
//         page: 0,
//         data: []
//     }
//     return deviceData
// })