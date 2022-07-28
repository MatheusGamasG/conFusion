import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Dish } from '../shares/dish';
import { switchMap } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shares/comment';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host : {
    '[@flyInOut]': 'true',
    'style' : 'display: block'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {
  
  dish:Dish;
  dishIds: string[];
  errMess:string;
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  value:number = 5;
  preview: boolean = false;
  previewComment:Comment;
  dishcopy:Dish;
  visibility = 'shown';
  @ViewChild('fform') commentFormDirective;

  formErrors = {
    'author':'',
    'comment':''
  };


  validationMessages = {
    'author': {
      'required':'Name is required.',
      'minlength':'Name must be atleast 2 characters long.'
    },
    'comment': {
      'required':'Comment is required.',
      'minlength':'Comment must be atleast 8 characters long.'
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) { this.createForm(); }


  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [''],
      comment: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {return;}

    const form = this.commentForm;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }

    if(form.get('comment').valid && form.get('author').valid) {
      this.preview = true;
    }

    this.previewComment = this.commentForm.value;
    this.previewComment.date = new Date().toISOString();
  }

  onSubmit() {
    this.preview = false;
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      }, errmess => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess;
      });
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }
    
  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id']);} ))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'}, 
      errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  } d

  goBack() : void {
    this.location.back();
  }
}
