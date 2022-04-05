import { Component, OnDestroy, OnInit } from '@angular/core';
import { CloudService } from '../services/cloud.service';
import { LooperAudioService } from './looper-audio.service';

@Component({
  selector: 'app-looper-panel',
  templateUrl: './looper-panel.component.html',
  styleUrls: ['./looper-panel.component.scss']
})
export class LooperPanelComponent implements OnInit, OnDestroy {

  btns: boolean[] = Array(9);
  power: boolean = false;
  tracks: any[] = [];

  constructor(private looperAudioService: LooperAudioService, private cloudService: CloudService) { }

  ngOnInit(): void {
    this.cloudService.getFiles().subscribe((tracks: any) => {
      this.tracks = tracks;
    });
  }

  onPowerClick(){
    this.power = !this.power;
    if(this.power){
      this.looperAudioService.loadTracks(this.tracks);
    } else {
      this.looperAudioService.clearTracks();
      this.btns = this.btns.map(btn => false);
    }
    
  }

  onBtnClick(index: number){
    if(this.power){
      this.btns[index] = !this.btns[index];
      this.looperAudioService.trackOnOff(index);
    }
  }

  ngOnDestroy(): void {
    this.looperAudioService.stop();
  }
}
