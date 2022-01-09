var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width:330,
    height:250,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/A_3kzjAmg/model.JSON', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "And the second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[0].label;
        speak();
        if(results[0].label == "smile")
        {
            document.getElementById("update_emoji").innerHTML = "U+1F600;";
        }
        if(results[0].label == "bored")
        {
            document.getElementById("update_emoji").innerHTML = "U+1F611;";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("update_emoji").innerHTML = "U+1F620;";
        }

        if(results[1].label == "smile")
        {
            document.getElementById("update_emoji2").innerHTML = "U+1F600;";
        }
        if(results[1].label == "bored")
        {
            document.getElementById("update_emoji2").innerHTML = "U+1F611;";
        }
        if(results[1].label == "angry")
        {
            document.getElementById("update_emoji2").innerHTML = "U+1F620;";
        }
    }
}

