import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Column, Task } from '../../ngrx/store';
import { Store } from '@ngrx/store';
import { selectColumns } from '../../ngrx/select';
import { addColumn, addTask, deleteTask, updateColumnTasks } from '../../ngrx/actions';

@Component({
  selector: 'app-desk',
  standalone: true,
  templateUrl: './desk.component.html',
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgIf,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    NgForOf
  ],
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit{
  private store = inject(Store);

  columnValue = '';

  columns!: Column[];

  ngOnInit(): void {
    this.store.select(selectColumns).subscribe(r => {
      this.columns = structuredClone(r);
    })
  }

  drop(event: CdkDragDrop<Task[]>, columnIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const tasks = event.previousContainer.data;
      this.store.dispatch(updateColumnTasks({
        tasks,
        columnIndex
      }))
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addColumn() {
    this.clearInput(this.columnValue);
    this.store.dispatch(addColumn({
      name: this.columnValue,
      tasks: []
    }))
  }

  addTask( task: Task, columnIndex: number) {
    this.store.dispatch(addTask({task, columnIndex}));
  }

  deleteTask(taskIndex: number, columnIndex: number) {
    this.store.dispatch(deleteTask({
      columnIndex,
      taskIndex
    }))
  }

  private clearInput(inputValue: string) {
    inputValue = '';
  }
}
