using InterviewTask.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterviewTask.DataAccess
{
    public class QuizQuestionDbContext : DbContext
    {
        public DbSet<QuizQuestion> QuizQuestions { get; set; }

        public QuizQuestionDbContext()
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<QuizQuestion>()
                .HasKey(k => k.QuizQuestionId);
            modelBuilder.Entity<QuizQuestion>()
                .Property(p => p.Question)
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<QuizQuestion>()
                .Property(p => p.Answer)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
