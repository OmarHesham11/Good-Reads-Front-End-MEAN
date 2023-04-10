import { Component } from '@angular/core';
import { CBAService } from '../../services/cba.service';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.scss']
})
export class AllbooksComponent {
  currentPage:number = 1;
  limit:number = 8;
  books:any = []
  booksRes:any = []
  constructor(private _CBAService: CBAService) {
    this.getBooks()
  }
  
  getBooks(){
    this._CBAService.getCBA('book', this.currentPage, this.limit).subscribe((res) => {
      if (res.message == 'success') {
        this.books = res.books.docs;
        this.booksRes = res.books;
        console.log("this is book res", res.books);
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
