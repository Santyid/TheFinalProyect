import { Todo } from './interface/todo.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TodoService {
	constructor(private db: AngularFirestore) {}

	selectTodos() {
		return this.db.collection<Todo>('todos').valueChanges();
	}

	addWords(word: string) {
		const id = this.db.createId();
		const status = false;
		this.db.collection('todos').doc(id).set({ id, word, status });
	}

	changeStatu(id: string, status: boolean) {
		this.db.collection('todos').doc(id).update({ status });
	}

	deleteTodo(id: string) {
		this.db.collection('todos').doc(id).delete();
	}

	deleteStatusTrue(to: Todo[]) {
		for (const todos of to) {
			this.db.collection('todos').doc(todos.id).delete();
		}
	}
}
