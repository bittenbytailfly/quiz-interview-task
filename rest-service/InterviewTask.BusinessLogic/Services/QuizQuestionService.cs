using InterviewTask.BusinessLogic.Interfaces;
using InterviewTask.BusinessLogic.Models;
using InterviewTask.BusinessLogic.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.BusinessLogic.Services
{
    public class QuizQuestionService : IQuizQuestionService
    {
        private IQuizQuestionRepository QuizQuestionRepository { get; set; }
        private IValidationDictionary ValidationDictionary { get; set; }
        private Random RandomGenerator { get; set; }

        public QuizQuestionService(IQuizQuestionRepository quizQuestionRepository, IValidationDictionary validationDictionary)
        {
            QuizQuestionRepository = quizQuestionRepository;
            ValidationDictionary = validationDictionary;
            RandomGenerator = new Random();
        }

        public QuizQuestionViewModel GetRandomQuizQuestion()
        {
            var questions = this.QuizQuestionRepository.GetAll();
            var randomQuestion = questions[this.RandomGenerator.Next(questions.Count)];
            return new QuizQuestionViewModel(randomQuestion.Question, randomQuestion.Answer);
        }

        public bool AddNewQuizQuestion(QuizQuestionViewModel quizQuestionViewModel)
        {
            ValidateQuizQuestion(quizQuestionViewModel);

            if (this.ValidationDictionary.IsValid)
            {
                var quizQuestion = new QuizQuestion
                {
                    QuizQuestionId = Guid.NewGuid(),
                    Question = quizQuestionViewModel.Question,
                    Answer = quizQuestionViewModel.Answer
                };

                this.QuizQuestionRepository.AddQuestion(quizQuestion);
                this.QuizQuestionRepository.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public void ValidateQuizQuestion(QuizQuestionViewModel quizQuestionViewModel)
        {
            if (String.IsNullOrWhiteSpace(quizQuestionViewModel.Question))
            {
                this.ValidationDictionary.AddError("Question", "Question is required");
            }
            if (String.IsNullOrWhiteSpace(quizQuestionViewModel.Answer))
            {
                this.ValidationDictionary.AddError("Answer", "Answer is required");
            }
        }

        public void Dispose()
        {
            this.QuizQuestionRepository?.Dispose();
        }
    }
}
