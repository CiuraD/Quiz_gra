import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../../service/api-connection.service';
import { Question } from '../../interface/question';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GameService } from '../../service/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gamescreen',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiConnectionService, HttpClient],
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css'],
})
export class GamescreenComponent {
  questionLevel = 1;
  question: Question = {
    questionContent: 'Pytanie',
    answer_a: 'Odp A',
    answer_b: 'Odp B',
    answer_c: 'Odp C',
    answer_d: 'Odp D',
    correctAnswer: ''
  };
  eliminatedAnswers: string[] = [];
  audiencePercentages: Record<string, number> | null = null;
  friendAnswer: string | null = null;
  is5050Used = false;
  isPhoneUsed = false;
  isAudienceUsed = false;


  constructor(
    private router: Router,
    private ApiConnection: ApiConnectionService,
    private GameService: GameService,
    private snackBar: MatSnackBar
  ) {
    this.loadQuestion();
    localStorage.setItem('Score', '0');
  }
  ngOnInit() {

    this.GameService.initializeHints();
    console.log('NonUsed 5050', localStorage.getItem('5050'));
    console.log('NonUsed Audience', localStorage.getItem('Audience'));
    console.log('NonUsed Phone', localStorage.getItem('Phone'));

    if (localStorage.getItem('5050')?.toString() == 'false') {
      this.is5050Used = true;
      console.log('Used 5050', localStorage.getItem('5050'));
    }
    if (localStorage.getItem('Audience')?.toString() == 'false') {
      this.isAudienceUsed = true;
      console.log('Used Audience', localStorage.getItem('Audience'));
    }
    if (localStorage.getItem('Phone')?.toString() == 'false') {
      this.isPhoneUsed = true;
      console.log('Used Phone', localStorage.getItem('Phone'));
    }

  }

  loadQuestion(): void {
    this.audiencePercentages = null;
    this.friendAnswer = null;
    this.eliminatedAnswers = [];


    this.ApiConnection.getQuestion(this.questionLevel).subscribe({
      next: (data) => {
        console.log('Otrzymane dane:', data);

        if (data && data.questionContent) {
          this.question = data;
        } else {
          console.error('Brak poprawnych danych dla pytania.');
          this.question = {
            questionContent: 'Brak pytania dla tego poziomu.',
            answer_a: '',
            answer_b: '',
            answer_c: '',
            answer_d: '',
            correctAnswer: '',
          };
        }
      },
      error: (err) => {
        console.error('Błąd pobierania pytania:', err);
        this.question = {
          questionContent: 'Błąd połączenia z serwerem. Spróbuj ponownie później.',
          answer_a: '',
          answer_b: '',
          answer_c: '',
          answer_d: '',
          correctAnswer: '',
        };
      },
    });
  }

  clickAnswerA(): void {
    this.submitAnswer('a');
  }

  clickAnswerB(): void {
    this.submitAnswer('b');
  }

  clickAnswerC(): void {
    this.submitAnswer('c');
  }

  clickAnswerD(): void {
    this.submitAnswer('d');
  }

  submitAnswer(answer: string): void {
    if (!this.question) return;

    if (answer === this.question.correctAnswer) {
      this.GameService.countScore(this.questionLevel);
      this.questionLevel++;

      if (this.questionLevel > 10) {
        this.navigateToEndgame();
      } else {
        this.loadQuestion();
      }
    } else {
      this.navigateToEndgame();
    }
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToEndgame(): void {
    this.router.navigate(['/endgamescreen']);
  }

  hint5050(): void {
    if (this.is5050Used) return;


    const answers = ['a', 'b', 'c', 'd'];
    const incorrectAnswers = answers.filter((answer) => answer !== this.question?.correctAnswer);

    while (this.eliminatedAnswers.length < 2) {
      const randomAnswer = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      if (!this.eliminatedAnswers.includes(randomAnswer)) {
        this.eliminatedAnswers.push(randomAnswer);
      }
    }
    this.is5050Used = true;
    this.GameService.Used5050();
    console.log('Eliminowane odpowiedzi:', this.eliminatedAnswers);
  }

  hintAudience(): void {
    if (this.isAudienceUsed) return;
  
    const percentages: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
    const allAnswers = ['a', 'b', 'c', 'd'];
    const availableAnswers = allAnswers.filter((answer) => !this.eliminatedAnswers.includes(answer));
    const correctAnswer = this.question.correctAnswer;
  
    let remainingPercent = 100;
  
    // Decydujemy, ile procent publiczność przydzieli dla poprawnej odpowiedzi
    const correctAnswerPercentage =
      this.questionLevel <= 6
        ? 50 + Math.floor(Math.random() * 30) // Wyższe zaufanie dla niższych poziomów
        : Math.floor(remainingPercent * (this.questionLevel <= 9 ? 0.3 : 0.2)); // Mniejsze zaufanie dla wyższych poziomów
  
    percentages[correctAnswer] = correctAnswerPercentage;
    remainingPercent -= correctAnswerPercentage;
  
    // Rozdzielamy pozostałe procenty na niepoprawne odpowiedzi
    const incorrectAnswers = availableAnswers.filter((answer) => answer !== correctAnswer);
    const baseIncorrectPercentage = Math.floor(remainingPercent / incorrectAnswers.length);
    let leftover = remainingPercent - baseIncorrectPercentage * incorrectAnswers.length;
  
    incorrectAnswers.forEach((answer, index) => {
      percentages[answer] = baseIncorrectPercentage + (index === incorrectAnswers.length - 1 ? leftover : 0);
    });
  
    // Oznaczamy koło jako użyte
    this.isAudienceUsed = true;
    this.GameService.UsedAudience();
  
    const percentagesMessage = `Procenty publiczności:
      A: ${percentages['a']}% ||
      B: ${percentages['b']}% ||
      C: ${percentages['c']}% ||
      D: ${percentages['d']}%
    `;
  
    this.snackBar.open(percentagesMessage, 'Zamknij', {
      duration: 30000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  
    console.log('Procenty publiczności:', percentages);
  }
  


  hintPhone(): void {
    if (this.isPhoneUsed) return;

    const availableAnswers = ['a', 'b', 'c', 'd'].filter(
      (answer) => !this.eliminatedAnswers.includes(answer)
    );

    if (this.questionLevel <= 3) {
      this.friendAnswer = this.question.correctAnswer;
    } else if (this.questionLevel <= 6) {
      this.friendAnswer = Math.random() < 0.6
        ? this.question.correctAnswer
        : this.getRandomAnswer(availableAnswers);
    } else if (this.questionLevel <= 9) {
      this.friendAnswer = Math.random() < 0.2
        ? this.question.correctAnswer
        : this.getRandomAnswer(availableAnswers);
    } else {
      this.friendAnswer = null;
    }
    this.isPhoneUsed = true;
    this.GameService.UsedPhone();
    this.friendAnswer = this.friendAnswer?.toUpperCase() || null;
    const message = this.friendAnswer ? `Odpowiedź przyjaciela: ${this.friendAnswer}` : 'Brak odpowiedzi';

    this.snackBar.open(message, 'Zamknij', {
      duration: 30000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    console.log('Odpowiedź przyjaciela:', this.friendAnswer || 'Brak odpowiedzi');
  }

  private getRandomAnswer(availableAnswers: string[]): string {
    return availableAnswers[Math.floor(Math.random() * availableAnswers.length)];
  }
}
