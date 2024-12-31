<script lang="ts">
    import { Edit, Plus, Map } from 'lucide-svelte';
    import { Button } from '../components/ui/button';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="grid grid-cols-3 gap-4">
    <Button 
      variant="secondary" 
      class="w-full col-span-3"
      on:click={() => dispatch('edit')}
    >
      <Edit class="mr-2" /> Edit Item
    </Button>
    <Button 
      class="w-full bg-primary col-span-2"
      on:click={() => dispatch('addItem')}
    >
      <Plus class="mr-2" /> Add Item
    </Button>
    <Button 
      variant="secondary" 
      class="w-full"
      on:click={() => dispatch('showMap')}
    >
      <Map class="mr-2" /> Map
    </Button>
  </div>