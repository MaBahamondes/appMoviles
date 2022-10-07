import { Component} from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  private db: SQLiteObject;
  
  private usuario: string;
  private contrasena: string;

  constructor(private sqlite: SQLite, private router: Router, private alertControler: AlertController) {
    this.sqlite.create({
      name: 'data.db', 
      location: 'default'
    })
      .then((db: SQLiteObject) =>{
        this.db = db;
        db.executeSql('create table Login(usuario VARCHAR(32), contrasena VARCHAR(32))', [])
          .then(()=>
            this.insertar()
          )
          .catch(e => console.log(e)); 
      })
      .catch(e => console.log(e)); 
  }; 


  insertar(){
    this.db.executeSql('INSERT INTO Login VALUES(?,?)', ['nata.gonzalez', '1234']).then(() =>{
      console.log("Insert ejecutado")
    }).catch( e => console.log(e) );
  }

   select(){
    this.db.executeSql('SELECT usuario, contrasena FROM Login WHERE usuario = ? and contrasena = ?', [this.usuario , this.contrasena]).then((data) =>{
      if (data.rows.length != 0){
        this.router.navigate(['/home'])
      }else{
        this.mensaje()
      }
    }).catch(e=> console.log(e)); 
  }

  async mensaje(){
    const alert = await this.alertControler.create({
      header: 'datos incorrectos',
      message: 'Tus datos son incorrectos', 
      buttons: ['Aceptar'], 
    });
    await alert.present();
  }

 
}

