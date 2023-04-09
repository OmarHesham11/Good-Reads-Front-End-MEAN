import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NgxStarsModule } from 'ngx-stars';
interface Book{
  cover: string;
  name: string;
  author: string;
  avgRate: number;
  rating: number;
  shelve: string;

}
@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.scss']
})

export class UserbooksComponent {
  filteredBooks: Book[] = [];
  books: Book[] = [
    {
      cover: 'book 1 cover image url',
      name: 'Book 1',
      author: 'Author 1',
      avgRate: 4.5,
      rating: 5,
      shelve: 'reading'
    },
    {
      cover: 'book 2 cover image url',
      name: 'Book 2',
      author: 'Author 2',
      avgRate: 4.0,
      rating: 4,
      shelve: 'want-to-read'
    },
    {
      cover: 'book 3 cover image url',
      name: 'Book 3',
      author: 'Author 3',
      avgRate: 3.5,
      rating: 3,
      shelve: 'read'
    },
    // Add more books as needed
  ];
  tabs = [
    {
      label: 'All',
      value: ''
    },
    {
      label: 'Read',
      value: 'read'
    },
    {
      label: 'Currently Reading',
      value: 'reading'
    },
    {
      label: 'Want to read',
      value: 'want-to-read'
    }
  ];
  selectedTabIndex: number;
  defaultTabIndex = 0;
  ngOnInit() {
    this.setAllTabAsDefault();
  }
  setAllTabAsDefault() {
    this.tabs.forEach((tab, index) => {
      if (tab.label === 'All') {
        this.defaultTabIndex = index;
      }
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matPaginatorIntl: MatPaginatorIntl) {
    this.matPaginatorIntl.itemsPerPageLabel = 'Books per page:';
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;

    if (this.selectedTabIndex === 0) {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => book.shelve === this.tabs[this.selectedTabIndex].value);
    }
    this.paginator.firstPage();
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredBooks = this.filteredBooks.slice(startIndex, endIndex);
  }

}