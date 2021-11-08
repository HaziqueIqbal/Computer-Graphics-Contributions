class IntelligentTurtle extends Turtle {
    constructor(...prop) {
        super(...prop);
        this.iterations = 0;
        //TURTLE STATE - CP, CD
        this.state = new State(this.CP, this.CD);
        // this.state = { CP: this.CP, CD: this.CD };
        //TURTLE MEMORY
        this.turtleStack = [];
        this.turtleStack.push(this.state);
        //BOOLEANS FOR TURTLE PATH
        //saving incoming bracket [
        this.saveBracket = true;
        //saving incoming point CP with CD
        this.savePoint = false;
    }

    //SET STATE
    setCurrentState(state) {
        this.state = new State(state.CP, state.CD);
        // this.state = { CP: state.CP, CD: state.CD};
        this.CP = this.state.CP;
        this.CD = this.state.CD;
    }

    //UPDATE STATE
    updateState() {
        this.state = new State(this.CP, this.CD);
        // this.state = { CP: this.CP, CD: this.CD };
        this.CP = this.state.CP;
        this.CD = this.state.CD;
    }
    drawString(str, angle) {
        str = str.toUpperCase();

        for (let ch of str) {
            if (ch == "+") {
                this.turnRight(angle);
            } else if (ch == "-") {
                this.turnLeft(angle);
            } else if (ch == "[") {
                this.saveBracket = true;
                this.savePoint = true;
                this.saveTurtle();
            } else if (ch == "]") {
                this.restoreTurtle();
            } else if (ch == "F") {
                if (this.savePoint) this.turtleStack.push(this.state);
                this.forward(1, true);
            }
        }
        return this.drawTurtle();
    }
    produceString(atom, ruleSet, iterations) {
        let atomPos = 0,
            rule,
            char;
        atom = atom.toUpperCase();
        atom = atom.split("");
        for (let i = 0; i < iterations; i++) {
            for (atomPos = 0; atomPos < atom.length;) {
                char = atom[atomPos];
                if (char == "+" || char == "-" || char == "[" || char == "]") {
                    atomPos++;
                    continue;
                }
                rule = ruleSet[char].split("");
                atom.splice(atomPos, 1, ...rule);
                atomPos += rule.length;
            }
        }
        atom = atom.join("");
        // console.log("Final: ", atom);
        return atom;

    }
    saveTurtle() {
        if (this.saveBracket) {
            this.turtleStack.push("[");
            this.saveBracket = false;
        }
        this.turtleStack.push(this.state);
    }
    restoreTurtle() {
        //looping array in reverse order for back tracking
        for (let i = this.turtleStack.length - 1; i >= 0; i--) {
            //if the opening of the bracket is found then break
            if (this.turtleStack[i] == "[") {
                this.turtleStack.pop();
                if (i == 0) {
                    //when reached the end of stack then do not save upcoming points
                    this.savePoint = false;
                }
                break;
            }
            let lastState = this.turtleStack.pop();

            this.path.lineTo(lastState.CP.x, lastState.CP.y);
            this.setCurrentState(lastState);
        }
        this.saveBracket = true;
    }
    //TURN RIGHT
    turnRight(angle) {
        this.CD -= angle;
        this.updateState();
    }

    //TURN LEFT
    turnLeft(angle) {
        this.CD += angle;
        this.updateState();
    }
}
class State {
    static CP;
    static CD;
    constructor(CP, CD) {
        this.CP = CP;
        this.CD = CD;
    }
}