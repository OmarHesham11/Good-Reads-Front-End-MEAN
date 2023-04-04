import { Component } from '@angular/core';
import { CBAService } from '../cba.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BooksResponse } from '../booksresponse';
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

  updateMessage:string= '';
  addMessage:string = '';
  currentCategoryId:string = '';

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

  bookForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null,[Validators.required]),
    author: new FormControl(null,[Validators.required]),
    photo: new FormControl(null,[Validators.required]),
  });

  uploadFile(event:any) {
    console.log("ohotooooo", this.photo);
   if(event.target.files.length>0){
     const file = event.target.files[0];
     this.photo = file
     console.log("photo", this.photo);
   }
  }

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
      console.log('Found author:', author);
      console.log('author', author);
      const formData:FormData = new FormData();
      formData.append('name', this.bookForm.get('name').value);
      formData.append('categoryId', category._id);
      formData.append('authorId', author._id);
      formData.append('photo', this.photo);
      console.log(formData.get('photo'));
      console.log(formData.get('authorId'));
      console.log("ana hena",this.bookForm.get('name').value);
    
      this._CBAService.postCBA('book', formData).subscribe((res) => {
        if (res.message == 'success') {
          this.addMessage = 'Book is added successfully ';
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
  
  // //delete
  // deleteCategory(id:string) {
  //   console.log(id);
  //   this._CBAService.deleteCBA('categories', id).subscribe((res) => {
  //     this._CBAService.getCBA('categories').subscribe((res) => {
  //       this.trendingCategories = res.category;
  //     })
  //     alert(res.message);
  //   });
  // }


  showAddPopUpFunction() {
    this.showAddButton  = false;
  };

  closeAddPopUpFunction(){
    this.showAddButton  = true;
  };

  // myUpdateInputControl = new FormControl();
  // showUpdatePopUpFunction(categoryId:string, tableId:number) {
  //   this.showUpdatePopUp = true;
  //   this.currentCategoryId = categoryId;
  //   this.myUpdateInputControl.setValue(this.trendingCategories[tableId].Name)
    
  // };

  // closeUpdatePopUpFunction(){
  //   this.showUpdatePopUp = false;
  //   this.updateMessage = '';
  // };


  // //Update
  // submitUpdateCategoryForm(categoryForm:FormGroup){
  //   this._CBAService.patchCBA('categories', this.currentCategoryId, categoryForm.value).subscribe((res)=>{
  //     if(res.message == 'success'){
  //       this._CBAService.getCBA('categories').subscribe((res) => {
  //         this.trendingCategories = res.category;
  //       });
  //       this.updateMessage = 'Updated successfully'
        
  //     }
  //     else {
  //       this.updateMessage = 'Failed';
  //     }
  //   });
  // }


  
  //Add Book
  // submitAddBookForm(categoryForm:FormGroup){
    
  //  const formData = new FormData();
  //  formData.append('name', this.bookForm.get('name')?.value);
  //  formData.append('name', this.bookForm.get('name')?.value);
  //   // const formData = new FormData();
  //   // formData.append()
  //   // this._CBAService.postCBA('book',categoryForm.value).subscribe((res)=>{
  //   //   if(res.message == 'success'){
  //   //     this._CBAService.getCBA('categories').subscribe((res) => {
  //   //       this.trendingCategories = res.category;
  //   //     });
  //   //     this.addMessage = 'Added successfully'
  //   //   }
  //   //   else {
  //   //     this.addMessage = 'Failed';
  //   //   }
  //   // });
  // }

}
function onFileSelected(event: Event | undefined, any: any) {
  throw new Error('Function not implemented.');
}

