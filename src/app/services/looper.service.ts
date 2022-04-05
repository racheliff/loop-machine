import { Injectable } from "@angular/core";
import { Subject, takeUntil, timer } from "rxjs";
import { TrackData } from "../interfaces/track-data";

@Injectable({
    providedIn: 'root'
})
export class LooperService {
    trackList: TrackData[] = [];
    timerOn: boolean = false;
    private stop$ = new Subject();
    TRACK_LENGTH = 8;

    trackOnOff(index: number) {
        if(this.trackList[index].on){
            this.trackList[index].on = false;
            this.stopTrack(this.trackList[index]);
        }else {
            this.trackList[index].on = true;
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
        return this.trackList.find(btn => btn.on) === undefined;
    }

    private getTracksOn(){
        return this.trackList.filter(btn => btn.on);
    }

    startTimer(){
        timer(0, this.TRACK_LENGTH * 1000).pipe(takeUntil(this.stop$)).subscribe(() => {
            const tracksOn = this.getTracksOn();
            tracksOn.forEach(track => this.playTrack(track));
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
          
            const newTrack: TrackData = {
                on: false,
                audio: audio
            }
            this.trackList.push(newTrack);
        });
    }

    clearTracks(){
        this.stopTimer();
        this.getTracksOn().forEach(track => {
            track.on = false;
            track.audio.pause();
            track.audio.remove();
        });
        this.trackList = [];
    }
}