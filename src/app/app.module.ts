import { TodoService } from './todo.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
	],
	providers: [ TodoService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
