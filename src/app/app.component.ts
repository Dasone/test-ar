import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3, WebXRExperienceHelper, WebXRSessionManager} from '@babylonjs/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

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

    camera.attachControl(this.canvas.nativeElement, true);

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
    sphere.position.y = 0;
    Mesh.CreateGround('ground', 6, 6, 2, scene);
  }

  async onEnterXR(): Promise<void> {
    await this.xrHelper.enterXRAsync('immersive-ar', 'local-floor');
  }

}
