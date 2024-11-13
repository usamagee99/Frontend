<!-- <template>
  <v-container class="login-container">
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field label="Email or Username" v-model="inputs.userLogin" :rules="[required]" prepend-icon="mdi-account-circle"></v-text-field>
          <v-text-field label="Password" v-model="inputs.password" :rules="[required]" type="password" prepend-icon="mdi-lock" />
          <v-card-actions>
            <v-btn class="mt-2" text="Login" type="submit" color="info" variant="tonal" :disabled="!isValid" block></v-btn>
          </v-card-actions>
        </v-form>

      </v-card-text>
    </v-card>
  </v-container>
</template> -->

<template>
  <v-container class="d-flex align-center justify-center min-vh-100">
    <v-card class="col-lg-4 col-md-6">
      <v-card-text class="text-center py-4">
        <v-btn icon href="index.html" class="mb-4">
          <v-img src="assets/img/logo.png" alt="Logo" max-width="50"></v-img>
          <span class="ml-2 d-none d-lg-block">NiceAdmin</span>
        </v-btn>

        <div class="pb-2">
          <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
          <p class="text-center small">Enter your username &amp; password to login</p>
        </div>

        <v-form @submit.prevent="submit">
          <v-text-field
            label="Username"
            v-model="inputs.username"
            :rules="[required]"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="inputs.password"
            :rules="[required]"
            type="password"
            prepend-icon="mdi-lock"
            required
          ></v-text-field>

          <v-checkbox
            v-model="inputs.remember"
            label="Remember me"
            class="mt-2"
          ></v-checkbox>

          <v-btn type="submit" color="primary" block class="mt-4">
            Login
          </v-btn>

          <v-divider class="my-4"></v-divider>

          <p class="text-center small mb-0">
            Don't have an account? <a href="pages-register.html">Create an account</a>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<!-- <script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const inputs = ref({
      username: '',
      password: '',
      remember: false,
    });
    const required = (v: string) => !!v || 'This field is required';
    
    const submit = () => {
      // Handle form submission logic here
      console.log('Form submitted', inputs.value);
    };

    return { inputs, required, submit };
  },
});
</script> -->



<script setup lang="ts">
const inputs = reactive({
  userLogin: '',
  password: ''
})

const isValid = computed(() => {
  return inputs.userLogin && inputs.password;
});

const required = (value) => !!value || 'Field is required';

const submit = async () => {

  const { error } = await useFetch('/api/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userLogin: inputs.userLogin,
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

<!-- <style scoped>
.login-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 85vh;
  width: 450px;
}
</style> -->

<link href="../assets/css/main.css" rel="stylesheet"></link>