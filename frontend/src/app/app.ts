import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Projetos } from "./projetos/projetos.component";
import { Cadastro } from './cadastro/cadastro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Projetos],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'front';
}
