<script lang="ts">
    import { Input } from '../components/ui/input';
    import { Textarea } from '../components/ui/textarea';
  
    export let title = '';
    export let description = '';
  </script>
  
  <div class="space-y-6">
    <div class="space-y-2">
      <Input
        placeholder="Enter Title"
        bind:value={title}
      />
    </div>
  
    <div class="space-y-2">
      <Textarea
        placeholder="Enter Description"
        bind:value={description}
        class="min-h-[100px]"
      />
    </div>
  </div>