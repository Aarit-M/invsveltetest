<script lang="ts">
  import { Button } from "../components/ui/button";
  import { Input } from "../components/ui/input";
  import { Label } from "../components/ui/label";
  import { Textarea } from "../components/ui/textarea";
  import { Drawer } from "vaul-svelte";
  import { X, Camera } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  import MeasurementSelector from "./MeasurementSelector.svelte";

  export let showAddDrawer = false;
  export let onClose: () => void;
  export let onSubmit: (item: any) => void;

  let title = '';
  let description = '';
  let location = '';
  let hasStandardMeasurements = false;
  let measurements = {};

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    const newItem = {
      title,
      description,
      location,
      measurements: hasStandardMeasurements ? measurements : null
    };
    onSubmit(newItem);
    resetForm();
  }

  function resetForm() {
    title = '';
    description = '';
    location = '';
    hasStandardMeasurements = false;
    measurements = {};
  }

  function handleMeasurementsChange(event) {
    measurements = event.detail;
  }
</script>

<Drawer.Root bind:open={showAddDrawer}>
  <Drawer.Portal>
    <Drawer.Content class="bg-[#121212] fixed bottom-0 left-0 right-0 flex h-[85%] flex-col rounded-t-[10px] border-t border-zinc-800">
      <div class="flex items-center justify-between p-4 border-b border-zinc-800">
        <h2 class="text-xl font-semibold text-white">Add New Item</h2>
        <button 
          class="rounded-full p-2 hover:bg-zinc-800 transition-colors"
          on:click={onClose}
        >
          <X class="h-5 w-5 text-zinc-400" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <Input 
              type="text" 
              id="title" 
              bind:value={title} 
              required 
              placeholder="Enter Title"
              class="bg-transparent border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>
          <div>
            <Textarea 
              id="description" 
              bind:value={description} 
              placeholder="Enter Description"
              class="bg-transparent border-zinc-800 text-white placeholder:text-zinc-500 min-h-[100px]"
            />
          </div>
          <label class="flex items-center gap-2 text-zinc-300">
            <input 
              type="checkbox" 
              bind:checked={hasStandardMeasurements}
              class="rounded border-zinc-800 bg-transparent"
            />
            Does this item have standard measurements?
          </label>
          {#if hasStandardMeasurements}
            <MeasurementSelector {title} on:change={handleMeasurementsChange} />
          {/if}
          <div class="relative">
            <Input 
              type="text" 
              id="location" 
              bind:value={location} 
              required
              placeholder="Location"
              class="bg-transparent border-zinc-800 text-white placeholder:text-zinc-500 pr-10"
            />
            <button 
              type="button" 
              class="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
            >
              <Camera class="h-5 w-5" />
            </button>
          </div>
          <div class="text-sm text-zinc-500">
            Click the camera button and scan a new QR code to enter a new location
          </div>
          <Button 
            type="submit"
            class="w-full bg-[#2F5233] hover:bg-[#234024] text-white"
          >
            Add Item
          </Button>
        </form>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>