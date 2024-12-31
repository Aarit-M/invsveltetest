// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '$lib/theme' {
	import { Writable } from 'svelte/store';
	export const theme: Writable<'light' | 'dark'>;
	export function toggleTheme(): void;
}

export {};