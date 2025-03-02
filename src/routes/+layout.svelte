<script>
import "../app.css";
import { onMount } from "svelte";
import { ModeWatcher } from "mode-watcher";

import ThemeSwitcher from "$lib/components/themeSwitcher.svelte";

import Sidebar from "$lib/components/sidebar.svelte";

import UserInfo from "$lib/components/userInfo.svelte";

import { fetchUser, signOut } from "$lib/supabase.js"

let user = null;

onMount(async () => {
  user = await fetchUser();
});

</script>

<ModeWatcher/>


<div class="flex flex-row">
    <Sidebar />
    <div class="flex flex-col w-full">
        <div class="flex flex-row z-10">
            <div class="p-2">
                <!-- <Button variant="ghost">
                  <BellIcon color="black"/>
                </Button> -->
            </div>
            <div class="flex-grow"></div>
            <div class="flex justify-end items-end">
                <div class="p-2">
                  <UserInfo {user} />
                </div>
            </div>
        </div>
        <div class="w-[screen-13rem] h-screen flex flex-col md:flex-row overflow-scroll">
            <slot/>
        </div>
    </div>
    
    
</div>

