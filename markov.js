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

    
    randChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }


  /** return random text from chains */
    makeText(numWords = 100) {
        //array from all keys in chains
        let keys = Array.from(this.chains.keys());
        //choose random key
        let key = this.randChoice(keys);
        //empty array to add values to
        let output = [];

        //make markove chain until max numWords or null is reached
        while (output.length < numWords && key !== null) {
            //add first random selected word
            output.push(key);
            //repalce value of key with random key value from chain
            key = this.randChoice(this.chains.get(key));
            //will repeat until max numWords or null is reached
        }
        return output.join(" ");
    }
}

let mm = new MarkovMachine("a a a");
// mm.makeText();

module.exports = {
    MarkovMachine,
};