import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ResultsComponent } from './results/results.component';
import { ScoreComponent } from './score/score.component';
import { PlayComponent } from './play/play.component';

const AngularMaterialModule = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatListModule
];

@NgModule({
  declarations: [
    GameComponent,
    ResultsComponent,
    ScoreComponent,
    PlayComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    AngularMaterialModule
  ],
  exports: []
})
export class GameModule { }