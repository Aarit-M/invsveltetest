<!-- MeasurementSelector.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Select } from "../components/ui/select";
  
  export let title: string;

  const dispatch = createEventDispatcher();

  let selectedSize = 'M4';
  let selectedMeasurement = '20mm';

  const sizeOptions = [
    'M2', 'M2.5', 'M3', 'M4', 'M5', 'M6', 'M8', 'M10', 'M12'
  ];

  const measurementOptions = [
    '10mm', '15mm', '20mm', '25mm', '30mm', '35mm', '40mm', '45mm', '50mm'
  ];

  $: {
    dispatch('change', {
      size: selectedSize,
      measurement: selectedMeasurement
    });
  }
</script>

<div class="grid grid-cols-2 gap-4">
  <div class="relative">
    <select
      bind:value={selectedSize}
      class="w-full h-10 px-3 py-2 bg-[#121212] border border-zinc-800 rounded-md text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-600"
    >
      {#each sizeOptions as size}
        <option value={size}>{size}</option>
      {/each}
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg class="h-4 w-4 text-zinc-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M7 7l3 3 3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  
  <div class="relative">
    <select
      bind:value={selectedMeasurement}
      class="w-full h-10 px-3 py-2 bg-[#121212] border border-zinc-800 rounded-md text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-600"
    >
      {#each measurementOptions as measurement}
        <option value={measurement}>{measurement}</option>
      {/each}
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg class="h-4 w-4 text-zinc-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M7 7l3 3 3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</div>