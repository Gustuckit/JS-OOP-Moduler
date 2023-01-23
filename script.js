log = console.log;

/* DEL 1 FÄRGER */
log('DEL 1 FÄRGER')

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  rgb() {
    log('rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')')
  }
  rgba() {
    log('rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')')
  }
  hex() {
    log('#' + (1 << 24 | this.r << 16 | this.g << 8 | this.b).toString(16).slice(1))
  }
}

const color = new Color(255, 0, 255, 1)
color.rgb();
color.rgba();
color.hex();

/* DEL 2 OOP POKER */
log('DEL 2 OOP POKER')

/* PLAYER HANDLER */

class Players {
  constructor(P1, P2) {
    this.P1 = P1;
    this.P2 = P2;

    this.tossPile = [];

    this.logPlayers();
  }

  logPlayers() {
    log('Player 1: ' + this.P1);
    log('Player 2: ' + this.P2);
  }

  takeCards(deck, whichPlayer, takeAmount, P1Cards, P2Cards, cards) {
    if (whichPlayer == 'P1') {
      log(this.P1 + ' takes ' + takeAmount + ' card(s)!')
      for (let i = 0; i < takeAmount; i++) {
        P1Cards.push(deck.pop());
      }
      log(this.P1 + "'s updated deck: ", P1Cards);
    }
    if (whichPlayer == 'P2') {
      log(this.P2 + ' takes ' + takeAmount + ' card(s)!')
      for (let i = 0; i < takeAmount; i++) {
        P2Cards.push(deck.pop());
      }
      log(this.P2 + "'s updated deck: ", P2Cards);
    }
  }

  tossCards(tossingPlayer, tossAmount, P1Cards, P2Cards, cards) {
    if (tossingPlayer == 'P1') {
      log(this.P1 + ' tosses ' + tossAmount + ' card(s)!')
      for (let i = 0; i < tossAmount; i++) {
        this.tossPile.push(P1Cards.pop());
      }
      log(this.P1 + "'s updated hand: ", P1Cards);
    }
    else if (tossingPlayer == 'P2') {
      log(this.P2 + ' tosses ' + tossAmount + ' card(s)!')
      for (let i = 0; i < tossAmount; i++) {
        this.tossPile.push(P2Cards.pop());
      }
      log(this.P2 + "'s updated hand: ",  P2Cards);
    }
    log('Cards in tosspile: ', this.tossPile);
  }

  tossAll(P1Cards, P2Cards) {
    log(this.P1 + ' & ' + this.P2 + ' toss all their cards!')
    let nrLoops = (P1Cards.length + P2Cards.length) / 2;
    for (let i = 0; i < nrLoops; i++) {
      this.tossPile.push(P1Cards.pop());
      this.tossPile.push(P2Cards.pop());
    }
    log('Cards in tosspile: ', this.tossPile);
  }
}

/* DECK HANDLER */

class Deck {
  constructor() {
    this.deck = [];

    this.build();
    this.shuffle();
    this.display();
  }

  build() {
    const suits = ['spader', 'hjärter', 'ruter', 'klöver'];
    const values = ['ess', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'knekt', 'dam', 'kung'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push([suits[suit], values[value]]);
      }
    }
  }

  shuffle() {
    const deck = this.deck;

    let l = deck.length;
    let i;

    while (l) {
      i = Math.floor(Math.random() * l--);

      [deck[l], deck[i]] = [deck[i], deck[l]];
    }
    return this;
  }

  display() {
    log(this.deck);
    log('Cards in deck: ' + this.deck.length);
  }
}

/* DEALER HANDLER */

class Dealer {
  constructor() {
    this.P1Cards = [];
    this.P2Cards = [];
  }

  dealCards(deck, dealAmount, players) {
    log('Dealing ' + dealAmount + ' cards!');
    for (let i = 0; i < dealAmount; i++) {
      this.P1Cards.push(deck.pop());
    }
    log('Cards dealt to ' + players.P1 + ':', this.P1Cards);
    for (let i = 0; i < dealAmount; i++) {
      this.P2Cards.push(deck.pop());
    }
    log('Cards dealt to ' + players.P2 + ':', this.P2Cards);
  }

  rebuildDeck(deck, tossPile) {
    log('Transferring all cards from tosspile to deck!')
    log('Number of cards to move from the tosspile: ' + tossPile.length)

    let nrLoops = tossPile.length;
    for (let i = 0; i < nrLoops; i++) {
      deck.push(tossPile.pop());
    }
    log('Rebuilt deck: ', deck);
    log(deck.length);
  }
}

class Cards {
  constructor() {

  }

  calculateHand(P1, P2, P1Cards, P2Cards) {
    let P1HandValue = 0;
    let P2HandValue = 0;

    for (let i = 0; i < P1Cards.length; i++){
      if (P1Cards[i][1] == 'ess') {
        P1HandValue += 11;
      }
      else if (P1Cards[i][1] == 'knekt' || P1Cards[i][1] == 'dam' || P1Cards[i][1] == 'kung') {
        P1HandValue += 10;
      }
      else {
        P1HandValue += P1Cards[i][1];
      }
    }
    for (let i = 0; i < P2Cards.length; i++){
      if (P2Cards[i][1] == 'ess') {
        P2HandValue += 11;
      }
      else if (P2Cards[i][1] == 'knekt' || P2Cards[i][1] == 'dam' || P2Cards[i][1] == 'kung') {
        P2HandValue += 10;
      }
      else {
        P2HandValue += P2Cards[i][1];
      }
    }

    log(P1 + "'s hand value is " + P1HandValue);
    log(P2 + "'s hand value is " + P2HandValue);
  }
}

/* RUNNING */

//PART 1
//CREATE DECK & SHUFFLE

const deck = new Deck;

//PART 2
//CREATE PLAYERS

const players = new Players('John', 'Ceena');

//PART 5
//CREATE DEALER

const dealer = new Dealer;

//DEAL 5 CARDS TO BOTH PLAYERS

dealer.dealCards(deck.deck, 5, players);

//PART 3
//BOTH PLAYERS TAKE 2 CARDS

players.takeCards(deck.deck, 'P1', 2, dealer.P1Cards, dealer.P2Cards);
players.takeCards(deck.deck, 'P2', 2, dealer.P1Cards, dealer.P2Cards);

//CREATE CARDS AND CALCULATE HANDS

const cards = new Cards;
cards.calculateHand(players.P1, players.P2, dealer.P1Cards, dealer.P2Cards)

//BOTH PLAYERS TOSS 2 CARDS

players.tossCards('P1', 2, dealer.P1Cards, dealer.P2Cards, cards);
players.tossCards('P2', 2, dealer.P1Cards, dealer.P2Cards, cards);

//CALCULATE HANDS

cards.calculateHand(players.P1, players.P2, dealer.P1Cards, dealer.P2Cards)

//PART 4
//BOTH PLAYERS TOSS THEIR CARDS

players.tossAll(dealer.P1Cards, dealer.P2Cards);

//CALCULATE HANDS, VALUE SHOULD BE 0

cards.calculateHand(players.P1, players.P2, dealer.P1Cards, dealer.P2Cards)

//MOVE CARDS FROM TOSSPILE TO BACK TO DECK

dealer.rebuildDeck(deck.deck, players.tossPile)

//SHUFFLE THE REBUILT DECK

deck.shuffle(deck.deck);
log('Shuffled rebuilt deck: ', deck.deck);

//PART 6

//======