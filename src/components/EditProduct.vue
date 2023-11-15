<template>
    <div class="edit-product">
      <form @submit.prevent="submitForm" class="edit-product-form">
        <input class="input-field" v-model="product.name" placeholder="Product Name">
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
        <input class="input-field" v-model="product.description" placeholder="Product Description">
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
        <input class="input-field" v-model="product.price" placeholder="Product Price">
        <p v-if="errors.price" class="error">{{ errors.price }}</p>
        <button type="submit" class="submit-button">Update Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '@/axios';
  
  export default {
    data() {
      return {
        product: {
          'id': null,
          'name': '',
          'description': '',
          'price': ''
        },
        errors: {}
      }
    },
  
    methods: {
      validateInput() {
        const errors = {};
        if (!this.product.name) errors.name = "Name is required";
        if (!this.product.description) errors.description = "Description is required";
        if (!this.product.price || isNaN(this.product.price)) errors.price = "Price is required and must be a number";
        return errors;
      },
  
      async submitForm() {
        // Validate the input fields
        const errors = this.validateInput();
        this.errors = errors;
  
        // If there are errors, stop form submission
        if (Object.keys(errors).length > 0) return;
  
        try {
          // Send a PUT request to update the product
          await axios.put(`/products/${this.product.id}`, this.product.value);
  
          // Redirect to the product list page
          this.$router.push("/");
        } catch (error) {
          console.error("An error occurred while updating the product", error);
          console.error("Response data:", error.response.data);
        }
      },
       // Lifecycle hook that is called after the instance has been created
async created() {
try {
// When the component is created, fetch the products from the API
const response = await axios.get('http://localhost:8000/api/products');
// Update the products array with the data from the API
this.products = response.data;
} catch (error) {
// If an error occurs, log it to the console
console.error("An error occurred while fetching the products:", error);
}
}
    }
  }
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  .error {
color: red;
}
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
  