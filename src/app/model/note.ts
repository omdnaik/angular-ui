import { Content } from '@angular/compiler/src/render3/r3_ast';

export class Note {

    private _content: String;

    constructor(
    _content: String, private _editFlag: boolean = true,
    private _deleteFlag: boolean = true, private createdOn: Date = new Date()) {

        this._content = _content;
    }

    get content() {
        return this._content;
    }

    set content(content: String) {
        this._content = content;
    }

    get editFlag() {
        console.log('note editable :' + this._editFlag);
        return this._editFlag;
    }

    get deleteFlag() {
        console.log('note deleteable :' + this._deleteFlag);
        return this._deleteFlag;
    }

    static fromJSONToObject(data: Partial<Note>): Note {
        return Object.assign(new Note(''), data);
    }


    displayData() {
        return 'content :' + this._content + '_editFlag: '
        + this._editFlag + ' _deleteFlag: '
        + this._deleteFlag + ' createdOn: '
        + this.createdOn;
    }
}
