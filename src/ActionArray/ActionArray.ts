import { RelayCommand, InteractionResponse } from 'mvvm-mobx';

export class ActionArray {
readonly actions: Action[];

    constructor(actions: Action[], readonly mainActionId?: string) {
        actions = actions ?? [];

        this.actions = actions.sort((a, b) => compareStrings(a?.sortDescription, b?.sortDescription));
    }
}

export class Action extends InteractionResponse {
    constructor(id: string, title: string, readonly command: RelayCommand<unknown>, icon?: string, public sortDescription?: string) {
        super(id, title, command, icon);
    }
}

const compareStrings = (a: string | undefined, b: string | undefined) => {
    if (!a && !b) {
        return 0;
    }

    if (!a) {
        return -1;
    }

    if (!b) {
        return 1;
    }

    return a.localeCompare(b);
}