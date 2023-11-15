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
    
        <router-link class="edit-link" :to="{ name: 'EditProduct', params: { id: product.id } }">Edit</router-link>

<!-- Link to view product details -->
<router-link class="details-link" :to="{ name: 'ProductDetails', params: { id: product.id } }">View Details</router-link>
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
products: [],
}
},
methods:{
    async deleteProduct(id){
        try {
            // make a delete request to the api
            await axios.delete(`/products/${id}`);
            //if the request is successful, filter the deleted product out of the products array
            this.products = this.products.filter(product => product.id !== id);
             //if the error occurs , log it to the console
        } catch (error) {
           console.error("An error occured while deleting the product:", error)
           console .error("Response data:", error.response.data);
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

</style>