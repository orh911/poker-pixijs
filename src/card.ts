import { Container, Sprite } from "pixi.js";

class Card extends Container {
  sprite: Sprite | null = null;
  notReleavedAsset: string = "svg_cards/black_joker.svg";
  asset: string | undefined = "";

  constructor(asset?: string) {
    super();
    this.sprite = Sprite.from(this.notReleavedAsset);
    this.asset = asset;
    this.sprite.anchor.set(0.5);
    this.sprite.width = 150;
    this.sprite.height = 225;
    this.addChild(this.sprite);
  }

  setPos(x: number, y: number): void {
    if (this.sprite) {
      this.sprite.x = x;
      this.sprite.y = y;
    }
  }

  hide(): void {
    if (this.sprite) {
      this.sprite.visible = false;
    }
  }

  show(): void {
    if (this.sprite) {
      this.sprite.visible = true;
    }
  }

  isHidden(): boolean {
    if (this.sprite) {
      return !this.sprite.visible;
    }
    return true;
  }

  makeClickable(callback: () => void): void {
    if (this.sprite) {
      this.sprite.eventMode = "dynamic";
      this.sprite.on("pointertap", () => {
        callback();
      });
    }
  }

  setTexture(asset: string): void {
    if (this.sprite) {
      this.sprite.texture = Sprite.from(asset).texture;
    }
  }

  isRevealed(): boolean {
    if (this.sprite) {
      return this.sprite.texture.textureCacheIds[0] !== this.notReleavedAsset;
    }
    return false;
  }

  reveal(): void {
    if (this.sprite && this.asset) {
      this.sprite.texture = Sprite.from(this.asset).texture;
    }
  }

  unReveal(): void {
    if (this.sprite) {
      this.sprite.texture = Sprite.from(this.notReleavedAsset).texture;
    }
  }
}

export default Card;
