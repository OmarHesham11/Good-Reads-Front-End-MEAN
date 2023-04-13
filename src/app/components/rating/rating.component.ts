import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() book:any;
  @Input() bookId:any;
  @Input() rating:any;
  @Input() shelf:any;
  @Output() rateUpdateEvent = new EventEmitter();

  constructor(){    
  }
  stars: { filled: boolean, hover: boolean }[] = Array(5).fill(null).map(() => ({ filled: false, hover: false }));
  
  onStarClick(star: any){
    if (this.book.rating) {
      this.book.rating = this.stars.indexOf(star) + 1
    }
    if (this.book.userRate) {
      this.book.userRate = this.stars.indexOf(star) + 1
    }
    if (this.shelf) {
      this.shelf.rating = this.stars.indexOf(star) + 1
    }


    this.rateUpdateEvent.emit(this.bookId)
  }
  onStarHover(star: any) {
    star.hover = true;
  }

  onStarLeave(star: any) {
    star.hover = false;
  }
}
