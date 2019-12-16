/**
 * This interfaces connects FormField and Form Input component. Since we want to abstract
 * completely the way work with forms and hide complexity details we need some bridging interface
 * like this to connect components inside FormField together.
 *
 *  All the Inputs should be registered under common provider name which is this FormFieldControl
 *  instead of the NG_VALUE_ACCESSOR.
 *
 *  This implementation was inspired by our legacy implementation called AribaWeb and material
 *  components that implemented all this in Angular way.
 *
 *
 */
import {Observable} from 'rxjs';
import {NgControl} from '@angular/forms';

export abstract class FormFieldControl<T> {

  /**
   * Each input control has always a value. Need to make sure we keep a convention for
   * input fields
   */
  value: T | null;

  /**
   * Need to have a way to set placeholder to the input
   */
  placeholder: string;


  /**
   * Sets id from FF to Input
   */
  id: string;


  editable: boolean;

  /**
   *
   * Form Field listen for all the changes happening inside the input
   */
  readonly stateChanges: Observable<void>;


  /**
   *  Each input should inject its own ngControl and we should retrieve it
   */
  readonly ngControl: NgControl | null;

  /** Whether the control is disabled. */
  readonly disabled: boolean;

  /**
   * Keeps track if the form element is in focus
   */
  readonly focused: boolean;

  /** Whether the control is in an error state. */
  readonly inErrorState: boolean;

  abstract onContainerClick(event: MouseEvent): void;

}


