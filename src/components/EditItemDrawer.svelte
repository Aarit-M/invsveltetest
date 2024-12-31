<script lang="ts">
    import { X } from 'lucide-svelte';
    import { Button } from '../components/ui/button';
    import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../components/ui/drawer';
    import ItemFormFields from './ItemFormFields.svelte';
    import MeasurementSelector from './MeasurementSelector.svelte';
    import LocationInput from './LocationInput.svelte';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    export let open = false;
    export let initialData: {
      id: string;
      title: string;
      description?: string;
      location: string;
      measurements?: {
        type: string;
        value: string;
      };
    } | null = null;
  
    const MEASUREMENT_TYPES = {
      screws: ['M2', 'M3', 'M4', 'M5', 'M6'],
      drills: ['12V', '18V', '20V'],
      wrenches: ['6mm', '8mm', '10mm', '12mm', '14mm'],
    };
  
    let title = initialData?.title ?? '';
    let description = initialData?.description ?? '';
    let location = initialData?.location ?? '';
    let showScanner = false;
    let hasStandardMeasurements = !!initialData?.measurements;
    let measurementType = initialData?.measurements?.type ?? '';
    let measurementValue = initialData?.measurements?.value ?? '';
  
    const getMeasurementTypes = (itemTitle: string) => {
      const lowerTitle = itemTitle.toLowerCase();
      if (lowerTitle.includes('screw')) return MEASUREMENT_TYPES.screws;
      if (lowerTitle.includes('drill')) return MEASUREMENT_TYPES.drills;
      if (lowerTitle.includes('wrench')) return MEASUREMENT_TYPES.wrenches;
      return MEASUREMENT_TYPES.screws;
    };
  
    const handleSubmit = () => {
      if (!initialData) return;
      dispatch('submit', {
        id: initialData.id,
        title,
        description,
        location,
        measurements: hasStandardMeasurements ? {
          type: measurementType,
          value: measurementValue,
        } : null,
      });
    };
  
    const handleQRScan = () => {
      setTimeout(() => {
        location = 'Cabinet B-2';
        showScanner = false;
      }, 1000);
    };
  </script>
  
  <Drawer {open} on:openChange={() => dispatch('close')}>
    <DrawerContent class="h-[90vh]">
      <DrawerHeader class="border-b pb-4">
        <DrawerTitle>Edit Item</DrawerTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          class="absolute right-4 top-4" 
          on:click={() => dispatch('close')}
        >
          <X class="h-4 w-4" />
        </Button>
      </DrawerHeader>
      <div class="p-6 space-y-6">
        <ItemFormFields
          bind:title
          bind:description
        />
  
        <MeasurementSelector
          bind:hasStandardMeasurements
          bind:measurementType
          bind:measurementValue
          availableMeasurementTypes={getMeasurementTypes(title)}
        />
  
        <LocationInput
          bind:location
          bind:showScanner
          onScanComplete={handleQRScan}
        />
  
        <Button on:click={handleSubmit} class="w-full bg-primary">
          Save Changes
        </Button>
      </div>
    </DrawerContent>
  </Drawer>