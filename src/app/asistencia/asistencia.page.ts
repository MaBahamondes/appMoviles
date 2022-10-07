import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  private db: SQLiteObject;

  private ListRegistroAsistencia : any;
  

  constructor(private sqlite: SQLite, private router: Router) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default',
          

    })
      .then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql('Create table if not exists asistencia (id iNTERGER PRIMARY KEY, usuario VARCHAR(32), asignatura VARCHAR(32), fecha DATE, asistencia VARCHAR(32), foreign key(usuario) references Login(usuario))', [])
        .then(()=>
            this.insertar()
          )
          .catch(e => console.log(e)); 
      })
      .catch(e => console.log(e));
  }; 

  insertar(){
    const date=new Date(); 
    this.db.executeSql('INSERT INTO asistencia VALUES(?,?,?,? )', ['1', 'nata.gonzalez', 'programacion', ' new date()', 'presente']).then(() =>{

      console.log("Insert ejecutado")
      this.ListRegistroAsistencia = "insert ejecutado";
    }).catch( e => console.log(e) );
  }


  select(){
    this.db.executeSql('SELECT usuario, contrasena FROM Login WHERE usuario = ? and contrasena = ?', []).then((data) =>{
      if (data.rows.length != 0){
        this.router.navigate(['/home'])
      }
    }).catch(e=> console.log(e)); 
  }



  ngOnInit() {
  }

}
