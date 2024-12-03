<script lang="ts">
    import ItemCard from './ItemCard.svelte';

    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    // handles pagination
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import { MediaQuery } from "runed";
    import * as Pagination from "$lib/components/ui/pagination/index.js";

    // REVISE: Placeholder product item
    type Product = {
        id: number;
        itemName: string;
        image: string; 
        itemDescription: string;
        price: number;
        seller: string;
    };

    // REVISE: Placeholder list of products
    const products: Product[] = [
    { id: 1, itemName: "Laptop", image: "../../../../textbook.png", price: 999.99, itemDescription: "A high-performance laptop", seller: "Seller 1" },
    { id: 2, itemName: "Smartphone", image: "../../../../textbook.png", price: 699.99, itemDescription: "Latest model smartphone", seller: "Seller 2" },
    { id: 3, itemName: "Headphones", image: "../../../../textbook.png", price: 199.99, itemDescription: "Noise-cancelling headphones", seller: "Seller 3" },
    { id: 4, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 5, itemName: "Laptop", image: "../../../../textbook.png", price: 999.99, itemDescription: "A high-performance laptop", seller: "Seller 1" },
    { id: 6, itemName: "Smartphone", image: "../../../../textbook.png", price: 699.99, itemDescription: "Latest model smartphone", seller: "Seller 2" },
    { id: 7, itemName: "Headphones", image: "../../../../textbook.png", price: 199.99, itemDescription: "Noise-cancelling headphones", seller: "Seller 3" },
    { id: 8, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 9, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 10, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 11, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 12, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 13, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 14, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    { id: 15, itemName: "Table", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" },
    ];

     // REVISE & ADD BACKEND: Adjust this based on number of products in database
    let itemsPerPage = 4; 
  
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    $: displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // ADD BACKEND: Logic to update displayed products based on newPage can be added here.
    function handlePageChange(newPage: number) {
        currentPage = newPage;
    }

</script>

<!--- ADD BACKEND: placeholder input visual, need to add query logic -->
<div class="p-4 sm:w-full md:w-1/2 xl:w-3/5">
    <Input />
</div>

<ScrollArea class="pb-20 h-[85vh] rounded-md border p-4">

    <!--- grid of products -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each displayedProducts as product}
            <ItemCard 
                itemName={product.itemName}
                image={product.image}
                itemDescription={product.itemDescription}
                price={product.price}
                seller={product.seller}
            ></ItemCard>
        {/each}
    </div>

    <!--- pagination logic -->
    <div class="mt-6 flex justify-center">
        <Pagination.Root count={totalPages} perPage={1} on:change={(e) => handlePageChange(e.detail)}>
            <Pagination.Content>
                <Pagination.PrevButton>
                    <ChevronLeft class="size-4" />
                    <span class="hidden sm:block">Previous</span>
                </Pagination.PrevButton>
                {#each Array(totalPages).fill(0).map((_, index) => ({ value: index + 1 })) as page (page.value)}
                    <Pagination.Item>
                        <Pagination.Link page={page.value} isActive={currentPage === page.value}>
                            {page.value}
                        </Pagination.Link>
                    </Pagination.Item>
                {/each}
                <Pagination.NextButton>
                    <span class="hidden sm:block">Next</span>
                    <ChevronRight class="size-4" />
                </Pagination.NextButton>
            </Pagination.Content>
        </Pagination.Root>
    </div>

</ScrollArea>