import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
 
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
  // stars = [1, 2, 3, 4, 5];
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








  // starRating = 0; 

// ملكش دعوة بال functions  دى احسنلك لقد اعذر من انذر

  
@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matPaginatorIntl: MatPaginatorIntl) {
    this.matPaginatorIntl.itemsPerPageLabel = 'Books per page:';
    this.selectedTabIndex = this.tabs.findIndex(tab => tab.label === 'All');
  }



  selectedTabIndex: number;

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;

    if (this.selectedTabIndex === 1) {
      this.filteredBooks = this.books;
    this.paginator.firstPage();

    } else {
      this.filteredBooks = this.books.filter(book => book.shelve === this.tabs[this.selectedTabIndex].value);
      this.paginator.firstPage();

    }
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredBooks = this.filteredBooks.slice(startIndex, endIndex);
  }
  rating: number = 0;
  large: boolean = false;
  extraLarge: boolean = false;
  ratingChange = new EventEmitter<number>();
  stars: { filled: boolean, hover: boolean }[] = [];

  ngOnInit(): void {
    this.books;
    this.stars = Array(5).fill(null).map(() => ({ filled: false, hover: false }));
    const roundedRating = Math.round(this.rating);
    for (let i = 0; i < roundedRating; i++) {
      this.stars[i].filled = true;
    }
  }

  onStarHover(star: any) {
    star.hover = true;
  }

  onStarLeave(star: any) {
    star.hover = false;
  }

  onStarClick(star: any) {
    const rating = this.stars.indexOf(star) + 1;
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].filled = i < rating;
    }
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }

}