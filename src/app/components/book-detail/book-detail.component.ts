import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CBAService } from 'src/app/services/cba.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  id:string = this._ActivatedRoute.snapshot.params['id'];
  book:any;
  shelf:any={};
  category:any;
  author:any;
 
 

  constructor(private _CBAService: CBAService, private _ActivatedRoute: ActivatedRoute, private _router: Router) {
    this.getBook()
  }
  
  getBook() {
    this._CBAService.getByID('book', this.id).subscribe((res) => {
      if (res.status === 200) {
        this.book= res.body.book.book;
        this.category= res.body.book.book.categoryId;
        this.author= res.body.book.book.authorId;
        if (res.body.book.shelf) {
          this.shelf = res.body.book.shelf[0];        
          
        }
      }
    });
  }
  stars: { filled: boolean, hover: boolean }[] = Array(5).fill(null).map(() => ({ filled: false, hover: false }));
  onStarHover(star: any) {
    star.hover = true;
  }

  onStarLeave(star: any) {
    star.hover = false;
  }

  onStarClick(star: any, bookId: string, bookShelf: String) {
    const rating = this.stars.indexOf(star) + 1
    console.log(rating, bookId, bookShelf);
    this.updateShelf(rating, bookId, bookShelf)
  }

  Change(target:any,bookId:string,rating:number){
    this.updateShelf(rating,bookId,target.value)
  }

  updateShelf(rating: number,bookId:string,bookShelf:String){
    const obj:object={
      "shelf": bookShelf,
      "rating": rating
    }
    this._CBAService.patchCBA('user/book',bookId,obj).subscribe({
      next:(res) => {
      if(res.status==200)
        console.log('Shelf Updated');
        this.getBook()
    },
    error:(err) => this._router.navigate(['/user/login'])
    
  })
  }
}