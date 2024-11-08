<script lang="ts">
    import ItemCard from './ItemCard.svelte';
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    type Product = {
        id: number;
        itemName: string;
        image: string; 
        itemDescription: string;
        price: number;
        seller: string;
    };

    const products: Product[] = [
    { id: 1, itemName: "Laptop", image: "../../../../textbook.png", price: 999.99, itemDescription: "A high-performance laptop", seller: "Seller 1" },
    { id: 2, itemName: "Smartphone", image: "../../../../textbook.png", price: 699.99, itemDescription: "Latest model smartphone", seller: "Seller 2" },
    { id: 3, itemName: "Headphones", image: "../../../../textbook.png", price: 199.99, itemDescription: "Noise-cancelling headphones", seller: "Seller 3" },
    { id: 4, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 1, itemName: "Laptop", image: "../../../../textbook.png", price: 999.99, itemDescription: "A high-performance laptop", seller: "Seller 1" },
    { id: 2, itemName: "Smartphone", image: "../../../../textbook.png", price: 699.99, itemDescription: "Latest model smartphone", seller: "Seller 2" },
    { id: 3, itemName: "Headphones", image: "../../../../textbook.png", price: 199.99, itemDescription: "Noise-cancelling headphones", seller: "Seller 3" },
    { id: 4, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" }
    ];
    
</script>



<ScrollArea class="h-[100vh] w-[] rounded-md border p-4">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {#each products as product}
            <ItemCard 
            itemName={product.itemName}
            image={product.image}
            itemDescription={product.itemDescription}
            price={product.price}
            seller={product.seller}
            ></ItemCard>
        {/each}
    </div>
</ScrollArea>