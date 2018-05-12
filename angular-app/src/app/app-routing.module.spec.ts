import { routes, AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from "@angular/router/testing";
import { RouterModule, Router } from "@angular/router";
import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]  
    });
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });

  it('should be taken to the add questions page when clicking add questions', () => {
    TestBed.get(Router)
      .navigate(['/add-questions'])
        .then(() => {
          expect(location.pathname.endsWith('/add-questions')).toBe(true);
        }).catch(e => console.log(e));
  });

  it('should be taken to the take quiz page when clicking take quiz', () => {
    TestBed.get(Router)
      .navigate(['/take-quiz'])
        .then(() => {
          expect(location.pathname.endsWith('/take-quiz')).toBe(true);
        }).catch(e => console.log(e));
  });
});
