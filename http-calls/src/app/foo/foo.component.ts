import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Foo } from './foo.model';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css'
})
export class FooComponent implements OnInit {
data!: Object; //Il ‘!’ serve a creare variabili non inizializzate
loading: boolean=false;
o! :Observable<Object>;
oPost! : Observable<Object>;
fooData! : Foo[];
oFoo! : Observable<Foo[]>;
constructor(public http: HttpClient) {}
makeRequest(): void {
  console.log("here");
  this.loading = true;
  this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  this.o.subscribe(this.getData);
}
getData = (d : Object) =>
{
  this.data = new Object(d);
  this.loading = false;
}

makePost(): void {
  // Definisco i dati da spedire
  let dataToSend = JSON.stringify({ 
    body: 'bar',
    title: 'foo',
    userId: 1
  });

  this.loading = true;

  //Faccio la richiesta post
  this.oPost = this.http.post('https://jsonplaceholder.typicode.com/posts', dataToSend)
  this.oPost.subscribe(this.getPostResponse);
}

getPostResponse = (data : Object) => {
  this.data = data;
  this.loading = false;
}

makeTypedRequest() : void
 {
   this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
   this.oFoo.subscribe(data => {this.fooData = data;});
 }

 ngOnInit() {
}

}