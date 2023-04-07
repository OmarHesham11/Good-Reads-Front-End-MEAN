import { Component } from '@angular/core';
import { CBAService } from '../../services/cba.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  trendingCategories:any[] = [];
  showAddButton:boolean = true;
  showUpdatePopUp:boolean = false;
  updateMessageS:string;
  updateMessageF:string;
  currentCategoryId:string = '';
  addMessageS:string;
  addMessageF:string;

  currentPage:number = 1;
  limit:number = 10;
  categoryResponse:any = {};

  constructor(private _CBAService:CBAService){
    //get
   this. _CBAService.getCBA('categories', this.currentPage, this.limit).subscribe({
      next: (res) => {this.trendingCategories = res.category.docs;
        ({totalDocs: this.categoryResponse.totalDocs,limit: this.categoryResponse.limit, totalPages: this.categoryResponse.totalPages, page: this.categoryResponse.page, hasPrevPage: this.categoryResponse.hasPrevPage, hasNextPage: this.categoryResponse.hasNextPage} = res.category);
      },
      error: (err) => console.error('error while getting categories'),
      complete: () => console.info('Complete')
    });
  }

  categoryForm:any = new FormGroup({
    Name: new FormControl(null, [Validators.required])
  });

  updateCategoryForm:any = new FormGroup({
    Name: new FormControl(null, [Validators.required])
  });
  
  //delete
  deleteCategory(id:string) {
    console.log(id);
    this._CBAService.deleteCBA('categories', id).subscribe({
      next:(res) => this._CBAService.getCBA('categories', this.currentPage, this.limit).subscribe({
        next:(res) => this.trendingCategories = res.category.docs,
        error:(err) => console.error('error while getting categories in the delete methode'),
        complete:() => console.info('complete')
      }),
      error:(err) => console.error('error while deleting category'),
      complete:() => console.info('Complete')
    })
  }


  showAddPopUpFunction() {
    this.showAddButton  = false;
  };

  closeAddPopUpFunction(){
    this.showAddButton  = true;
    this.categoryForm.reset();
    this.addMessageF = '';
    this.addMessageS = '';
  };

  // myUpdateInputControl = new FormControl();
  showUpdatePopUpFunction(categoryId:string, tableId:number) {
    this.showUpdatePopUp = true;
    this.currentCategoryId = categoryId;
    // this.myUpdateInputControl.setValue(this.trendingCategories[tableId].Name)
  };

  closeUpdatePopUpFunction(){
    this.showUpdatePopUp = false;
    this.updateCategoryForm.reset();
    this.updateMessageS = '';
    this.updateMessageF = '';
  };


  //Update
  submitUpdateCategoryForm(updateCategoryForm:FormGroup){
    this._CBAService.patchCBA('categories', this.currentCategoryId, this.updateCategoryForm.value).subscribe((res)=>{
      if(res.message == 'success'){
        this._CBAService.getCBA('categories',this.currentPage,this.limit).subscribe((res) => {
          this.trendingCategories = res.category.docs;
        });
        this.updateMessageS = 'Updated successfully'
        
      }
      else {
        this.updateMessageF = 'Failed';
      }
    });
  }


  
  //Add Category
  submitAddCategoryForm(categoryForm:FormGroup){
    this._CBAService.postCBA('categories',categoryForm.value).subscribe({
      next:(res) => this._CBAService.getCBA('categories',this.currentPage,this.limit).subscribe({
        next: (res) => this.trendingCategories = res.category.docs,
        error:(err) => console.error('error while getting categories in the add method'),
        complete: () => console.info('Complete')
        }),
      error:(err) => this.addMessageF = 'Failed',
      complete: () => this.addMessageS = 'Added successfully'
      })   
  }

  nextPage() {
    if(this.categoryResponse.hasNextPage && this.currentPage<this.categoryResponse.totalPages){
      this.currentPage++;
      console.log(this.currentPage);
      this._CBAService.getCBA('book',this.currentPage, this.limit).subscribe((res) => {
        if(res.message == 'success'){
          this.trendingCategories = res.category.docs;
          ({totalDocs: this.categoryResponse.totalDocs,limit: this.categoryResponse.limit, totalPages: this.categoryResponse.totalPages, page: this.categoryResponse.page, hasPrevPage: this.categoryResponse.hasPrevPage, hasNextPage: this.categoryResponse.hasNextPage} = res.category);
          console.log("this is category res", this.categoryResponse);
        }
      });
    }

  }

  prevPage() {
    if(this.categoryResponse.hasPrevPage && this.currentPage>1){
      this.currentPage--;
      console.log(this.currentPage);
      this._CBAService.getCBA('book',this.currentPage, this.limit).subscribe((res) => {
        if(res.message == 'success'){
          this.trendingCategories = res.category.docs;
          ({totalDocs: this.categoryResponse.totalDocs,limit: this.categoryResponse.limit, totalPages: this.categoryResponse.totalPages, page: this.categoryResponse.page, hasPrevPage: this.categoryResponse.hasPrevPage, hasNextPage: this.categoryResponse.hasNextPage} = res.category);
          console.log("this is category res", this.categoryResponse);
        }
      });
    }

  }
  
}
