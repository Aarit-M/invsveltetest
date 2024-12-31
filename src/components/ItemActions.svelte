<script lang="ts">
  import { Edit, Plus, Map } from 'lucide-svelte';
  import { Button } from '../components/ui/button';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let showMap = false;

  function toggleMap() {
      showMap = !showMap;
  }
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
    on:click={toggleMap}
  >
    <Map class="mr-2" /> Map
  </Button>

  {#if showMap}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div class="bg-background p-6 rounded-xl">
      <h2 class="text-xl font-semibold mb-4">Map View</h2>
      <p>Map placeholder</p>
      <button 
        class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl"
        on:click={() => showMap = false}
      >
        Close Map
      </button>
    </div>
  </div>
  {/if}
</div>
