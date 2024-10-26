interface Params {
    email?: string,
    password?: string
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { email, password } = await readBody<Params>(event)
    if (typeof email === 'string' && typeof password === 'string') {
        // if (email.length >= 6 && password.length >= 6) {
        const result = await $fetch(`${config.public.apiBaseURL}/api/token`, {
            method: 'POST',
            body: {
                email: email,
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