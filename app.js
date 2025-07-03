const allQuestions = [
      {
        question: "What word is always spelled incorrectly in every dictionary?",
        options: ["Misspelled", "Incorrectly", "Wrong", "Impossible"],
        answer: "Incorrectly"
      },
      {
        question: "Which of the following is the odd one out?",
        options: ["Banana", "Apple", "Mango", "Carrot"],
        answer: "Carrot"
      },
      {
        question: "What do you light first in a dark room with a candle, lamp, and match?",
        options: ["The lamp", "The candle", "The stove", "The match"],
        answer: "The match"
      },
      {
        question: "A girl has as many brothers as sisters. Each brother has half as many brothers as sisters. How many are there?",
        options: ["2 boys, 4 girls", "3 boys, 4 girls", "4 boys, 3 girls", "5 boys, 5 girls"],
        answer: "3 boys, 4 girls"
      },
      {
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        options: ["The letter M", "Breath", "A second", "Blink"],
        answer: "The letter M"
      },
      {
        question: "Sara’s mother has four daughters: April, May, June and...?",
        options: ["July", "August", "Sara", "None of these"],
        answer: "Sara"
      },
      {
        question: "If two’s company and three’s a crowd, what are four and five?",
        options: ["Party", "Nine", "A joke", "A game"],
        answer: "Nine"
      },
      {
        question: "How can you cut a cake into 8 pieces with 3 cuts?",
        options: ["Slice vertically 3 times", "Cut diagonally 3 times", "Stack and slice", "Use a cutter"],
        answer: "Stack and slice"
      },
      {
        question: "Which number is odd one out: 2, 3, 5, 7, 9, 11?",
        options: ["3", "9", "5", "11"],
        answer: "9"
      },
      {
        question: "What has hands but cannot clap?",
        options: ["Clock", "Monkey", "Table", "Robot"],
        answer: "Clock"
      }
    ];

    let quizData = [];
    let currentQuestion = 0;
    let score = 0;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const resultEl = document.getElementById("result");
    const restartBtn = document.getElementById("restart-btn");

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function startQuiz() {
      quizData = shuffle([...allQuestions]).slice(0, 5);
      currentQuestion = 0;
      score = 0;
      questionEl.style.display = "block";
      optionsEl.style.display = "block";
      nextBtn.style.display = "inline-block";
      restartBtn.style.display = "none";
      resultEl.textContent = "";
      loadQuestion();
    }

    function loadQuestion() {
      const q = quizData[currentQuestion];
      questionEl.textContent = q.question;
      optionsEl.innerHTML = "";
      resultEl.textContent = "";

      q.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => checkAnswer(li, q.answer);
        optionsEl.appendChild(li);
      });
    }

    function checkAnswer(selected, correct) {
      const options = optionsEl.querySelectorAll("li");
      options.forEach(option => {
        option.classList.remove("correct", "wrong");
        option.style.pointerEvents = "none";

        if (option.textContent === correct) {
          option.classList.add("correct");
        } else if (option === selected) {
          option.classList.add("wrong");
        }
      });

      if (selected.textContent === correct) {
        score++;
      }
    }

    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    };

    restartBtn.onclick = () => {
      startQuiz(); // restart with new shuffled questions
    };

    function showResult() {
      questionEl.style.display = "none";
      optionsEl.style.display = "none";
      nextBtn.style.display = "none";
      restartBtn.style.display = "inline-block";
      resultEl.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>!`;
    }

    // Start first quiz
    startQuiz();