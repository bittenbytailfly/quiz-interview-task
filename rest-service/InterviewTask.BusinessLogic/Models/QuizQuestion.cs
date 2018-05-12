using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.BusinessLogic.Models
{
    public class QuizQuestion
    {
        public Guid QuizQuestionId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
