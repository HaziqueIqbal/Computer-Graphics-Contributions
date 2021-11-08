const scene = new THREE.Scene();

var fac = new factory(0, 5, 50, 100); //factory arguments (position_X, position_Y, position_Y, Length)

var plane = new THREE.GridHelper(100, 10);
scene.add(plane);

initialize();

animate();
//Declare or Initialize variables here..
var point, initAngle, t;

//Code your logic here..
function initialize() {
  //NOTE -> RUN ONE OBJECT AT A TIME, SO COMMENT ANY ONE scene.add()
  point = new THREE.Vector2(0, 0);
  initAngle = 90;

  //ITERATION COUNTER AND ANGLE - EDIT ANGLE MUST
  var order = 4;

  //FOR NAVIGATOR


  //SIMPLE STRING -> ONE ARGUMENT
  // RUN ONE AT A TIME FOR BETTER RESULT

  var str1 = "F-F++F-F";
  var str2 = "-F+FF+F--F";
  // nav.check(str1);

  //ATOM + RULE + ORDER -> THREE ARGUMENTS
  // RUN ONE AT A TIME FOR BETTER RESULT
  var rules = [{
    atom: "F",
    rule: "F-F++F-F"
  }, {
    atom: "FFF",
    rule: "F--FF+F-F+FF"
  }];
  //INDEX NUMBER OF RULES -> EDIT ONLY THIS, YOU CAN OBSERVE CHANGE IN SCENE..
  var num = 1;
  // nav.check(rules[num].atom, rules[num].rule, order)



  //ATOM + OBJECT OF RULES + ORDER -> THREE ARGUMENTS
  // RUN ONE AT A TIME FOR BETTER RESULT
  var obj = [{
    //DRAGON
    inputAtom: "FX",
    F: "F",
    X: "X+YF+",
    Y: "-FX-Y",
    angle: 90
  }, {
    //KOCH CURVE
    inputAtom: "F",
    F: "F-F++F-F",
    X: "",
    Y: "",
    angle: 60
  }, {
    //QUADRATIC KOCH ISLAND
    inputAtom: "F+F+F+F",
    F: "F+F-F-FF+F+F-F",
    X: "",
    Y: "",
    angle: 90
  },
  //DRAGON CURVE
  {
    inputAtom: "X",
    F: "F",
    X: "X+YF+",
    Y: "-FX-Y",
    angle: 90
  }, {
    //GHOSPER HEXAGONAL CURVE
    inputAtom: "XF",
    F: "F",
    X: "X+YF++YF-FX--FXFX-YF+",
    Y:"-FX+YFYF++YF+FX--FX-Y",
    angle:60
  },{
    //SIERPINSKI GASKET
    inputAtom:"FXF--FF--FF",
    F:"FF",
    X:"--FXF++FXF++FXF--",
    Y:"",
    angle:60
  },{
    //SIERPINSKI ARROW HEAD
    inputAtom: "YF",
    F:"F",
    X:"YF+XF+Y",
    Y:"XF-YF-X",
    angle:60
  }];

  //INDEX NUMBER OF OBJECT OF RULES -> EDIT ONLY THIS, YOU CAN OBSERVE CHANGE IN SCENE..
  var indexNumber = 6; // total 0 to 6
  var selectSet = obj[indexNumber];

  t = new Turtle(point, initAngle);
  const nav = new Navigator(point, initAngle, selectSet.angle);

  nav.check(selectSet.inputAtom, selectSet, order);


  //RENDERING THE STRING - COMMENT WHEN YOU RUN INTELLIGENT TURTLE
  // scene.add(nav.drawTurtle());
  // return;

  //---------------------------------------------------------------------------------------------------  

  //FOR INTELLIGENT TURTLE
  var maps = [{
    atom: "F",
    F: "FF-[-F+F+FX]+[+F-F-F]",
    X: "",
    Y: "",
    angle: 20
  }, {
    atom: "X",
    F: "FF",
    X: "F[+X]F[-X]+X",
    Y: "",
    angle: 20
  }];

  //INDEX NUMBER OF MAPS -> EDIT ONLY THIS, YOU CAN OBSERVE CHANGE IN SCENE..
  var number = 0;

  const inte = new IntelligentTurtle(point, initAngle);
  var string = inte.produceString(maps[number].atom, maps[number], order);


  // RENDERING THE STRING - COMMENT WHEN YOU RUN NAVIGATOR
  scene.add(inte.drawString(string, maps[number].angle));
}

function animate() {
  requestAnimationFrame(animate);

  fac.renderScene();
}

