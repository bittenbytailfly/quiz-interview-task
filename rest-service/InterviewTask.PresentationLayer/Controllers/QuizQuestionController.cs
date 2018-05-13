using InterviewTask.BusinessLogic.Interfaces;
using InterviewTask.BusinessLogic.Services;
using InterviewTask.BusinessLogic.ViewModels;
using InterviewTask.DataAccess.Repositories;
using InterviewTask.PresentationLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InterviewTask.PresentationLayer.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class QuizQuestionController : ApiController
    {
        private IQuizQuestionService Service { get; set; }

        public QuizQuestionController(IQuizQuestionService service)
        {
            this.Service = service;
        }

        public QuizQuestionController()
        {
            var repo = new QuizQuestionRepository();
            var modelStateWrapper = new ModelStateWrapper(this.ModelState);
            this.Service = new QuizQuestionService(repo, modelStateWrapper);
        }

        // GET: api/QuizQuestion
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, this.Service.GetRandomQuizQuestion());
        }

        // POST: api/QuizQuestion
        public HttpResponseMessage Post([FromBody] QuizQuestionViewModel quizQuestion)
        {
            if (this.Service.AddNewQuizQuestion(quizQuestion))
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, GetErrors());
            }
        }

        #region Helpers

        private string GetErrors()
        {
            List<string> errorList = new List<string>();
            foreach (var stateValue in this.ModelState.Values)
            {
                foreach (var error in stateValue.Errors)
                {
                    errorList.Add(error.ErrorMessage);
                }
            }

            return String.Join(",", errorList);
        }

        #endregion

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            this?.Service.Dispose();
        }
    }
}
