import { Todo } from './interface/todo.interface';
import { TodoService } from './todo.service';

import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	todos$: Todo[];
	todosFalse: Todo[];
	countTodos: number;

	constructor(private todosService: TodoService) {
		this.allTodos();
	}

	allTodos() {
		this.todosService.selectTodos().subscribe((content) => {
			this.todos$ = content;
			this.todosFalse = this.todos$.filter((todo) => todo.status == false);
			this.countTodos = this.todosFalse.length;
		});
	}

	addWord(input: HTMLInputElement) {
		this.todosService.addWords(input.value);
		input.value = '';
	}

	changeStatu(id: string, status: boolean) {
		this.todosService.changeStatu(id, status);
	}

	changeStatusAll(status: boolean) {
		this.todosService.changeStatusAll(this.todos$, status);
	}
	statusTrue() {
		this.todosService.selectTodos().subscribe((content) => {
			this.todos$ = content;
			this.todos$ = this.todos$.filter((todo) => todo.status == true);
		});
	}
	statusFalse() {
		this.todosService.selectTodos().subscribe((content) => {
			this.todos$ = content;
			this.todos$ = this.todos$.filter((todo) => todo.status == false);
		});
	}

	deleteStatusTrue() {
		this.todos$ = this.todos$.filter((todo) => todo.status == true);
		this.todosService.deleteStatusTrue(this.todos$);
		this.allTodos();
	}
	deleteTodo(id: string) {
		this.todosService.deleteTodo(id);
		console.log(id);
	}
}
