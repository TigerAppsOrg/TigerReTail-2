<script lang="ts">
    import * as Carousel from "$lib/components/ui/carousel/";
</script>

<section class="w-full rounded-lg border border-std p-6 shadow-sm">
    <div>
        <article>
            <h3>Current Listings</h3>
            <Carousel.Root>
                <Carousel.Content>
                    <Carousel.Item class="md:basis-1/2 lg:basis-1/3"
                        >...</Carousel.Item>
                    <Carousel.Item class="md:basis-1/2 lg:basis-1/3"
                        >...</Carousel.Item>
                    <Carousel.Item class="md:basis-1/2 lg:basis-1/3"
                        >...</Carousel.Item>
                </Carousel.Content>
            </Carousel.Root>
        </article>
        <article>
            <h3>Past Listings</h3>
        </article>
    </div>
</section>
