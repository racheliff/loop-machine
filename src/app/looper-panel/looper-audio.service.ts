import { Injectable } from "@angular/core";
import { interval, Observable, Subject, takeUntil, timer } from "rxjs";
import { AudioButton } from "../interfaces/audio-button";

@Injectable({
    providedIn: 'root'
})
export class LooperAudioService {
    buttonMatrix: AudioButton[] = [];
    timerOn: boolean = false;
    private stop$ = new Subject();
    power: boolean = false;
    TRACK_LENGTH = 8;

    powerOnOff(tracks: any[]){
        this.power = !this.power;
        if(this.power){
            this.loadTracks(tracks);
        } else {
            this.clearTracks();
        }
    }

    loadTracks(tracks: any[]){
        tracks.forEach((track: any) => {
            const audio = new Audio();
            audio.src = track.url;
            audio.loop = true;
            audio.load();
          
            const newAudio: AudioButton = {
                on:false,
                url: track.url,
                audio: audio
            }
            this.buttonMatrix.push(newAudio);
        });
    }

    trackOnOff(index: number) {
        if(this.buttonMatrix[index].on){
            this.buttonMatrix[index].on = false;
            this.stopTrack(this.buttonMatrix[index]);
        }else {
            this.buttonMatrix[index].on = true;
        }
        if(!this.timerOn){
            this.timerOn = true;
            this.playTracks();
        }
        if(this.isAllOff()){
            this.stop();
        }
    }

    isAllOff(){
        return this.buttonMatrix.find(btn => btn.on) === undefined;
    }

    getTrackOn(){
        return this.buttonMatrix.filter(btn => btn.on);
    }

    playTracks(){
        timer(0, this.TRACK_LENGTH * 1000).pipe(takeUntil(this.stop$)).subscribe(() => {
            const audiosOn = this.buttonMatrix.filter(btn => btn.on);
            audiosOn.forEach(audio => this.play(audio));
        });
    }

    play(audioButton: AudioButton) {
        audioButton.audio.play();
    }

    stop(){
        this.timerOn = false;
        this.stop$.next(0);
    }

    stopTrack(audioButton: AudioButton){
        audioButton.on = false;
        audioButton.audio.pause();
    }

    clearTracks(){
        this.stop();
        this.getTrackOn().forEach(track => {
            track.on = false;
            track.audio.pause();
            track.audio.remove();
        });
        this.buttonMatrix = [];
       
    }
}