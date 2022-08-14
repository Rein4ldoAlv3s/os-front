import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: 'Valdir',
    cpf: '168.208.570-80',
    telefone: '(62) 99021-5625'
  }

  constructor(
    private router: Router,
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel():void {
    this.router.navigate(['tecnicos'])
  }
  
  //Na funcao lambda, vai ser imprimido o erro no console do navegador
  create(): void{
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Tecnico criado com sucesso!')
    }, err =>{
      if(err.error.error.match('já cadastrado')){
        this.service.message(err.error.error)
      }
    })
  }

}
