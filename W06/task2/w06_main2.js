function main()
{
    var vertices = [[-1,1,1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,-1],[-1,-1,-1],[1,-1,-1],[1,1,-1]];
    var faces = [[0,1,2]];

	var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
	
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var v0 = new THREE.Vector3().fromArray(vertices[0]);
	var v1 = new THREE.Vector3().fromArray(vertices[1]);
	var v2 = new THREE.Vector3().fromArray(vertices[2]);
	var v3 = new THREE.Vector3().fromArray(vertices[3]);
	var v4 = new THREE.Vector3().fromArray(vertices[4]);
	var v5 = new THREE.Vector3().fromArray(vertices[5]);
	var v6 = new THREE.Vector3().fromArray(vertices[6]);
	var v7 = new THREE.Vector3().fromArray(vertices[7]);

	var id = faces[0];
	var f0 = new THREE.Face3(id[0],id[1],id[2]);
	var f1 = new THREE.Face3(2,3,0);
	var f2 = new THREE.Face3(7,3,2);
	var f3 = new THREE.Face3(2,6,7);
	var f4 = new THREE.Face3(7,6,5);
	var f5 = new THREE.Face3(5,4,7);
	var f6 = new THREE.Face3(4,5,0);
	var f7 = new THREE.Face3(1,0,5);
	var f8 = new THREE.Face3(7,4,0);
	var f9 = new THREE.Face3(0,3,7);
	var f10 = new THREE.Face3(6,2,1);
	var f11 = new THREE.Face3(1,5,6);

	var geometry = new THREE.Geometry();
	geometry.vertices.push(v0);
	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
    geometry.vertices.push(v3);
	geometry.vertices.push(v4);
	geometry.vertices.push(v5);
	geometry.vertices.push(v6);
	geometry.vertices.push(v7);

	geometry.faces.push(f0);
    geometry.faces.push(f1);
    geometry.faces.push(f2);
    geometry.faces.push(f3);
    geometry.faces.push(f4);
    geometry.faces.push(f5);
    geometry.faces.push(f6);
    geometry.faces.push(f7);
    geometry.faces.push(f8);
    geometry.faces.push(f9);
    geometry.faces.push(f10);
    geometry.faces.push(f11);
 
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    var triangle = new THREE.Mesh(geometry, material);

    scene.add(triangle);

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        triangle.rotation.x += 0.01;
        triangle.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

function mouse_down_event( event )
{
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    
    mouse.x = ( event.clientX / width ) * 2 - 1;
    mouse.y = - ( event.clientY / height ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );   

    var intersects = raycaster.intersectObject( triangle );

    if(intersects.length > 0)
    {
        console.log(intersects[0].faceIndex);
        intersects[0].face.color.setRGB( 0,1,0 );
        intersects[0].object.geometry.colorsNeedUpdate = true;
    }

}
document.addEventListener( 'mousedown', mouse_down_event );
}