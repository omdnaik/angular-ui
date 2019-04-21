import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Note } from '../model/note';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  initialContent: String = '#Hello, World!\n\nThis is your first Angular Markdown note.' +
 'You can:\n\n* Click/Focus to edit\n\n* Click off/Blur to save\n\n*' +
 ' Add a new note  by clicking the plus sign above.\n\n* Delete this note\n\nMarkdown ' +
 'compiled using the fantastic [ngx-markdown]' +
 '(https://www.npmjs.com/package/ngx-markdown) directive.';

 lstNote: Array<Note> = [];


  constructor() {}

  ngOnInit(): void {

    const tempList = JSON.parse(localStorage.getItem('lstNote'));
    let tempNote: Note;

    for (const noteDisplay of tempList) {
      tempNote = Note.fromJSONToObject(noteDisplay);
      console.log('Data: ' + tempNote.displayData());
      this.lstNote.push(tempNote);
    }

    if (!this.lstNote) {
      const note = new Note(this.initialContent, false, false);
      this.lstNote = [note];
    }
  }

  add() {
    this.lstNote.push(new Note('', true, true));
  }

  save($event, index: number) {

    if (this.lstNote[index].editFlag && !(this.lstNote[index].content === $event.target.innerHTML)) {
      console.log('data saved');
      this.lstNote[index].content = $event.target.innerHTML;
      localStorage.setItem('lstNote', JSON.stringify(this.lstNote));
    }


  }

  delete(index: number) {
    if (this.lstNote[index].deleteFlag) {
       this.lstNote.splice(index, 1);
       localStorage.setItem('lstNote', JSON.stringify(this.lstNote));
    }

  }

  ngOnDestroy(): void {
    localStorage.setItem('lstNote', JSON.stringify(this.lstNote));
 }
}
