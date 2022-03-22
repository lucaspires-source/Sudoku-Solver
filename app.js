const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const squares = 81;
const submission = [];
for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", 0);
  inputElement.setAttribute("max", 9);
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
};


const populateValues = (isSolvable, solution) =>{
    const inputs = documente.querySelectorAll('input')
    if(isSolvable && solution){
        inputs.forEach((input, i) =>{
            input.value = solution[i]
        })
    }

}
const solve = () => {

    joinValues()
    const data = submission.join('')
  const options = {
    method: "POST",
    url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY
    },
    data: {
        puzzle:data
    },
  };

  axios
    .request(options)
    .then( (response) => {
      console.log(response.data)
      populateValues(response.data.solvable , response.data.solution)
    })
    .catch((error) => {
      console.error(error)
    });
};

solveButton.addEventListener('click', solve)
