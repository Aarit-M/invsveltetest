<script lang="ts">
    export let image: string | undefined;
    export let title: string;
  </script>
  
  <div class="relative aspect-square overflow-hidden rounded-lg bg-muted">
    {#if image}
      <img
        src={image}
        alt={title}
        class="object-cover"
      />
    {:else}
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-4xl">📦</span>
      </div>
    {/if}
  </div>