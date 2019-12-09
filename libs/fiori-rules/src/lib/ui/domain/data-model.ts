
/**
 * Interface SelectItem is used to deal with complex object in order to be able to format
 * custom label that is shown in the options.
 */
export interface SelectItem {
  /**
   * Item text shown in the popup
   */
  label: string;

  /**
   * References to the object instance
   */
  value: any;
  disabled?: boolean;

  /**
   * Trigger values is a text for selected item
   */
  triggerValue?: string;
}
