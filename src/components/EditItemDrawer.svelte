<script lang="ts">
  import { Button } from "../components/ui/button";
  import { Input } from "../components/ui/input";
  import { Label } from "../components/ui/label";
  import { Textarea } from "../components/ui/textarea";
  import { Drawer } from "vaul-svelte";
  import MeasurementSelector from "./MeasurementSelector.svelte";

  export let showEditDrawer = false;
  export let item: any;
  export let onClose: () => void;
  export let onSubmit: (item: any) => void;

  let title = item.title;
  let description = item.description || '';
  let location = item.location;
  let hasStandardMeasurements = !!item.measurements;
  let measurements = item.measurements || {};

  function handleSubmit() {
    const updatedItem = {
      title,
      description,
      location,
      measurements: hasStandardMeasurements ? measurements : null
    };
    onSubmit(updatedItem);
  }

  function handleMeasurementsChange(event) {
    measurements = event.detail;
  }
</script>

<Drawer.Root bind:open={showEditDrawer}>
  <Drawer.Portal>
    <Drawer.Overlay class="fixed inset-0 bg-black/40" />
    <Drawer.Content class="bg-background fixed bottom-0 left-0 right-0 flex h-[70%] flex-col rounded-t-[10px]">
      <div class="flex-1 overflow-y-auto p-4">
        <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
        <div class="max-w-md mx-auto">
          <h2 class="text-lg font-semibold mb-4">Edit Item</h2>
          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
              <Label for="title">Title</Label>
              <Input type="text" id="title" bind:value={title} required />
            </div>
            <div>
              <Label for="description">Description</Label>
              <Textarea id="description" bind:value={description} />
            </div>
            <div>
              <Label for="location">Location</Label>
              <Input type="text" id="location" bind:value={location} required />
            </div>
            <div>
              <Label>
                <input type="checkbox" bind:checked={hasStandardMeasurements} />
                Does this item have any standard measurements?
              </Label>
            </div>
            {#if hasStandardMeasurements}
              <MeasurementSelector title={title} on:change={handleMeasurementsChange} />
            {/if}
            <div class="flex justify-end space-x-2">
              <Button variant="outline" on:click={onClose}>Cancel</Button>
              <Button type="submit">Update Item</Button>
            </div>
          </form>
        </div>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>