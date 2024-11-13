interface Params {
    userLogin?: string,
    password?: string
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { userLogin, password } = await readBody<Params>(event)
    if (typeof userLogin === 'string' && typeof password === 'string') {
        // if (email.length >= 6 && password.length >= 6) {
        console.log('attempting to request for login')
        const result = await $fetch(`${config.public.apiBaseURL}/api/token`, {
            method: 'POST',
            body: {
                user_login: userLogin,
                password: password
            }
        })

        if (result && result !== undefined) {
            await setUserSession(event, {
                user: true,
                token: result.access_token
            })
            return { error: null }
        }
        // }
    }

    return { error: 'login failed' }
})