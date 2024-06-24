import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'json-merge',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './json-merge.component.html',
  styleUrl: './json-merge.component.scss',
})
export class JsonMergeComponent {
  file1Content: any = null;
  file2Content: any = null;
  mergedJson: any = null;
  file1Name: string = ''; // To store the name of file 1
  file2Name: string = ''; // To store the name of file 2

  onFileSelected(event: any, fileNumber: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = JSON.parse(e.target.result);
      const fileName = file.name; // Get the original file name
      if (fileNumber === 1) {
        this.file1Content = content;
        this.file1Name = fileName; // Set file1Name to display original file name
      } else if (fileNumber === 2) {
        this.file2Content = content;
        this.file2Name = fileName; // Set file2Name to display original file name
      }
    };
    reader.readAsText(file);
  }

  mergeFiles() {
    if (this.file1Content && this.file2Content) {
      this.mergedJson = this.deepMerge(
        {},
        this.file1Content,
        this.file2Content
      );
    }
  }

  deepMerge(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (typeof target !== 'object' || target === null) {
      target = {};
    }

    if (Array.isArray(target) && Array.isArray(source)) {
      source.forEach((item, index) => {
        if (typeof target[index] === 'undefined') {
          target[index] = item;
        } else if (typeof item === 'object' && item !== null) {
          target[index] = this.deepMerge(target[index], item);
        } else {
          if (target.indexOf(item) === -1) {
            target.push(item);
          }
        }
      });
    } else if (typeof source === 'object' && source !== null) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key]) {
              target[key] = Array.isArray(source[key]) ? [] : {};
            }
            this.deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
    }

    return this.deepMerge(target, ...sources);
  }

  removeFile(fileNumber: number) {
    if (fileNumber === 1) {
      this.file1Content = null;
      this.file1Name = '';
    } else if (fileNumber === 2) {
      this.file2Content = null;
      this.file2Name = '';
    }
  }

  downloadFile() {
    const blob = new Blob([JSON.stringify(this.mergedJson, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new_merged.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
