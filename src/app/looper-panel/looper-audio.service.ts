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

    loadTracks(tracks: any){
        tracks.forEach((track: any) => {
            const newAudio: AudioButton = {
                on :false,
                url : track.url,
                audio: null
            }
            this.buttonMatrix.push(newAudio);
        });
    }

    click(index: number) {
        if(this.buttonMatrix[index].on){
            this.stopTrack(this.buttonMatrix[index]);
        }
        this.buttonMatrix[index].on = !this.buttonMatrix[index].on;
        if(!this.timerOn){
            this.timerOn = true;
            this.playAllMusicIntervals();
        }
        if(this.isAllOff()){
            this.stop();
        }
    }

    isAllOff(){
        return this.buttonMatrix.find(btn => btn.on) === undefined;
    }

    playAllMusicIntervals(){
        timer(0,5000).pipe(takeUntil(this.stop$)).subscribe(() => {
            const audiosOn = this.buttonMatrix.filter(btn => btn.on);
            audiosOn.forEach(audio => this.play(audio));
        });
    }

    play(audioButton: AudioButton) {
        if(!audioButton.audio){
            const audio = new Audio();
            audio.src = audioButton.url;
            audio.loop = true;
            audio.load();
            audio.play();
            audioButton.audio = audio;
        }
    }

    stop(){
        this.timerOn = false;
        this.stop$.next(0);
    }

    stopTrack(audioButton: AudioButton){
        audioButton.audio.pause();
        audioButton.audio = null;
    }
}