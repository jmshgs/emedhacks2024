<script>
import "../app.css";

import { ModeWatcher } from "mode-watcher";

import ThemeSwitcher from "$lib/components/themeSwitcher.svelte";

</script>

<ModeWatcher/>


<div class="h-[10px]">
</div>

<div class="animate-appear animate-in fade-in zoom-in w-screen h-screen flex flex-col">
    <slot/>
</div>
