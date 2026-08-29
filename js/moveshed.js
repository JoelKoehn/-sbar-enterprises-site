(function () {
  "use strict";

  var quiz = document.querySelector("[data-quiz]");
  if (!quiz) return;

  var questions = Array.prototype.slice.call(quiz.querySelectorAll("[data-quiz-question]"));
  var resultEl = quiz.querySelector("[data-quiz-result]");
  var stepLabel = quiz.querySelector("[data-quiz-step-label]");
  var dotsWrap = quiz.querySelector("[data-quiz-dots]");
  var backBtn = quiz.querySelector("[data-quiz-back]");
  var answers = {};
  var current = 0;

  function updateDots(index) {
    if (!dotsWrap) return;
    Array.prototype.slice.call(dotsWrap.children).forEach(function (dot, i) {
      dot.classList.toggle("is-active", i <= index);
    });
  }

  function showStep(index) {
    questions.forEach(function (q, i) {
      q.hidden = i !== index;
    });
    if (resultEl) resultEl.hidden = true;
    if (stepLabel) stepLabel.textContent = "Question " + (index + 1) + " of " + questions.length;
    if (backBtn) backBtn.hidden = index === 0;
    updateDots(index);
  }

  function showResult() {
    questions.forEach(function (q) {
      q.hidden = true;
    });
    if (resultEl) resultEl.hidden = false;
    if (backBtn) backBtn.hidden = false;
    if (stepLabel) stepLabel.textContent = "All done";
    updateDots(questions.length);

    var summaryEl = resultEl ? resultEl.querySelector("[data-quiz-summary]") : null;
    if (summaryEl) {
      summaryEl.innerHTML = "";
      ["move_type", "distance", "access", "timeframe"].forEach(function (key) {
        if (answers[key]) {
          var chip = document.createElement("span");
          chip.className = "quiz-chip";
          chip.textContent = answers[key].label;
          summaryEl.appendChild(chip);
        }
      });
    }

    // Pre-fill the quote form below with what the quiz already learned.
    var moveTypeSelect = document.getElementById("move-type");
    if (moveTypeSelect && answers.move_type) {
      moveTypeSelect.value = answers.move_type.value;
    }

    var notesField = document.getElementById("notes");
    if (notesField) {
      var parts = [];
      if (answers.distance) parts.push("Distance: " + answers.distance.label + ".");
      if (answers.access) parts.push("Access: " + answers.access.label + ".");
      if (answers.timeframe) parts.push("Timeframe: " + answers.timeframe.label + ".");
      if (parts.length) notesField.value = parts.join(" ");
    }

    Array.prototype.slice.call(document.querySelectorAll("[data-prefill-hint]")).forEach(function (hint) {
      hint.hidden = false;
    });
  }

  questions.forEach(function (q, i) {
    var key = q.getAttribute("data-key");
    Array.prototype.slice.call(q.querySelectorAll("[data-value]")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        answers[key] = { value: btn.getAttribute("data-value"), label: btn.textContent.trim() };
        if (i < questions.length - 1) {
          current = i + 1;
          showStep(current);
        } else {
          showResult();
        }
      });
    });
  });

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      if (resultEl && !resultEl.hidden) {
        current = questions.length - 1;
        showStep(current);
        return;
      }
      if (current > 0) {
        current -= 1;
        showStep(current);
      }
    });
  }

  showStep(0);
})();
