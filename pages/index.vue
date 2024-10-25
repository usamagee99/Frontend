<template>
  <v-container class="login-container">
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field label="Email" v-model="inputs.email" :rules="[required]" prepend-icon="mdi-account-circle"></v-text-field>
          <v-text-field label="Password" v-model="inputs.password" :rules="[required]" type="password" prepend-icon="mdi-lock" />
          <v-card-actions>
            <v-btn class="mt-2" text="Login" type="submit" color="info" variant="tonal" :disabled="!isValid" block></v-btn>
          </v-card-actions>
        </v-form>

      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup lang="ts">
const inputs = reactive({
  email: '',
  password: ''
})

const isValid = computed(() => {
  return inputs.email && inputs.password;
});

const required = (value) => !!value || 'Field is required';

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
    alert("Incorrect username or password.")
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