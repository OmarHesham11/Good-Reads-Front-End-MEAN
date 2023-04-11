import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CBAService } from 'src/app/services/cba.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  id:string = this._ActivatedRoute.snapshot.params['id'];
  book:any;
  stars:any;
  rating:any;
  ratingChange:any;
  constructor(private _CBAService: CBAService, private _ActivatedRoute: ActivatedRoute) {
    this.getBook()
  }
  
  getBook() {
    this._CBAService.getByID('book', this.id).subscribe((res) => {
      if (res.message == 'success') {
        this.book= res.book.book;

        console.log(this.book);
        
      }
    });
  }

  ngOnInit(): void {
  this.book;
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
