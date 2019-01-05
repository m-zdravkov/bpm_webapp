import { Component, OnInit } from '@angular/core';
import { LobbyServiceInstance, ILobbyService } from './services/LobbyService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  lobbyService: ILobbyService;

  constructor(public lobbyServiceInstance: LobbyServiceInstance, private activatedRoute: ActivatedRoute) {
    this.lobbyService = lobbyServiceInstance.getInstance();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.lobbyService.get({'id':params['id']});
    });
  }

}
