<script lang="ts">
    import { Sun, Moon } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import { theme } from "$lib/theme";

    function handleThemeToggle() {
        $theme = $theme === 'light' ? 'dark' : 'light';
    }
</script>

<header class="sticky top-0 z-50 w-full bg-[#2F5233]">
  <div class="container mx-auto px-4 h-14 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <img 
        src="/2554-logo.png"
        alt="2554 Logo" 
        class="h-8 w-auto"
      />
      <h1 class="text-lg font-semibold text-white">Inventory</h1>
    </div>
    
    <Button 
      on:click={handleThemeToggle}
      variant="ghost" 
      size="icon"
      class="text-white hover:bg-[#234024]"
    >
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</header>