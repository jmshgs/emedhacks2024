<script>
import "../app.css";

import { ModeWatcher } from "mode-watcher";

import ThemeSwitcher from "$lib/components/themeSwitcher.svelte";

import Sidebar from "$lib/components/sidebar.svelte";

</script>

<ModeWatcher/>


<div class="flex flex-row">
    <Sidebar />
    <div class="animate-appear animate-in fade-in zoom-in w-screen h-screen flex flex-col pt-[6em] overflow-scroll">
        <slot/>
    </div>
</div>

