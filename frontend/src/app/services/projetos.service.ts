import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjetosService {
  private api = 'http://127.0.0.1:8000/projetos';

  constructor(private http: HttpClient) { }

  getProjetos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  addProjeto(projeto: any): Observable<any> {
    return this.http.post(this.api, projeto);
  }

  updateProjeto(id: number, projeto: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, projeto);
  }

  deleteProjeto(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
