interface Params {
    email?: string,
    password?: string
}

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody<Params>(event)
    if (typeof email === 'string' && typeof password === 'string') {
        if (email.length >= 8 && password.length >= 8) {
            const result = await $fetch('https://devices.utnt.net/utnt_fastapi_server/api/token',{
                method: 'POST',
                body: {
                  email: email,
                  password: password
                }})
            if (result && result !== undefined) {
                await setUserSession(event, {
                    user: true,
                    token: result.access_token
                })
                return { error: null }
            }
        }
    }

    return { error: 'login failed' }
})