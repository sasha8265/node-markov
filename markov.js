/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
      let chains = new Map();

      for (let i = 0; i < this.words.length; i++) {
          let word = this.words[i];
          let following = this.words[i + 1] || null;
        
          if (chains.has(word)) {
              chains.get(word).push(following);
          } else {
              chains.set(word, [following]);
          }
      }
      this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.chains)