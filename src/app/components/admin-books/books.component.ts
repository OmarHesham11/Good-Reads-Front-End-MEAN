import { Component } from '@angular/core';
import { CBAService } from '../../services/cba.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BooksResponse } from '../../Interfaces/booksresponse';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  trendingBooks:any[] = [];
  trendingCategories:any[] = [];
  trendingAuthors:any[] = [];

  showAddButton:boolean = true;
  showUpdatePopUp:boolean = false;

  updateMessageS:string= '';
  updateMessageF:string= '';
  addMessageS:string = '';
  addMessageF:string = '';
  currentBookId:string = '';

  currentPage:number = 1;
  limit:number = 5;
  bookResponse:any = {};
  
  // selectedFile!:File;
  photo:any;
  
  
  constructor(private _CBAService:CBAService, public fb: FormBuilder){
    //get
    this._CBAService.getCBA('book',this.currentPage, this.limit).subscribe((res) => {
      if(res.message == 'success'){
        this.trendingBooks = res.books.docs;
        ({totalDocs: this.bookResponse.totalDocs,limit: this.bookResponse.limit, totalPages: this.bookResponse.totalPages, page: this.bookResponse.page, hasPrevPage: this.bookResponse.hasPrevPage, hasNextPage: this.bookResponse.hasNextPage} = res.books);
        console.log("this is book res", this.bookResponse);
      }
    });

    this._CBAService.getCBA('categories', this.currentPage, this.limit).subscribe((res)=> {
      if(res.message == 'success'){
        this.trendingCategories = res.category.docs;
      }
    });
    
    this._CBAService.getCBA('author', this.currentPage, this.limit).subscribe((res)=> {
      if(res.message == 'success'){
        this.trendingAuthors = res.authors.docs;
      }
    })

  }

  bookForm:any = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null,[Validators.required]),
    author: new FormControl(null,[Validators.required]),
    photo: new FormControl(null,[Validators.required]),
  });

  uploadImage(event:any) {
    console.log("photo", this.photo);
   if(event.target.files.length>0){
     const file = event.target.files[0];
     this.photo = file
    //  console.log("photo", this.photo);
   }
  }

  //Post
  submitAddBookForm(bookForm: FormGroup) {
    let category = this.trendingCategories.find((u) => u.Name === this.bookForm.get('category').value);
    let author = this.trendingAuthors.find((item) => {
      let authorFormValue = this.bookForm.get('author').value;
      for (let prop in authorFormValue) {
        if (authorFormValue.hasOwnProperty(prop) && item[prop] !== authorFormValue[prop]) {
          return false;
        }
      }
      return true;
    });
    // Return the found object or undefined if not found
    if (author) {
      // console.log('Found author:', author);
      // console.log('author', author);
      const formData:FormData = new FormData();
      formData.append('name', this.bookForm.get('name').value);
      formData.append('categoryId', category._id);
      formData.append('authorId', author._id);
      formData.append('photo', this.photo);
      // console.log(formData.get('photo'));
      // console.log(formData.get('authorId'));
      // console.log("ana hena",this.bookForm.get('name').value);
    
      this._CBAService.postCBA('book', formData).subscribe((res) => {
        if (res.message == 'success') {
          this.addMessageS = 'Book is added successfully ';
        }
        else{
          this.addMessageF = 'Failed';
        }
      });
      return author;
    } else {
      console.log('Author not found');
      return undefined;
    }
    
  }


  nextPage() {
    if(this.bookResponse.hasNextPage && this.currentPage<this.bookResponse.totalPages){
      this.currentPage++;
      console.log(this.currentPage);
      this._CBAService.getCBA('book',this.currentPage, this.limit).subscribe((res) => {
        if(res.message == 'success'){
          this.trendingBooks = res.books.docs;
          ({totalDocs: this.bookResponse.totalDocs,limit: this.bookResponse.limit, totalPages: this.bookResponse.totalPages, page: this.bookResponse.page, hasPrevPage: this.bookResponse.hasPrevPage, hasNextPage: this.bookResponse.hasNextPage} = res.books);
          console.log("this is book res", this.bookResponse);
        }
      });
    }

  }

  prevPage() {
    if(this.bookResponse.hasPrevPage && this.currentPage>1){
      this.currentPage--;
      console.log(this.currentPage);
      this._CBAService.getCBA('book',this.currentPage, this.limit).subscribe((res) => {
        if(res.message == 'success'){
          this.trendingBooks = res.books.docs;
          ({totalDocs: this.bookResponse.totalDocs,limit: this.bookResponse.limit, totalPages: this.bookResponse.totalPages, page: this.bookResponse.page, hasPrevPage: this.bookResponse.hasPrevPage, hasNextPage: this.bookResponse.hasNextPage} = res.books);
          console.log("this is book res", this.bookResponse);
        }
      });
    }

  }
  
  //delete
  deleteBook(id:string) {
    console.log(id);
    this._CBAService.deleteCBA('book', id).subscribe({
      next: (res) => {this._CBAService.getCBA('book',this.currentPage, this.limit).subscribe({
        next:(res) => {this.trendingBooks = res.books.docs}, 
        error:(err) => {"err fe el get eli fe el delete"},
        complete:() => {console.info('complete')}
      }); 
      console.log(res.message);
    },
      error: (err) => {console.error("err fe el delete")},
      complete: () => console.info('Complete')
      // alert(res.message);
    });
  }


  showAddPopUpFunction() {
    this.showAddButton  = false;
  };

  closeAddPopUpFunction(){
    this.showAddButton  = true;
    this.bookForm.reset();
    this.addMessageS = '';
    this.addMessageF = '';
  };

  // myUpdateInputControl = new FormControl();
  showUpdatePopUpFunction(bookId:string, tableId:number) {
    this.showUpdatePopUp = true;
    this.currentBookId = bookId;
  };

  closeUpdatePopUpFunction(){
    this.showUpdatePopUp = false;
    this.updateMessageS = '';
    this.updateMessageF = '';
  };


  // //Update
  submitUpdateCategoryForm(bookForm:FormGroup){
    let category = this.trendingCategories.find((u) => u.Name === this.bookForm.get('category').value);
    let author = this.trendingAuthors.find((item) => {
      let authorFormValue = this.bookForm.get('author').value;
      for (let prop in authorFormValue) {
        if (authorFormValue.hasOwnProperty(prop) && item[prop] !== authorFormValue[prop]) {
          return false;
        }
      }
      return true;
    });
    // Return the found object or undefined if not found
    if (author) {
      // console.log('Found author:', author);
      // console.log('author', author);
      const formData:FormData = new FormData();
      formData.append('name', this.bookForm.get('name').value);
      formData.append('categoryId', category._id);
      formData.append('authorId', author._id);
      formData.append('photo', this.photo);
      // console.log(formData.get('photo'));
      // console.log(formData.get('authorId'));
      // console.log("ana hena",this.bookForm.get('name').value);
    
      this._CBAService.patchCBA('book', this.currentBookId, formData).subscribe({
        next:(res) => {this._CBAService.getCBA('book', this.currentPage, this.limit).subscribe({
          next:(res) => this.trendingBooks = res.books.docs,
          error:(err) => alert('error fe el getauthor eli feh add'),
          complete: () => console.info('complete')
  
        })},
        error:(err) => this.updateMessageF = 'Failed',
        complete:() => this.updateMessageS = 'Updated Successfully'
      })
      return author;
    } else {
      console.log('Author not found');
      return undefined;
    }
  }
}