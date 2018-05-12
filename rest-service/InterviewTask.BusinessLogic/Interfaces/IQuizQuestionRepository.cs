using InterviewTask.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.BusinessLogic.Interfaces
{
    public interface IQuizQuestionRepository : IDisposable
    {
        List<QuizQuestion> GetAll();
        void AddQuestion(QuizQuestion question);
        void SaveChanges();
    }
}
