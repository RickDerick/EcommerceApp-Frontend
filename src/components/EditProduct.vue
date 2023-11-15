
<template>
  <div class="edit-product">
    <form @submit.prevent="submitForm" class="edit-product-form">
      <input class="input-field" v-model="product.name" placeholder="Product Name" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>

      <input class="input-field" v-model="product.description" placeholder="Product Description" />
      <p v-if="errors.description" class="error">{{ errors.description }}</p>

      <input class="input-field" v-model="product.price" placeholder="Product Price" />
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
        id: null,
        name: '',
        description: '',
        price: '',
      },
      errors: {},
    };
  },
  created() {
    // Getting the product ID from the route params
    this.product.id = this.$route.params.id;

    // Fetching product data from the server
    this.fetchProduct();
  },
  methods: {
    // Input validation function
    validateInput() {
      const errorMessages = {};
      if (!this.product.name) errorMessages.name = 'Name is required';
      if (!this.product.description) errorMessages.description = 'Description is required';
      if (!this.product.price || isNaN(this.product.price)) errorMessages.price = 'Price is required and must be a number';
      return errorMessages;
    },
    // Form submission function
    async submitForm() {
      const errorMessages = this.validateInput();
      if (Object.keys(errorMessages).length > 0) {
        this.errors = errorMessages;
        return;
      }

      // Sending updated product data to the server
      try {
        await axios.put(`/products/${this.product.id}`, this.product);
        // Upon successful update, redirecting to the Product List page
        this.$router.push('/');
      } catch (error) {
        console.error('An error occurred while updating the product:', error);
        if (error.response && error.response.status === 422) {
          // Handling server-side validation errors
          this.errors = error.response.data.errors;
        }
      }
    },
    // Fetching product data from the server
    async fetchProduct() {
      try {
        const response = await axios.get(`/products/${this.product.id}`);
        this.product.name = response.data.name;
        this.product.description = response.data.description;
        this.product.price = response.data.price;
      } catch (error) {
        console.error('An error occurred while fetching the product:', error);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.edit-product {
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
  background-color: #FF9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #e68a00;
}
</style>
