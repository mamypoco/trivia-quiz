window.onload = sendApiRequest;

async function sendApiRequest() {
  let response = await fetch(`https://opentdb.com/api.php?amount=1`);
  console.log(response);
  let data = await response.json();
  console.log(data);
  useApiData(data);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function useApiData(data) {
  let data_result = data.results[0];

  document.querySelector(
    "#category"
  ).innerHTML = `Category: ${data_result.category}`;
  document.querySelector(
    "#difficulty"
  ).innerHTML = `Difficulty: ${data_result.difficulty}`;
  document.querySelector(
    "#question"
  ).innerHTML = `Question: ${data_result.question}`;

  let answers = [
    data_result.correct_answer,
    data_result.incorrect_answers[0],
    data_result.incorrect_answers[1],
    data_result.incorrect_answers[2],
  ];

  console.log("correct answer:", data_result.correct_answer);
  console.log("original array", answers);

  shuffle(answers);
  //   console.log("shuffled array:", answers);

  document.querySelector("#answer1").innerHTML = answers[0];
  document.querySelector("#answer2").innerHTML = answers[1];
  document.querySelector("#answer3").innerHTML = answers[2];
  document.querySelector("#answer4").innerHTML = answers[3];

  let answerButtons = document.querySelectorAll(".answer");

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.innerHTML === data_result.correct_answer) {
        document.querySelector("#message").innerHTML =
          "CORRECT! You are so smart😸";

        document.querySelector("#next").style.display = "block"; // Show the "Next" button
        document.querySelector("#next").addEventListener("click", () => {
          // Reload the page to fetch a new quiz
          location.reload();
        });
      } else {
        document.querySelector("#message").innerHTML =
          "INCORRECT! Try Again💩💦";
        //   shuffle(answers); // Shuffle answers again
        document.querySelector("#answer1").innerHTML = answers[0];
        document.querySelector("#answer2").innerHTML = answers[1];
        document.querySelector("#answer3").innerHTML = answers[2];
        document.querySelector("#answer4").innerHTML = answers[3];
      }
    });
  });
}
