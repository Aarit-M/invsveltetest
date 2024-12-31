<script lang="ts">
    import { X, Camera } from "lucide-svelte";
    import { Button } from "../components/ui/button";
    import { fade, slide } from 'svelte/transition';
  
    export let showAddDrawer = false;
    export let onClose: () => void;
    export let onSubmit: (item: any) => void;
  
    let title = '';
    let description = '';
    let location = '';
    let hasStandardMeasurements = false;
  
    function handleSubmit() {
      if (!title || !location) return;
      
      onSubmit({
        title,
        description,
        location,
        hasStandardMeasurements
      });
      
      resetForm();
    }
  
    function resetForm() {
      title = '';
      description = '';
      location = '';
      hasStandardMeasurements = false;
    }
  </script>
  
  {#if showAddDrawer}
  <div 
    class="fixed inset-0 bg-black/50 z-50"
    transition:fade
  >
    <div 
      class="fixed top-0 left-0 right-0 bg-background slide-in-from-top"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-14">
          <h2 class="text-xl font-semibold">Add New Item</h2>
          <button 
            class="text-muted-foreground hover:text-foreground rounded-full p-2"
            on:click={onClose}
          >
            <X class="h-6 w-6" />
          </button>
        </div>
  
        <div class="space-y-6 py-6">
          <input
            type="text"
            bind:value={title}
            placeholder="Enter Title"
            class="w-full p-3 bg-muted border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
  
          <textarea
            bind:value={description}
            placeholder="Enter Description"
            class="w-full h-32 p-3 bg-muted border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
          ></textarea>
  
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              bind:checked={hasStandardMeasurements}
              class="rounded-lg border-input bg-muted text-primary focus:ring-primary"
            />
            <span class="text-sm">Does this item have standard measurements?</span>
          </label>
  
          <div class="relative">
            <input
              type="text"
              bind:value={location}
              placeholder="Location"
              class="w-full p-3 pr-12 bg-muted border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <button 
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-full p-1"
            >
              <Camera class="h-5 w-5" />
            </button>
          </div>
  
          <button
            class="w-full py-3 bg-[#2F5233] hover:bg-[#234024] text-white rounded-xl transition-colors"
            on:click={handleSubmit}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  </div>
  {/if}