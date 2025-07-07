import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjetosMockService {
  private projetos: any[] = [];
  private nextID = 1;

  getProjetos(): Observable<any[]> {
    return of(this.projetos).pipe(delay(200));
  }

  addProjeto(projeto: any): Observable<any> {
    projeto.id = this.nextID++;
    this.projetos.push(projeto);

    return of(projeto).pipe(delay(200));
  }

  updateProjeto(id: number, projeto: any): Observable<any> {
    const index = this.projetos.findIndex(p => p.id === id);
    if (index !== -1) {
        this.projetos[index] = projeto;
    }

    return of(projeto).pipe(delay(200));
  }

  deleteProjeto(id: number): Observable<any> {
    this.projetos = this.projetos.filter(p => p.id !== id);
    
    return of({}).pipe(delay(200));
  }
}
