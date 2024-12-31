<script lang="ts">
    import { Plus } from 'lucide-svelte';
    import { Button } from '$lib/components/ui/button';
  
    export let onClick: () => void;
  </script>
  
  <Button
    on:click={onClick}
    class="bg-primary hover:bg-primary-hover shadow-lg animate-fade-in"
    size="lg"
  >
    <Plus class="mr-2 h-5 w-5" />
    Add Item
  </Button>