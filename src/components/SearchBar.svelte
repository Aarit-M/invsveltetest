<script lang="ts">
    import { Search } from "lucide-svelte";
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    export let value = '';
  
    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      value = target.value;
      dispatch('search', value);
    }
  </script>
  
  <div class="relative w-full">
    <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <input
      type="text"
      {value}
      on:input={handleInput}
      placeholder="Search items..."
      class="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
    />
  </div>