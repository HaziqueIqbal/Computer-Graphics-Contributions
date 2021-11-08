class Navigator extends Turtle {
    static atom;
    static givenRule;
    static iterations;
    constructor(...prop) {
        super(...prop);
        this.atom = "";
        this.givenRule = "";
        this.iterations = 0;
        this.rulesObject = {};
    }
    check() {
        switch (arguments.length) {
            case 1:
                this.drawPath1(arguments[0]);
                break;
            case 3:
                if (typeof arguments[1] === "string") {
                    this.drawPath3(arguments[0], arguments[1], arguments[2])

                }
                else {
                    this.drawPath2(arguments[1], arguments[2])
                }
                break;
            default:
                console.log("Error in arguments");
                break;
        }
    }
    drawPath1(string) {
        for (var i = 0; i < string.length; i++) {
            switch (string[i]) {
                case "F":
                    this.forward(1, true);
                    break;
                case "+":
                    // console.log("+")
                    this.turn(this.angle)
                    break;
                case "-":
                    // console.log("-")
                    this.turn(-this.angle)
                    break;
                default:
                    break;
            }
        }
    }
    drawPath3(atom, givenRule, iterations) {
        this.atom = atom;
        this.givenRule = givenRule;
        this.iterations = iterations;
        var output = "";
        for (var i = 1; i <= iterations; i++) {
            output = "";
            for (var j = 0; j < this.atom.length; j++) {
                if (this.atom.charAt(j) != "F") {
                    output += this.atom.charAt(j);
                } else {
                    output += this.atom[j].replace(this.atom[j], givenRule);
                }
            }
            this.atom = output;
        }
        this.drawPath1(this.atom)
    }
    drawPath2(ruleSet, iteration) {
        this.iterations = iteration;
        var output = "";
        var { inputAtom, ...rulesObject } = ruleSet
        this.atom = inputAtom;
        for (var i = 1; i <= iteration; i++) {
            output = "";
            for (var j = 0; j < this.atom.length; j++) {
                if (Object.keys(rulesObject).includes(this.atom.charAt(j))) {
                    output += this.atom[j].replace(this.atom[j], rulesObject[this.atom.charAt(j)]);
                }
                else {
                    output += this.atom.charAt(j);
                }
            }
            this.atom = output;
        }
        this.drawPath1(this.atom)
    }

}
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
