import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  providers:  [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchInputComponent),
    multi: true,
  },
]
})
export class SearchInputComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  filteredOptions: string[] = [];
  showOptions = false;
  searchQuery = '';
  selectedOption: string | null = null;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.filteredOptions = [...this.options];
  }

  onFocus() {
    this.showOptions = true;
    this.filterOptions();
  }

  onBlur() {
    //this.showOptions = false;
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchQuery = query;
    this.filterOptions();
  }

  filterOptions() {
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.searchQuery = option;
    this.showOptions = false;
    this.onChange(option);
    this.optionSelected.emit(option);
    this.showOptions = false;
    this.onTouched();
  }

  writeValue(value: string): void {
    if (value) {
      this.selectedOption = value;
      this.searchQuery = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
