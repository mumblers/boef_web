var imgs = ['block', 'boef', 'camera_directional', 'camera_pole_directional', 'camera_pole', 'camera_pole_sphere',
    'house_red', 'phaser', 'politie', 'road_crossing', 'road_crossing_t', 'road_horizontal', 'road_trun', 'road_vertical'
];

function loadLevel(){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://dohdatasciencevm6.westeurope.cloudapp.azure.com:8080/maps/Oceans11', false);
    request.send(null);

    if (request.status === 200)
        return JSON.parse(request.responseText);
    else
        alert(request.responseText)
}

function preload () {
    imgs.forEach(function(name){
        this.load.image(name, 'resources/images/'+name+'.png')
    }.bind(this));
}