<template>
    <!-- <NuxtLayout> -->
  <v-app>
    <v-container>
    <v-card>
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Username" v-model="name" prepend-icon="mdi-account-circle" />
          <v-text-field label="Password" v-model="password" type="password" prepend-icon="mdi-lock" />
        </v-form>
      </v-card-text>
      <!-- <v-btn color="info">Login</v-btn> -->
      <v-card-actions>
        <v-btn color="info" variant="tonal">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  </v-app>    
  <!-- </NuxtLayout> -->
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
      };
    },
    methods: {
      handleSubmit() {
        // Validate form data here
        if (!this.name || !this.email) {
          return;
        }
  
        // Send form data to server using API call or other method
        console.log('Form data:', this.name, this.email);
      },
    },
  };
  </script>