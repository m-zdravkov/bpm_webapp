import { User } from './User';

/**
 * Basic public lobby
 */
export class Lobby {
    public id: number;
    public leader: string;
    public members: number = 1;
    public treshold: number;
    public name: string;
    public description: string;
    public game: string;
    public userIsMember: boolean;
    public isPrivate: boolean = false;
}