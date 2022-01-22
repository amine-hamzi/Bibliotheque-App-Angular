import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../service/client.service";
import {CategorieService} from "../service/categorie.service";

@Component({
  selector: 'app-put-categorie',
  templateUrl: './put-categorie.component.html',
  styleUrls: ['./put-categorie.component.css']
})
export class PutCategorieComponent implements OnInit {

  @Input() code: String=""
  @Input() label: String =''
  @Input() self: string=""
  constructor(private categorieService: CategorieService) {

  }

  ngOnInit(): void {
  }


  display: boolean = false;
  showDialog() {
    this.display = true;
  }
  public close() {
    this.display = false;

  }

  onUpdate( form: any){
    this.categorieService.put(this.self, form)
  }

}
