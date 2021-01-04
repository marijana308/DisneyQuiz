var pool;
var choice = "";
var numCorrect = 0;
var numWrong = 0;
var countDownTimer = 10;
var intervalId;
var position = 1;
var delay;

function restart() {
  choice = "";
  numCorrect = 0;
  numWrong = 0;
  countDownTimer = 10;
  intervalId;
  position = 1;
  delay;
  hideQuestion();
  $("#message").hide();
  $("#wins").hide();
  $("#losses").hide();
  $(".restartBtn").hide();
  $("#pickDifficulty").show();
}

function decreaseTimer() {
  if (countDownTimer <= 0) {
    hideQuestion();
    timeUp();
    clearInterval(intervalId);
    delay = setTimeout(next, 3500);
  }

  $("#timer").text(countDownTimer);
  countDownTimer--;
}

function next() {
  if (position === 10) {
    if (numCorrect > numWrong) {
      $("#message").text(
        "Quiz is over! You got " +
          numCorrect +
          " out of 10 questions correct, good job!"
      );
    } else {
      $("#message").text(
        "Quiz is over! You got " +
          numCorrect +
          " out of 10 questions correct, you should try again!"
      );
    }
    $("#message").show();
    $(".restartBtn").show();
  } else {
    position++;
    countDownTimer = 10;
    intervalId = setInterval(decreaseTimer, 1000);

    displayQuestion();

    $("#message").hide();
  }
}

function rightAnswer() {
  $("#message").text("Correct!");
  $("#message").show();
  numCorrect++;
}

function wrongAnswer() {
  numWrong++;
  $("#message").text("Wrong... The answer was: " + pool[position].a);
  $("#message").show();
}

function timeUp() {
  numWrong++;
  $("#message").text("Time's up! The answer was: " + pool[position].a);
  $("#message").show();
}

function hideQuestion() {
  $("#status").hide();
  $("#question").hide();
  $("#choice1").hide();
  $("#choice2").hide();
  $("#choice3").hide();
  $("#choice4").hide();

  $("#timer").hide();
}

function displayQuestion() {
  clearInterval(delay);
  $("#status").text("#" + position + "/10");
  $("#question").text(pool[position].q);
  $("#choice1").text("1. " + pool[position].c1);
  $("#choice2").text("2. " + pool[position].c2);
  $("#choice3").text("3. " + pool[position].c3);
  $("#choice4").text("4. " + pool[position].c4);

  $("#status").show();
  $("#question").show();
  $("#choice1").show();
  $("#choice2").show();
  $("#choice3").show();
  $("#choice4").show();

  $("#timer").show();
}

function playRound() {
  if (choice === pool[position].a) {
    rightAnswer();
  } else if (choice != pool[position].a) {
    wrongAnswer();
  }
}

function submitAnswer(answer) {
  choice = pool[position][answer];
  $(".next").show();
  clearInterval(intervalId);
  hideQuestion();
  delay = setTimeout(next, 2000);

  playRound();
}

function startQuiz() {
  intervalId = setInterval(decreaseTimer, 1000);

  displayQuestion();
}

