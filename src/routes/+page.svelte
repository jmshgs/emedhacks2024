<script>
    import * as tmImage from '@teachablemachine/image';
    import * as tf from '@tensorflow/tfjs';

    import * as Tabs from "$lib/components/ui/tabs";
    import { Button } from "$lib/components/ui/button";

    import { HeartPulseIcon, CameraIcon } from "lucide-svelte";
	import { onMount } from 'svelte';

    import Results from '$lib/components/results.svelte';

    import { toggleMode } from "mode-watcher";
    import { mode } from "mode-watcher";
    
    onMount(() => {
        init();
        loop();
    });

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/zw5_O7zeW/";

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
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
    const recordResults = async () => {
        const prediction = await model.predict(webcam.canvas);
        const cancerPrediction = prediction.find(pred => pred.className.toLowerCase().includes("cancer"));
        if (cancerPrediction) {
            console.log(cancerPrediction);
        } else {
            console.log("No cancer class found in the predictions.");
        }
    }
</script>

<div class="flex flex-col w-full min-h-screen items-center">
    <header class="w-full py-6">
        <div class="flex mx-auto justify-center items-center gap-5">
            <h1 class="text-5xl font-bold">OncoVision</h1>
        </div>
    </header>

    <Tabs.Root value="oral" class="px-10 w-full md:w-[33vw] justify-center h-full">
        <Tabs.List class="grid w-full grid-cols-2 rounded-lg">
            <Tabs.Trigger value="oral">Oral</Tabs.Trigger>
            <Tabs.Trigger value="skin">Skin</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content class="h-full pt-3" value="oral">
            <div class="flex flex-col items-center justify-center space-y-10">
                <div id="webcam-container"/>
                <button on:click={recordResults}
                class="bg-white w-[80px] h-[80px] hover:w-[80px] hover:h-[80px] transition-all rounded-full flex items-center justify-center border-border/75 dark:border-background border-4 hover:border-[6px] hover:border-border"
                >
                        <!-- Inner white circle -->
                        <div class="bg-white w-[55px] h-[55px] rounded-full border-[3px] flex" class:border-gray-200={($mode=="light")}></div>
                </button>
                <div id="label-container"/>
        </Tabs.Content>
        <Tabs.Content value="skin">
            i am a skinwalker
        </Tabs.Content>
    </Tabs.Root>
</div>

<Results />