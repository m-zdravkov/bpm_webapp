import { Injectable } from '@angular/core';
import { Lobby } from 'src/app/models/Lobby';
import { IResourceService, ResourceService, ResourceServiceInstance } from 'src/app/resource.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { constants } from 'src/app/utils/Constants';

export interface ILobbyService extends IResourceService<Lobby> {
    
}

@Injectable()
export class LobbyServiceInstance extends ResourceServiceInstance<Lobby> {
    getInstance(): ILobbyService {
      return new LobbyService(this.httpClient, this.toastr);
    }
}

class LobbyService extends ResourceService<Lobby> implements ILobbyService {
    constructor(
        protected httpClient: HttpClient,
        protected toastr: ToastrService
    ) {
        super(httpClient, toastr);
        this.buildHttpRequests(`${constants.baseUrl}/lobby`);
    }
}