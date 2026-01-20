import { InteractionResponse } from 'mvvm-mobx';

export class AppInteractionResponses {
    static readonly delete: { id: string; response: InteractionResponse; } = {
        id: 'delete', response: new InteractionResponse('delete', 'Delete')
    };
}