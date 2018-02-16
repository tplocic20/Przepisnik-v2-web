import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotescontainerComponent } from './components/notescontainer/notescontainer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotescontainerComponent],
  exports: [NotescontainerComponent]
})
export class NotesModule { }
