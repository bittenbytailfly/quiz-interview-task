using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.BusinessLogic.ViewModels
{
    public class QuizQuestionViewModel
    {
        [JsonProperty(PropertyName = "question")]
        public string Question { get; set; }
        [JsonProperty(PropertyName = "answer")]
        public string Answer { get; set; }

        public QuizQuestionViewModel() { }

        public QuizQuestionViewModel(string question, string answer)
        {
            Question = question;
            Answer = answer;
        }
    }
}
