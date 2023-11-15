<template>
    <!-- Product list container -->
    <div class="product-list">
    <ul>
    <!-- Product list item -->
    <!-- Use Vue's 'v-for' directive to loop through the products array -->
    <li class="product-item" v-for="product in products" :key="product.id">
    <!-- Display the product name -->
    <span class="product-name">{{ product.name }}</span>
    
    <!-- Container for action links -->
    <div class="action-links">
    <!-- Link to edit the product -->
    <!-- Use Vue Router's 'router-link' component to create a navigation link -->
    <!-- Use Vue's 'v-bind' directive (shorthand ':') to bind the 'to' prop with route data -->
    <router-link class="edit-link" :to="{ name: 'EditProduct', params: { id: product.id } }">Edit</router-link>
    
    <!-- Link to view product details -->
    <router-link class="details-link" :to="{ name: 'ProductDetail', params: { id: product.id } }">View Details</router-link>
    
    <!-- Button to delete the product -->
    <!-- Use Vue's 'v-on' directive (shorthand '@') to bind the click event with the 'deleteProduct' method -->
    <button class="delete-button" @click="deleteProduct(product.id)">Delete</button>
    </div>
    </li>
    </ul>
    </div>
    </template>
    
    <script>
    import axios from '@/axios'; // Import the axios instance
    
    export default {
    // Component data
    data() {
    return {
    // Initialize products as an empty array
    products: []
    };
    },
    methods: {
    // Method to delete a product
    async deleteProduct(id) {
    try {
    // Make a DELETE request to the API
    await axios.delete(`/products/${id}`);
    
    // If the request is successful, filter the deleted product out of the products array
    this.products = this.products.filter(product => product.id !== id);
    } catch (error) {
    // If an error occurs, log it to the console
    console.error("An error occurred while deleting the product:", error);
    }
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
    </script>
    
    <style scoped>
    .product-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    }
    
    .product-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 8px 0;
    border-bottom: 1px solid #ddd;
    }
    
    .product-name {
    font-weight: bold;
    font-size: 1.1em;
    }
    
    .action-links {
    display: flex;
    align-items: center;
    }
    
    .edit-link, .details-link, .delete-button {
    margin: 0 8px;
    font-size: 0.9em;
    }
    
    .edit-link, .details-link {
    text-decoration: none;
    color: #337ab7;
    }
    
    .delete-button {
    padding: 5px 10px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 4px;
    }
    
    .delete-button:hover {
    background-color: #d32f2f;
    cursor: pointer;
    }
    </style>