<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Input } from "../components/ui/input";
  import { Label } from "../components/ui/label";

  export let title: string;

  const dispatch = createEventDispatcher();

  let measurements = {
    length: { value: '', unit: 'cm' },
    width: { value: '', unit: 'cm' },
    height: { value: '', unit: 'cm' },
    weight: { value: '', unit: 'kg' },
  };

  $: {
    // Simple AI-like logic to suggest units based on the item title
    if (title.toLowerCase().includes('book') || title.toLowerCase().includes('paper')) {
      measurements.length.unit = 'mm';
      measurements.width.unit = 'mm';
      measurements.height.unit = 'mm';
      measurements.weight.unit = 'g';
    } else if (title.toLowerCase().includes('furniture')) {
      measurements.length.unit = 'm';
      measurements.width.unit = 'm';
      measurements.height.unit = 'm';
      measurements.weight.unit = 'kg';
    }
    // Add more conditions as needed

    dispatch('change', measurements);
  }
</script>

<div class="space-y-4">
  <div>
    <Label for="length">Length</Label>
    <div class="flex gap-2">
      <Input type="number" id="length" bind:value={measurements.length.value} />
      <select bind:value={measurements.length.unit}>
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="m">m</option>
      </select>
    </div>
  </div>
  <div>
    <Label for="width">Width</Label>
    <div class="flex gap-2">
      <Input type="number" id="width" bind:value={measurements.width.value} />
      <select bind:value={measurements.width.unit}>
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="m">m</option>
      </select>
    </div>
  </div>
  <div>
    <Label for="height">Height</Label>
    <div class="flex gap-2">
      <Input type="number" id="height" bind:value={measurements.height.value} />
      <select bind:value={measurements.height.unit}>
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="m">m</option>
      </select>
    </div>
  </div>
  <div>
    <Label for="weight">Weight</Label>
    <div class="flex gap-2">
      <Input type="number" id="weight" bind:value={measurements.weight.value} />
      <select bind:value={measurements.weight.unit}>
        <option value="g">g</option>
        <option value="kg">kg</option>
      </select>
    </div>
  </div>
</div>