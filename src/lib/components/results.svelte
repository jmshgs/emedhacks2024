<script>
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress";
  import { Button } from "$lib/components/ui/button";

  import { TriangleAlertIcon, HospitalIcon, ArrowLeftIcon } from "lucide-svelte";

  let value = 0;
  onMount(() => {
    const timer = setTimeout(() => (value = 95), 500);
    return () => clearTimeout(timer);
  });
</script>

<div class="flex flex-col w-full min-h-screen items-center">
  <header class="w-full py-6">
      <div class="flex mx-auto justify-center items-center gap-5">
          <h1 class="text-5xl font-bold">Results</h1>
      </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-5/6 p-5">
    <div class="w-full justify-center p-20">
      <img src="/favicon.png" class="w-full h-full object-cover"/>
    </div>
    <div class="flex flex-col gap-5 p-5 h-full justify-center">
      <div class="text-4xl">Prediction Score: <span class="text-red-500 font-bold">95.2%</span></div>
      <Progress {value} max={100} class="w-full"/>
      <div class="flex cancer-warning items-center gap-5">
        <TriangleAlertIcon color={"#ef4444"} size={36} strokeWidth={2.5}/>
        <span class="text-red-500 text-2xl font-bold">WARNING: HIGH RISK OF CANCER!</span>
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
  </div>

  <Button size="lg" class="text-xl gap-2">
    <ArrowLeftIcon size={24} strokeWidth={2.5} class="mr-2"/>
    Back
  </Button>
</div>