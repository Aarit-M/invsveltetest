<script lang="ts">
    import { MapPin, Edit, Map, Plus, X } from "lucide-svelte";
    import { Button } from "../components/ui/button";
    import { fade, slide } from 'svelte/transition';
  
    export let show = false;
    export let item: {
      id: string;
      title: string;
      location: string;
      description?: string;
    };
    export let onClose: () => void;
  
    let showMap = false;
  </script>
  
  {#if show}
  <div 
    class="fixed inset-0 bg-black/50 z-50"
    transition:fade
  >
    <div 
      class="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background slide-in-from-right"
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b border-border">
          <div class="w-12"></div>
          <h2 class="text-lg font-semibold">{item.title}</h2>
          <button 
            class="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full"
            on:click={onClose}
          >
            <X class="h-6 w-6" />
          </button>
        </div>
  
        <div class="flex-1 p-6 space-y-6 overflow-y-auto">
          <div class="aspect-square bg-muted rounded-xl"></div>
          
          <div>
            <h3 class="text-2xl font-semibold">{item.title}</h3>
            <p class="text-muted-foreground">{item.location}</p>
          </div>
  
          <div class="space-y-4">
            <Button 
              class="w-full py-2 bg-[#8B4D8E] hover:bg-[#7A3F7D] text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Edit class="h-5 w-5" />
              Edit Item
            </Button>
            
            <div class="grid grid-cols-2 gap-4">
              <Button 
                class="py-2 bg-[#2F5233] hover:bg-[#234024] text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Plus class="h-5 w-5" />
                Add Item
              </Button>
              <Button 
                class="py-2 bg-[#8B4D8E] hover:bg-[#7A3F7D] text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                on:click={() => showMap = true}
              >
                <Map class="h-5 w-5" />
                Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/if}
  
  {#if showMap}
  <div 
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    transition:fade
  >
    <div class="bg-background p-6 rounded-xl w-full max-w-lg">
      <h2 class="text-xl font-semibold mb-4">Map View</h2>
      <p>Map placeholder for location: {item.location}</p>
      <Button 
        class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl"
        on:click={() => showMap = false}
      >
        Close Map
      </Button>
    </div>
  </div>
  {/if}