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
    <Drawer.Overlay class="fixed inset-0 bg-black/40" />
    <Drawer.Content class="fixed inset-x-0 bottom-0 mt-24 bg-white dark:bg-black rounded-t-[10px]">
      <div class="flex-1 p-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">Add New Item</h2>
          <button 
            class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10"
            on:click={onClose}
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div class="space-y-2">
            <Input 
              type="text" 
              placeholder="Enter Title" 
              class="bg-transparent border-0 border-b border-gray-200 dark:border-white/20 rounded-none px-0 h-12 placeholder:text-gray-400 dark:placeholder:text-white/50"
              bind:value={title} 
              required 
            />
          </div>
          <div class="space-y-2">
            <Textarea 
              placeholder="Enter Description" 
              class="bg-transparent border-0 border-b border-gray-200 dark:border-white/20 rounded-none px-0 min-h-[100px] placeholder:text-gray-400 dark:placeholder:text-white/50"
              bind:value={description} 
            />
          </div>
          <label class="flex items-center gap-2 text-gray-700 dark:text-white/80">
            <input 
              type="checkbox" 
              bind:checked={hasStandardMeasurements}
              class="rounded border-gray-200 dark:border-white/20"
            />
            Does this item have standard measurements?
          </label>
          {#if hasStandardMeasurements}
            <MeasurementSelector {title} on:change={handleMeasurementsChange} />
          {/if}
          <div class="relative">
            <Input 
              type="text" 
              placeholder="Location" 
              class="bg-transparent border-0 border-b border-gray-200 dark:border-white/20 rounded-none px-0 h-12 placeholder:text-gray-400 dark:placeholder:text-white/50 pr-10"
              bind:value={location} 
              required 
            />
            <Camera class="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-white/50" />
          </div>
          <div class="pt-4">
            <Button 
              type="submit" 
              class="w-full bg-[#2F5233] hover:bg-[#234024] text-white h-12"
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>