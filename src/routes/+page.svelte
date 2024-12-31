<script lang="ts">
    import { onMount } from 'svelte';
    import { Plus, Map } from "lucide-svelte";
    import Header from "../components/Header.svelte";
    import SearchBar from "../components/SearchBar.svelte";
    import ItemList from "../components/ItemList.svelte";
    import AddItemDrawer from "../components/AddItemDrawer.svelte";
    import ItemDetails from "../components/ItemDetails.svelte";
    
    let searchQuery = '';
    let items = [
      { id: '1', title: 'Skibidi Toilet of Doom', location: 'Cabinet A-3' },
      { id: '2', title: 'Hammer', location: 'Shelf A1' },
      { id: '3', title: 'Screwdriver Set', location: 'Drawer B2' },
    ];
    
    $: filteredItems = items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    let selectedItem = null;
    let showAddDrawer = false;
    let showItemDetails = false;
    let showMap = false;
  
    function handleSearch(event) {
      searchQuery = event.detail;
    }
  
    function handleItemClick(item) {
      selectedItem = item;
      showItemDetails = true;
    }
  
    function handleAddItem(newItem) {
      const itemWithId = {
        ...newItem,
        id: (items.length + 1).toString()
      };
      items = [itemWithId, ...items];
      showAddDrawer = false;
    }
  
    function toggleAddDrawer() {
      showAddDrawer = !showAddDrawer;
    }
  
    function toggleMap() {
      showMap = !showMap;
    }
  
    onMount(() => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDarkMode);
    });
  </script>
  
  <div class="min-h-screen bg-background text-foreground">
    <Header />
    
    <main class="container mx-auto px-4 py-6">
      <SearchBar 
        value={searchQuery}
        on:search={handleSearch}
      />
      
      <div class="mt-4">
        <ItemList 
          items={filteredItems}
          onItemClick={handleItemClick}
        />
      </div>
    </main>
  
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
      <button
        class="flex items-center gap-2 px-6 py-3 bg-[#2F5233] hover:bg-[#234024] text-white rounded-full transition-colors shadow-lg"
        on:click={toggleAddDrawer}
      >
        <Plus class="h-5 w-5" />
        Add Item
      </button>
      
      <button
        class="flex items-center gap-2 px-6 py-3 bg-[#2F5233] hover:bg-[#234024] text-white rounded-full transition-colors shadow-lg"
        on:click={toggleMap}
      >
        <Map class="h-5 w-5" />
        View Map
      </button>
    </div>
  
    <AddItemDrawer
      bind:showAddDrawer
      onClose={() => showAddDrawer = false}
      onSubmit={handleAddItem}
    />
  
    {#if selectedItem}
      <ItemDetails
        bind:show={showItemDetails}
        item={selectedItem}
        onClose={() => {
          showItemDetails = false;
          selectedItem = null;
        }}
      />
    {/if}
  
    {#if showMap}
      <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-background p-6 rounded-xl">
          <h2 class="text-xl font-semibold mb-4">Map View</h2>
          <p>Map placeholder</p>
          <button 
            class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl"
            on:click={() => showMap = false}
          >
            Close Map
          </button>
        </div>
      </div>
    {/if}
  </div>