import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../../service/api-connection.service';
import { Question } from '../../interface/question';

@Component({
  selector: 'app-gamescreen',
  imports: [CommonModule],
  standalone: true,
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
  is5050Used = false; // Zmienna do monitorowania użycia 50/50
  isPhoneUsed = false; // Zmienna do monitorowania użycia telefonu
  isAudienceUsed = false; // Zmienna do monitorowania użycia publiczności

  constructor(
    private router: Router,
    private ApiConnection: ApiConnectionService
  ) {
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.audiencePercentages = null;
    this.friendAnswer = null;
    this.eliminatedAnswers = [];
    this.is5050Used = false;  // Resetowanie 50/50
    this.isPhoneUsed = false; // Resetowanie telefonu
    this.isAudienceUsed = false; // Resetowanie publiczności

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
    if (!this.question || this.is5050Used) return; // Jeżeli koło zostało już użyte, nie wykonuj ponownie

    // Pobierz wszystkie odpowiedzi
    const answers = ['a', 'b', 'c', 'd'];
    // Filtruj błędne odpowiedzi
    const incorrectAnswers = answers.filter((answer) => answer !== this.question?.correctAnswer);

    // Losowo wybierz dwie odpowiedzi do eliminacji
    while (this.eliminatedAnswers.length < 2) {
      const randomAnswer = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      if (!this.eliminatedAnswers.includes(randomAnswer)) {
        this.eliminatedAnswers.push(randomAnswer);
      }
    }

    this.is5050Used = true; // Zaznaczamy, że koło zostało użyte
    console.log('Eliminowane odpowiedzi:', this.eliminatedAnswers);
  }

  hintAudience(): void {
    if (!this.question || this.isAudienceUsed) return; // Jeżeli koło publiczności zostało już użyte

    const percentages: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
    const answers = ['a', 'b', 'c', 'd'];

    if (this.questionLevel <= 6) {
      const correctIsHighest = Math.random() > 0.1;
      if (correctIsHighest) {
        percentages[this.question.correctAnswer] = 50 + Math.floor(Math.random() * 30);
      } else {
        const randomIncorrect = answers.filter((a) => a !== this.question.correctAnswer)[Math.floor(Math.random() * 3)];
        percentages[randomIncorrect] = 50 + Math.floor(Math.random() * 30);
      }
    } else {
      percentages[this.question.correctAnswer] = 20;
      const remainingPercent = 80;
      const incorrectAnswers = answers.filter((a) => a !== this.question.correctAnswer);

      incorrectAnswers.forEach((answer, index) => {
        percentages[answer] = index === incorrectAnswers.length - 1
          ? remainingPercent
          : Math.floor(Math.random() * remainingPercent / (incorrectAnswers.length - index));
      });
    }

    this.audiencePercentages = percentages;
    this.isAudienceUsed = true; // Zaznaczamy, że koło zostało użyte
    console.log('Procenty publiczności:', percentages);
  }

  hintPhone(): void {
    if (!this.question || this.isPhoneUsed) return; // Jeżeli koło telefonu zostało już użyte

    if (this.questionLevel <= 3) {
      this.friendAnswer = this.question.correctAnswer;
    } else if (this.questionLevel <= 6) {
      this.friendAnswer = Math.random() < 0.6 ? this.question.correctAnswer : this.getRandomAnswer();
    } else if (this.questionLevel <= 9) {
      this.friendAnswer = Math.random() < 0.2 ? this.question.correctAnswer : this.getRandomAnswer();
    } else {
      this.friendAnswer = null; // Na 10 pytaniu brak odpowiedzi
    }

    this.isPhoneUsed = true; // Zaznaczamy, że koło telefonu zostało użyte
    console.log('Odpowiedź przyjaciela:', this.friendAnswer || 'Brak odpowiedzi');
  }

  private getRandomAnswer(): string {
    const answers = ['a', 'b', 'c', 'd'];
    return answers[Math.floor(Math.random() * answers.length)];
  }
}
