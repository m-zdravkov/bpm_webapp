import { Component, OnInit } from '@angular/core';
import { LobbyForm } from '../models/LobbyForm';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.scss']
})
export class CreateLobbyComponent implements OnInit {
  lobbyForm: LobbyForm = new LobbyForm();
  constructor() { }

  ngOnInit() {
  }

  create() {
    alert('Create');
  }
}
