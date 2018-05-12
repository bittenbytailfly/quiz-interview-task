using InterviewTask.BusinessLogic.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.BusinessLogic.Interfaces
{
    public interface IQuizQuestionService : IDisposable
    {
        QuizQuestionViewModel GetRandomQuizQuestion();
        bool AddNewQuizQuestion(QuizQuestionViewModel quizQuestionViewModel);
    }
}
