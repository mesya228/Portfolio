import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchSystems = [
    {title: 'google.com', searchUrl: 'https://www.google.com.ua/search?q=' },
    {title: 'bing.com', searchUrl: 'https://www.bing.com/search?q=' },
    {title: 'ask.com', searchUrl: 'https://uk.ask.com/web?q=' } 
	];

  searchForm = undefined
  searchSystem = '';
  searchQuery = '';

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group ({
      "query": ["", [Validators.required]],
      "system": ["", [Validators.required]]
    });
  }

  ngOnInit() {
  }

  search() {
    for (var i = 0; i < this.searchSystems.length; i++) {
      if (this.searchSystems[i].title == this.searchSystem) {
        window.open(this.searchSystems[i].searchUrl + this.searchQuery);
      }
    }
  }

}
