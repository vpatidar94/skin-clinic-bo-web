import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';


export class SvgUtility {

  private matIconRegistry: MatIconRegistry;
  private domSanitizer: DomSanitizer;

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.matIconRegistry = matIconRegistry;
    this.domSanitizer = domSanitizer;
  }

  public initIcon(): void {
    this._addAllSvgIcon();
  }


  private _addSvgIcon(iconName: string, filename: string): void {
    this._addIcon(iconName, './assets/icon/' + filename);
  }

  private _addPaymentSvgIcon(iconName: string, filename: string): void {
    this._addIcon(iconName, './assets/icon/brand/payment/' + filename);
  }

  private _addNaukriSvgIcon(iconName: string, filename: string): void {
    this._addIcon(iconName, './assets/icon/naukri/' + filename);
  }

  private _addIcon(iconName: string, path: string): void {
    this.matIconRegistry.addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(path));
  }

  /**
   * <mat-icon svgIcon='ic_gear'></mat-icon>
   */
  private _addAllSvgIcon(): void {
    this._addSvgIcon('ic_coupon', 'coupon.svg');
    this._addSvgIcon('ic_icon_dots_menu', 'icon-dots-menu.svg');
    this._addSvgIcon('ic_icon_pencil_green', 'icon-pencil-green.svg');
    this._addSvgIcon('ic_discount', 'discount.svg');
    this._addSvgIcon('ic_maintenance', 'maintenance.svg');
    this._addSvgIcon('ic_purchase_order', 'purchase-order.svg');
    this._addSvgIcon('ic_mixer', 'basic_mixer2.svg');
    this._addSvgIcon('ic_order', 'order.svg');
    this._addSvgIcon('ic_bank', 'icon-bank-big.svg');
    this._addSvgIcon('ic_pos', 'icon-pos-terminal.svg');
    this._addSvgIcon('ic_sale', 'icon-sale.svg');

    this._addSvgIcon('ic_user_unblock', 'user_un_block_2.svg');
    this._addSvgIcon('ic_user_block', 'user_block_3.svg');
    this._addSvgIcon('ic_catalog', 'catalog.svg');
    this._addSvgIcon('ic_product', 'product.svg');
    this._addSvgIcon('ic_selective', 'selective.svg');
    this._addSvgIcon('ic_factory', 'factory.svg');
    this._addSvgIcon('ic_outsourcing', 'outsourcing.svg');
    this._addSvgIcon('ic_enterprise', 'enterprise.svg');
    this._addSvgIcon('ic_building', 'building.svg');
    this._addSvgIcon('ic_shop', 'shop.svg');
    this._addSvgIcon('ic_hardware', 'hardware.svg');
    this._addSvgIcon('ic_add', 'add.svg');
    this._addSvgIcon('ic_users_m_f', 'users_m_f.svg');
    this._addSvgIcon('ic_diploma', 'diploma.svg');
    this._addSvgIcon('ic_network', 'network.svg');
    this._addSvgIcon('ic_umbrella', 'umbrella.svg');
    this._addSvgIcon('ic_strategy', 'strategy.svg');
    this._addSvgIcon('ic_barcode', '056-barcode.svg');
    this._addSvgIcon('ic_qrcode', '057-qrcode.svg');
    this._addSvgIcon('ic_check', 'arrows_check.svg');
    this._addSvgIcon('ic_circle_remove', 'arrows_circle_remove.svg');
    this._addSvgIcon('ic_hamburger', 'arrows_hamburger.svg');
    this._addSvgIcon('ic_left', 'arrows_left.svg');
    this._addSvgIcon('ic_minus', 'arrows_minus.svg');
    this._addSvgIcon('ic_plus', 'arrows_plus.svg');
    this._addSvgIcon('ic_remove', 'arrows_remove.svg');
    this._addSvgIcon('ic_right', 'arrows_right.svg');
    this._addSvgIcon('ic_slim_left', 'arrows_slim_left.svg');
    this._addSvgIcon('ic_alarm', 'basic_alarm.svg');
    this._addSvgIcon('ic_archive_full', 'basic_archive_full.svg');
    this._addSvgIcon('ic_ban', 'basic_ban.svg');
    this._addSvgIcon('ic_book', 'basic_book.svg');
    this._addSvgIcon('ic_calculator', 'basic_calculator.svg');
    this._addSvgIcon('ic_calendar', 'basic_calendar.svg');
    this._addSvgIcon('ic_case', 'basic_case.svg');
    this._addSvgIcon('ic_clessidre', 'basic_clessidre.svg');
    this._addSvgIcon('ic_briefcase_plus', 'basic_elaboration_briefcase_plus.svg');
    this._addSvgIcon('ic_ecommerce_dollar', 'ecommerce_dollar.svg');
    this._addSvgIcon('ic_message_happy', 'basic_elaboration_message_happy.svg');
    this._addSvgIcon('ic_todolist_check', 'basic_elaboration_todolist_check.svg');
    this._addSvgIcon('ic_eye', 'basic_eye.svg');
    this._addSvgIcon('ic_gear', 'basic_gear.svg');
    this._addSvgIcon('ic_geolocalize_01', 'basic_geolocalize-01.svg');
    this._addSvgIcon('ic_geolocalize_05', 'basic_geolocalize-05.svg');
    this._addSvgIcon('ic_globe', 'basic_globe.svg');
    this._addSvgIcon('ic_headset', 'basic_headset.svg');
    this._addSvgIcon('ic_home', 'basic_home.svg');
    this._addSvgIcon('ic_info', 'basic_info.svg');
    this._addSvgIcon('ic_key', 'basic_key.svg');
    this._addSvgIcon('ic_life_buoy', 'basic_life_buoy.svg');
    this._addSvgIcon('ic_lightbulb', 'basic_lightbulb.svg');
    this._addSvgIcon('ic_link', 'basic_link.svg');
    this._addSvgIcon('ic_lock', 'basic_lock.svg');
    this._addSvgIcon('ic_magnifier', 'basic_magnifier.svg');
    this._addSvgIcon('ic_message_multiple', 'basic_message_multiple.svg');
    this._addSvgIcon('ic_message_txt', 'basic_message_txt.svg');
    this._addSvgIcon('ic_paperplane', 'basic_paperplane.svg');
    this._addSvgIcon('ic_pencil_ruler', 'basic_pencil_ruler.svg');
    this._addSvgIcon('ic_photo', 'basic_photo.svg');
    this._addSvgIcon('ic_picture_multiple', 'basic_picture_multiple.svg');
    this._addSvgIcon('ic_picture', 'basic_picture.svg');
    this._addSvgIcon('ic_question-new', 'basic_question-new.svg');
    this._addSvgIcon('ic_question', 'basic_question.svg');
    this._addSvgIcon('ic_settings', 'basic_settings.svg');
    this._addSvgIcon('ic_share', 'basic_share.svg');
    this._addSvgIcon('ic_signs', 'basic_signs.svg');
    this._addSvgIcon('ic_star', 'basic_star.svg');
    this._addSvgIcon('ic_target', 'basic_target.svg');
    this._addSvgIcon('ic_todolist_pencil', 'basic_todolist_pencil.svg');
    this._addSvgIcon('ic_world', 'basic_world.svg');
    this._addSvgIcon('ic_bus', 'bus.svg');
    this._addSvgIcon('ic_car_document', 'car-document.svg');
    this._addSvgIcon('ic_bag_plus', 'ecommerce_bag_plus.svg');
    this._addSvgIcon('ic_bag_search', 'ecommerce_bag_search.svg');
    this._addSvgIcon('ic_bag', 'ecommerce_bag.svg');
    this._addSvgIcon('ic_graph1', 'ecommerce_graph1.svg');
    this._addSvgIcon('ic_graph2', 'ecommerce_graph2.svg');
    this._addSvgIcon('ic_graph3', 'ecommerce_graph3.svg');
    this._addSvgIcon('ic_megaphone', 'ecommerce_megaphone.svg');
    this._addSvgIcon('ic_money', 'ecommerce_money.svg');
    this._addSvgIcon('ic_receipt_rupee', 'ecommerce_receipt_rupee.svg');
    this._addSvgIcon('ic_receipt', 'ecommerce_receipt.svg');
    this._addSvgIcon('ic_rupee_new', 'ecommerce_rupee_new.svg');
    this._addSvgIcon('ic_rupee', 'ecommerce_rupee.svg');
    this._addSvgIcon('ic_ticket', 'ecommerce_ticket.svg');
    this._addSvgIcon('ic_wallet', 'ecommerce_wallet.svg');
    this._addSvgIcon('ic_diamond', 'ecommerce_diamond.svg');
    this._addSvgIcon('ic_focus-new', 'focus-new.svg');
    this._addSvgIcon('ic_focus', 'focus.svg');
    this._addSvgIcon('ic_hand_stop', 'hand-stop.svg');
    this._addSvgIcon('ic_music_bell', 'music_bell.svg');
    this._addSvgIcon('ic_newspaper_new', 'Newspaper-new.svg');
    this._addSvgIcon('ic_newspaper', 'Newspaper.svg');
    this._addSvgIcon('ic_people-1-new', 'People-1-new.svg');
    this._addSvgIcon('ic_people-1', 'People-1.svg');
    this._addSvgIcon('ic_people-2-new', 'People-2-new.svg');
    this._addSvgIcon('ic_people-2', 'People-2.svg');
    this._addSvgIcon('ic_profile-female-new', 'profile-female-new.svg');
    this._addSvgIcon('ic_profile-female', 'profile-female.svg');
    this._addSvgIcon('ic_profile-male-new', 'profile-male-new.svg');
    this._addSvgIcon('ic_profile-male', 'profile-male.svg');
    this._addSvgIcon('ic_software_layers2', 'software_layers2.svg');
    this._addSvgIcon('ic_software_paintbrush', 'software_paintbrush.svg');
    this._addSvgIcon('ic_software_pencil', 'software_pencil.svg');
    this._addSvgIcon('ic_software_selection_polygon', 'software_selection_polygon.svg');
    this._addSvgIcon('ic_software_selection_roundedrectangle', 'software_selection_roundedrectangle.svg');
    this._addSvgIcon('ic_software_shape_polygon', 'software_shape_polygon.svg');
    this._addSvgIcon('ic_software_shape_roundedrectangle', 'software_shape_roundedrectangle.svg');
    this._addSvgIcon('ic_test_tube_new', 'Test-tube-new.svg');
    this._addSvgIcon('ic_test_tube', 'Test-tube.svg');
    this._addSvgIcon('ic_thumbs-up-new', 'Thumbs-up-new.svg');
    this._addSvgIcon('ic_thumbs-up', 'Thumbs-up.svg');
    this._addSvgIcon('ic_user_circle', 'user_circle.svg');
    this._addSvgIcon('ic_user_circle_female', 'user_circle_female.svg');
    this._addSvgIcon('ic_user', 'user.svg');
    this._addSvgIcon('ic_users', 'users.svg');
    this._addSvgIcon('ic_weather_fullmoon', 'weather_fullmoon.svg');
    this._addSvgIcon('ic_heart_pulse', 'heart-pulse.svg');
    this._addSvgIcon('ic_beaker', 'beaker.svg');
    this._addSvgIcon('ic_gift_card', 'gift-card.svg');
    this._addSvgIcon('ic_graduation_hat', 'graduation-hat.svg');
    this._addSvgIcon('ic_culture', 'culture.svg');
    this._addSvgIcon('ic_school', 'school.svg');
    this._addSvgIcon('ic_whatsapp', 'orion_whatsapp.svg');
    this._addSvgIcon('ic_postcard', 'basic_postcard.svg');
    this._addSvgIcon('ic_next_2', 'next-2.svg');
    this._addSvgIcon('ic_lamp', 'lamp.svg');
    this._addSvgIcon('ic_notebook', 'basic_notebook.svg');
    this._addSvgIcon('ic_webpage_multiple', 'basic_webpage_multiple.svg');
    this._addSvgIcon('ic_cloud_upload', 'basic_elaboration_cloud_upload.svg');
    this._addSvgIcon('ic_icon_paid', 'icon-paid.svg');
    this._addSvgIcon('ic_icon_unpaid', 'icon-unpaid.svg');
    this._addSvgIcon('ic_icon_due', 'icon-due.svg');
    this._addSvgIcon('ic_icon_icon_recurring_gray', 'icon-recurring-gray.svg');
    this._addSvgIcon('ic_icon_recurring_green', 'icon-recurring-green.svg');
    this._addSvgIcon('ic_icon_recurring', 'replay-arrow.svg');
    this._addSvgIcon('ic_arrow_down', 'icon_arrow_down.svg');

    this._addSvgIcon('ic_bill', 'bill_1.svg');
    this._addSvgIcon('ic_credit_card', 'credit-card.svg');
    this._addSvgIcon('ic_receipt_dollar', 'receipt.svg');
    this._addSvgIcon('ic_arrow_drop_down', 'arrow_drop_down.svg');
    this._addSvgIcon('ic_arrow_drop_down_selected', 'arrow_drop_down_selected.svg');
    this._addSvgIcon('ic_choice_close', 'choice_close.svg');
    this._addSvgIcon('ic_choice_minus_icon', 'choice_minus_icon.svg');
    this._addSvgIcon('ic_choice_plus_icon', 'choice_plus_icon.svg');
    this._addSvgIcon('ic_choice_close_small', 'choice_close_small.svg');
    this._addSvgIcon('ic_choice_clear', 'choice_clear.svg');
    this._addSvgIcon('ic_choice_location', 'choice_location.svg');
    this._addSvgIcon('ic_choice_delete', 'choice_delete.svg');
    this._addSvgIcon('ic_choice_edit', 'choice_edit.svg');
    this._addSvgIcon('ic_choice_menu_blue', 'choice_menu_blue.svg');
    this._addSvgIcon('ic_choice_search', 'choice_search.svg');
    this._addSvgIcon('ic_choice_cart', 'choice_cart.svg');
    this._addSvgIcon('ic_choice_more', 'choice_more.svg');
    this._addSvgIcon('ic_choice_menu', 'choice_menu.svg');
    this._addSvgIcon('ic_choice_account_blue', 'choice_account_blue.svg');
    this._addSvgIcon('ic_choice_search_blue', 'choice_search_blue.svg');
    this._addSvgIcon('ic_choice_cart_blue', 'choice_cart_blue.svg');
    this._addSvgIcon('ic_choice_more_blue', 'choice_more_blue.svg');
    this._addSvgIcon('ic_choice_account', 'choice_account.svg');
    this._addSvgIcon('ic_choice_arrow_right', 'choice_arrow_right.svg');
    this._addSvgIcon('ic_choice_arrow_left_blue', 'choice_arrow_left_blue.svg');
    this._addSvgIcon('ic_choice_item_cart_blue', 'choice_item_cart_blue.svg');
    this._addSvgIcon('ic_choice_item_cart', 'choice_item_cart.svg');
    this._addSvgIcon('ic_airplane', 'airplane.svg');
    this._addSvgIcon('ic_skyline', 'skyline.svg');
    this._addSvgIcon('ic_cruise', 'cruise.svg');

    this._addPaymentSvgIcon('ic_card_back_security_code', 'card-back-security-code.svg');
    this._addPaymentSvgIcon('ic_card_front', 'card-front.svg');
    this._addPaymentSvgIcon('ic_alipay', 'alipay.svg');
    this._addPaymentSvgIcon('ic_amex', 'amex.svg');
    this._addPaymentSvgIcon('ic_diners', 'diners.svg');
    this._addPaymentSvgIcon('ic_discover', 'discover.svg');
    this._addPaymentSvgIcon('ic_elo', 'elo.svg');
    this._addPaymentSvgIcon('ic_hipercard', 'hipercard.svg');
    this._addPaymentSvgIcon('ic_jcb', 'jcb.svg');
    this._addPaymentSvgIcon('ic_maestro_old', 'maestro-old.svg');
    this._addPaymentSvgIcon('ic_maestro', 'maestro.svg');
    this._addPaymentSvgIcon('ic_mastercard_old', 'mastercard-old.svg');
    this._addPaymentSvgIcon('ic_mastercard', 'mastercard.svg');
    this._addPaymentSvgIcon('ic_paypal', 'paypal.svg');
    this._addPaymentSvgIcon('ic_unionpay', 'unionpay.svg');
    this._addPaymentSvgIcon('ic_verve', 'verve.svg');
    this._addPaymentSvgIcon('ic_visa', 'visa.svg');

    this._addNaukriSvgIcon('ic_job_seeking', 'job-seeking.svg');
    this._addNaukriSvgIcon('ic_hat', 'hat.svg');
    this._addNaukriSvgIcon('ic_creativity', 'creativity.svg');
    this._addNaukriSvgIcon('ic_science', 'science.svg');
  }
}
