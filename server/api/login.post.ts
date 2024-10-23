interface Params {
    email?: string,
    password?: string
}

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody<Params>(event)
    console.log('login.post.ts > email : ', email)
    console.log('login.post.ts > password : ', password)
    if (typeof email === 'string' && typeof password === 'string') {
        if (email.length >= 8 && password.length >= 8) {
            const result = await $fetch('https://devices.utnt.net/utnt_fastapi_server/api/token',{
                method: 'POST',
                body: {
                  email: email,
                  password: password
                }})
                console.log('login.post.ts > result : ', result)
            if (result && result !== undefined) {
                console.log('login.post.ts > result && result !== undefined : ', result)
                await setUserSession(event, {
                    user: true,
                    token: result.access_token
                })
                return { error: null }
            }
        }
    }

    console.log('login.post.ts > result -- login failed : ', result)

    return { error: 'login failed' }
})