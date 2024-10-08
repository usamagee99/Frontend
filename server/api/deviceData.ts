export default defineEventHandler(async event=>{
    const resp = await $fetch('http://127.0.0.1:8000/api/filter',{
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