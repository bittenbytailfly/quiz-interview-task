using InterviewTask.BusinessLogic.Interfaces;
using InterviewTask.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.DataAccess.Repositories
{
    public class QuizQuestionRepository : IQuizQuestionRepository
    {
        private QuizQuestionDbContext Context { get; set; }

        public QuizQuestionRepository()
        {
            this.Context = new QuizQuestionDbContext();
        }

        public List<QuizQuestion> GetAll()
        {
            return this.Context.QuizQuestions
                .ToList();
        }

        public void AddQuestion(QuizQuestion question)
        {
            this.Context.QuizQuestions
                .Add(question);
        }

        public void SaveChanges()
        {
            this.Context.SaveChanges();
        }

        public void Dispose()
        {
            this.Context?.Dispose();
        }
    }
}
