<script lang="ts">
    import ItemCard from "./ItemCard.svelte";

    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    // handles pagination
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import * as Pagination from "$lib/components/ui/pagination/index.js";

    // REVISE: Placeholder product item
    type Product = {
        id: number;
        itemName: string;
        image: string;
        itemDescription: string;
        price: number;
        seller: string;
        category: string;
    };

    // REVISE: Placeholder list of products
    const products: Product[] = [
        {
            id: 1,
            itemName: "Laptop",
            image: "../../../../textbook.png",
            price: 999.99,
            itemDescription: "A high-performance laptop",
            seller: "Seller 1",
            category: "Dorm"
        },
        {
            id: 2,
            itemName: "Smartphone",
            image: "../../../../textbook.png",
            price: 699.99,
            itemDescription: "Latest model smartphone",
            seller: "Seller 2",
            category: "Dorm"
        },
        {
            id: 3,
            itemName: "Headphones",
            image: "../../../../textbook.png",
            price: 199.99,
            itemDescription: "Noise-cancelling headphones",
            seller: "Seller 3",
            category: "Dorm"
        },
        {
            id: 4,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 5,
            itemName: "Laptop",
            image: "../../../../textbook.png",
            price: 999.99,
            itemDescription: "A high-performance laptop",
            seller: "Seller 1",
            category: "Dorm"
        },
        {
            id: 6,
            itemName: "Smartphone",
            image: "../../../../textbook.png",
            price: 699.99,
            itemDescription: "Latest model smartphone",
            seller: "Seller 2",
            category: "Dorm"
        },
        {
            id: 7,
            itemName: "Headphones",
            image: "../../../../textbook.png",
            price: 199.99,
            itemDescription: "Noise-cancelling headphones",
            seller: "Seller 3",
            category: "Dorm"
        },
        {
            id: 8,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 9,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 10,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 11,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 12,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 13,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 14,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        },
        {
            id: 15,
            itemName: "Table",
            image: "../../../../textbook.png",
            price: 20.99,
            itemDescription: "Wooden table for dorm",
            seller: "Seller 4",
            category: "Dorm"
        }
    ];

    // REVISE & ADD BACKEND: Adjust this based on number of products in database
    let itemsPerPage = 2;

    let currentPage = 1;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    $: displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // ADD BACKEND: Logic to update displayed products based on newPage can be added here.
    function handlePageChange(newPage: number) {
        currentPage = newPage;
    }
</script>

<!--- ADD BACKEND: placeholder input visual, need to add query logic -->
<div class="p-4 sm:w-full md:w-1/2 xl:w-3/5">
    <Input />
</div>

<ScrollArea class="h-[85vh] rounded-md border p-4 pb-20">
    <!--- grid of products -->
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {#each displayedProducts as product}
            <ItemCard
                itemName={product.itemName}
                image={product.image}
                itemDescription={product.itemDescription}
                price={product.price}
                seller={product.seller}
                category={product.category}>
            </ItemCard>
        {/each}
    </div>

    <!--- pagination logic -->
    <div class="mt-6 flex justify-center">
        <Pagination.Root count={products.length} perPage={itemsPerPage}>
            {#snippet children({ pages, currentPage })}
                <Pagination.Content>
                <Pagination.Item>
                    <Pagination.PrevButton />
                </Pagination.Item>
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                    <Pagination.Item>
                        <Pagination.Ellipsis />
                    </Pagination.Item>
                    {:else}
                    <Pagination.Item isVisible={currentPage === page.value}>
                        <Pagination.Link {page} isActive={currentPage === page.value}>
                        {page.value}
                        </Pagination.Link>
                    </Pagination.Item>
                    {/if}
                {/each}
                <Pagination.Item>
                    <Pagination.NextButton />
                </Pagination.Item>
                </Pagination.Content>
            {/snippet}
        </Pagination.Root>
    </div>
</ScrollArea>
