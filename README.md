# quiz-interview-task
Angular / WebAPI based quiz for an interview task

### Installation Instructions

The repository is made up of two folders, one for a WebAPI project to store the questions/answers, and one for the Angular front end. You will require the following prerequisites to run:

* Visual Studio
* NodeJS
* Angular CLI

Steps to run:

* Clone the repository to a local folder
* Open the rest-service/InterviewTask.sln file in Visual Studio.
* Run the application using F5 (assuming you are using IIS Express, port 55261 as configured)
* Open the angular CLI and change directory to the angular-app folder
* Type ng serve (assuming default port 4200 is used, otherwise may cause issues)

### Notes

I've deliberately kept the Angular app pretty vanilla - however I could have made use of numerous plugins, frameworks and UI enhancements that would have given a better user experience.

Due to time constraints, this app has not been tested cross browser and works best in Chrome desktop. While it is technically responsive it is by no means optimised for smaller screens. With additional time and resources I would have paid particular attention to:

* Browser optimisation
* Additional error handling
* Better use of loading spinners etc.
