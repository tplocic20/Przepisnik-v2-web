import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {SearchService} from "../../../services/search.service";
import {AddEditRecipeModalComponent} from "../../modals/add-edit-recipe-modal/add-edit-recipe-modal.component";
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {ClipboardService} from "ngx-clipboard";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnChanges {

  @Input() category: string;
  recipes: Observable<any>;
  selectedRecipe: any;
  loading = true;

  constructor(private srv: FireService, public searchService: SearchService, private dialogSrv: MatDialog, private clipboard: ClipboardService, private toast: MessagesService) {

  }

  ngOnInit() {
    this.getRecipes();
  }

  trackFn(index, rec) {
    return rec.$key;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.getRecipes();
    }
  }

  private getRecipes() {
    this.recipes = this.srv.getRecipes(this.category);
  }

  editRecipe(key) {
    const config  = {
      disableClose: true,
      data: {mode: ModalModeEnum.Edit, recId: key}
    };
    this.dialogSrv.open(AddEditRecipeModalComponent, config as any);
  }

  removeRecipe(recipe, view) {
    console.log(view);
    view.toRemove = true;
  }

  removeConfirm(recipe, view) {
    view.isRemoving = true;
    view.removeTimer = 3;
    view.removeTimeout = setInterval(() => {
      view.removeTimer--;
      if (view.removeTimer === 0) {
        this.srv.removeRecipe(recipe.$key).then(() => this.toast.warning(`Usunięto przepis "${recipe.Name}"`));
        clearInterval(view.removeTimeout);
      }
    }, 1000);
  }

  removeCancel(recipe, view) {
    delete view.toRemove;
    delete view.isRemoving;
    if (view.removeTimeout) {
      clearInterval(view.removeTimeout);
      delete view.removeTimeout;
    }
  }

  shareClipboard(rec) {
    const text = this.convertRecipeToText(rec);
    this.clipboard.copyFromContent(text);
    this.toast.info("Skopiowano do schowka");
  }
  private convertRecipeToText(recipe: Recipe): string {
    let text: string[] = [];
    text.push(`${recipe.Name}:`);
    if (recipe.Temperature)
      text.push(`Temperatura: ${recipe.Temperature}`);
    if (recipe.Time)
      text.push(`Czas: ${recipe.Time}`);
    text = text.concat(this.engredientsToText(recipe.Engredients));
    text.push("\n");
    text.push(recipe.Recipe);

    return text.join("\n");
  }

  private engredientsToText(groups: any[]): string[] {
    const text: string[] = [];
    for (let i = 0; i < groups.length; i++) {
      text.push("\n");
      text.push(`${(i + 1)}. ${groups[i].Name}`);
      if (groups[i].Positions) {
        for (let y = 0; y < groups[i].Positions.length; y++) {
          const name = groups[i].Positions[y].Name;
          const qty = groups[i].Positions[y].Qty ? groups[i].Positions[y].Qty : "";
          const unit = groups[i].Positions[y].Unit ? groups[i].Positions[y].Unit : "";
          const eng = `${name} ${qty} ${unit}`;
          text.push(`- ${eng}`);
        }
      }
    }
    return text;
  }
}
