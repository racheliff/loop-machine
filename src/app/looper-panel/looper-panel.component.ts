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
  constructor(private looperAudioService: LooperAudioService, private cloudService: CloudService) { }

  ngOnInit(): void {
    this.cloudService.getFiles().subscribe(files => {
      this.looperAudioService.loadTracks(files);
    });
  }

  play(index: number){
    this.btns[index] = !this.btns[index];
    this.looperAudioService.click(index);
  }

  ngOnDestroy(): void {
    this.looperAudioService.stop();
  }
}
