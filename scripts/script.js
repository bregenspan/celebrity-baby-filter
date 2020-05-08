const Scene = require("Scene");
const Time = require("Time");
const FaceTracking = require("FaceTracking");
const Animation = require("Animation");
const Instruction = require("Instruction");
Instruction.bind(true, "find_face");

export const Diagnostics = require("Diagnostics");

const Materials = require("Materials");

const processingText = Scene.root.find("processing_text");

processingText.text = "";

function animateBackground() {
  const background = Materials.get("background_mat");
  const timeDriver = Animation.timeDriver({
    durationMilliseconds: 1500,
    loopCount: 1,
    mirror: false,
  });
  const linearSampler = Animation.samplers.linear(0.0, 1.0);
  const animation = Animation.animate(timeDriver, linearSampler);
  background.opacity = animation;
  timeDriver.start();
  return timeDriver;
}

function animateBabyMat() {
  const mat = Materials.get("user_mat");
  const timeDriver = Animation.timeDriver({
    durationMilliseconds: 500,
    loopCount: Infinity,
    mirror: true,
  });
  const linearSampler = Animation.samplers.linear(0.2, 0.6);
  const animation = Animation.animate(timeDriver, linearSampler);
  mat.opacity = animation;
  timeDriver.start();
  return timeDriver;
}

function startScan() {
  Instruction.bind(false, "find_face");
  processingText.text = "Processing...";
  const bgDriver = animateBackground();
  const matDriver = animateBabyMat();
  const timeoutTimer = Time.setTimeout(() => {
    matDriver.stop();
    bgDriver.stop();
    showResults();
  }, 5000);
}
Time.setTimeout(startScan, 4000);

const results = Scene.root.find("results");
const resultsOffset = -900;
results.transform.y = resultsOffset;
results.transform.rotationX = 1;

function showResults() {
  processingText.text = "";
  const timeDriver = Animation.timeDriver({
    durationMilliseconds: 1500,
    loopCount: 1,
    mirror: false,
  });
  const ySampler = Animation.samplers.linear(resultsOffset, 0);
  const rotationSampler = Animation.samplers.linear(1, 0);
  const yAnimation = Animation.animate(timeDriver, ySampler);
  const rotationAnimation = Animation.animate(timeDriver, rotationSampler);
  results.transform.y = yAnimation;
  results.transform.rotationX = rotationAnimation;
  timeDriver.start();
  return new Promise((resolve, reject) => {
    timeDriver.onCompleted().subscribe(resolve);
  });
}
