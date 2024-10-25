// import { verifySession } from '@/utils/db'

import { useCookie } from "nuxt/app"

const publicRoutes = [
    '/',
    '/api/login'
]

const privateRoutes = [
    '/list GET',
    '/api/user-details GET',
    '/api/devicedata POST',
    '/api/_auth/session GET',
    '/api/_auth/session DELETE'
]

export default defineEventHandler(async (event) => {
    if (!publicRoutes.includes(event.path)) {
        if(privateRoutes.includes(event.path + ' ' +event.method)){
            try{
                const session = await requireUserSession(event)

                if (event.path === '/api/_auth/session' && event.method === 'GET') {
                    await sendWebResponse(event, Response.json({ user: true }))
                  }

                if (event.path === '/api/_auth/session' && event.method === 'DELETE') {
                    await clearUserSession(event)
                  }
            }
            catch(error)
            {
                console.log('catch error : ', error)
                setCookie(event, 'nuxt-session', '')
                if(event.path.startsWith('/api/')){
                    throw error
                } else {
                    await sendRedirect(event, '/')
                }
            }
            
        } else {
            throw createError({status: 404})
        }
    }
})