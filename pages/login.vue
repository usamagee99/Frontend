<template>
    <v-sheet class="mx-auto" max-width="300">
      <v-form @submit.prevent="submit">
        <v-text-field
          label="Username"
          v-model="email" prepend-icon="mdi-account-circle"
        ></v-text-field>
        <v-text-field label="Password" v-model="password" type="password" prepend-icon="mdi-lock" />
  
        <v-btn
          :loading="loading"
          class="mt-2"
          text="Submit"
          type="submit"
          block
        ></v-btn>
      </v-form>
    </v-sheet>
</template>


<script>
  const auth = useCookie('auth-cookie')
  export default {
    data: () => ({
    //   loading: false,
      //rules: [value => vm.checkApi(value)],
    //   timeout: null,
      email: '',
      password: '',
    //   auth: useCookie('auth-cookie')
    }),

    methods: {
      async submit (event) {

        console.log('submit clicked : ')
        console.log('submit email : ', this.email)

        const results = await event

        const { data } = await useFetch('/api/login', {
            method: 'POST',
            params: {
                email: this.email,
                password: this.password
            }
        })

        console.log('auth-resp on client : ', data.value)

        auth.value = data.value.access_token

        // this.loading = false

        // alert(JSON.stringify(results, null, 2))
      },
    //   async checkApi (userName) {
    //     // return new Promise(resolve => {
    //     //   clearTimeout(this.timeout)

    //     //   this.timeout = setTimeout(() => {
    //     //     if (!userName) return resolve('Please enter a user name.')
    //     //     if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')

    //     //     return resolve(true)
    //     //   }, 1000)
    //     // })

    //   },
    },
  }
</script>