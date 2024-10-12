<template>
    <v-container class="login-container">
        <v-card>
            <v-card-text>
                <v-form @submit.prevent="submit">
                    <v-text-field label="Email" v-model="email" prepend-icon="mdi-account-circle"></v-text-field>
                    <v-text-field label="Password" v-model="password" type="password" prepend-icon="mdi-lock" />
                </v-form>
                <v-card-actions>
                    <v-btn class="mt-2" text="Login" type="submit" color="info" variant="tonal" block></v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const user = useCookie<{ name: string }>('user')
const logins = useCookie<number>('logins')

// const name = ref('')

// const login = () => {
//   logins.value = (logins.value || 0) + 1
//   user.value = { name: name.value }
// }

// const logout = () => {
//   user.value = null
// }


const email = ref('')

const password = ref('')

const submit = async (event) => {

    console.log('submit clicked : ')

    // const results = await event

    const { data } = await useFetch('/api/login', {
        method: 'POST',
        params: {
            email: email.value,
            password: password.value
        }
    })

    // console.log('auth-resp on client : ', data.value)

    // auth.value = data.value.access_token

    // this.loading = false

    // alert(JSON.stringify(results, null, 2))
}


</script>

<style scoped>
.v-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-container {
    display: flex;
    justify-content: center;
    min-height: 85vh;
    width: 450px;
    /* background-color:blue; */
}
</style>