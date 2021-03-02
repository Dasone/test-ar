import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3, WebXRExperienceHelper} from '@babylonjs/core';



@Injectable({
  providedIn: 'root'
})
export class XrTestService {
  /*@ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

  xrHelper: WebXRExperienceHelper;

  cameraPos = new Vector3(0, 5, -10);
  cameraTarget = Vector3.Zero();

  ngOnInit(): void {
    this.init(this.canvas.nativeElement).then();
  }

  async init(canvas: HTMLCanvasElement): Promise<void> {
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    try {
      this.xrHelper = await WebXRExperienceHelper.CreateAsync(scene);
    } catch (e) {
      // no XR support
      console.error(e);
    }
    const camera = this.createCamera(scene);
    this.createScene(scene);

    console.log('cam pos', camera.position, camera.globalPosition);
    console.log('target', camera.getTarget());

    camera.attachControl(canvas, true);

    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  createCamera(scene: Scene): FreeCamera {
    const camera = new FreeCamera('camera1', this.cameraPos, scene);
    camera.setTarget(this.cameraTarget);
    return camera;
  }

  createScene(scene: Scene): void {
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    const sphere = Mesh.CreateSphere('sphere', 16, 2, scene);
    Mesh.CreateGround('ground', 6, 6, 2, scene);
    console.log(sphere.getPositionExpressedInLocalSpace());
    console.log(sphere.position);
  }

  async onEnterXR(): Promise<void> {
    await this.xrHelper.enterXRAsync('immersive-ar', 'local-floor');
  }*/
}
