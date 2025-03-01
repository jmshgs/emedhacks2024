<script>
import "../app.css";

import { ModeWatcher } from "mode-watcher";

import ThemeSwitcher from "$lib/components/themeSwitcher.svelte";

import Sidebar from "$lib/components/sidebar.svelte";

</script>

<ModeWatcher/>


<div class="flex flex-row">
    <Sidebar />
    <div class="w-screen h-screen flex flex-col md:flex-row pt-[6em] overflow-scroll">
        <slot/>
    </div>
</div>

