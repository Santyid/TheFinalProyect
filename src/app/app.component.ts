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
	//Lista de los todos que se extraigan de la base de datos
	todos$: Todo[];
	//Lista de los todo filtrados false
	todosFalse: Todo[];
	//Variable countTodos que se le asiganara la cantidad de los todos
	countTodos: number;

	/**
	 * Constructor del componente
	 * @param todosService Se inyecta el servicio que se utilizara para la comunicacion con el service y la bd
	 */
	constructor(private todosService: TodoService) {
		this.allTodos();
	}

	/**
	*allTodos metodo que obtiene todos los elementos de la bd por medio del service y adicionalemente cuenta cuantos elementos
	*tienen un status false y se los agrega a una variable
	 */

	allTodos() {
		this.todosService.selectTodos().subscribe((content) => {
			this.todos$ = content;
			this.todosFalse = this.todos$.filter((todo) => todo.status == false);
			this.countTodos = this.todosFalse.length;
		});
	}

	/**
	 * addWord metodo el cual recibe el nombre de la palabra y
	 *lo envia al service para asi poder agregarla
	 * @param input nombre de la palabra
	 */
	addWord(input: HTMLInputElement) {
		this.todosService.addWords(input.value);
		input.value = '';
	}

	/**
	 * Metodo el cual cambia el status del elemento de la bd,
	 * en el que se envian los parametros para cambiar el estado del elemento
	 * @param id id del elemento todo que se quiere modificar
	 * @param status estado del elemendo que se va a cambiar
	 */
	changeStatu(id: string, status: boolean) {
		this.todosService.changeStatu(id, status);
	}

	/**
	 * Metodo para cambiar todos los elementos de la base de datos
	 * @param status estado en el que se quiere que todos los elementos tengan
	 */
	changeStatusAll(status: boolean) {
		this.todosService.changeStatusAll(this.todos$, status);
	}

	/**
	 *StatusTrue metodo el cual filtra los elementos de la bd por el
	 *estado true y los agrega a la lista de los elementos
	 */
	statusTrue() {
		this.todosService.selectTodos().subscribe((content) => {
			this.todos$ = content;
			this.todos$ = this.todos$.filter((todo) => todo.status == true);
		});
	}

	/**
	 * StatusFalse metodo el cual filtra los elementos de la bd por el
	 * estado false y los agrega a la lista de elementos
	 */
	statusFalse() {
		this.todosService.selectTodos().subscribe((content) => {
			this.todos$ = content;
			this.todos$ = this.todos$.filter((todo) => todo.status == false);
		});
	}

	/**
	 *Metodo el cual elimina los elementos de la lista los cuales
	 *tengan el status true  
	 */
	deleteStatusTrue() {
		this.todos$ = this.todos$.filter((todo) => todo.status == true);
		this.todosService.deleteStatusTrue(this.todos$);
		this.allTodos();
	}

	/**
	 * Metodo para eliminar un elemento especifico de bd
	 * @param id id del elemento
	 */
	deleteTodo(id: string) {
		this.todosService.deleteTodo(id);
		console.log(id);
	}
}
