var audioLoader = new Vue ({
    el : "#audioController",
    data : {
        checkbox : [],
        master_volum : localStorage.getItem("masterVolume"),
        music_volum : localStorage.getItem("bgmVolume"),
        effect_volum : localStorage.getItem("effectVolume"),
        datas : {
            "bgm" : new Audio("./sounds/bgm.mp3"),
            "suctionPop" : new Audio("./sounds/suctionPop.mp3"),
            "shot" : new Audio("./sounds/shot.mp3")
        },  
        bgmPlayer : null,
        effectPlayers : [],
    },
    methods : {
        playBGM(key) {
            const audio = this.datas[key];
            this.bgmPlayer = audio;
            this.setVolume();
            audio.play();
            audio.loop = true;            
        },
        playEffect(key) {
            const audio = this.datas[key];            
            this.effectPlayers.push(audio);
            this.setVolume();
            audio.play();     
            audio.addEventListener("ended", function(e){
                audioLoader.clearStopedEffectPlayer();
            }, false);
            
        },
        setMusicVolume(event,index) {
            console.log("setMusicVolume : " + event + " " + index);
        },
        setVolume() {
            if(this.mute) {
                if(this.bgmPlayer != null){
                    this.bgmPlayer.volume = 0;
                }
                for(var i=0 ; i<this.effectPlayers.length; i++) {
                    this.effectPlayers[i].volume = 0;
                }                    
                return;
            }
            if(this.bgmPlayer != null){
                this.bgmPlayer.volume = (this.master_volum / 100) * (this.music_volum / 100);
            }
            for(var i=0 ; i<this.effectPlayers.length; i++) {
                this.effectPlayers[i].volume = (this.master_volum / 100 * this.music_volum / 100);
            }
        },
        clearStopedEffectPlayer(){
            for(var i=0; i<this.effectPlayers.length; i++) {
                console.log("effectPlayers "+ i + ":" + this.effectPlayers[i].paused);
                if(this.effectPlayers[i].paused) {
                    this.effectPlayers.splice(i,1);
                }
            }
        }
    }, 
    mounted() {
        console.log("audioLoader init music_volum : " + this.music_volum + " effect volume : " + this.effect_volum + " checkbox : " + this.checkbox);
        if(this.music_volum == null) {
            this.music_volum = 50;
        }
        if(this.effect_volum == null) {
            this.effect_volum = 50;
        }
        if(this.master_volum == null) {
            this.master_volum = 50;
        }
        if(this.checkbox.length == 0) {
            const load = localStorage.getItem("audio_checkbox")
            console.log("checkbox load " + load + " length : " + load.length);
            const value = load.split(",")
            this.checkbox = value;
        }
    }, 
    watch : {
        music_volum(a,b) {
            localStorage.setItem("bgmVolume", a);            
            console.log("music_volum change " + b + " to " + a);
            this.setVolume();            
        },
        effect_volum(a,b) {
            localStorage.setItem("effectVolume", a);
            console.log("effect_volum change " + b + " to " + a);
            this.setVolume();            
        },
        master_volum(a,b) {
            localStorage.setItem("masterVolume", a);                            
            console.log("effect_volum change " + b + " to " + a);
            this.setVolume();
        },
        checkbox(a,b){
            localStorage.setItem("audio_checkbox",a);
            console.log("audio_checkbox change " + b + " to " + a );
            console.log(this.checkbox);
            this.setVolume();
        }
    }
});