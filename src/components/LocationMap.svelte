<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
  
    export let showMap = false;
    export let location: string;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <Dialog 
    open={showMap} 
    on:openChange={() => dispatch('close')}
  >
    <DialogContent class="sm:max-w-[800px]">
      <DialogTitle>Location Map</DialogTitle>
      <div class="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <p class="text-muted-foreground">Map placeholder - Location: {location}</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>