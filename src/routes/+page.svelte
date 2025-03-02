<script>
    import { Button } from "$lib/components/ui/button";
    import { CameraIcon, BrainCircuitIcon } from "lucide-svelte";
    import TypingTransition from "$lib/components/typing.svelte";
    import { fetchUser, signOut } from "$lib/supabase.js"

    import {onMount} from 'svelte';

    const words = [
		[
      "OncoVision",
    ]
	];
  
  async function get_login_request(a,b) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ a, b }),
      headers: {
        'content-type': 'application/json'
      }
    });
  
    return await response.json();
  }

  let user = null;

  onMount(async () => {
    user = await fetchUser();
  });
  
  </script>
  
{#if user}
<section class="font-apple font-medium flex w-full items-center overflow-hidden">
  <div class="px-4 mx-auto max-w-screen-xl text-center py-56 lg:py-56 items-center justify-center ">
    <div class="display-inline mb-4 text-4xl fontextrabold tracking leading-none
        md:text-5xl lg:text-6xl p-1 overflow-hidden">
      Onco<span class="text-blue-500 dark:text-blue-600">Vision</span>
    </div>
    <p class="mb-8 text-lg font-normal text-gray-700 dark:text-gray-300 lg:text-xl sm:px-16 lg:px-48">
      The convenient machine learning solution to detect early signs of cancer.
    </p>
  
    <div class="flex flex-col lg:gap-5 space-y-5 sm:flex-row sm:justify-center sm:space-y-0">
      <Button href="/app" class="bg-blue-500 dark:bg-blue-600 h-12 space-x-3" >
        <p>Scan using your camera</p>
        <CameraIcon />
      </Button>
    </div>
  </div>
  </section>
{:else}
<section class="font-apple font-medium flex w-full items-center overflow-hidden">
  <div class="px-4 mx-auto max-w-screen-xl text-center py-56 lg:py-56 items-center justify-center ">
    <div class="display-inline mb-4 text-4xl fontextrabold tracking leading-none
        md:text-5xl lg:text-6xl p-1 overflow-hidden">
      Onco<span class="text-blue-500 dark:text-blue-600">Vision</span>
    </div>
    <p class="mb-8 text-lg font-normal text-gray-700 dark:text-gray-300 lg:text-xl sm:px-16 lg:px-48">
      The convenient machine learning solution to detect early signs of cancer.
    </p>
  
    <div class="flex flex-col lg:gap-5 space-y-5 sm:flex-row sm:justify-center sm:space-y-0">
      <Button href="/app" class="bg-blue-500 dark:bg-blue-600 h-12 space-x-3" >
        <p>Scan using your camera</p>
        <CameraIcon />
      </Button>
    </div>
  </div>
  </section>
{/if}
  