<script lang="ts">
  import { Button } from "../components/ui/button";
  import { Drawer } from "vaul-svelte";
  import { X, MapPin, Edit, Map } from 'lucide-svelte';
  import EditItemDrawer from "./EditItemDrawer.svelte";

  export let show = false;
  export let item: any;
  export let onClose: () => void;
  export let onUpdate: (item: any) => void;

  let showEditDrawer = false;

  function handleEdit() {
    showEditDrawer = true;
  }

  function handleEditSubmit(updatedItem) {
    item = { ...item, ...updatedItem };
    onUpdate(item);
    showEditDrawer = false;
  }
</script>

<Drawer.Root bind:open={show}>
  <Drawer.Portal>
    <Drawer.Overlay class="fixed inset-0 bg-black/40" />
    <Drawer.Content 
      class="bg-[#121212] fixed bottom-0 right-0 top-0 flex w-[400px] flex-col border-l border-zinc-800 shadow-xl transition-transform duration-300 ease-in-out data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full"
    >
      <div class="flex items-center justify-between p-4 border-b border-zinc-800">
        <button 
          class="rounded-full p-2 hover:bg-zinc-800 transition-colors"
          on:click={onClose}
        >
          <X class="h-5 w-5 text-zinc-400" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <div class="aspect-square w-full bg-zinc-900 rounded-xl mb-4"></div>
        <h2 class="text-xl font-semibold text-white mb-2">{item.title}</h2>
        {#if item.description}
          <p class="text-zinc-300 mb-4">{item.description}</p>
        {/if}
        <div class="flex items-center gap-2 text-zinc-400 mb-6">
          <MapPin class="h-4 w-4" />
          <span>{item.location}</span>
        </div>
        {#if item.measurements}
          <div class="mb-6">
            <h3 class="text-sm font-medium text-zinc-300 mb-2">Measurements</h3>
            <div class="space-y-1">
              {#each Object.entries(item.measurements) as [key, value]}
                <div class="text-zinc-400">{key}: {value.value} {value.unit}</div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      <div class="p-4 border-t border-zinc-800 space-y-2">
        <Button 
          class="w-full bg-[#684D7D] hover:bg-[#523D63] text-white"
          on:click={handleEdit}
        >
          <Edit class="h-4 w-4 mr-2" />
          Edit Item
        </Button>
        <div class="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            class="bg-[#2F5233] hover:bg-[#234024] text-white border-0"
          >
            Add Item
          </Button>
          <Button 
            variant="outline" 
            class="bg-[#684D7D] hover:bg-[#523D63] text-white border-0"
          >
            <Map class="h-4 w-4 mr-2" />
            Map
          </Button>
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