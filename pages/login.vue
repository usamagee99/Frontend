<template>
    <v-container class="login-container">
        <v-card>
            <v-card-text>
                <v-form @submit.prevent="submit">
                    <v-text-field label="Email" v-model="inputs.email" prepend-icon="mdi-account-circle"></v-text-field>
                    <v-text-field label="Password" v-model="inputs.password" type="password" prepend-icon="mdi-lock" />
                    <!-- <v-btn class="mt-2" text="Login" type="submit" color="info" variant="tonal" block></v-btn> -->
                    <v-card-actions>
                    <v-btn class="mt-2" text="Login" type="submit" color="info" variant="tonal" block></v-btn>
                </v-card-actions>
                </v-form>
                
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


// const email = ref('')

// const password = ref('')

const inputs = reactive({
  email: '',
  password: ''
})

const submit = async () => {

    console.log('Login clicked : ')

    console.log('email : ', inputs.email)
    console.log('password : ', inputs.password)

    // const results = await event

    const { error } = await useFetch('/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                email: inputs.email,
                password: inputs.password
            })
        // params: {
        //     email: email.value,
        //     password: password.value
        // }
    })

    console.log('login.vue > error : ', error.value)

    if (error.value === null)
    {
        window.location.href = "/"
    }
    else {
        console.log('login error : ', error.value)
    alert(error)
  }

    // console.log('auth-resp on client : ', data.value)

    // auth.value = data.value.access_token

    // this.loading = false

    // alert(JSON.stringify(results, null, 2))
}


</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 85vh;
    width: 450px;
    /* background-color:blue; */
}
</style>