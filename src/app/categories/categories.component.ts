import { Component } from '@angular/core';
import { CBAService } from '../cba.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  // trendingCategories:any[] = [];
  // showAddButton:boolean = true;
  // showUpdatePopUp:boolean = false;
  // updateMessage:string= '';
  // currentCategoryId:string = '';
  // addMessage:string = '';

  // constructor(private _CBAService:CBAService){
  //   //get
  //  this. _CBAService.getCBA('categories',1,5).subscribe((res) => {
  //     this.trendingCategories = res.category;
  //   });
  // }

  // categoryForm = new FormGroup({
  //   Name: new FormControl(null, [Validators.required])
  // });
  
  // //delete
  // deleteCategory(id:string) {
  //   console.log(id);
  //   this._CBAService.deleteCBA('categories', id).subscribe((res) => {
  //     this._CBAService.getCBA('categories',1,5).subscribe((res) => {
  //       this.trendingCategories = res.category;
  //     })
  //     alert(res.message);
  //   });
  // }


  // showAddPopUpFunction() {
  //   this.showAddButton  = false;
  // };

  // closeAddPopUpFunction(){
  //   this.showAddButton  = true;
  // };

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
  //       this._CBAService.getCBA('categories',1,5).subscribe((res) => {
  //         this.trendingCategories = res.category;
  //       });
  //       this.updateMessage = 'Updated successfully'
        
  //     }
  //     else {
  //       this.updateMessage = 'Failed';
  //     }
  //   });
  // }


  
  // //Add Category
  // submitAddCategoryForm(categoryForm:FormGroup){
  //   this._CBAService.postCBA('categories',categoryForm.value).subscribe((res)=>{
  //     if(res.message == 'success'){
  //       this._CBAService.getCBA('categories',1,5).subscribe((res) => {
  //         this.trendingCategories = res.category;
  //       });
  //       this.addMessage = 'Added successfully'
  //     }
  //     else {
  //       this.addMessage = 'Failed';
  //     }
  //   });
  // }
}
