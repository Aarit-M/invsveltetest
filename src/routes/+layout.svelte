<script lang="ts">
    import "../app.css";
    import { ModeWatcher } from "mode-watcher";
  </script>
  
  <ModeWatcher />
  
  <div class="min-h-screen bg-background text-foreground transition-colors duration-150">
    <slot />
  </div>