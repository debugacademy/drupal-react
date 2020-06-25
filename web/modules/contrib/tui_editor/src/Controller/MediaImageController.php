<?php

namespace Drupal\tui_editor\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class MediaImageController.
 */
class MediaImageController extends ControllerBase {

  public function info($media) {

    return new JsonResponse(
      [
        'media_name' => $media->getName(),
        'file_path' => file_url_transform_relative(file_create_url($media->field_media_image->entity->getFileUri()))
      ]
    );
  }

}
