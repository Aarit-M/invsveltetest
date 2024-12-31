<script lang="ts">
    import { QrCode } from 'lucide-svelte';
    import { Button } from '../components/ui/button';
    import { Input } from '../components/ui/input';
    import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
  
    export let location = '';
    export let showScanner = false;
    export let onScanComplete: () => void;
  
    const handleScan = () => {
      showScanner = true;
      setTimeout(() => {
        onScanComplete();
      }, 1000);
    };
  </script>
  
  <div class="space-y-2">
    <div class="flex space-x-2">
      <Input
        placeholder="Enter Location"
        bind:value={location}
        class="flex-grow"
      />
      <Button variant="outline" size="icon" on:click={handleScan}>
        <QrCode class="h-4 w-4" />
      </Button>
    </div>
  </div>
  
  <Dialog open={showScanner} on:openChange={(e) => showScanner = e.detail}>
    <DialogContent>
      <DialogTitle>Scan QR Code</DialogTitle>
      <div class="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p class="text-muted-foreground">Camera placeholder - scanning QR code</p>
      </div>
    </DialogContent>
  </Dialog>