$(document).ready(function () {
  document.getElementById("startQuizBtn").style.display = "none";

  function showStartQuizButton() {
    document.getElementById("startQuizBtn").style.display = "inline";
  }

  setTimeout(showStartQuizButton, 6500);

  $("h1").hide();
  $(".container").hide();
  $("#pickDifficulty").hide();
  $(".restartBtn").hide();

  $(".restartBtn").on("click", function (event) {
    event.preventDefault();
    restart();
  });

  $("#choice1").on("click", function (event) {
    event.preventDefault();
    submitAnswer("c1");
  });

  $("#choice2").on("click", function (event) {
    event.preventDefault();
    submitAnswer("c2");
  });

  $("#choice3").on("click", function (event) {
    event.preventDefault();
    submitAnswer("c3");
  });

  $("#choice4").on("click", function (event) {
    event.preventDefault();
    submitAnswer("c4");
  });

  $("#timer").hide();

  $("#startQuizBtn").on("click", function (event) {
    $("#classicIntro").hide();
    $("#startQuizBtn").hide();
    $("#pickDifficulty").show();
    $("h1").show();
  });

  $("#easyBtn").on("click", function (event) {
    $("#pickDifficulty").hide();
    $(".container").show();
    pool = {
      1: {
        q: "What was Mickey Mouse originally called?",
        c1: "Keith Mouse",
        c2: "Mortimer Mouse",
        c3: "Steven Mouse",
        c4: "Michael Mouse",
        a: "Mortimer Mouse",
      },

      2: {
        q: "What is the name of Simba's dad in The Lion King?",
        c1: "Mufasa",
        c2: "Kirikou",
        c3: "Rafiki",
        c4: "Pumba",
        a: "Mufasa",
      },
      3: {
        q:
          "In Monsters, Inc. what do Mike and Sullivan collect in order to power the city?",
        c1: "Children's screams",
        c2: "Recycled paper",
        c3: "Coal",
        c4: "Dreams",
        a: "Children's screams",
      },
      4: {
        q: "Who was Snow White's enemy?",
        c1: "The Evil Queen",
        c2: "Maleficient",
        c3: "Cruella de Vill",
        c4: "Scar",
        a: "The Evil Queen",
      },
      5: {
        q:
          "In The Emperor's New Groove, what animal is Emperor Kuzco turned into?",
        c1: "A donkey",
        c2: "A camel",
        c3: "A cow",
        c4: "A llama",
        a: "A llama",
      },
      6: {
        q: "How many wishes did the genie grant Aladdin?",
        c1: "one",
        c2: "five",
        c3: "three",
        c4: "Unlimited wishes",
        a: "three",
      },
      7: {
        q: "Cruella de Vil is the villain in which Disney movie?",
        c1: "Snow White",
        c2: "101 Dalmations",
        c3: "Sleeping Beauty",
        c4: "The AristoCats",
        a: "101 Dalmations",
      },
      8: {
        q:
          "What is the name of the boy who owns Buzz Lightyear in the movie Toy Story?",
        c1: "Billy",
        c2: "Colby",
        c3: "Tony",
        c4: "Andy",
        a: "Andy",
      },
      9: {
        q: "Who sang the song Under The Sea in the film The Little Mermaid?",
        c1: "Dory",
        c2: "Pascal",
        c3: "Nemo",
        c4: "Sebastian",
        a: "Sebastian",
      },
      10: {
        q: "What was the name of the man who created Pinocchio?",
        c1: "Lionel",
        c2: "Paul",
        c3: "Geppetto",
        c4: "Martin",
        a: "Geppetto",
      },
    };

    startQuiz();
  });

  $("#mediumBtn").on("click", function (event) {
    $("#pickDifficulty").hide();
    $(".container").show();
    pool = {
      1: {
        q: "Which of these is NOT a Disney film?",
        c1: "Bambi",
        c2: "Pinocchio",
        c3: "The fox and the hound",
        c4: "The land before time",
        a: "The land before time",
      },

      2: {
        q:
          "In The Little Mermaid, who convinces Ariel to visit Ursula, the sea witch?",
        c1: "Sebastian",
        c2: "Scuttle",
        c3: "Flotsam and Jetsam",
        c4: "Pinto",
        a: "Flotsam and Jetsam",
      },
      3: {
        q: "What is the name of Donald Duck’s girlfriend?",
        c1: "Dotty",
        c2: "Daisy",
        c3: "Deanna",
        c4: "Dereka",
        a: "Daisy",
      },
      4: {
        q: "Who sang ‘When You Wish Upon a Star’?",
        c1: "Simba",
        c2: "Jiminy Cricket",
        c3: "Launchpad McQuack",
        c4: "Baloo",
        a: "Jiminy Cricket",
      },
      5: {
        q: "When did Mickey Mouse first appear?",
        c1: "1917",
        c2: "1928",
        c3: "1939",
        c4: "1951",
        a: "1928",
      },
      6: {
        q: "What's the name of Snow White's prince?",
        c1: "Phillip",
        c2: "Florian",
        c3: "William",
        c4: "His name is unknown",
        a: "Florian",
      },
      7: {
        q:
          "How long was the Genie stuck in the lamp before Aladdin released him?",
        c1: "1000 years",
        c2: "100 years",
        c3: "10 000 years",
        c4: "100 000 years",
        a: "10 000 years",
      },
      8: {
        q: "Who was the first Disney princess?",
        c1: "Cinderella",
        c2: "Snow White",
        c3: "Aurora",
        c4: "Belle",
        a: "Snow White",
      },
      9: {
        q: "How many sisters does Ariel have?",
        c1: "seven",
        c2: "six",
        c3: "five",
        c4: "four",
        a: "six",
      },
      10: {
        q:
          "Who was the only Disney main character who didn’t talk throughout the entire film?",
        c1: "Dumbo",
        c2: "Bambi",
        c3: "Mickey Mouse",
        c4: "Andy",
        a: "Dumbo",
      },
    };
    startQuiz();
  });

  $("#hardBtn").on("click", function (event) {
    $("#pickDifficulty").hide();
    $(".container").show();
    pool = {
      1: {
        q: "In The Little Mermaid, what is Sebastian's full name?",
        c1: "Horatio Thelonious Pugnacious Crustaceous Sebastian",
        c2: "Horatio Thelonious Keith Crustaceous Sebastian",
        c3: "Horatio Thelonious Ignacious Crustaceous Sebastian",
        c4: "Johann Sebastian Bach",
        a: "Horatio Thelonious Ignacious Crustaceous Sebastian",
      },

      2: {
        q: "Who was Walt Disney's favourite character?",
        c1: "The kitten who belonged to Geppetto in Pinocchio",
        c2: "Dwarf Sneezy from Snow White",
        c3: "Mickey Mouse",
        c4: "Fairy Godmother from Cinderella",
        a: "The kitten who belonged to Geppetto in Pinocchio",
      },
      3: {
        q: "Which address does Andy's family move to at the end of Toy Story?",
        c1: "21 Jump Street",
        c2: "13 Coronation Street",
        c3: "234 Elm Street",
        c4: "742 Evergreen Terrace",
        a: "234 Elm Street",
      },
      4: {
        q: "What is the name of the unseen villain in Bambi?",
        c1: "Shere Khan",
        c2: "Kaa",
        c3: "Man",
        c4: "Grizela",
        a: "Man",
      },
      5: {
        q: "What's Simba's mother's name?",
        c1: "Sarabi",
        c2: "Bahar",
        c3: "Dakini",
        c4: "Zahara",
        a: "Sarabi",
      },
      6: {
        q: "Which Disney princess has the fewest lines?",
        c1: "Aurora",
        c2: "Snow White",
        c3: "Tiana",
        c4: "Belle",
        a: "Aurora",
      },
      7: {
        q: "What was the name of Maleficent’s pet raven?",
        c1: "Diablo",
        c2: "Grim",
        c3: "Virion",
        c4: "Morgan",
        a: "Diablo",
      },
      8: {
        q:
          "What was the last movie that Walt Disney was able to work on before he died?",
        c1: "Sleeping Beauty",
        c2: "The Sword in the Stone",
        c3: "101 Dalmatians",
        c4: "The Jungle Book",
        a: "The Jungle Book",
      },
      9: {
        q:
          "What fraternity did Mike Wazowski become a member of in Monsters University?",
        c1: "Alpha Chi Alpha",
        c2: "Oozma Kappa",
        c3: "Delta Psi",
        c4: "Kappa Alpha Psi",
        a: "Oozma Kappa",
      },
      10: {
        q: "What was the name of Buzz Lightyear’s arch nemesis?",
        c1: "Zurg",
        c2: "Burg",
        c3: "Furg",
        c4: "Murg",
        a: "Zurg",
      },
    };

    startQuiz();
  });
});
