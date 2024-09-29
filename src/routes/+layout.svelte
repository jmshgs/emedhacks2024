<script>
import "../app.css";

import { ModeWatcher } from "mode-watcher";

import ThemeSwitcher from "$lib/components/themeSwitcher.svelte";

</script>

<ModeWatcher/>

<div class="">
    <ThemeSwitcher/>
</div>

<div class="w-screen h-screen flex flex-col">
    <slot/>
</div>
