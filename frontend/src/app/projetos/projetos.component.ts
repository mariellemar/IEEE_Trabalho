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

  statusMap: Record<number, string> = {
    1: "Em Implementação",
    2: "Em Andamento"
  };

  newItem = {
    id_analise : "",
    descricao_tecnica : "",
    data_inicio_projeto : "",
    data_final_projeto : "",
    arquiteto_responsavel : "",
    status : "1",
  };

  constructor(private projetoService: ProjetosService) {}

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
      const updatedItem = { id_projeto: this.editID, ...this.newItem };
      
      this.projetoService.updateProjeto(this.editID, updatedItem).subscribe(() => {
        const index = this.items.findIndex(i => i.id_projeto === this.editID);
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
    this.newItem = {id_analise : item.idAnalise,
                    descricao_tecnica : item.descricaoTecnica,
                    data_inicio_projeto : item.dataInicioProjeto,
                    data_final_projeto : item.dataFinalProjeto,
                    arquiteto_responsavel : item.arquitetoResponsavel,
                    status : item.status};
    this.editing = true;
    this.editID = item.idProjeto;
  };


  deleteItem() {
    if (this.deleteID !== null) {
      console.log(this.deleteID);
      this.projetoService.deleteProjeto(this.deleteID).subscribe(() => {
        this.items = this.items.filter(item => item.id_projeto !== this.deleteID);

        this.projetoService.getProjetos().subscribe(data => this.items = data);
      });

      this.deleteID = null;
    };
    this.closeFeedback();
  };

  resetForms() {
    this.newItem = {
      id_analise : "",
      descricao_tecnica : "",
      data_inicio_projeto : "",
      data_final_projeto : "",
      arquiteto_responsavel : "",
      status : "1",
    };

    this.editing = false;
    this.editID = null;
  }

  invalidForms(): boolean {
    return (
      !this.newItem.id_analise ||
      !this.newItem.descricao_tecnica ||
      !this.newItem.data_inicio_projeto ||
      !this.newItem.data_final_projeto ||
      !this.newItem.arquiteto_responsavel ||
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
    this.dialogType = "alert";
    this.dialogTitle = "";
    this.dialogMessage = "";
    this.deleteID = null;
  }
}
