import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {
  editTodoListForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { listId: number; listName: string; listDescription: string },
    private dialogRef: MatDialogRef<EditTodoDialogComponent>,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const todo = new Todo(
      this.data.listId,
      1,
      this.editTodoListForm.value.name,
      this.editTodoListForm.value.description
    );
    this.todoService.updateTodoList(this.data.listId, todo).subscribe(
      data => {
        console.log('data', data);
      },
      error => {
        console.log('error: ', error);
      }
    );
    this.dialogRef.close();
  }

  private initForm() {
    this.editTodoListForm = new FormGroup({
      name: new FormControl(this.data.listName, Validators.required),
      description: new FormControl(
        this.data.listDescription,
        Validators.required
      )
    });
  }
}
