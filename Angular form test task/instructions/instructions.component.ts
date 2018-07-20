import { Component, OnInit } from '@angular/core';
import { ResponseOptions, Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})

export class InstructionsComponent implements OnInit {
  
  
  fieldOptions: Object = { // Settings for instruction description field
    placeholderText: '',
    charCounterCount: false,
    toolbarButtons: ['bold', 'underline', 'italic', 'formatUL', 'formatOL'],
    pluginsEnabled: ['lists'],
    height: 250
  }
  
  // test variables for select fields
  languages = ['English', 'Ukrainian', 'Russian']
  items = [
    {name: 'One', childrens: [
      {name: 'One 1'},
      {name: 'One 2'},
      {name: 'One 3'},
    ]},
    {name: 'Two', childrens: [
      {name: 'Two 1'},
      {name: 'Two 2'},
      {name: 'Two 3'},
    ]},
    {name: 'Three', childrens: [
      {name: 'Three 1'},
      {name: 'Three 2'},
      {name: 'Three 3'},
    ]},
  ];
  
  // instruction default fields
  onlyAdminsInput = false;
  instructionItem = '';
  instructionLanguage = 'English';
  instructionTitle = '';
  instructionDescription = '';
  instructionImageName = '';
  instructionImage2Name = '';
  instructionVideoUrl = '';
  
  // variables for data check
  dataNotSaved = false;
  changesIsApply = false;
  responseError = false;
  
  constructor(private http: Http) { 
  }

  ngOnInit() {
  }
  selectInputDropdown(e) {
    // Toggle dropdown
    if (e.currentTarget.hasAttribute('data-dropdown-target') && e.target.tagName != 'LI') {
      document.getElementById(e.currentTarget.getAttribute('data-dropdown-target')).classList.toggle('show');
      var dropdownIcon = e.currentTarget.children[1];
      if (dropdownIcon.textContent == 'arrow_drop_down') {
        dropdownIcon.innerHTML = 'arrow_drop_up';
      } else {
        dropdownIcon.innerHTML = 'arrow_drop_down';
      }
    }
  }
  selectLanguage(e, language) {
    // select language for instruction
    e.target.parentElement.classList.toggle('show');
    this.instructionLanguage = language;
  }
  selectItem(e, item) {
    // select point for instruction
    e.currentTarget.parentElement.parentElement.parentElement.classList.toggle('show');
    this.instructionItem = item;
  }
  clearInputs() {
    // clear all form fields
    this.onlyAdminsInput = false;
    this.instructionItem = '';
    this.instructionLanguage = '';
    this.instructionTitle = '';
    this.instructionDescription = '';
    this.instructionImageName = '';
    this.instructionImage2Name = '';
    this.instructionVideoUrl = '';
    this.dataNotSaved = false;
    this.changesIsApply = false;
    this.responseError = false;
  }
  submitCheck() {
    // check for disable submit button
    return this.instructionItem != '' && this.instructionLanguage != '' && this.instructionTitle != '' && this.instructionDescription != '';
  }
  closeModal(e) {
    // check variables to close or not form
    if (this.instructionTitle != '' || this.instructionDescription && !this.changesIsApply) {
      this.dataNotSaved = true;
    } else {
      var modals = document.getElementsByClassName('modal');
      for (var i = 0; i < modals.length; i++) {
        modals[i].classList.add('hide')
      }
    }
  }
  saveInstruction() {
    // send data to server
    var formData = new FormData(document.getElementsByTagName('form')[0]); // using formdata and find form to get data
    // add data that cannot be added to formData
    formData.append('item', this.instructionItem);
    formData.append('language', this.instructionLanguage);
    formData.append('description', this.instructionDescription);
    this.http.post('http://localhost/instructionEdit.php', formData).subscribe(res => {
      if (res.status == 200) { // if respons is ok
        this.changesIsApply = true;
        this.dataNotSaved = false;
        this.responseError = false;
      }
    }, error => { // if response has errors
      this.responseError = true;
      this.changesIsApply = false;
    });
  }
}
