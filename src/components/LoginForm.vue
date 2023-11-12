<template>
    <v-sheet width="300" class="mx-auto mt-10">
      <div class="form-container">
      <form @submit.prevent="login" class="login-form">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
      outlined
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
      outlined
    ></v-text-field>

    <v-btn
      class="me-4"
      type="submit"
      color="primary"
    >
      Login
    </v-btn>

      </form>
      </div>
    
    </v-sheet>
  </template>

  <script>
  import axios from '@/axios';
  
  export default {
    name:'LoginForm',

    data(){
      return {
        name:'',
        email: '',
      }
    },
    methods:{
      async login(){
        try {
          const response = await axios.post ('/login', {
            email: this.email,
            password:this.password
          });
          if(response.data.token){
            localStorage.setItem('token', response.data.token);
          }
          this.$store.dispatch('login');
          this.$router.push('/');
        } catch (error) {
          console.error('An error ocurred:', error);
        }

      }

    },

    computed:{
      emailRules(){
        return[
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ];
      },
      passwordRules(){
      return[
        (v)=> !!v|| "Password is required",
        (v)=>(v && v.length >=8) ||  "Password must be at least 8 characters long",
        (v) => /[A-Z]/.test(v) || "Password must contain an uppercase letter",
        (v)=> /[a-z]/.test(v) || "Password must contain a lowercase letter",
        (v) => /\d/.test(v) || "Password must contain a number",
      ];
    },
    }
   
  }
</script>
<style scoped>
.form-container {
display: flex;
justify-content: center;
align-items: center;
}


.login-form {
display: flex;
flex-direction: column;
gap: 20px;
width: 300px;
padding: 20px;
border-radius: 5px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.login-form input, .login-form button {
padding: 10px;
border-radius: 5px;
border: 1px solid #ccc;
font-size: 16px;
}


.login-form button {
background-color: #007BFF;
color: white;
cursor: pointer;
}
</style>