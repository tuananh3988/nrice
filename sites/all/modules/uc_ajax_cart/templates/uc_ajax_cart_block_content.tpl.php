<?php
/**
 * @file
 *
 * Theme file for non empty cart.
 */
?>

<div class="block block-uc-cart" id="block-uc-cart-cart">
  <h2><span class="cart-block-title-bar"><?php print t('Shopping cart');?></span></h2>
  <div class="content">
    <table class="cart-block-items">
      <tbody>
        <?php foreach ( $items as $item ):?>
        <tr class="odd">
          <td class="cart-block-item-qty">
            <?php print $item['qty'] ?>
          </td>
          <td class="cart-block-item-title">
            <?php print $item['title']; print $item['descr']; ?>
          </td>
          <td class="cart-block-item-price">
            <span class="uc-price"><?php print $item['total'] ?></span>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="cart-block-item-desc">
            <?php print $item['remove_link'] ?>
          </td>
        </tr>
      </tbody>
      <?php endforeach; ?>
    </table>
    <table class="cart-block-summary">
      <tbody>
        <tr>
          <td class="cart-block-summary-items">
            <?php print $items_text; ?>
          </td>
          <td class="cart-block-summary-total">
            <label><?php print t('Total'); ?>: </label><?php print $total ;?>
          </td>
        </tr>
        <tr class="cart-block-summary-links">
          <td colspan="2">
            <?php print $cart_links; ?>
          </td>
        </tr>
      </tbody>
    </table>  
  </div>
</div>
