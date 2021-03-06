/**
 * @file
 * TUI Editor implementation.
 */

(function(Drupal) {

    'use strict';

    /**
     * @namespace
     */
    Drupal.editors.tui_editor = {

        /**
         * Editor attach callback.
         *
         * @param {HTMLElement} element
         *   The element to attach the editor to.
         * @param {string} format
         *   The text format for the editor.
         *
         * @return {bool}
         *   Whether the editor was successfully attached.
         */
        attach: function(element, format) {

            var settings = {
                dialog: {
                  dialogClass: 'media-library-widget-modal',
                  height: '75%',
                  width: '75%',
                  title: 'Media library',
                },
                dialogType: 'modal',
                url: '/admin/content/media-widget?media_library_widget_id=markdown_media&media_library_allowed_types%5B0%5D=distribution_image&media_library_allowed_types%5B1%5D=image&media_library_remaining=-1'
            };

            var ajax =  new Drupal.Ajax(false, null, settings);

            jQuery('#edit-body-wrapper').hide();;
            var textarea_wapper_id = 'node-edit-form-textarea-wrapper';
            jQuery('#edit-body-wrapper').wrapAll('<div id="'+textarea_wapper_id+'"></div>');
            jQuery('#'+textarea_wapper_id).append('<div class="code-html" style="border: none;"><div id="editSection"></div></div>');
            jQuery('#'+textarea_wapper_id).append('<input data-media-library-widget-value="markdown_media" data-drupal-selector="edit-media-library-selection" type="text" id="edit-media-library-selection" name="media_library_selection" value="" size="60" maxlength="128" class="form-text hidden" style="display: none;">');
            jQuery('#'+textarea_wapper_id).append('<input data-media-library-widget-update="markdown_media" onsubmit="return false;" data-drupal-selector="edit-media-library-update-widget" type="submit" id="edit-media-library-update-widget" name="media-library-update" value="Update widget" class="button js-form-submit form-submit hidden" style="display: none;">');
            jQuery('#'+textarea_wapper_id).parents('.field--type-text-with-summary').hide();

            var editor = new tui.Editor({
                el: document.querySelector('#editSection'),
                initialEditType: 'wysiwyg',
                previewStyle: 'vertical',
                height: '480px',
                exts: ['scrollSync'],
                initialValue: document.getElementById(element.id).value,
                events: {
                    change: function () {
                        // @TODO strip HTML tags (br,other?)
                        document.getElementById(element.id).value = editor.getMarkdown();
                    }
                },
                toolbarItems: [
                    'heading',
                    'bold',
                    'italic',
                    'strike',
                    'divider',
                    'hr',
                    'quote',
                    'divider',
                    'ul',
                    'ol',
                    'indent',
                    'outdent',
                    'divider',
                    'table',
                    'image',
                    'link',
                    'divider',
                    'code',
                    'codeblock',
                ],
            });

            /* Override PopupImage Modal */
            jQuery('#editSection .tui-popup-wrapper').css('index', '1000');
            jQuery('#editSection .te-tab-section').remove();
            jQuery('#editSection .te-file-type').remove();
            jQuery('#editSection .te-url-type').addClass('te-tab-active');
            jQuery('#editSection .te-image-url-input').prop('readonly', true);
            jQuery('#editSection .te-image-url-input').attr("placeholder", "Click to open media browser");

            /* Trigger Media Browser on input click */
            jQuery('#editSection .te-image-url-input').on('click', function(e){
                ajax.execute();
            });

            /* Returm media image information */
            jQuery('#edit-media-library-update-widget').on("mousedown",function(e){
                var mediaId = jQuery('#edit-media-library-selection').val();
                jQuery.get('/tui_editor/media/'+mediaId, function( data ) {
                    jQuery('#editSection .te-image-url-input').val(data.file_path);
                    jQuery('#editSection .te-alt-text-input').val(data.media_name);
                    jQuery('#editSection .te-alt-text-input').focus();
                });
            });

            return editor;

        },
        // editormd
        /**
         * Editor detach callback.
         *
         * @param {HTMLElement} element
         *   The element to detach the editor from.
         * @param {string} format
         *   The text format used for the editor.
         * @param {string} trigger
         *   The event trigger for the detach.
         *
         * @return {bool}
         *   Whether the editor was successfully detached.
         */
        detach: function(element, format, trigger) {

        },

        /**
         * Reacts on a change in the editor element.
         *
         * @param {HTMLElement} element
         *   The element where the change occurred.
         * @param {function} callback
         *   Callback called with the value of the editor.
         */
        onChange: function(element, callback) {
            callback();
        }

    };

})(Drupal);
