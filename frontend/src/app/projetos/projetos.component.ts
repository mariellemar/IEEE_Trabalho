import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjetosService } from '../services/projetos.service';
import { ProjetosMockService } from '../services/projetos.mock.service';
import { Dialog } from '../dialog/dialog.component';

@Component({
  selector: 'projetos',
  imports: [CommonModule, FormsModule, Dialog],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})

export class Projetos {
  editing = false;
  editID: number | null = null;
  deleteID: number | null = null;

  analises: any[] = [1, 2, 3, 4];
  items: any[] = [];
  // nextID = 1;

  showDialog = false;
  dialogTitle = "";
  dialogMessage = "";
  dialogType: "confirm" | "alert" = "alert";

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
    if (this.invalidForms()) {
      this.dialogTitle = "Formulário incompleto";
      this.dialogMessage = "Por favor, preencha todos os campos antes de enviar.";
      this.dialogType = "alert";
      this.showDialog = true;
      return;
    }

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

    this.dialogTitle = "Sucesso";
    this.dialogMessage = "Projeto salvo com sucesso!";
    this.dialogType = "alert";
    this.showDialog = true;
  };


  editItem(item: any) {
    this.newItem = {...item};
    this.editing = true;
    this.editID = item.id;
  };


  deleteItem() {
    if (this.deleteID !== null) {
      console.log(this.deleteID);
      this.projetoService.deleteProjeto(this.deleteID).subscribe(() => {
        this.items = this.items.filter(item => item.id !== this.deleteID);

        this.projetoService.getProjetos().subscribe(data => this.items = data);
      });

      this.deleteID = null;
    };
    this.closeFeedback();
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

  invalidForms(): boolean {
    return (
      !this.newItem.analise ||
      !this.newItem.descricao ||
      !this.newItem.inicio ||
      !this.newItem.final ||
      !this.newItem.responsavel ||
      !this.newItem.status
    );
  }

  confirmDelete(id: number) {
    this.deleteID = id;
    this.dialogTitle = `Tem certeza que deseja apagar o projeto com o id ${this.deleteID}?`;
    this.dialogMessage = "Esta ação não pode ser revertida!";
    this.dialogType = "confirm";
    this.showDialog = true;
  }

  onDialogConfirm() {
    if (this.dialogType === "confirm") {
      this.deleteItem();
    }
    this.closeFeedback();
  }

  closeFeedback() {
    this.showDialog = false;
    this.dialogType = 'alert';
    this.dialogTitle = '';
    this.dialogMessage = '';
    this.deleteID = null;
  }
}
