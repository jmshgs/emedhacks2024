<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import {
		MoonIcon,
		SunIcon,
	} from "svelte-feather-icons";

	import { toggleMode, setMode, resetMode } from "mode-watcher";
</script>


	<Button
		variant="ghost"
		on:click={toggleMode}
		class="flex">
			<!-- <MoonIcon
				size="24"
				class="stroke-accent-100
			rounded-lg cursor-pointer
			rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100
			" />
			<SunIcon
				size="24"
				class="absolute
			rounded-lg cursor-pointer
			dark:rotate-90 dark:scale-0 transition-all duration-500 rotate-0 scale-100
			" /> -->

			<SunIcon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	</Button>