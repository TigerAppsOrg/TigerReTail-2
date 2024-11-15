<script lang="ts">
    import ItemCard from './ItemCard.svelte';


    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    import { Input } from "$lib/components/ui/input/index.js";

    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import { MediaQuery } from "runed";
    import * as Pagination from "$lib/components/ui/pagination/index.js";

    function handlePageChange(newPage: number) {
        currentPage = newPage;
        // Logic to update displayed products based on newPage can be added here.
    }

    let itemsPerPage = 4; // Adjust this to match your items per page
    $: displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    { id: 5, itemName: "Laptop2", image: "../../../../textbook.png", price: 999.99, itemDescription: "A high-performance laptop", seller: "Seller 1" },
    { id: 6, itemName: "Smartphone2", image: "../../../../textbook.png", price: 699.99, itemDescription: "Latest model smartphone", seller: "Seller 2" },
    { id: 7, itemName: "Headphones2", image: "../../../../textbook.png", price: 199.99, itemDescription: "Noise-cancelling headphones", seller: "Seller 3" },
    { id: 8, itemName: "Table2", image: "../../../../textbook.png", price: 20.99, itemDescription: "Wooden table for dorm", seller: "Seller 4" }
    ];

    function handlePageChange(newPage: number) {
        currentPage = newPage;
        // Logic to update displayed products based on newPage can be added here.
    }

    // CHANGE THIS VAR
    let itemsPerPage; // Adjust this to match your items per page
    $: displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(products.length / itemsPerPage); // Adjust this number based on items per page.
    let currentPage = 1;

    function updateItemsPerPage() {
        const width = window.innerWidth;
        if (width < 640) {
            itemsPerPage = 1 * 2; // 1 column, 2 rows (example)
        } else if (width < 768) {
            itemsPerPage = 2 * 2; // 2 columns, 2 rows
        } else if (width < 1024) {
            itemsPerPage = 3 * 2; // 3 columns, 2 rows
        } else if (width < 1280) {
            itemsPerPage = 4 * 2; // 4 columns, 2 rows
        } else {
            itemsPerPage = 5 * 2; // 5 columns, 2 rows
        }
    }

    onMount(() => {
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    });
    
</script>

<div class="p-4 sm:w-full md:w-1/2 xl:w-3/5">
    <Input />
</div>

<ScrollArea class="border-dashed h-[100vh] w-[] rounded-md border p-4">
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

     <div class="mt-4 flex justify-center">
        <Pagination.Root count={totalPages} on:change={(e) => handlePageChange(e.detail)}>
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