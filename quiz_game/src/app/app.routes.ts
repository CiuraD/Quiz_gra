import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { GamescoreComponent } from './components/gamescore/gamescore.component';
import { GamescreenComponent } from './components/gamescreen/gamescreen.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { EndgamescreenComponent } from './components/endgamescreen/endgamescreen.component';

export const routes: Routes = [

    { path: 'login', component:  LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'gamescore', component: GamescoreComponent },
    { path: 'gamescreen', component: GamescreenComponent },
    { path: 'scoreboard', component: ScoreboardComponent },
    { path: 'endgamescreen', component: EndgamescreenComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}