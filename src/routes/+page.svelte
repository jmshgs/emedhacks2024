<script>
    import * as tmImage from '@teachablemachine/image';
    import * as tf from '@tensorflow/tfjs';

    import * as Tabs from "$lib/components/ui/tabs";
    import { Button } from "$lib/components/ui/button";

    import { HeartPulseIcon, CameraIcon } from "lucide-svelte";
	import { onMount } from 'svelte';

    import Results from '$lib/components/results.svelte';

    import { toggleMode, mode } from "mode-watcher";

    let tabValue = "oral";

    import { slide } from 'svelte/transition';
    
    onMount(() => {
        init();
        loop();
    });

    const States = {
        camera: 0,
        loading: 1,
        result: 2,
    };

    let state = States.camera;
    let picture;
    let loopCount = 0;

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    let URL = "https://teachablemachine.withgoogle.com/models/zw5_O7zeW/";
    $: URL = (tabValue === "oral") ? "https://teachablemachine.withgoogle.com/models/zw5_O7zeW/" : "https://teachablemachine.withgoogle.com/models/wFxhQsBs5/";
    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        if (document.getElementById("webcam-container").hasChildNodes()) {
            document.getElementById("webcam-container").removeChild(document.getElementById("webcam-container").firstChild);
        }
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        webcam.canvas.classList += "rounded-lg shadow-lg shadow-white dark:shadow-black";
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
    
        // if (loopCount % 20 === 0) {
        //     await predict();
        //     loopCount = 0;
        // } else {
        //     loopCount++;
        // }
        await predict();
        window.requestAnimationFrame(loop);
    }

    let lastPredictions = [];

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            lastPredictions.push(prediction.find(pred => pred.className.toLowerCase().includes("cancer")).probability);
            if (lastPredictions.length > 80) {
                lastPredictions.shift();
            }
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
    let cancerPrediction;
    const recordResults = async () => {
        state = States.loading;
        picture = webcam.canvas.toDataURL();
        console.log(lastPredictions);
        cancerPrediction = lastPredictions.reduce((acc, curr) => acc+curr) / (lastPredictions.length);
        if (cancerPrediction) {
            console.log(cancerPrediction);
        } else {
            console.log("No cancer class found in the predictions.");
        }
        const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        setTimeout(() => {
            state = States.result;
        }, randomDelay);
    }
</script>

{#if state === States.camera}
<div class="flex flex-col w-full min-h-screen items-center space-y-5 animate-out slide-out-to-top slide-out-to-left">
    <header class="w-full">
        <div class="flex mx-auto justify-center items-center gap-5">
            <h1 class="text-5xl font-bold">OncoVision</h1>
        </div>
    </header>

    <Tabs.Root value={tabValue} class="px-10 w-full md:w-[33vw] justify-center">
        <Tabs.List class="grid w-full grid-cols-2 rounded-lg">
            <Tabs.Trigger on:click={() => {init()}} value="oral">Oral</Tabs.Trigger>
            <Tabs.Trigger on:click={() => {init()}} value="skin">Skin</Tabs.Trigger>
        </Tabs.List>
    </Tabs.Root>
    <div class="flex flex-col items-center justify-center space-y-10">
        <div id="webcam-container"/>
        <button on:click={recordResults} class="bg-white w-[80px] h-[80px] hover:w-[80px] hover:h-[80px] transition-all rounded-full flex items-center justify-center border-border/75 dark:border-background border-4 hover:border-[6px] hover:border-border">
            <!-- Inner white circle -->
            <div class="bg-white w-[55px] h-[55px] rounded-full border-[3px] flex" class:border-gray-200={($mode=="light")}></div>
        </button>
        <div id="label-container"/>
    </div>
</div>
{:else if state === States.loading}
<div class="flex flex-col w-full min-h-screen items-center space-y-5 animate-out slide-out-to-top slide-out-to-left">
    <header class="w-full py-6">
        <div class="flex mx-auto justify-center items-center gap-5">
            <h1 class="text-5xl font-bold">OncoVision</h1>
        </div>
    </header>
    <div class="flex flex-col items-center justify-center space-y-10">
        <div class="flex flex-row items-center justify-center space-x-5">
            <HeartPulseIcon size={64} class="text-red-500"/>
            <h1 class="text-3xl font-bold">Analyzing...</h1>
        </div>
        <div role="status">
            <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</div>
{:else if state === States.result}
    <Results probability={cancerPrediction} {picture} />
{/if}