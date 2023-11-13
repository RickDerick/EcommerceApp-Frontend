<template>
    <form @submit.prevent="submitForm" class="add-product-form">
      <input class="input-field" v-model="name" placeholder="Product Name">
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
      <input class="input-field" v-model="description" placeholder="Product Description">
      <p v-if="errors.description" class="error">{{ errors.description }}</p>
      <input class="input-field" v-model="price" placeholder="Product Price">
      <p v-if="errors.price" class="error">{{ errors.price }}</p>
  
      <button type="submit" class="submit-button">Add Product</button>
    </form>
  </template>
  
  <script>
 import axios from '@/axios';
  
  export default {
    data() {
      return {
        name: "",
        description: "",
        price: "",
        errors: {},
      };
    },
    methods: {
      validateInput() {
        const errors = {};
        if (!this.name) errors.name = "Name is required";
        if (!this.description) errors.description = "Description is required";
        if (!this.price || isNaN(this.price)) errors.price = "Price is required";
        return errors;
      },
      async submitForm() {
        // Validate the input fields
        const errors = this.validateInput();
        this.errors = errors;
  
        // If there are errors, stop form submission
        if (Object.keys(errors).length > 0) return;
  
        try {
          // Send a POST request to add the product
          await axios.post("/products", {
            name: this.name,
            description: this.description,
            price: this.price,
          });
  
          // Redirect to the product list page
          this.$router.push("/");
        } catch (error) {
          console.error("An error occurred while adding the product", error);
          console.error("Response data:", error.response.data);
        }
      },
    },
  };
  </script>
  
  <style scoped >
 .add-product-form {
max-width: 400px;
margin: 20px auto;
padding: 20px;
background-color: #f9f9f9;
border-radius: 8px;
}


.input-field {
display: block;
width: 100%;
margin: 10px 0;
padding: 10px;
font-size: 1em;
}


.submit-button {
padding: 10px 20px;
background-color: #4CAF50;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
}


.submit-button:hover {
background-color: #45a049;
}
  </style>
  