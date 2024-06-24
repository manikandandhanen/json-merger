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
    // Deep clone the original content
    const json = JSON.parse(JSON.stringify(this.file1Content));

    // Call function to remove duplicates and repeats
    this.removeDuplicates(json);

    // Set cleaned JSON
    this.cleanedJson = json;
  }

  removeDuplicates(json: any) {
    if (Array.isArray(json)) {
      // Case 1: JSON is an array
      json.forEach((item: any) => {
        // Assuming 'item' represents a specific object structure in your JSON array
        if (item.mani && Array.isArray(item.mani.dep)) {
          // Remove duplicates based on 'name' property within 'dep' array
          const uniqueDep = [
            ...new Map(
              item.mani.dep.map((dep: any) => [dep.name, dep])
            ).values(),
          ];
          item.mani.dep = uniqueDep;
        }
      });
    } else if (typeof json === 'object') {
      // Case 2: JSON is an object
      // Adjust logic here based on your actual JSON structure
      // For example, you may directly process the object if needed
      console.log('Processing single object:', json);
      // Handle the structure of the single object as needed
    } else {
      // Case 3: JSON is neither an array nor an object (handle other types if necessary)
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
