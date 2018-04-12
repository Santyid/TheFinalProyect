import { Todo } from './interface/todo.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TodoService {
	/**
	 * Constructor que inyecta la db.
	 * @param db 
	 */
	constructor(private db: AngularFirestore) {}

	/**
	 * Metodo que extrae todos los elementos todos de la base de datos
	 */
	selectTodos() {
		return this.db.collection<Todo>('todos').valueChanges();
	}

	/**
	 * Metodo de registro de elemetos todos a la base de datos
	 * @param word palabra o nombre con el cual se va a guardar el elemento
	 */
	addWords(word: string) {
		const id = this.db.createId();
		const status = false;
		this.db.collection('todos').doc(id).set({ id, word, status });
	}

	/**
	 * Metodo el cual cambia el estado del elemento todo en la base de datos
	 * @param id id del elemento todo
	 * @param status estado del elemento que se quiere cambiar
	 */
	changeStatu(id: string, status: boolean) {
		this.db.collection('todos').doc(id).update({ status });
	}

	/**
	 * Metodo el cual cambia el estado de todos los elementos todos de la bd
	 * @param todo lista de elementos todos
	 * @param status estado al que se quiere cambiar los elementos
	 */
	changeStatusAll(todo: Todo[], status: boolean) {
		for (const todos of todo) {
			this.db.collection('todos').doc(todos.id).update({ status });
		}
	}

	/**
	 * Metodo de elminacion de un elemento todo en la base de datos
	 * @param id id del elemento que se quiere eliminar
	 */
	deleteTodo(id: string) {
		this.db.collection('todos').doc(id).delete();
	}

	/**
	 * Metodo para eliminar los elementos todos de la bd que tengan
	 * un estado true 
	 * @param todo lista de los elementos todos con estado true
	 */
	deleteStatusTrue(todo: Todo[]) {
		for (const todos of todo) {
			this.db.collection('todos').doc(todos.id).delete();
		}
	}
}
