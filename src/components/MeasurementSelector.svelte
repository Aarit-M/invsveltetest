<script lang="ts">
    import { Checkbox } from '../components/ui/checkbox';
    import { Label } from '../components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
  
    export let hasStandardMeasurements = false;
    export let measurementType = '';
    export let measurementValue = '';
    export let availableMeasurementTypes: string[] = [];
  </script>
  
  <div class="space-y-4">
    <div class="flex items-center space-x-2">
      <Checkbox 
        id="standard-measurements" 
        bind:checked={hasStandardMeasurements}
      />
      <Label for="standard-measurements">Has standard measurements</Label>
    </div>
  
    {#if hasStandardMeasurements}
      <div class="grid grid-cols-2 gap-4">
        <Select bind:value={measurementType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {#each availableMeasurementTypes as type}
              <SelectItem value={type}>{type}</SelectItem>
            {/each}
          </SelectContent>
        </Select>
  
        <Select bind:value={measurementValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {#each availableMeasurementTypes as value}
              <SelectItem value={value}>{value}</SelectItem>
            {/each}
          </SelectContent>
        </Select>
      </div>
    {/if}
  </div>