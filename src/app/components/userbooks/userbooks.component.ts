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
// ----------------------------------------------------------------------//
                  //                  عاوز تغير هنا براحتك بس حافظ ع المسميات دى عشان مفيش حاااجة تضرب لاقتلك  ^_^
  filteredBooks: Book[] = [];
  books: Book[] = [
    {
      cover: 'book 1 cover image url',
      name: 'Book 1',
      author: 'Author 1',
      avgRate: 4.5,
      rating: 4.7,
      shelve: 'reading'
    },
    {
      cover: 'book 2 cover image url',
      name: 'Book 2',
      author: 'Author 2',
      avgRate: 4.2,
      rating: 3.1,
      shelve: 'want-to-read'
    },
    {
      cover: 'book 3 cover image url',
      name: 'Book 3',
      author: 'Author 3',
      avgRate: 3.5,
      rating: 3.8,
      shelve: 'read'
    },
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
  //  --------------------------------------------------------------//









// ملكش دعوة بال functions  دى احسنلك لقد اعذر من انذر

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matPaginatorIntl: MatPaginatorIntl) {
    this.matPaginatorIntl.itemsPerPageLabel = 'Books per page:';
  }



  selectedTabIndex: number;
  defaultTabIndex = 0;

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
  get math() {
    return Math;
  }
  floor(value: number) {
    return this.math.floor(value);
  }

  ceil(value: number) {
    return this.math.ceil(value);
  }

}