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

  </script>

<div>Categories</div>
<div> <Checkbox/> accessories </div>
<div> <Checkbox/> beauty supplies </div>
<div> <Checkbox/> clothing </div>
<div> <Checkbox/> dorm essentials </div>
<div> <Checkbox/> event tickets </div>
<div> <Checkbox/> food </div>
<div> <Checkbox/> furniture </div>
<div> <Checkbox/> housing </div>
<div> <Checkbox/> other </div>
<div> <Checkbox/> school supplies </div>
<div> <Checkbox/> services </div>
<div> <Checkbox/> tech </div>
<div> <Checkbox/> textbooks </div>
<div> <Checkbox/> transportation </div>

<div>Conditions</div>
<div> <Checkbox/> new </div>
<div> <Checkbox/> like new </div>
<div> <Checkbox/> gently loved </div>
<div> <Checkbox/> well loved </div>
<div> <Checkbox/> poor </div>