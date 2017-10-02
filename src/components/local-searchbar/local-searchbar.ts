import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the LocalSearchbarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'local-searchbar',
  templateUrl: 'local-searchbar.html'
})
export class LocalSearchbarComponent {

  @Input() items: any;
  @Input() fields: Array<any> = [];
  @Output() itemsFiltered = new EventEmitter();

  filteredItems: any;

  constructor() {
  }

  getItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.filteredItems = this.items.filter((item) => {
        //Case 1: string array
        if (this.fields.length === 0) {

          // return only if it matches the lowercase val of the item input
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);

        } else {
          //Case 2: object array (check multiple fields)

          //for each field input return the ones that match the lowercase val of the item input
          let matchedFields = this.fields.filter(field => {
            return (item[field].toLowerCase().indexOf(val.toLowerCase()) > -1)
          });

          //return true if at least one match was found
          return matchedFields.length > 0;
        }
      });
    } else {
      this.filteredItems = this.items;
    }
    this.itemsFiltered.emit(this.filteredItems);
  }

}
