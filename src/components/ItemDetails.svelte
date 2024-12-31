<script lang="ts">
  import { Button } from "../components/ui/button";
  import { Drawer } from "vaul-svelte";
  import { X, MapPin, Edit, Map, Plus } from 'lucide-svelte';
  import EditItemDrawer from "./EditItemDrawer.svelte";
  import AddItemDrawer from "./AddItemDrawer.svelte";
  import { createEventDispatcher } from 'svelte';

  export let show = false;
  export let item: any;
  export let onClose: () => void;
  export let onUpdate: (item: any) => void;

  let showEditDrawer = false;
  let showAddDrawer = false;
  let showMap = false;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    showEditDrawer = true;
  }

  function handleEditSubmit(updatedItem) {
    item = { ...item, ...updatedItem };
    onUpdate(item);
    showEditDrawer = false;
  }

  function handleAddItem() {
    showAddDrawer = true;
  }

  function handleAddItemSubmit(newItem) {
    dispatch('addItem', newItem);
    showAddDrawer = false;
  }

  function handleShowMap() {
    showMap = true;
  }
</script>

<Drawer.Root bind:open={show}>
  <Drawer.Portal>
    <Drawer.Overlay class="fixed inset-0 bg-black/40" />
    <Drawer.Content 
      class="fixed right-0 top-0 h-full w-[400px] bg-white dark:bg-black transform transition-transform duration-300 ease-in-out data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full"
    >
      <div class="flex flex-col h-full p-6">
        <div class="flex justify-end mb-6">
          <button 
            class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10"
            on:click={onClose}
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="flex-1">
          <h2 class="text-2xl font-semibold mb-4">{item.title}</h2>
          {#if item.description}
            <p class="text-gray-600 dark:text-white/80 mb-6">{item.description}</p>
          {/if}
          <div class="flex items-center gap-2 text-gray-500 dark:text-white/60 mb-6">
            <MapPin class="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          {#if item.measurements}
            <div class="mb-6">
              <h3 class="text-gray-700 dark:text-white/80 font-medium mb-2">Measurements</h3>
              <ul class="space-y-2">
                {#each Object.entries(item.measurements) as [key, value]}
                  <li class="text-gray-600 dark:text-white/60">{key}: {value.value} {value.unit}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>

        <div class="space-y-2">
          <Button 
            class="w-full bg-[#684D7D] hover:bg-[#4D3960] text-white h-12"
            on:click={handleEdit}
          >
            <Edit class="h-4 w-4 mr-2" />
            Edit Item
          </Button>
          <div class="grid grid-cols-2 gap-2">
            <Button 
              class="bg-[#2F5233] hover:bg-[#234024] text-white h-12"
              on:click={handleAddItem}
            >
              <Plus class="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button 
              class="bg-[#684D7D] hover:bg-[#4D3960] text-white h-12"
              on:click={handleShowMap}
            >
              <Map class="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>

<EditItemDrawer
  bind:showEditDrawer
  {item}
  onClose={() => showEditDrawer = false}
  onSubmit={handleEditSubmit}
/>

<AddItemDrawer
  bind:showAddDrawer
  onClose={() => showAddDrawer = false}
  onSubmit={handleAddItemSubmit}
/>

{#if showMap}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">Map View</h2>
      <p class="text-gray-600 dark:text-gray-300">Map placeholder for {item.title}</p>
      <Button 
        class="mt-4 w-full bg-[#684D7D] hover:bg-[#4D3960] text-white"
        on:click={() => showMap = false}
      >
        Close Map
      </Button>
    </div>
  </div>
{/if}