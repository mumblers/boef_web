var imgs = [
    'block',
    'boef',

    'camera_directional',
    'camera_pole',
    'camera_sphere',

    'politie',
    'car_green',
    'car_red',

    'road_crossing',
    'road_crossing_t',
    'road_horizontal',
    'road_turn',
    'road_vertical',
    'road_dead_end',
    'goal',
    'park',

    'house_red_roof',
    'house_silver_roof',
    'house_grey_roof',
    'house_red',
    'house_silver',
    'house_grey'
];

function loadLevel(){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://dohdatasciencevm6.westeurope.cloudapp.azure.com/api/maps/Oceans11', false);
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