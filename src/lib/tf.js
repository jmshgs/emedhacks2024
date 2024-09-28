import * as tmImage from '@teachablemachine/image';
import * as tf from '@tensorflow/tfjs';

const URL = "https://teachablemachine.withgoogle.com/models/zw5_O7zeW/";

let model, webcam, webcamContainer, labelContainer, maxPredictions;

let focusedTime = 0
let totalTime = 0
let percentFocus = 0


export async function init() {
    totalTime = 0
    focusedTime = 0
    percentFocus = 0
    // Append webcam and labels to the DOM
    // Setup the webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    webcamContainer = document.getElementById("webcam-container")
    webcamContainer.appendChild(webcam.canvas);

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    
    window.requestAnimationFrame(loop);

    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }

}

// export async function stopCam() {
//   webcamContainer = document.getElementById("webcam-container")
//   webcamContainer.removeChild(webcam.canvas);s
// }

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    setTimeout(() => {
      window.requestAnimationFrame(loop());
    }, 50);
}

// Run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      totalTime += 1;
      console.log(totalTime);
      const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      console.log(classPrediction);
      if (prediction[i].className == "focused" && prediction[i].probability > 0.8) {
          focusedTime += 1 ;
          console.log("focused: " + focusedTime);
      }
      percentFocus = focusedTime / totalTime;
      document.getElementById("percent-container").innerHTML = "Percent Focus: " + percentFocus.toFixed(2) * 200 + "%";
      // console.log("percent focus: " + percentFocus);
      // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}