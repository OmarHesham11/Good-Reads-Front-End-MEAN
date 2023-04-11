import { Component } from '@angular/core';
// import { FloatNumberPipe } from 'src/app/pipes/float-number.pipe';
import { CBAService } from 'src/app/services/cba.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  currentPage:number = 1;
  limit:number = 10;
  books:any[];
  authors:any[];

  constructor(private _cbaService:CBAService ){
    this._cbaService.getCBA('book', this.currentPage, this.limit).subscribe({
      next:(res) => this.books = res.books.docs,
      error:(err) => console.error('Error while getting books in the home component'),
      complete:() => console.info('Complete')
    })

    this._cbaService.getCBA('author', this.currentPage, this.limit).subscribe({
      next:(res) => this.authors = res.authors.docs,
      error:(err) => console.error('Error while getting authors in the home component'),
      complete:() => console.info('Complete')
    })
    
  }

}
