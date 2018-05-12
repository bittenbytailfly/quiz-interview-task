using System;
using System.Collections.Generic;
using InterviewTask.BusinessLogic.Interfaces;
using InterviewTask.BusinessLogic.Models;
using InterviewTask.BusinessLogic.Services;
using InterviewTask.BusinessLogic.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace InterviewTask.BusinessLogic.Tests
{
    [TestClass]
    public class QuizQuestionServiceTests
    {
        [TestMethod]
        public void Should_Call_Save_Methods_When_Question_Saved()
        {
            // Arrange
            var mockQuizQuestionRepository = new Mock<IQuizQuestionRepository>();
            var mockValidationDictionary = new MockValidationDictionary();
            var service = new QuizQuestionService(mockQuizQuestionRepository.Object, mockValidationDictionary);

            // Act
            var result = service.AddNewQuizQuestion(new QuizQuestionViewModel { Question = "Q", Answer = "A" });

            // Assert
            Assert.IsTrue(mockValidationDictionary.IsValid); // Should be perfectly valid and therefore ...
            mockQuizQuestionRepository.Verify(m => m.AddQuestion(It.IsAny<QuizQuestion>()), Times.Once); // ... changes are made to the table ...
            mockQuizQuestionRepository.Verify(m => m.SaveChanges(), Times.Once); // ... and saved ...
            Assert.IsTrue(result); // ... returning true
        }

        [TestMethod]
        public void Should_Not_Save_Invalid_QuizQuestions()
        {
            // Arrange
            var mockQuizQuestionRepository = new Mock<IQuizQuestionRepository>();
            var mockValidationDictionary = new MockValidationDictionary();
            var service = new QuizQuestionService(mockQuizQuestionRepository.Object, mockValidationDictionary);

            // Act
            bool result = service.AddNewQuizQuestion(new QuizQuestionViewModel { Question = "Q", Answer = "" });

            // Assert
            Assert.IsFalse(mockValidationDictionary.IsValid);
            Assert.IsTrue(mockValidationDictionary.Errors.ContainsKey("Answer"));
            mockQuizQuestionRepository.Verify(m => m.AddQuestion(It.IsAny<QuizQuestion>()), Times.Never);
            mockQuizQuestionRepository.Verify(m => m.SaveChanges(), Times.Never);
        }

        [TestMethod]
        public void Should_Get_Random_Quiz_Question_From_Repository()
        {
            // Arrange
            var mockQuizQuestionRepository = new Mock<IQuizQuestionRepository>();
            mockQuizQuestionRepository.Setup(m => m.GetAll()).Returns(GetMockQuizQuestions());
            var service = new QuizQuestionService(mockQuizQuestionRepository.Object, new Mock<IValidationDictionary>().Object);

            // Act
            service.GetRandomQuizQuestion();

            // Assert
            mockQuizQuestionRepository.Verify(m => m.GetAll(), Times.Once);
        }

        [TestMethod]
        public void Should_Generate_Random_Quiz_Questions()
        {
            // Arrange
            var randomCounter = new Dictionary<string, int>();
            var mockQuizQuestionRepository = new Mock<IQuizQuestionRepository>();
            mockQuizQuestionRepository.Setup(m => m.GetAll()).Returns(GetMockQuizQuestions());
            var service = new QuizQuestionService(mockQuizQuestionRepository.Object, new Mock<IValidationDictionary>().Object);

            // Act
            for (var i = 1; i < 500; i++)
            {
                var question = service.GetRandomQuizQuestion();
                if (randomCounter.ContainsKey(question.Question))
                {
                    randomCounter[question.Question]++;
                }
                else
                {
                    randomCounter.Add(question.Question, 1);
                }
            }

            // Assert
            // NOTE: In this instance since it's not easy to truly test for random, I'm outputting the 
            //       result for a quick check by eye.
            foreach (var key in randomCounter.Keys)
            {
                Console.WriteLine($"{key} was retrieved {randomCounter[key]} times");
            }
        }

        [TestMethod]
        public void Should_Not_Error_On_Generating_Random_Questions_If_No_Questions_Configured()
        {
            // Arrange
            var randomCounter = new Dictionary<string, int>();
            var mockQuizQuestionRepository = new Mock<IQuizQuestionRepository>();
            mockQuizQuestionRepository.Setup(m => m.GetAll()).Returns(new List<QuizQuestion>());
            var service = new QuizQuestionService(mockQuizQuestionRepository.Object, new Mock<IValidationDictionary>().Object);

            // Act
            var question = service.GetRandomQuizQuestion();

            // Assert
            mockQuizQuestionRepository.Verify(m => m.GetAll(), Times.Once);
            Assert.IsNull(question);
        }

        #region Mock Helpers

        public class MockValidationDictionary : IValidationDictionary
        {
            public Dictionary<string, string> Errors { get; set; }

            public void AddError(string key, string errorMessage)
            {
                this.Errors.Add(key, errorMessage);
                this.IsValid = false;
            }

            public bool IsValid { get; set; }

            public MockValidationDictionary()
            {
                this.IsValid = true;
                this.Errors = new Dictionary<string, string>();
            }
        }

        public List<QuizQuestion> GetMockQuizQuestions()
        {
            return new List<QuizQuestion>
            {
                new QuizQuestion
                {
                    QuizQuestionId = Guid.NewGuid(),
                    Question = "How many planets in the solar system?",
                    Answer = "Eight"
                },
                new QuizQuestion
                {
                    QuizQuestionId = Guid.NewGuid(),
                    Question = "What is the capital of Peru?",
                    Answer = "Lima"
                }
            };
        }

        #endregion
    }
}
