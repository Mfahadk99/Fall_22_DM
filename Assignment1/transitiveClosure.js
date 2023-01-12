let inputDiv = document.getElementById("inputDiv");
let Output = document.getElementById("output");
let note = document.getElementById("note");
var vertices;

function GenerateInputFields(e) {
  inputDiv.innerHTML = "";
  vertices = parseInt(e.value);
  for (let i = 0; i < vertices; i++) {
    for (let i = 0; i < vertices; i++) {
      inputDiv.innerHTML += "<input class='valueInput' />";
    }
    inputDiv.innerHTML += "<br/>";
  }
  vertices > 0 ? (note.style.display = "block") : (note.style.display = "none");
}

function GenerateMatrix() {
  let Inputs = document.getElementsByClassName("valueInput");
  let InputValues = [];
  let Matrix = [];
  for (const element of Inputs) {
    if (!element.value) {
      element.value = 0;
      InputValues.push(0);
    } else {
      InputValues.push(parseInt(element.value));
    }
  }
  while (InputValues.length) Matrix.push(InputValues.splice(0, vertices));
  return Matrix;
}

function transitiveClosure() {
  var graph = GenerateMatrix();
  var reach = Array.from(Array(vertices), () => new Array(vertices));
  var i, j, k;

  for (i = 0; i < vertices; i++)
    for (j = 0; j < vertices; j++) reach[i][j] = graph[i][j];

  for (k = 0; k < vertices; k++) {
    for (i = 0; i < vertices; i++) {
      for (j = 0; j < vertices; j++) {
        reach[i][j] =
          reach[i][j] != 0 || (reach[i][k] != 0 && reach[k][j] != 0) ? 1 : 0;
      }
    }
  }

  printSolution(reach);
}

function printSolution(reach) {
  for (var i = 0; i < vertices; i++) {
    for (var j = 0; j < vertices; j++) {
      if (i == j) {
        Output.innerHTML += "1 ";
      } else {
        Output.innerHTML += reach[i][j] + " ";
      }
    }
    Output.innerHTML += "<br/>";
  }
}
