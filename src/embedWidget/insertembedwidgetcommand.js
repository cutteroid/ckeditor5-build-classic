import Command from '@ckeditor/ckeditor5-core/src/command';
import Template from '@ckeditor/ckeditor5-ui/src/template';

import { findOptimalInsertionPosition } from '@ckeditor/ckeditor5-widget/src/utils';
import { insertEmbedWidget } from './utils';

export default class InsertEmbedWidgetCommand extends Command {

    execute(data) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const insertPosition = findOptimalInsertionPosition( selection, model );
        insertEmbedWidget( model, data, insertPosition );
        this.editor.editing.view.focus();
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'embedWidget' );

        this.isEnabled = allowedIn !== null;
    }
}
