import { InteractionResponse } from 'mvvm-mobx';

export class AppInteractionResponses {
    static readonly delete: { id: string; action: InteractionResponse; } = {
        id: 'delete', action: { id: 'delete', title: 'Delete' }
    };
}