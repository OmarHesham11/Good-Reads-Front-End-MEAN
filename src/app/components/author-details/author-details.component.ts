import { Component } from '@angular/core';
import { CBAService } from '../../services/cba.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent {
  
  id:string = this._ActivatedRoute.snapshot.params['id'];
  author:any;
  authorBooks:any;
  DOB:any;
  constructor(private _CBAService: CBAService, private _ActivatedRoute: ActivatedRoute) {
    this.getAuthor()
  }
  
  getAuthor() {
    this._CBAService.getByID('author', this.id).subscribe((res) => {
      if (res.message == 'success') {
        this.author = res.author.author;
        this.authorBooks = res.author.authorBooks;
       
        let authorDOB = new Date(res.author.author.DOB)        
        this.DOB = `${authorDOB.getDate()}/${authorDOB.getMonth()+1}/${authorDOB.getFullYear()}`
        
        console.log(this.authorBooks);
        
      }
    });
  }

}
