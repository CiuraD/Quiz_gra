import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { AboutComponent } from './screens/about/about.component';
import { MenuComponent } from './screens/menu/menu.component';
import { GamescoreComponent } from './screens/gamescore/gamescore.component';
import { GamescreenComponent } from './screens/gamescreen/gamescreen.component';
import { ScoreboardComponent } from './screens/scoreboard/scoreboard.component';

export const routes: Routes = [

    { path: 'login', component:  LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'gamescore', component: GamescoreComponent },
    { path: 'gamescreen', component: GamescreenComponent },
    { path: 'scoreboard', component: ScoreboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}