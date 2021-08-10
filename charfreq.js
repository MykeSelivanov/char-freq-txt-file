// DefaultMap extends Map so that the get() method returns the specified value instead of null
// when key is not in the map
class DefaultMap extends Map {
    constructor(defaultValue){
        super();
        this.defaultValue = defaultValue;
    }

    get(key){
        // if the key is in the map, return it's value from superclass
        if(this.has(key)) {
            return super.get(key);
        // otherwise default value will be returned
        } else {
            return this.defaultValue;
        }
    }
}

// Histogram class computes and displays letter frequency histograms
class Histogram {
    constructor(){
        this.letterCounts = new DefaultMap(0);
        this.totalLetters = 0;
    }

    // this functions updates the histogram with the letters of text
    add(text) {
        // removing whitespaces from the text and convert it to upper case
        text = text.replace(/\s/g, "").toUpperCase();

        // loop through the text characters
        for (let char of text) {
            let count = this.letterCounts.get(char);
            this.letterCounts.set(character, count + 1);
            this.totalLetters++;
        }
    }

    // this func converts the histogram to a string that will display ASCII graphic
    toString() {
        // map to array of [k,v] arrays
        let entries = [...this.letterCounts];

        // sorting array: first by count and then alphabetically
        entries.sort((a,b) => {
            if (a[1] === b[1]) {
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[1] - a[1];
            }
        });

        // converting counts to %
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }

        // disregard an entry if it is less than 1%
        entries = entries.filter(entry => entry[1] >= 1);
    
        // converting each entry to the line of text
        let lines = entries.map(
            ([l,n]) => `${l}: ${'#'.repeat(Math.round(n))} ${n.toFixed(2)}`
        );

        // concatenate lines, separated with newline character
        return lines.join('\n');
    }
}

// This async function creates a Histogram object, asynchronosly reads chunks of text from standard input, and adds chunks 
// to histogram. When end of the stream is reached, this histogram is returned
async function histogramFromStdin(){
    process.stdin.setEncoding('utf-8'); // set to read unicode strings, not bytes
    let histogram = new Histogram();
    for await (let chunk of process.stdin){
        histogram.add(chunk);
    }
    return histogram;
}

// Main body of the program
// makes a Histogram object from stdin and then printts the histogram
histogramFromStdin().then(histogram => {console.log(histogram.toString());});