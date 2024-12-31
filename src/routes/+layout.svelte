<script lang="ts">
    import "../app.css";
    import { onMount } from 'svelte';
    import { theme } from "$lib/theme";
    
    // Initialize theme on mount
    onMount(() => {
      const currentTheme = $theme;
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    });
</script>
  
  <div class="min-h-screen bg-background text-foreground transition-colors duration-150">
    <slot />
  </div>