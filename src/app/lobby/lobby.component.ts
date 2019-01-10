import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { LobbyServiceInstance, ILobbyService } from './services/LobbyService';
import { ActivatedRoute } from '@angular/router';
import { Lobby } from '../models/Lobby';
import { delay } from 'q';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  lobbyService: ILobbyService;
  lobby: Lobby = null;
  notFound: boolean = false;

  constructor(public lobbyServiceInstance: LobbyServiceInstance, private activatedRoute: ActivatedRoute, private cdref: ChangeDetectorRef) {
    this.lobbyService = lobbyServiceInstance.getInstance();
  }

  ngOnInit() {
    this.lobby = null;
    this.notFound = false;
    this.activatedRoute.params.subscribe(params => {
      this.lobbyService.get({'id':params['id']}).subscribe(
        (res: any) => {
          this.lobby = res as Lobby; 
          this.notFound = false;
        },
        (err: any) => {
          delay(1000).then(() => {
            this.lobby = null;
            this.notFound = true;
            this.cdref.detectChanges();
          });
        }
      );
      // Property example:
      // this.lobbyService.getProperty(params['id'], 'player', '122621');
    });
  }

}
