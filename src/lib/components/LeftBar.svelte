<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  
    type Category = string;
    type Condition = string;

  const categories: Category[] = [
        "accessories",
        "beauty supplies",
        "clothing",
        "dorm essentials",
        "event tickets",
        "food",
        "furniture",
        "housing",
        "other",
        "school supplies",
        "services",
        "tech",
        "textbooks",
        "transportation"
    ];

  const conditions: Condition[] = [
        "new",
        "like new",
        "gently loved",
        "well loved",
        "poor"
    ];

  let selectedCategories: { [key: string]: boolean } = {};
  let selectedConditions: { [key: string]: boolean } = {};

  categories.forEach(category => selectedCategories[category] = false);
  conditions.forEach(condition => selectedConditions[condition] = false);

  function getSelectedItems() {
    const activeCategories = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
    const activeConditions = Object.keys(selectedConditions).filter(key => selectedConditions[key]);
    console.log("Selected Categories:", activeCategories);
    console.log("selected Conditions:", activeConditions);
  }
  </script>

<div>
    <h2 class="mb-4">Categories</h2>
    {#each categories as category}
      <div>
        <Checkbox
        />
        {category}
      </div>
    {/each}
    </div>

<div class="mt-8">
    <h2 class="mb-4">Conditions</h2>
    {#each conditions as condition}
      <div>
        <Checkbox
        />
        {condition}
      </div>
    {/each}
    </div>