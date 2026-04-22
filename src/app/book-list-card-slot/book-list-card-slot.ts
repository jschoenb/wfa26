import { Component } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'bs-book-list-card-slot',
    imports: [
        MatCard,
        MatCardContent
    ],
  templateUrl: './book-list-card-slot.html',
  styleUrl: './book-list-card-slot.scss',
})
export class BookListCardSlot {}
