import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById("renderCanvas");

let engine = null;
let scene = null;
let sceneToRender = null;


const createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};


class Playground {
  static async CreateScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;
    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 2;
    sphere.position.z = 5;
    BABYLON.Mesh.CreateGround("ground", 6, 6, 2, scene);
    await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
      },
    });
    return scene;
  }
}

const createScene = function () {
  return Playground.CreateScene(engine, engine.getRenderingCanvas());
};


const initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  scene = createScene();
};


initFunction().then(() => {
  scene.then((returnedScene) => {
    sceneToRender = returnedScene;
  });

  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
});


// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
