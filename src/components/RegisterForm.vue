<template>
    <v-sheet width="300" class="mx-auto mt-10">
        <div class="form-container">
            <form @submit.prevent="register" class="register-form">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
      outlined
    ></v-text-field>

    <!-- <v-text-field
      v-model="secondname"
      :rules="nameRules"
      label="Second Name"
      required
      outlined
    ></v-text-field> -->

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
      Register
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
        password:'',
      }
    },
    methods:{
      async register(){
        try {
           await axios.post ('/register', {
            name: this.name,
            email: this.email,
            password:this.password
          });
        }
         catch (error) {
          console.error('An error ocurred:', error);

          if(error.response) {
            console.error('Error response data:', error.response.data);
          }
        }

      }

    },
    computed:{
      nameRules(){
        return[
          (v)=> !!v || "Name is required",
          (v)=> (v && v.length <= 10) || 'Name must be less than 10 characters',

        ];
      },
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


.register-form {
display: flex;
flex-direction: column;
gap: 20px;
width: 300px;
padding: 20px;
border-radius: 5px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.register-form input, .register-form button {
padding: 10px;
border-radius: 5px;
border: 1px solid #ccc;
font-size: 16px;
}


.register-form button {
background-color: #007BFF;
color: white;
cursor: pointer;
}
</style>