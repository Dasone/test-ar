import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


import * as BABYLON from '@babylonjs/core';
import {Engine} from '@babylonjs/core';
import {ResizeService} from './resize.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  engine: Engine;
  subscriptions: Subscription[] = [];

  constructor(
    private resizeService: ResizeService
  ) {
  }

  static async createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): Promise<BABYLON.Scene> {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);


    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
    sphere.position.y = 2;
    sphere.position.z = 5;

    BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene);

    await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: 'immersive-ar'
      },
      // ignoreNativeCameraTransformation: false
    });
    console.log('enter ar');
    return scene;
  }


  // cameraPos = new Vector3(0, 5, -10);
  // cameraTarget = Vector3.Zero();

  ngOnInit(): void {
    this.engine = new BABYLON.Engine(this.canvas.nativeElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false
    });

    this.subscriptions.push(this.resizeService.onResize.subscribe(() => {
      this.engine.resize();
      console.log('resizing');
    }));

    AppComponent.createScene(this.engine, this.canvas.nativeElement).then(scene => {
      this.engine.runRenderLoop(() => {
        if (scene && scene.activeCamera) {
          scene.render();
        }
      });
    });

  }

/*
  async onEnterXR(): Promise<void> {
    await this.xrHelper.enterXRAsync('immersive-ar', 'local-floor');
  }*/


}
