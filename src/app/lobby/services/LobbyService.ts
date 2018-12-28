import { Injectable } from '@angular/core';
import { Lobby } from 'src/app/models/Lobby';
import { IResourceService, ResourceService, ResourceServiceInstance } from 'src/app/resource.service';
import { HttpClient } from '@angular/common/http';

export interface ILobbyService extends IResourceService<Lobby> {

}

@Injectable()
export class LobbyServiceInstance extends ResourceServiceInstance<Lobby> {
    getInstance(): ILobbyService {
      return new LobbyService(this.httpClient);
    }
}

class LobbyService extends ResourceService<Lobby> implements ILobbyService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}