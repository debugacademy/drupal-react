<?php

namespace Drupal\debugacademy_react\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class TaskController.
 */
class TaskController extends ControllerBase {

  /**
   * Task list.
   *
   * @return string
   *   Return Task list container.
   */
  public function content() {
    $page_render_array = [
      '#type' => 'markup',
      '#type' => 'markup',
      '#markup' => '<div id="react-tasks"></div>'
    ];
    // Add React Timesheet App to page.
    $page_render_array['#attached']['library'][] = 'debugacademy_react/react-tasks';
    return $page_render_array;
  }

}
