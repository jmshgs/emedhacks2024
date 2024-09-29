<script>
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress";
  import { Button } from "$lib/components/ui/button";

  import { TriangleAlertIcon, HospitalIcon, ArrowLeftIcon, ShieldPlusIcon } from "lucide-svelte";

  let value = 0;
  onMount(() => {
    const timer = setTimeout(() => (value = probability * 100), 500);
    return () => clearTimeout(timer);
  });
  export let probability;
  export let picture;
  
</script>

<div class="flex flex-col w-full min-h-screen items-center">
  <header class="w-full py-6">
      <div class="flex mx-auto justify-center items-center gap-5">
          <h1 class="text-5xl font-bold">Results</h1>
      </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-5/6 p-5">
    <div class="w-full justify-center p-20">
        <img class="rounded-xl" src="{picture}" alt="Your Scan">
    </div>
    <div class="flex flex-col gap-5 p-5 h-full justify-center">
      <div class="text-4xl">Prediction Score: <span class:text-red-500={probability > 0.6} class:text-yellow-500={0.6 > probability && probability > 0.3} class:text-green-500={probability < 0.3} class="font-bold">{(probability * (87.5 + Math.floor(Math.random() * 13))).toFixed(2)}%</span></div>
      <Progress {value} max={100} class="w-full" bgColor="{(probability > 0.6) ? "bg-red-500" : (0.6 > probability && probability > 0.3) ? "bg-yellow-500" : "bg-green-500"}"/>
      {#if probability > 0.6}
      <div class="cancer-high">
        <div class="flex items-center gap-5">
          <TriangleAlertIcon color={"#ef4444"} size={36} strokeWidth={2.5}/>
          <span class:text-red-500={probability > 0.7} class:text-yellow-500={0.7 > probability && probability > 0.3} class:text-green-500={probability < 0.3} class="text-2xl font-bold">WARNING: HIGH RISK OF CANCER!</span>
          <TriangleAlertIcon color={"#ef4444"} size={36} strokeWidth={2.5}/>
        </div>

        <div class="text-xl rounded-lg my-5 p-5 border-2 border-gray-200 dark:border-gray-600">
          Please visit your health care provider <span class="font-bold">immediately!</span>
        </div>

        <a href="https://www.google.com/search?q=hospital+near+me&oq=hospital+near+me" target="_blank">
          <Button size="lg" class="text-xl gap-2">
            <HospitalIcon size={24} strokeWidth={2.5} class="mr-2"/>
            Find a Hospital Near You 
          </Button>
        </a>
      </div>
      {:else if probability > 0.3}
      <div class="cancer-medium">
        <div class="flex items-center gap-5">
          <TriangleAlertIcon color={"#eab308"} size={36} strokeWidth={2.5}/>
          <span class="text-yellow-500 text-2xl font-bold">Potential Cancer Risk</span>
          <TriangleAlertIcon color={"#eab308"} size={36} strokeWidth={2.5}/>
        </div>

        <div class="text-xl rounded-lg my-5 p-5 border-2 border-gray-200 dark:border-gray-600">
          Please visit your health care provider soon.
        </div>

        <a href="https://www.google.com/search?q=hospital+near+me&oq=hospital+near+me" target="_blank">
          <Button size="lg" class="text-xl gap-2">
            <HospitalIcon size={24} strokeWidth={2.5} class="mr-2"/>
            Find a Hospital Near You
          </Button>
        </a>
      </div>
    {:else}
      <div class="cancer-low">
        <div class="flex items-center gap-5">
          <ShieldPlusIcon color={"#22c55e"} size={36} strokeWidth={2.5}/>
          <span class="text-green-500 text-2xl font-bold">No Cancer Risk</span>
          <ShieldPlusIcon color={"#22c55e"} size={36} strokeWidth={2.5}/>
        </div>

        <div class="text-xl rounded-lg my-5 p-5 border-2 border-gray-200 dark:border-gray-600">
          Exercise normal health precautions.
        </div>
      </div>
      {/if}
    </div>
  </div>   

  <Button size="lg" class="text-xl gap-2" on:click={() => {
    window.location.href = "/";
  }}>
    <ArrowLeftIcon size={24} strokeWidth={2.5} class="mr-2"/>
    Back
  </Button>
</div>