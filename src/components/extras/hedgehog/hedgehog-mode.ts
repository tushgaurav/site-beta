// Basically copied from
// https://github.dev/PostHog/hedgehog-mode

import { Application, Sprite, Assets } from "pixi.js";

export class HedgeHogMode {
    ref?: HTMLDivElement;
    app!: Application;

    destroy(): void {
        this.app.destroy({
            removeView: true,
        })
    }

    async render(ref: HTMLDivElement) : Promise<void> {
        this.ref = ref;

        this.app = new Application();

        await this.app.init({
            backgroundAlpha: 0,
            resizeTo: window,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            antialias: false,
            roundPixels: false,
        });

        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

        const bunny = new Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.x = this.app.screen.width / 2;
        bunny.y = this.app.screen.height / 2;

        this.app.stage.addChild(bunny);

        ref.appendChild(this.app.canvas);
        
    }
}