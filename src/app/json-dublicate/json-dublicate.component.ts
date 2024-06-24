import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'json-dublicate',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './json-dublicate.component.html',
  styleUrl: './json-dublicate.component.scss',
})
export class JsonDublicateComponent {
  file1Content: any = null;
  file1Name: string = '';
  cleanedJson: any = null;

  onFileSelected(event: any, fileNumber: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = JSON.parse(e.target.result);
      const fileName = file.name;
      if (fileNumber === 1) {
        this.file1Content = content;
        this.file1Name = fileName;
      }
    };
    reader.readAsText(file);
  }

  submitFiles() {
    if (this.file1Content) {
      this.cleanJson();
    }
  }

  cleanJson() {
    const json = JSON.parse(JSON.stringify(this.file1Content));
    this.removeDuplicates(json);
    this.cleanedJson = json;
  }

  removeDuplicates(json: any) {
    if (Array.isArray(json)) {
      json.forEach((item: any) => {
        if (item.mani && Array.isArray(item.mani.dep)) {
          const uniqueDep = [
            ...new Map(
              item.mani.dep.map((dep: any) => [dep.name, dep])
            ).values(),
          ];
          item.mani.dep = uniqueDep;
        }
      });
    } else if (typeof json === 'object') {
      console.log('Processing single object:', json);
    } else {
      console.error('Input JSON is neither an array nor an object.');
    }
  }

  downloadFile() {
    const blob = new Blob([JSON.stringify(this.cleanedJson, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned_file.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  removeFile(fileNumber: number) {
    if (fileNumber === 1) {
      this.file1Content = null;
      this.file1Name = '';
      this.cleanedJson = null;
    }
  }
}
