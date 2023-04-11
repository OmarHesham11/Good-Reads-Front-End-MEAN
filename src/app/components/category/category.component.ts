import { Component } from '@angular/core';
import { CBAService } from 'src/app/services/cba.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  currentPage:number = 1;
  limit:number = 8;
  books:any = []
  booksRes:any = []
  constructor(private _CBAService: CBAService) {
    this.getBooks()
  }
  categories = ['fantasy', 'Technology', 'thriller', 'historical fiction', 'fiction', 'mystery'];

  category = this.categories[0];

  getBooks(){
    this._CBAService.getCBA('book', this.currentPage, this.limit).subscribe((res) => {
      if (res.message == 'success') {
        this.books = res.books.docs.filter((book: any) => {
          return book.categoryId.Name === this.category;
        });
        this.booksRes = res.books;
        console.log(res.books);
      }
    });
  }

  nextPage(){
    if(this.booksRes.hasNextPage) {
      this.currentPage++;
      this.getBooks()
    }
  }
  prevPage(){
    if(this.booksRes.hasPrevPage) {      
      this.currentPage--;
      this.getBooks()
    }
  }
}
