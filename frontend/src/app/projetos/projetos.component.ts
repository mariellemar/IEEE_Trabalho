import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjetosService } from '../services/projetos.service';
import { ProjetosMockService } from '../services/projetos.mock.service';

@Component({
  selector: 'projetos',
  imports: [CommonModule, FormsModule],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})

export class Projetos {
  editing: boolean = false;
  editID: number | null = null;

  analises: any[] = [1, 2, 3, 4];
  items: any[] = [];
  // nextID = 1;

  newItem = {
    analise : "",
    descricao : "",
    inicio : "",
    final : "",
    responsavel : "",
    status : "Em andamento",
  };

  constructor(private projetoService: ProjetosMockService) {}

  ngOnInit() {
    this.projetoService.getProjetos().subscribe(data => this.items = data);
  }

  onSubmit() {
    if (this.editing && this.editID !== null) {
      const updatedItem = { id: this.editID, ...this.newItem };
      
      this.projetoService.updateProjeto(this.editID, updatedItem).subscribe(() => {
        const index = this.items.findIndex(i => i.id === this.editID);
        if (index !== -1) this.items[index] = updatedItem;

        this.projetoService.getProjetos().subscribe(data => this.items = data);
      })

    } else { 
      this.projetoService.addProjeto(this.newItem).subscribe(() => {
        this.projetoService.getProjetos().subscribe(data => this.items = data);
      });

    };

    this.resetForms();
  };


  editItem(item: any) {
    this.newItem = {...item};
    this.editing = true;
    this.editID = item.id;
  };


  deleteItem(id: number) {
    this.projetoService.deleteProjeto(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  };

  resetForms() {
    this.newItem = {
      analise : "",
      descricao : "",
      inicio : "",
      final : "",
      responsavel : "",
      status : "Em andamento",
    };

    this.editing = false;
    this.editID = null;
  }
}
