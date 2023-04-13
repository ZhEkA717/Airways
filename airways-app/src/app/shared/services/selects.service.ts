import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class SelectsService {
  public isChoiceInput = false;

  private placeholderDefault = 'Passenger*';

  public placeholder = this.placeholderDefault;

  public isValidate = false;

  public count = 0;

  public passengers = [
    {
      id: 0,
      view: 'Adults',
      description: '14+ years',
      value: 0,
    },
    {
      id: 1,
      view: 'Child',
      description: '2-14 years',
      value: 0,
    },
    {
      id: 2,
      view: 'Infant',
      description: '0-2 years',
      value: 0,
    },
  ];

  public increment(num: number) {
    if (this.passengers[num].value < 10) {
      this.passengers[num].value += 1;
      this.updatePlaceholder();
      this.isValidate = this.validate();
    }
  }

  public decrement(num: number) {
    if (this.passengers[num].value !== 0) {
      this.passengers[num].value -= 1;
      this.updatePlaceholder();
      this.isValidate = this.validate();
    }
  }

  private validate() {
    return !!this.passengers.filter((item) => item.value > 0).length;
  }

  public updatePlaceholder() {
    this.placeholder = '';
    this.passengers.forEach((item, i, arr) => {
      if (item.value > 0) this.placeholder += `${item.value} ${item.view}, `;
      if (arr.length - 1 === i) this.placeholder = this.placeholder.slice(0, -2);
      if (!this.isChoiceInput) this.placeholder = this.cutPlaceholder(this.placeholder, 20);
    });
    if (
      !this.passengers.reduce((start, item) => start + item.value, 0)
    ) this.placeholder = this.placeholderDefault;
  }

  private cutPlaceholder(text: string, num: number) {
    return text.length > num ? `${text.slice(0, num)}...` : text;
  }
}
