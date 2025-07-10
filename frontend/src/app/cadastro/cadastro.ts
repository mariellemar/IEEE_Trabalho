import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'cadastro',
  imports: [CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})

export class Cadastro {
  analises: any[] = [];
}
