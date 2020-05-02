/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require("Scene");
const Time = require("Time");

const Animation = require("Animation");

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require("Diagnostics");

const Materials = require("Materials");

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
}
animateBackground();

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
}
animateBackground();
animateBabyMat();

const results = Scene.root.find("results");
const processingText = Scene.root.find("processing_text");
results.transform.y = -900;

function showResults() {
  processingText.visible = false;
  const timeDriver = Animation.timeDriver({
    durationMilliseconds: 1500,
    loopCount: 1,
    mirror: false,
  });
  const ySampler = Animation.samplers.linear(-900, -50);
  const rotationSampler = Animation.samplers.linear(1, 0);
  const yAnimation = Animation.animate(timeDriver, ySampler);
  const rotationAnimation = Animation.animate(timeDriver, rotationSampler);
  results.transform.y = yAnimation;
  results.transform.rotationX = rotationAnimation;
  timeDriver.start();
}
const timeoutTimer = Time.setTimeout(showResults, 5000);
