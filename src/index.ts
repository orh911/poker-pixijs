import { Application } from "pixi.js";
import Card from "./card";
import cardNames from "./cards";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x6495ed,
  width: window.innerWidth,
  height: window.innerHeight,
});

const shuffle = (array: Array<string>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateFlopAndTurns = (): void => {
  for (let i = 0; i < NUMBER_OF_CARDS; i++) {
    const flopOrTurnCard: Card = new Card(`${cardsAssetPath}black_joker.svg`);
    flopOrTurnCard.setPos(
      app.screen.width / 2 - 200 + i * 165,
      app.screen.height / 2
    );

    flopAndTurns.push(flopOrTurnCard);
    flopOrTurnCard.hide();
    app.stage.addChild(flopOrTurnCard);
  }
};

const generateMyHand = (): void => {
  for (let i = 0; i < 2; i++) {
    const card: Card = new Card(`${cardsAssetPath}${currentCardNames.pop()}`);
    card.setPos(app.screen.width / 2 + i * 165, app.screen.height - 30);
    card.makeClickable(() => {
      if (card.isRevealed()) {
        card.unReveal();
      } else {
        card.reveal();
      }
    });
    myHand.push(card);
    app.stage.addChild(card);
  }
};

const NUMBER_OF_CARDS = 5;
const currentCardNames: string[] = [...cardNames];
const cardsAssetPath: string = "svg_cards/";
let numberOfClicks = 0;
let flopAndTurns: Card[] = [];
let myHand: Card[] = [];

shuffle(currentCardNames);

const hiddenDeck: Card = new Card(`${cardsAssetPath}black_joker.svg`);
hiddenDeck.setPos(app.screen.width / 2 - 450, app.screen.height / 2);
hiddenDeck.makeClickable(() => {
  if (numberOfClicks == 3) return;
  numberOfClicks++;
  if (numberOfClicks === 1) {
    for (let i = 0; i < 3; i++) {
      flopAndTurns[i].setTexture(`${cardsAssetPath}${currentCardNames.pop()}`);
      flopAndTurns[i].show();
    }
  } else {
    flopAndTurns[numberOfClicks + 1].setTexture(
      `${cardsAssetPath}${currentCardNames.pop()}`
    );
    flopAndTurns[numberOfClicks + 1].show();
  }
});

generateFlopAndTurns();
generateMyHand();
app.stage.addChild(hiddenDeck);
