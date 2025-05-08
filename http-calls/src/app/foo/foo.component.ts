import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css'
})
export class FooComponent {
data!: Object; //Il ‘!’ serve a creare variabili non inizializzate
loading: boolean=false;
o! :Observable<Object>;
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
}