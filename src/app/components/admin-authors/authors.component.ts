import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CBAService } from '../../services/cba.service';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  trendingBooks:any[] = [];
  trendingCategories:any[] = [];
  trendingAuthors:any[] = [];

  showAddButton:boolean = true;
  showUpdatePopUp:boolean = false;

  updateMessageS:string= '';
  updateMessageF:string= '';
  addMessageS:string = '';
  addMessageF:string = '';
  currentCategoryId:string = '';

  currentPage:number = 1;
  limit:number = 5;
  authorResponse:any = {};
  
  // selectedFile!:File;
  photo:any;
  currentAuthorId: string;
  
  
  constructor(private _CBAService:CBAService){
    //get
    this._CBAService.getCBA('author',this.currentPage, this.limit).subscribe((res) => {
      if(res.body.message == 'success'){
        this.trendingAuthors = res.body.authors.docs;
        ({totalDocs: this.authorResponse.totalDocs,limit: this.authorResponse.limit, totalPages: this.authorResponse.totalPages, page: this.authorResponse.page, hasPrevPage: this.authorResponse.hasPrevPage, hasNextPage: this.authorResponse.hasNextPage} = res.body.authors);
        console.log("this is author res", this.authorResponse);
      }
    });

    this._CBAService.getCBA('categories', this.currentPage, this.limit).subscribe((res)=> {
      if(res.body.message == 'success'){
        this.trendingCategories = res.body.category.docs;
      }
    });
    
    this._CBAService.getCBA('book', this.currentPage, this.limit).subscribe((res)=> {
      if(res.body.message == 'success'){
        this.trendingBooks = res.body.books.docs;
      }
    })

  }

  authorForm:any = new FormGroup({
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,[Validators.required]),
    DOB: new FormControl(null,[Validators.required]),
    photo: new FormControl(null,[Validators.required]),
  });

  uploadImage(event:any) {
    // console.log("Photo", this.photo);
   if(event.target.files.length>0){
     const file = event.target.files[0];
     this.photo = file
     console.log("photo", this.photo);
   }
  }

  //POST
  submitAddAuthorForm(authorForm:FormGroup) {

    const formData:FormData = new FormData();
    formData.append('firstName', this.authorForm.get('firstName').value);
    formData.append('lastName', this.authorForm.get('lastName').value);
    formData.append('DOB', this.authorForm.get('DOB').value);
    formData.append('photo', this.photo);

    this._CBAService.postCBA('author',formData).subscribe({
      next:(res) => {this._CBAService.getCBA('author', this.currentPage, this.limit).subscribe({
        next:(res) => this.trendingAuthors = res.body.authors.docs,
        error:(err) => alert('error fe el getauthor eli feh add'),
        complete: () => console.info('complete')

      })},
      error:(err) => this.addMessageF = 'Failed',
      complete:() => this.addMessageS = 'Added Successfully'
    })

  }


  nextPage() {
    console.log(this.authorResponse);
    if(this.authorResponse.hasNextPage && this.currentPage<this.authorResponse.totalPages){
      this.currentPage++;
      console.log(this.currentPage);
      this._CBAService.getCBA('author', this.currentPage, this.limit).subscribe((res) => {
        if(res.body.message == 'success'){
          this.trendingAuthors = res.body.authors.docs;
          ({totalDocs: this.authorResponse.totalDocs,limit: this.authorResponse.limit, totalPages: this.authorResponse.totalPages, page: this.authorResponse.page, hasPrevPage: this.authorResponse.hasPrevPage, hasNextPage: this.authorResponse.hasNextPage} = res.body.authors);
          console.log("this is authors res", this.authorResponse);
        }
      });
    }

  }

  prevPage() {
    if(this.authorResponse.hasPrevPage && this.currentPage>1){
      this.currentPage--;
      console.log(this.currentPage);
      this._CBAService.getCBA('author',this.currentPage, this.limit).subscribe((res) => {
        if(res.body.message == 'success'){
          this.trendingAuthors = res.body.authors.docs;
          ({totalDocs: this.authorResponse.totalDocs,limit: this.authorResponse.limit, totalPages: this.authorResponse.totalPages, page: this.authorResponse.page, hasPrevPage: this.authorResponse.hasPrevPage, hasNextPage: this.authorResponse.hasNextPage} = res.body.authors);
          console.log("this is author res", this.authorResponse);
        }
      });
    }

  }
  
  //delete
  deleteAuthor(id:string) {
    console.log(id);
    this._CBAService.deleteCBA('author', id).subscribe({
      next: (res) => {
        console.log(res);
        this._CBAService.getCBA('author',this.currentPage, this.limit).subscribe({
          next:(res) => {this.trendingAuthors = res.body.authors.docs}, 
          error:(err) => {"err fe el get eli fe el delete"},
          complete:() => {console.log('complete')}
      })
    },
      error: (err) => {console.error("err fe el delete")},
      complete: () => console.log('Complete')
      // alert(res.body.message);
    });
  }


  showAddPopUpFunction() {
    this.showAddButton  = false;
  };

  closeAddPopUpFunction(){
    this.showAddButton  = true;
    this.authorForm.reset();
    this.addMessageS = '';
    this.addMessageF = '';
  };

  // myUpdateInputControl = new FormControl();
  // myUpdateInputControl2 = new FormControl();
  // myUpdateInputControl3 = new FormControl();
  // myUpdateInputControl4 = new FormControl();
  showUpdatePopUpFunction(authorId:string, tableId:number,author:any) {
    this.showUpdatePopUp = true;
    this.currentAuthorId = authorId;
    // this.myUpdateInputControl.setValue(author.firstName);
    // this.myUpdateInputControl2.setValue(author.lastName);
    // this.myUpdateInputControl3.setValue(this.trendingAuthors[tableId].DOB);
    // this.myUpdateInputControl4.setValue(this.trendingAuthors[tableId].photo);
    // this.myUpdateInputControl.setValue(this.trendingAuthors[tableId].DOB);
    // this.myUpdateInputControl.setValue(this.trendingAuthors[tableId].photo);
    
  };

  closeUpdatePopUpFunction(){
    this.showUpdatePopUp = false;
    this.updateMessageS = '';
    this.updateMessageF = '';
  };


  // //Update
  submitUpdateAuthorForm(authorForm:FormGroup){
    const formData:FormData = new FormData();
    formData.append('firstName', this.authorForm.get('firstName').value);
    formData.append('lastName', this.authorForm.get('lastName').value);
    formData.append('DOB', this.authorForm.get('DOB').value);
    formData.append('photo', this.photo);

    this._CBAService.patchCBA('author', this.currentAuthorId, formData).subscribe({
      next:(res) => {this._CBAService.getCBA('author', this.currentPage, this.limit).subscribe({
        next:(res) => this.trendingAuthors = res.body.authors.docs,
        error:(err) => alert('error fe el getauthor eli feh add'),
        complete: () => console.info('complete')

      })},
      error:(err) => this.updateMessageF = 'Failed',
      complete:() => this.updateMessageS = 'Updated Successfully'
    })
  }

}