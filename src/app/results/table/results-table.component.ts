import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  @Input() trips;
  @Input() sortedBy;
  @Output() resetSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  reset() {
    this.resetSearch.emit();
  }
}
