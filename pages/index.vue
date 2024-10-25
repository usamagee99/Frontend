<template>
  <v-container class="login-container">
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field label="Email" v-model="inputs.email" prepend-icon="mdi-account-circle"></v-text-field>
          <v-text-field label="Password" v-model="inputs.password" type="password" prepend-icon="mdi-lock" />
          <v-card-actions>
            <v-btn class="mt-2" text="Login" type="submit" color="info" variant="tonal" block></v-btn>
          </v-card-actions>
        </v-form>

      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup lang="ts">
const user = useCookie<{ name: string }>('user')
const logins = useCookie<number>('logins')

const inputs = reactive({
  email: '',
  password: ''
})

const submit = async () => {

  const { error } = await useFetch('/api/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputs.email,
      password: inputs.password
    })
  })

  if (error.value === null) {
    await navigateTo({ path: '/list' })
  }
  else {
    console.log('login error : ', error.value)
    alert(error)
  }
}


</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 85vh;
  width: 450px;
}
</style>