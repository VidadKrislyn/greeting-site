// Mic Variables
let micActive = false;
let blowStrength = 0;
let blowThreshold = 35;
let requiredBlowFrames = 20;

// Mic Permission
navigator.mediaDevices.getUserMedia({ audio:true })

.then(stream => {

    const audioContext =
        new AudioContext();

    const microphone =
        audioContext.createMediaStreamSource(stream);

    const analyser =
        audioContext.createAnalyser();

    microphone.connect(analyser);

    analyser.fftSize = 256;

    const dataArray =
        new Uint8Array(analyser.frequencyBinCount);

    function detectBlow(){

        analyser.getByteFrequencyData(dataArray);

        let volume = 0;

        for(let i = 0; i < dataArray.length; i++){

            volume += dataArray[i];

        }

        volume =
            volume / dataArray.length;

        if(micActive){

            if(volume > blowThreshold){

                blowStrength++;

            }else{

                blowStrength = 0;

            }

            if(blowStrength >= requiredBlowFrames){

                celebrateBirthday();

                return;

            }

        }

        requestAnimationFrame(detectBlow);

    }

    detectBlow();

})

.catch(err => {

    console.log("Microphone access denied");

});