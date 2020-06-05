import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertEmbedWidgetCommand extends Command {
    execute(data) {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createEmbedWidget( writer, data ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'embedWidget' );

        this.isEnabled = allowedIn !== null;
    }
}

function createEmbedWidget( writer, data ) {
    const embedWidget = writer.createElement( 'embedWidget', { type: data.type, uid: data.uid } );
    const embedUrl = writer.createElement( 'embedUrl' );
    const embedContent = writer.createElement( 'embedContent' );
    const embedDate = writer.createElement( 'embedDate' );

    writer.append( embedUrl, embedWidget );
    writer.append( embedContent, embedWidget );
    writer.append( embedDate, embedWidget );

    return embedWidget;
}
