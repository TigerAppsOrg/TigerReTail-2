<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js"
    import { Separator } from "$lib/components/ui/separator/index.js";

    export let itemName;
    export let image; 
    export let itemDescription;
    export let price;
    export let seller; 
    export let category;
</script>

<Card.Root>
  <Card.Header>
    <img src={image} alt="Image of product" width="150" height="100">
    <Separator class="my-15"/>
    <Card.Title>{itemName}</Card.Title>
    <Card.Description>{itemDescription}</Card.Description>
    <Card.Description>{category}</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>${price}</p>
  </Card.Content>
  <Card.Footer>
    <p>{seller}</p>
  </Card.Footer>
</Card.Root>
