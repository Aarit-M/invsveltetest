<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Drawer } from "vaul-svelte";
  import ItemActions from "./ItemActions.svelte";
  import EditItemDrawer from "./EditItemDrawer.svelte";

  export let show = false;
  export let item: any;
  export let onClose: () => void;
  export let onUpdate: (item: any) => void;

  let showEditDrawer = false;

  function handleEdit() {
    showEditDrawer = true;
  }

  function handleEditSubmit(updatedItem) {
    item = { ...item, ...updatedItem };
    onUpdate(item);
    showEditDrawer = false;
  }
</script>

<Drawer.Root bind:open={show}>
  <Drawer.Portal>
    <Drawer.Overlay class="fixed inset-0 bg-black/40" />
    <Drawer.Content class="bg-background fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px]">
      <div class="flex-1 overflow-y-auto p-4">
        <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
        <div class="max-w-md mx-auto">
          <h2 class="text-lg font-semibold mb-4">{item.title}</h2>
          <div class="space-y-4">
            <p><strong>Location:</strong> {item.location}</p>
            {#if item.description}
              <p><strong>Description:</strong> {item.description}</p>
            {/if}
            {#if item.measurements}
              <div>
                <strong>Measurements:</strong>
                <ul>
                  {#each Object.entries(item.measurements) as [key, value]}
                    <li>{key}: {value.value} {value.unit}</li>
                  {/each}
                </ul>
              </div>
            {/if}
            <ItemActions {item} onEdit={handleEdit} />
          </div>
          <div class="mt-6 flex justify-end">
            <Button variant="outline" on:click={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>

<EditItemDrawer
  bind:showEditDrawer
  {item}
  onClose={() => showEditDrawer = false}
  onSubmit={handleEditSubmit}
/>