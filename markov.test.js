const { MarkovMachine } = require("./markov");

describe("markov machine", function () {

    test('makes chains from given text', function () {
        let mm = new MarkovMachine("a b c c b a");

        expect(mm).toEqual(new Map([
            ["a", ["b", null]],
            ["b", ["c", "a"]],
            ["c", ["c", "b"]]
        ]))
    })

    test('only one key in chain from duplicate text', function () {
        let mm = new MarkovMachine("a a a");

        expect(mm.chains.size).toEqual(1)
    })

    test('randChoice returns 1 key', function () {
        expect(MarkovMachine.randChoice(["a", "a", "a"])).toEqual("a");
        expect(["a", "b", "c"]).toContain(MarkovMachine.randChoice(["a", "b", "c"]));
    })

    test('generates predictable text', function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(["a b c", "b c", "c"]).toContain(text);
    })

    test('stops at length', function () {
        let mm = new MarkovMachine("the cat in the hat");
        let output = mm.makeText(numWords = 2);
        let outputWords = output.split(/[ \r\n]+/);

        expect(outputWords.length).toBeLessThanOrEqual(2);
    })
})

