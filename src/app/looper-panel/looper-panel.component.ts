import { Component, OnDestroy, OnInit } from '@angular/core';
import { CloudService } from '../services/cloud.service';
import { LooperService } from '../services/looper.service';

@Component({
  selector: 'app-looper-panel',
  templateUrl: './looper-panel.component.html',
  styleUrls: ['./looper-panel.component.scss']
})
export class LooperPanelComponent implements OnInit, OnDestroy {

  btns: boolean[] = Array(9);
  power: boolean = false;
  tracks: any[] = [];

  constructor(private looperService: LooperService, private cloudService: CloudService) { }

  ngOnInit(): void {
    this.cloudService.getFiles().subscribe((tracks: any) => {
      this.tracks = tracks;
    });
  }

  onPowerClick(){
    this.power = !this.power;
    if(this.power){
      this.looperService.loadTracks(this.tracks);
    } else {
      this.looperService.clearTracks();
      this.btns = this.btns.map(btn => false);
    }
    
  }

  onBtnClick(index: number){
    if(this.power){
      this.btns[index] = !this.btns[index];
      this.looperService.trackOnOff(index);
    }
  }

  ngOnDestroy(): void {
    this.looperService.stopTimer();
  }
}
