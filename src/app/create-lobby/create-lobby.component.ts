import { Component, OnInit } from '@angular/core';
import { LobbyForm } from '../models/LobbyForm';
import { LobbyServiceInstance, ILobbyService } from '../lobby/services/LobbyService';
import { Lobby } from '../models/Lobby';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.scss']
})
export class CreateLobbyComponent implements OnInit {
  lobbyForm: LobbyForm = new LobbyForm();
  lobbyService: ILobbyService;
  lobby = new Lobby();

  constructor(public lobbyServiceInstance: LobbyServiceInstance) {
    this.lobbyService = this.lobbyServiceInstance.getInstance();
  }

  ngOnInit() {
  }

  create() {
    this.lobbyService.create(this.lobby);
  }
}
