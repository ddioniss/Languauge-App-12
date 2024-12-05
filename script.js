$(document).ready(function () {
  const initialWords = [
    { word: "Hello", translation: "Привіт" },
    { word: "Apple", translation: "Яблуко" },
    { word: "Car", translation: "Авто" },
    { word: "Sun", translation: "Сонце" },
    { word: "Book", translation: "Книга" },
    { word: "Water", translation: "Вода" },
    { word: "Dog", translation: "Собака" },
    { word: "House", translation: "Дім" },
    { word: "Tree", translation: "Дерево" },
    { word: "Computer", translation: "Комп'ютер" },
    { word: "Chair", translation: "Стілець" },
    { word: "Table", translation: "Стіл" },
    { word: "Window", translation: "Вікно" },
    { word: "Door", translation: "Двері" },
    { word: "Friend", translation: "Друг" },
    { word: "School", translation: "Школа" },
    { word: "Food", translation: "Їжа" },
    { word: "Family", translation: "Сім'я" },
    { word: "Music", translation: "Музика" },
    { word: "Phone", translation: "Телефон" },
    { word: "Bag", translation: "Сумка" },
    { word: "Shirt", translation: "Рубашка" },
    { word: "Shoes", translation: "Взуття" },
    { word: "Street", translation: "Вулиця" },
    { word: "Park", translation: "Парк" },
    { word: "City", translation: "Місто" },
    { word: "Country", translation: "Країна" }
  ];
  let words = [...initialWords];
  let currentStep = 0;
  let correct = 0;
  let incorrect = 0;
  let difficulty = 'easy';
  function resetGame() {
    words = getWordsForDifficulty(difficulty);
    currentStep = 0;
    correct = 0;
    incorrect = 0;
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#progress-bar").css("width", "0%").text("Step 0 of " + words.length);
    showNextWord();
  }
  function getWordsForDifficulty(level) {
    switch (level) {
      case 'medium':
        return initialWords.slice(0, 15);
      case 'hard':
        return initialWords;
      default:
        return initialWords.slice(0, 10);
    }
  }
  function showNextWord() {
    if (currentStep < words.length) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const currentWord = words[randomIndex];
      $("#word").text(currentWord.word);
      $("#translation").data("correct", currentWord.translation);
      $("#progress-bar")
        .css("width", ((currentStep + 1) / words.length) * 100 + "%")
        .text(`Step ${currentStep + 1} of ${words.length}`);
      words.splice(randomIndex, 1);
    } else {
      $("#score").text(Math.round((correct / words.length) * 100) + "%");
      $("#level").text(correct > 18 ? "Advanced" : correct > 12 ? "Intermediate" : "Beginner");
      $("#resultModal").modal("show");
      setTimeout(resetGame, 5000);
    }
  }
  $("#check").click(function () {
    const userInput = $("#translation").val().trim();
    const correctTranslation = $("#translation").data("correct");
    if (userInput === "") {
      alert("Please enter a translation!");
      return;
    }
    if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
      correct++;
    } else {
      incorrect++;
    }
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    currentStep++;
    $("#translation").val("");
    showNextWord();
  });
  $("#translation").keypress(function (event) {
    if (event.which === 13) {
      $("#check").click();
    }
  });
  $("#difficulty").change(function() {
    difficulty = $(this).val();
    resetGame();
  });
  resetGame();
});
