import { Injectable } from "@angular/core";
import { Subject, takeUntil, timer } from "rxjs";
import { TrackData } from "../interfaces/track-data";

@Injectable({
    providedIn: 'root'
})
export class LooperAudioService {
    buttonMatrix: TrackData[] = [];
    timerOn: boolean = false;
    private stop$ = new Subject();
    TRACK_LENGTH = 8;

    trackOnOff(index: number) {
        if(this.buttonMatrix[index].on){
            this.buttonMatrix[index].on = false;
            this.stopTrack(this.buttonMatrix[index]);
        }else {
            this.buttonMatrix[index].on = true;
        }
        if(!this.timerOn){
            this.timerOn = true;
            this.startTimer();
        }
        if(this.isAllOff()){
            this.stopTimer();
        }
    }

    private isAllOff(){
        return this.buttonMatrix.find(btn => btn.on) === undefined;
    }

    private getTracksOn(){
        return this.buttonMatrix.filter(btn => btn.on);
    }

    startTimer(){
        timer(0, this.TRACK_LENGTH * 1000).pipe(takeUntil(this.stop$)).subscribe(() => {
            const audiosOn = this.getTracksOn();
            audiosOn.forEach(audio => this.playTrack(audio));
        });
    }

    stopTimer(){
        this.timerOn = false;
        this.stop$.next(0);
    }

    playTrack(trackData: TrackData) {
        trackData.audio.play();
    }

    stopTrack(trackData: TrackData){
        trackData.on = false;
        trackData.audio.pause();
    }

    loadTracks(tracks: any[]){
        tracks.forEach((track: any) => {
            const audio = new Audio();
            audio.src = track.url;
            audio.loop = true;
            audio.load();
          
            const newAudio: TrackData = {
                on: false,
                audio: audio
            }
            this.buttonMatrix.push(newAudio);
        });
    }

    clearTracks(){
        this.stopTimer();
        this.getTracksOn().forEach(track => {
            track.on = false;
            track.audio.pause();
            track.audio.remove();
        });
        this.buttonMatrix = [];
    }
}