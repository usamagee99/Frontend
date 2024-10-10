export default defineEventHandler(async event=>{
    const params = getQuery(event)
    const resp = await $fetch('http://127.0.0.1:8000/api/token',{
        method: 'POST',
        body: {
          email: params["email"],
          password: params["password"]
        }})
    console.log('auth response : ', resp)

    // const deviceData = {
    //     total: resp.total,
    //     page: resp.page,
    //     data: resp.data
    // }
    return resp
})