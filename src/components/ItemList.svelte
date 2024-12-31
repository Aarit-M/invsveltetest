<script lang="ts">
    import { ChevronRight } from "lucide-svelte";
  
    export let items: Array<{
      id: string;
      title: string;
      location: string;
    }>;
    export let onItemClick: (item: any) => void;
  </script>
  
  <div class="space-y-2">
    {#each items as item (item.id)}
      <button
        class="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
        on:click={() => onItemClick(item)}
      >
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 rounded-xl bg-background/50"></div>
          <div class="text-left">
            <h3 class="font-medium text-foreground">{item.title}</h3>
            <p class="text-sm text-muted-foreground">{item.location}</p>
          </div>
        </div>
        <ChevronRight class="h-5 w-5 text-muted-foreground" />
      </button>
    {/each}
  </div>