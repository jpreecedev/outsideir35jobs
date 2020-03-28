import { Component, OnInit, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-job-editor',
  templateUrl: './job-editor.component.html',
  styleUrls: ['./job-editor.component.css']
})
export class JobEditorComponent implements OnInit {
  @Input() id: string;

  public Editor = ClassicEditor;

  constructor() {}

  ngOnInit(): void {}
}
