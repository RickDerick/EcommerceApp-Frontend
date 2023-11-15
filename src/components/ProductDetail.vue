<template>
    <!-- Product details container -->
    <!-- Use Vue's 'v-if' directive to render this container only if 'product' is truthy -->
    <div v-if="product" class="product-details">
    <!-- Display the product name -->
    <h2 class="product-title">{{ product.name }}</h2>
    <!-- Display the product description -->
    <p class="product-description">{{ product.description }}</p>
    <!-- Display the product price -->
    <p class="product-price">Price: ${{ product.price }}</p>
    </div>
    </template>
    
    <script>
    import axios from '@/axios'; // Import the axios instance
    
    export default {
    // Component data
    data() {
    return {
    // Initialize product as null
    product: null
    };
    },
    // Lifecycle hook that is called after the instance has been mounted
    async mounted() {
    // Get the product ID from the route params
    const productId = this.$route.params.id;
    try {
    // Make a GET request to the API to fetch the product data
    const response = await axios.get(`/products/${productId}`);
    // Update the product data with the data from the API
    this.product = response.data;
    } catch (error) {
    // If an error occurs, log it to the console
    console.error("An error occurred while fetching the product:", error);
    }
    }
    };
    </script>
    
    <style scoped>
    .product-details {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    }
    
    .product-title {
    margin-bottom: 20px;
    font-size: 2em;
    }
    
    .product-description {
    font-size: 1.2em;
    }
    
    .product-price {
    margin-top: 20px;
    font-size: 1.2em;
    font-weight: bold;
    }
    </style>